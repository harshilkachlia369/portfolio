document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // PORTFOLIO SETUP

  const pages = document.querySelectorAll("[data-page]");
  const navLinks = document.querySelectorAll(".nav-link[data-go]");
  const transitionOverlay = document.querySelector(".transition-wipe");
  const transitionMessage = document.querySelector(".transition-message");

  const cursorHalo = document.querySelector(".cursor-halo");
  const cursorDot = document.querySelector(".cursor-dot");

  let isTransitioning = false;
  let transitionTimer = null;
  let transitionEndTimer = null;

  const transitionMessages = {
    home: "BACK TO THE BEGINNING",
    projects: "ENTERING THE WORKSHOP",
    achievements: "MILESTONES UNLOCKED",
    about: "THE PERSON BEHIND THE PROJECTS",
    "project-detail": "EXPLORING IDEAS"
  };

  // PROJECT INFORMATION

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
        "A hands-on robotics project exploring how a quadruped robot can move using servo motors, sensors and a carefully designed body.",
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
        "An interactive web experiment that explores using hand gestures as an alternative way to control elements on a website.",
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
        "Exploring how system specifications relate to different tasks."
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
        "My TCS IT Rural Quiz journey involved preparing for a technology quiz and exploring topics across information technology, internet safety, computing history and emerging technologies.",
      learning: [
        "Revising internet safety and security protocols.",
        "Learning about technology companies and their founders.",
        "Exploring artificial intelligence, augmented reality and virtual reality."
      ],
      status: "Quiz preparation and participation experience",
      tools: "Technology knowledge · Research · Quiz preparation"
    }
  };

  // TRANSITION LABEL

  function setTransitionMessage(destination) {
    if (!transitionMessage) return;

    const message = transitionMessages[destination] || "EXPLORING IDEAS";
    const accent = transitionMessage.querySelector(".accent-text");

    // Keep the orange accent dot as a separate element.
    transitionMessage.textContent = message;

    if (accent) {
      transitionMessage.appendChild(accent);
    } else {
      const dot = document.createElement("span");
      dot.className = "accent-text";
      dot.textContent = ".";
      transitionMessage.appendChild(dot);
    }
  }

  // PAGE NAVIGATION

  function navigateTo(pageName) {
    const targetPage = document.querySelector(
      `[data-page="${pageName}"]`
    );

    if (!targetPage) {
      console.warn(
        `Portfolio page "${pageName}" was not found. Check the data-page attribute in index.html.`
      );
      return false;
    }

    pages.forEach((page) => {
      const isActive = page === targetPage;
      page.classList.toggle("active", isActive);
      page.setAttribute("aria-hidden", isActive ? "false" : "true");
    });

    // Keep Projects highlighted while a project's notes are open.
    const activeNavPage =
      pageName === "project-detail" ? "projects" : pageName;

    navLinks.forEach((link) => {
      const active = link.dataset.go === activeNavPage;

      link.classList.toggle("active", active);

      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return true;
  }

  // PROJECT DETAILS

  function renderProjectDetail(projectId) {
    const project = projects[projectId];
    const detailContainer = document.querySelector(
      "#project-detail-content"
    );

    if (!project) {
      console.warn(`Project "${projectId}" was not found.`);
      return;
    }

    if (!detailContainer) {
      console.error(
        'Missing #project-detail-content in index.html.'
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
          <strong>PROJECT STATUS</strong>
          <span>${project.status}</span>
        </p>

        <p>
          <strong>TOOLS &amp; TOPICS</strong>
          <span>${project.tools}</span>
        </p>
      </div>

      <button
        type="button"
        class="button button-primary project-detail-back"
        data-go="projects"
      >
        ← Back to all projects
      </button>
    `;

    navigateTo("project-detail");
  }

  // TRANSITION EFFECT

  function playTransition(callback, destination = "projects") {
    if (typeof callback !== "function") return;

    setTransitionMessage(destination);

    // Navigation still works if the overlay is missing.
    if (!transitionOverlay || isTransitioning) {
      callback();
      return;
    }

    isTransitioning = true;

    window.clearTimeout(transitionTimer);
    window.clearTimeout(transitionEndTimer);

    transitionOverlay.classList.remove("play");

    // Restart the CSS animation.
    void transitionOverlay.offsetWidth;

    transitionOverlay.classList.add("play");

    transitionTimer = window.setTimeout(() => {
      callback();
    }, 300);

    transitionEndTimer = window.setTimeout(() => {
      transitionOverlay.classList.remove("play");
      isTransitioning = false;
    }, 950);
  }

  // NAVIGATION AND PROJECT CLICK HANDLING

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

    const projectButton = target.closest("[data-project]");

    if (projectButton) {
      event.preventDefault();

      const projectId = projectButton.dataset.project;

      playTransition(
        () => renderProjectDetail(projectId),
        "project-detail"
      );

      return;
    }

    const goButton = target.closest("[data-go]");

    if (goButton) {
      const destination = goButton.dataset.go;

      const validPages = [
        "home",
        "projects",
        "achievements",
        "about",
        "project-detail"
      ];

      if (!validPages.includes(destination)) return;

      event.preventDefault();

      playTransition(
        () => navigateTo(destination),
        destination
      );
    }
  });

  // CUSTOM CURSOR

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (finePointer && cursorHalo && cursorDot) {
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
      const target = event.target;

      if (!(target instanceof Element)) return;

      const interactiveElement = target.closest(
        'a, button, [role="button"], .project-card, .z2m-visual'
      );

      cursorHalo.classList.toggle(
        "hovering",
        Boolean(interactiveElement)
      );
    });
  }

  // KEYBOARD SUPPORT

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const detailPage = document.querySelector(
      '[data-page="project-detail"]'
    );

    if (detailPage && detailPage.classList.contains("active")) {
      playTransition(
        () => navigateTo("projects"),
        "projects"
      );
    }
  });

  // INITIALISE PORTFOLIO

  if (pages.length === 0) {
    console.error(
      "No elements with [data-page] were found. Check index.html."
    );
    return;
  }

  navigateTo("home");

  console.log("Portfolio script loaded successfully.");
});
