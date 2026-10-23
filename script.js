
/* =========================================
   HARSHIL KACHALIA — PORTFOLIO SCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll("[data-page]");
  const navLinks = document.querySelectorAll(".nav-link[data-go]");
  const transitionOverlay = document.querySelector(".transition-wipe");

  let isTransitioning = false;

  // -----------------------------------------
  // PROJECT DATA
  // -----------------------------------------

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

  // -----------------------------------------
  // PAGE NAVIGATION
  // -----------------------------------------

  function navigateTo(pageName) {
    const targetPage = document.querySelector(
      `[data-page="${pageName}"]`
    );

    if (!targetPage) {
      console.warn(`Portfolio page not found: ${pageName}`);
      return;
    }

    pages.forEach((page) => {
      page.classList.toggle("active", page === targetPage);
    });

    navLinks.forEach((link) => {
      const isActive = link.dataset.go === pageName;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // -----------------------------------------
  // PROJECT DETAILS
  // -----------------------------------------

  function renderProjectDetail(projectId) {
    const project = projects[projectId];
    const detailContainer = document.querySelector(
      "#project-detail-content"
    );

    if (!project || !detailContainer) {
      console.warn(`Project not found: ${projectId}`);
      return;
    }

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
        <ul>
          ${project.learning
            .map((item) => `<li>${item}</li>`)
            .join("")}
        </ul>
      </div>

      <div class="project-detail-meta">
        <p>
          <strong>STATUS</strong>
          <span>${project.status}</span>
        </p>

        <p>
          <strong>TOOLS & TOPICS</strong>
          <span>${project.tools}</span>
        </p>
      </div>

      <button class="button button-primary" data-go="projects">
        ← Back to all projects
      </button>
    `;

    navigateTo("project-detail");
  }

  // -----------------------------------------
  // CLICK HANDLING
  // This handles navigation AND project cards.
  // Do not add a second click listener for these.
  // -----------------------------------------

  document.addEventListener("click", (event) => {
    const goButton = event.target.closest("[data-go]");

    if (goButton) {
      event.preventDefault();

      const destination = goButton.dataset.go;

      if (destination === "home" ||
          destination === "projects" ||
          destination === "achievements" ||
          destination === "about") {
        playTransition(() => navigateTo(destination));
      } else if (destination === "project-detail") {
        navigateTo(destination);
      }

      return;
    }

    const projectButton = event.target.closest("[data-project]");

    if (projectButton) {
      const projectId = projectButton.dataset.project;

      playTransition(() => renderProjectDetail(projectId));
    }
  });

  // -----------------------------------------
  // PAGE TRANSITION
  // -----------------------------------------

  function playTransition(callback) {
    if (isTransitioning || !transitionOverlay) {
      callback();
      return;
    }

    isTransitioning = true;

    transitionOverlay.classList.remove("play");

    // Restart the CSS animation.
    void transitionOverlay.offsetWidth;

    transitionOverlay.classList.add("play");

    window.setTimeout(() => {
      callback();
    }, 300);

    window.setTimeout(() => {
      transitionOverlay.classList.remove("play");
      isTransitioning = false;
    }, 950);
  }

  // -----------------------------------------
  // CUSTOM CURSOR
  // -----------------------------------------

  const cursorHalo = document.querySelector(".cursor-halo");
  const cursorDot = document.querySelector(".cursor-dot");

  const finePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (finePointer && cursorHalo && cursorDot) {
    document.addEventListener("mousemove", (event) => {
      const x = event.clientX;
      const y = event.clientY;

      cursorHalo.style.left = `${x}px`;
      cursorHalo.style.top = `${y}px`;

      cursorDot.style.left = `${x}px`;
      cursorDot.style.top = `${y}px`;

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
      const interactiveElement = event.target.closest(
        "a, button, .project-card, .z2m-visual"
      );

      cursorHalo.classList.toggle(
        "hovering",
        Boolean(interactiveElement)
      );
    });
  }

  // -----------------------------------------
  // KEYBOARD SUPPORT
  // -----------------------------------------

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navigateTo("projects");
    }
  });

  // -----------------------------------------
  // INITIAL PAGE
  // -----------------------------------------

  navigateTo("home");

  console.log("Portfolio loaded successfully.");
});
