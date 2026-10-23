
const projects = [
  {
    id: "plant-whisperer",
    title: "Plant Whisperer",
    category: "Science",
    type: "Research concept",
    symbol: "∿",
    summary: "Exploring whether plant electrical signals can help identify early water stress.",
    context: "A science project developed around investigating plant responses to different water conditions.",
    approach: "The concept uses electrodes to observe electrical potential changes in plants. Measurements from different water conditions can be compared to investigate possible patterns.",
    learning: "Plant signals can be subtle and variable. Reliable conclusions require careful controls, repeated measurements, consistent electrode placement, and evidence before making claims.",
    next: "Improve measurement consistency, collect additional readings, document experimental conditions, and evaluate whether observed patterns repeat.",
    tags: ["Plant science", "Electronics", "Research"],
    featured: true
  },
  {
    id: "robotic-dog",
    title: "Robotic Dog",
    category: "Robotics",
    type: "Hardware prototype",
    symbol: "⌘",
    summary: "Exploring a four-legged robot using servo motors and distance sensing.",
    context: "A hands-on robotics build focused on learning how mechanical movement and sensors can work together.",
    approach: "The concept uses four servo-driven legs and an ultrasonic distance sensor. The control logic can respond to nearby obstacles, while servo angles determine the robot's posture and movement.",
    learning: "A robot needs more than code: mechanical geometry, stable mounting, power delivery, servo limits, and calibration all affect the result.",
    next: "Improve gait coordination, test the frame's stability, calibrate each servo, and make obstacle responses more reliable.",
    tags: ["Servos", "Ultrasonic sensor", "Robotics"],
    featured: true
  },
  {
    id: "gesture-control",
    title: "AI Gesture Control",
    category: "AI & Software",
    type: "Web experiment",
    symbol: "◎",
    summary: "Experimenting with camera-based hand gestures as a way to control a website.",
    context: "An interactive software concept using browser-based computer vision.",
    approach: "The project explores MediaPipe Hands and webcam input to detect hand landmarks and map selected gestures to actions such as cursor movement and scrolling.",
    learning: "Real-time interaction depends on lighting, camera position, detection confidence, and smoothing. Gesture recognition also needs clear rules to avoid accidental actions.",
    next: "Improve gesture stability, add accessible alternatives, and test how well the controls work under different lighting conditions.",
    tags: ["JavaScript", "MediaPipe", "Computer vision"],
    featured: true
  },
  {
    id: "lifelink",
    title: "LifeLink",
    category: "Robotics",
    type: "Care technology concept",
    symbol: "⌁",
    summary: "A senior-care station concept combining medication reminders, activity prompts, and an SOS idea.",
    context: "A prototype concept developed around everyday support for older adults and their families.",
    approach: "The proposed station brings together scheduled medicine prompts, reminders, simple engagement features, and an emergency-alert concept. Each feature needs separate usability and safety testing.",
    learning: "Care technology must be understandable, dependable, respectful of privacy, and designed around the person using it. A concept is not the same as a validated medical or safety device.",
    next: "Build a limited reminder prototype, test its interface with appropriate supervision, and separately evaluate any emergency or medication-handling mechanisms.",
    tags: ["Assistive technology", "Prototyping", "Human-centred design"],
    featured: true
  },
  {
    id: "gitclub",
    title: "GitClub",
    category: "Community",
    type: "Student initiative",
    symbol: "{ }",
    summary: "A student-led initiative to help peers explore GitHub and collaborative coding.",
    context: "An idea for creating a welcoming community where students can learn version control and build together.",
    approach: "The planned experience includes learning activities, collaborative projects, student roles, and a website explaining how to participate.",
    learning: "A successful community needs more than a website. Clear responsibilities, beginner-friendly activities, consistent communication, and shared projects matter too.",
    next: "Organise introductory sessions, create a starter repository, and help members contribute to small collaborative projects.",
    tags: ["GitHub", "Peer learning", "Community"],
    featured: true
  },
  {
    id: "specwise",
    title: "SpecWise",
    category: "AI & Software",
    type: "Web application concept",
    symbol: "▦",
    summary: "A PC capability analyser concept that connects hardware specifications with intended use.",
    context: "A software idea for making computer specifications easier for students and everyday users to understand.",
    approach: "The planned interface separates hardware details, capability analysis, and educational explanations so users can better understand what their computer may handle.",
    learning: "Useful analysis depends on transparent assumptions. A recommendation should explain its limits instead of pretending a single score can describe every workload.",
    next: "Validate capability rules, add clear explanations, and test recommendations against real hardware configurations.",
    tags: ["Web development", "PC hardware", "UI design"],
    featured: false
  },
  {
    id: "swasth-bharat",
    title: "Swasth Bharat",
    category: "AI & Software",
    type: "Health app concept",
    symbol: "+",
    summary: "A family wellness concept centred on everyday routines, food, activity, and organisation.",
    context: "A proposed app experience focused on making family wellness information and daily planning more approachable.",
    approach: "The concept brings together family-oriented dashboards, food and activity ideas, and task organisation, with a focus on familiar Indian household contexts.",
    learning: "Wellness software should distinguish general information from medical advice, respect privacy, and make recommendations understandable and practical.",
    next: "Test a simple prototype, validate content quality, and improve usability before considering any real-world health use.",
    tags: ["App design", "Wellness", "AI concepts"],
    featured: false
  }
];

