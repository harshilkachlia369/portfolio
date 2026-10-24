
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =========================================
  // PORTFOLIO SETUP
  // =========================================

  const pages = document.querySelectorAll("[data-page]");
  const navLinks = document.querySelectorAll(".nav-link[data-go]");
  const transitionOverlay = document.querySelector(".transition-wipe");
  const transitionTitle = document.querySelector(".transition-title");

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

  // =========================================
  // PAGE NAVIGATION
  // =========================================

  function navigateTo(pageName) {
    const targetPage = document.querySelector(
      `[data-page="${pageName}"]`
    );

    if (!targetPage) {
      console.warn(`Portfolio page "${pageName}" was not found.`);
      return false;
    }

    pages.forEach((page) => {
      const isActive = page === targetPage;

      page.classList.toggle("active", isActive);
      page.setAttribute("aria-hidden", String(!isActive));
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
      behavior: "auto"
    });

    return true;
  }

  // =========================================
  // PAGE-SPECIFIC TRANSITION TEXT
  // =========================================

  function setTransitionMessage(pageName) {
    if (!transitionTitle) return;

    const message =
      transitionMessages[pageName] || "EXPLORING IDEAS";

    transitionTitle.replaceChildren(
      document.createTextNode(message)
    );

    const accent = document.createElement("span");
    accent.className = "accent-text";
    accent.textContent = ".";
    transitionTitle.appendChild(accent);
  }

  function playTransition(callback, destination = "projects") {
    if (typeof callback !== "function") return;

    if (!transitionOverlay || isTransitioning) {
      callback();
      return;
    }

    isTransitioning = true;
    setTransitionMessage(destination);

    window.clearTimeout(transitionTimer);
    window.clearTimeout(transitionEndTimer);

    transitionOverlay.classList.remove("play");

    // Restart the CSS animation cleanly.
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

  // =========================================
  // PROJECT DETAILS
  // =========================================

  function renderProjectDetail(projectId) {
    const project = projects[projectId];
    const detailContainer = document.querySelector(
      "#project-detail-content"
    );

    if (!project || !detailContainer) {
      console.warn(`Unable to load project: ${projectId}`);
      return;
    }

    const learningList = document.createElement("ul");

    project.learning.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      learningList.appendChild(listItem);
    });

    detailContainer.replaceChildren();

    const eyebrow = document.createElement("p");
    eyebrow.className = "eyebrow";
    eyebrow.textContent =
      `PROJECT ${project.number} / ${project.category}`;

    const heading = document.createElement("h1");
    heading.append(document.createTextNode(project.title));

    const accent = document.createElement("span");
    accent.textContent = ".";
    heading.appendChild(accent);

    const description = document.createElement("p");
    description.className = "project-detail-description";
    description.textContent = project.description;

    const panel = document.createElement("div");
    panel.className = "project-detail-panel";

    const panelHeading = document.createElement("p");
    panelHeading.className = "eyebrow";
    panelHeading.textContent = "WHAT I'M EXPLORING";

    panel.append(panelHeading, learningList);

    const meta = document.createElement("div");
    meta.className = "project-detail-meta";

    const status = document.createElement("p");
    const statusLabel = document.createElement("strong");
    statusLabel.textContent = "STATUS";
    const statusValue = document.createElement("span");
    statusValue.textContent = project.status;
    status.append(statusLabel, statusValue);

    const tools = document.createElement("p");
    const toolsLabel = document.createElement("strong");
    toolsLabel.textContent = "TOOLS & TOPICS";
    const toolsValue = document.createElement("span");
    toolsValue.textContent = project.tools;
    tools.append(toolsLabel, toolsValue);

    meta.append(status, tools);

    const backButton = document.createElement("button");
    backButton.type = "button";
    backButton.className = "button button-primary";
    backButton.dataset.go = "projects";
    backButton.textContent = "← Back to all projects";

    detailContainer.append(
      eyebrow,
      heading,
      description,
      panel,
      meta,
      backButton
    );

    navigateTo("project-detail");
  }

  // =========================================
  // NAVIGATION AND PROJECT CLICK HANDLING
  // =========================================

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Element)) return;

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

      if (destination === "project-detail") {
        setTransitionMessage(destination);
        navigateTo(destination);
      } else {
        playTransition(
          () => navigateTo(destination),
          destination
        );
      }

      return;
    }

    const projectButton = target.closest("[data-project]");

    if (projectButton) {
      event.preventDefault();

      const projectId = projectButton.dataset.project;

      if (!projects[projectId]) {
        console.warn(`Project "${projectId}" was not found.`);
        return;
      }

      playTransition(
        () => renderProjectDetail(projectId),
        "project-detail"
      );
    }
  });

  // =========================================
  // CUSTOM CURSOR
  // =========================================

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

  // =========================================
  // KEYBOARD SUPPORT
  // =========================================

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const detailPage = document.querySelector(
        '[data-page="project-detail"]'
      );

      if (detailPage?.classList.contains("active")) {
        playTransition(
          () => navigateTo("projects"),
          "projects"
        );
      }
    }
  });

  // =========================================
  // INITIALISE PORTFOLIO
  // =========================================

  if (pages.length === 0) {
    console.error("No elements with [data-page] were found.");
    return;
  }

  navigateTo("home");
  setTransitionMessage("home");

  console.log("Portfolio script loaded successfully.");
});
