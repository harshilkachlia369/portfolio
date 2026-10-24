
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================================
  // ELEMENTS
  // =========================================

  const pages = [...document.querySelectorAll("[data-page]")];
  const navLinks = [...document.querySelectorAll(".nav-link[data-go]")];

  const overlay = document.querySelector(".transition-wipe");
  const transitionText = document.querySelector("#transition-text");

  const cursorHalo = document.querySelector(".cursor-halo");
  const cursorDot = document.querySelector(".cursor-dot");

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-nav");

  let isTransitioning = false;
  let transitionTimer = null;
  let transitionEndTimer = null;
  let currentPage = "home";

  // =========================================
  // TRANSITION MESSAGES
  // =========================================

  const transitionMessages = {
    home: "BACK TO THE BEGINNING",
    projects: "ENTERING THE WORKSHOP",
    achievements: "MILESTONES UNLOCKED",
    about: "THE PERSON BEHIND THE PROJECTS",
    "project-detail": "EXPLORING IDEAS"
  };

  // =========================================
  // PROJECT INFORMATION
  // =========================================

  const projects = {
    "plant-whisperer": {
      number: "01",
      category: "SCIENCE · PLANT ELECTRICAL SIGNALS",
      title: "Plant Whisperer",
      description:
        "Plant Whisperer explores whether electrical signals measured from plants can help us study water stress. The project investigates how plant signals may change under different water conditions.",
      learning: [
        "Exploring plant electrical signals and ion movement.",
        "Experimenting with electrodes and signal measurement.",
        "Comparing observations across different water conditions."
      ],
      status: "Science project in development",
      tools: "Electrodes · Electronics · Scientific observation"
    },

    "robotic-dog": {
      number: "02",
      category: "ROBOTICS · HARDWARE",
      title: "Robotic Dog",
      description:
        "A quadruped robotics project exploring movement using servo motors, sensors and a carefully designed body.",
      learning: [
        "Understanding servo motor positioning.",
        "Exploring robot leg movement and balance.",
        "Learning how sensors can help a robot react to its surroundings."
      ],
      status: "Robotics learning project",
      tools: "Microcontrollers · Servo motors · Sensors · CAD"
    },

    "ai-gesture-control": {
      number: "03",
      category: "AI · COMPUTER VISION",
      title: "AI Gesture Control",
      description:
        "An interactive web experiment exploring hand gestures as an alternative way to control website elements.",
      learning: [
        "Exploring hand tracking with MediaPipe.",
        "Connecting gesture recognition to website interactions.",
        "Experimenting with browser-based computer vision."
      ],
      status: "Web experiment",
      tools: "JavaScript · MediaPipe · HTML · CSS"
    },

    "lifelink": {
      number: "04",
      category: "INNOVATION · ASSISTIVE TECHNOLOGY",
      title: "LifeLink",
      description:
        "LifeLink is a senior-care station concept designed around daily routines, medicine reminders, exercise prompts and ways to request assistance.",
      learning: [
        "Identifying everyday challenges in senior care.",
        "Designing around simple and accessible interactions.",
        "Exploring how hardware and software could work together."
      ],
      status: "Concept and proof-of-concept exploration",
      tools: "Product design · Electronics · App concepts"
    },

    "gitclub": {
      number: "05",
      category: "COMMUNITY · OPEN SOURCE",
      title: "GitClub",
      description:
        "GitClub is a student initiative intended to help students discover GitHub, learn collaboration and explore building projects together.",
      learning: [
        "Planning learning activities for students.",
        "Exploring GitHub and version-control workflows.",
        "Organising a community around making and sharing."
      ],
      status: "Student initiative",
      tools: "GitHub · Web development · Collaboration"
    },

    "specwise": {
      number: "06",
      category: "WEB DEVELOPMENT · PC HARDWARE",
      title: "SpecWise",
      description:
        "SpecWise is a PC capability analyzer concept designed to help people understand their computer hardware and what it may be suitable for.",
      learning: [
        "Organising hardware information into clear categories.",
        "Designing an interactive interface.",
        "Exploring how specifications relate to different tasks."
      ],
      status: "Web application project",
      tools: "React · JavaScript · UI design"
    },

    "swasth-bharat": {
      number: "07",
      category: "APP CONCEPT · FAMILY WELLNESS",
      title: "Swasth Bharat",
      description:
        "Swasth Bharat is a family wellness app concept focused on everyday nutrition, exercise, routines and practical health-related guidance for Indian families.",
      learning: [
        "Designing features for different family members.",
        "Exploring wellness dashboards and daily routines.",
        "Thinking about responsible uses of AI in an app."
      ],
      status: "App concept and prototype exploration",
      tools: "UI design · Web technology · AI concepts"
    },

    "it-rural-quiz": {
      number: "08",
      category: "TECHNOLOGY · QUIZ EXPERIENCE",
      title: "TCS IT Rural Quiz",
      description:
        "My TCS IT Rural Quiz journey involved preparing for and participating in a technology quiz, exploring IT, internet safety, computing history and emerging technologies.",
      learning: [
        "Revising internet safety and security protocols.",
        "Learning about technology companies and their founders.",
        "Exploring artificial intelligence, augmented reality and virtual reality."
      ],
      status: "Quiz preparation and participation experience",
      tools: "Technology knowledge · Research · Quiz preparation"
    }
  };

  // =========================================
  // SAFE PAGE NAVIGATION
  // =========================================

  function closeMobileMenu() {
    if (mainNav) {
      mainNav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }

    document.body.classList.remove("menu-open");
  }

  function navigateTo(pageName) {
    const targetPage = pages.find(
      (page) => page.dataset.page === pageName
    );

    if (!targetPage) {
      console.error(`Portfolio page not found: ${pageName}`);
      return false;
    }

    pages.forEach((page) => {
      const active = page === targetPage;

      page.classList.toggle("active", active);
      page.setAttribute("aria-hidden", String(!active));
    });

    navLinks.forEach((link) => {
      const active = link.dataset.go === pageName;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    currentPage = pageName;

    closeMobileMenu();

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

    return true;
  }

  // =========================================
  // TRANSITION ANIMATION
  // =========================================

  function playTransition(callback, message) {
    if (typeof callback !== "function") return;

    if (isTransitioning) return;

    if (!overlay) {
      callback();
      return;
    }

    isTransitioning = true;

    window.clearTimeout(transitionTimer);
    window.clearTimeout(transitionEndTimer);

    if (transitionText) {
      transitionText.textContent =
        message || "MOVING FORWARD";
    }

    overlay.classList.remove("play");

    // Restart the CSS animation.
    void overlay.offsetWidth;

    overlay.classList.add("play");

    // Change page while the overlay covers the screen.
    transitionTimer = window.setTimeout(() => {
      callback();
    }, 300);

    transitionEndTimer = window.setTimeout(() => {
      overlay.classList.remove("play");
      isTransitioning = false;
    }, 980);
  }

  function goToPage(pageName) {
    if (pageName === currentPage) {
      closeMobileMenu();
      return;
    }

    const message =
      transitionMessages[pageName] || "MOVING FORWARD";

    playTransition(() => {
      navigateTo(pageName);
    }, message);
  }

  // =========================================
  // PROJECT DETAIL RENDERING
  // =========================================

  function renderProjectDetail(projectId) {
    const project = projects[projectId];
    const detailContainer = document.querySelector(
      "#project-detail-content"
    );

    if (!project) {
      console.error(`Unknown project: ${projectId}`);
      return;
    }

    if (!detailContainer) {
      console.error(
        "Missing #project-detail-content in index.html."
      );
      return;
    }

    const learningItems = project.learning
      .map((item) => `<li>${item}</li>`)
      .join("");

    detailContainer.innerHTML = `
      <p class="eyebrow">
        PROJECT ${project.number} / ${project.category}
      </p>

      <h1>${project.title}<span>.</span></h1>

      <p class="project-detail-description">
        ${project.description}
      </p>

      <div class="project-detail-panel">
        <p class="eyebrow">WHAT I'M EXPLORING</p>
        <ul>${learningItems}</ul>
      </div>

      <div class="project-detail-meta">
        <p>
          <strong>STATUS</strong>
          <span>${project.status}</span>
        </p>
        <p>
          <strong>TOOLS &amp; TOPICS</strong>
          <span>${project.tools}</span>
        </p>
      </div>

      <button type="button"
        class="button button-primary"
        data-go="projects">
        ← Back to all projects
      </button>
    `;

    navigateTo("project-detail");
  }

  function openProject(projectId) {
    if (!projects[projectId]) {
      console.error(`Project "${projectId}" does not exist.`);
      return;
    }

    if (isTransitioning) return;

    if (currentPage === "project-detail") {
      renderProjectDetail(projectId);
      return;
    }

    playTransition(() => {
      renderProjectDetail(projectId);
    }, transitionMessages["project-detail"]);
  }

  // =========================================
  // ALL NAVIGATION AND PROJECT CLICKS
  // =========================================

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    // Navigation links and buttons.
    const goElement = target.closest("[data-go]");

    if (goElement) {
      const destination = goElement.dataset.go;

      const knownPages = [
        "home",
        "projects",
        "achievements",
        "about",
        "project-detail"
      ];

      if (!knownPages.includes(destination)) return;

      event.preventDefault();

      if (destination === "project-detail") {
        if (currentPage !== "project-detail") {
          goToPage("projects");
        }
        return;
      }

      goToPage(destination);
      return;
    }

    // Project cards and project buttons.
    const projectElement = target.closest("[data-project]");

    if (projectElement) {
      event.preventDefault();
      openProject(projectElement.dataset.project);
    }
  });

  // =========================================
  // MOBILE MENU
  // =========================================

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );

      mainNav.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();

        if (currentPage === "project-detail") {
          goToPage("projects");
        }
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        closeMobileMenu();
      }
    });
  }

  // =========================================
  // CUSTOM CURSOR
  // =========================================

  const supportsFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (supportsFinePointer && cursorHalo && cursorDot) {
    document.addEventListener("mousemove", (event) => {
      cursorHalo.style.left = `${event.clientX}px`;
      cursorHalo.style.top = `${event.clientY}px`;

      cursorDot.style.left = `${event.clientX}px`;
      cursorDot.style.top = `${event.clientY}px`;

      cursorHalo.classList.add("visible");
      cursorDot.classList.add("visible");
    });

    document.addEventListener("mouseout", (event) => {
      if (!event.relatedTarget) {
        cursorHalo.classList.remove("visible");
        cursorDot.classList.remove("visible");
      }
    });

    document.addEventListener("mouseover", (event) => {
      if (!(event.target instanceof Element)) return;

      const interactive = event.target.closest(
        "a, button, .project-card"
      );

      cursorHalo.classList.toggle(
        "hovering",
        Boolean(interactive)
      );
    });
  }

  // =========================================
  // START PORTFOLIO
  // =========================================

  if (!pages.length) {
    console.error(
      "No [data-page] sections found. Check index.html."
    );
    return;
  }

  navigateTo("home");

  console.log("Portfolio initialized successfully.");
});