const appPages = [
  "home",
  "projects",
  "project-detail",
  "achievements",
  "about"
];

let activeFilter = "All";

const navLinks = document.querySelectorAll(".nav-link");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-links");

document.getElementById("year").textContent = new Date().getFullYear();

/* NAVIGATION */

function navigateTo(page, updateHash = true) {
  if (!appPages.includes(page)) {
    page = "home";
  }

  document.querySelectorAll(".page").forEach(section => {
    section.classList.toggle("active", section.id === page);
  });

  navLinks.forEach(link => {
    const isActive =
      link.dataset.page === page ||
      (page === "project-detail" && link.dataset.page === "projects");

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  if (updateHash) {
    const hash = page === "project-detail" ? "projects" : page;
    history.pushState({ page }, "", `#${hash}`);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* PROJECT CARDS */

function makeProjectCard(project, index) {
  return `
    <article class="project-card">
      <div class="project-visual">
        <span class="visual-type">${project.type}</span>

        <span class="visual-symbol" aria-hidden="true">
          ${project.symbol}
        </span>

        <span class="visual-number">
          PROJECT / ${String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div class="project-card-body">
        <div class="project-card-meta">
          <span>${project.category}</span>
          <span>EXPLORATION</span>
        </div>

        <h3>${project.title}</h3>
        <p>${project.summary}</p>

        <button
          class="card-link"
          data-project="${project.id}"
          aria-label="Open project notes for ${project.title}"
        >
          Project notes <span>↗</span>
        </button>
      </div>
    </article>
  `;
}

function renderFeaturedProjects() {
  const featured = projects.filter(project => project.featured);

  document.getElementById("featuredProjects").innerHTML =
    featured
      .map((project, index) => makeProjectCard(project, index))
      .join("");
}

function renderAllProjects() {
  const filtered = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const container = document.getElementById("allProjects");

  container.innerHTML = filtered.length
    ? filtered.map((project, index) => makeProjectCard(project, index)).join("")
    : `<div class="empty-state">No projects in this category yet.</div>`;

  document.querySelectorAll(".filter-button").forEach(button => {
    const isActive = button.dataset.filter === activeFilter;

    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

/* INDIVIDUAL PROJECT NOTES */

function renderProjectDetail(id) {
  const project = projects.find(item => item.id === id);

  if (!project) {
    return;
  }

  const tags = project.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join("");

  document.getElementById("projectDetailContent").innerHTML = `
    <div class="detail-hero">
      <span class="detail-kicker">
        ${project.category.toUpperCase()} /
        ${project.type.toUpperCase()}
      </span>

      <h1 id="detail-title">
        ${project.title}<span class="accent-text">.</span>
      </h1>

      <p>${project.summary}</p>

      <div class="detail-symbol" aria-hidden="true">
        ${project.symbol}
      </div>

      <div class="detail-tags">
        ${tags}
      </div>
    </div>

    <div class="detail-columns">
      <section class="detail-block">
        <p class="eyebrow">01 / THE IDEA</p>
        <h2>What I'm exploring</h2>
        <p>${project.context}</p>
        <p>${project.approach}</p>
      </section>

      <section class="detail-block">
        <p class="eyebrow">02 / THE PROCESS</p>
        <h2>What I'm learning</h2>
        <p>${project.learning}</p>
      </section>

      <section class="detail-block">
        <p class="eyebrow">03 / NEXT STEPS</p>
        <h2>Where it could go</h2>
        <p>${project.next}</p>
      </section>

      <section class="detail-block">
        <p class="eyebrow">04 / A NOTE ON PROGRESS</p>
        <h2>Ideas evolve</h2>
        <p>
          This page describes the project's concept, approach, learning,
          and possible next steps. It does not imply that every proposed
          feature has already been built or tested.
        </p>
      </section>
    </div>
  `;

  /*
   * Re-enter the project detail page to restart its animation
   * every time a different project is opened.
   */
  const detailPage = document.getElementById("project-detail");

  detailPage.classList.remove("active");
  void detailPage.offsetWidth;

  navigateTo("project-detail");
}

/* MAIN NAVIGATION BUTTONS */

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navigateTo(link.dataset.page);
  });
});

/* MOBILE MENU */

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

/* PROJECT LINKS AND PAGE SHORTCUTS */

document.addEventListener("click", event => {
  const goButton = event.target.closest("[data-go]");

  if (goButton) {
    navigateTo(goButton.dataset.go);
    return;
  }

  const projectButton = event.target.closest("[data-project]");

  if (projectButton) {
    renderProjectDetail(projectButton.dataset.project);
  }
});

/* PROJECT FILTERS */

document.getElementById("projectFilters").addEventListener("click", event => {
  const filterButton = event.target.closest("[data-filter]");

  if (!filterButton) {
    return;
  }

  activeFilter = filterButton.dataset.filter;
  renderAllProjects();
});

/* BROWSER BACK AND FORWARD BUTTONS */

window.addEventListener("popstate", () => {
  const requestedPage = location.hash.replace("#", "") || "home";

  navigateTo(requestedPage, false);
});

/* INITIALISE THE WEBSITE */

renderFeaturedProjects();
renderAllProjects();

const initialPage = location.hash.replace("#", "") || "home";

navigateTo(initialPage, false);
