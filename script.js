"use strict";

// --- Placeholder links: replace with your own before deploying ---
const ITCH_IO_URL = "https://your-username.itch.io/little-bit-luck";
const GITHUB_URL = "https://github.com/tobiaszmazurek";
const LINKEDIN_URL = "https://linkedin.com/in/tobiaszmazurek";
const CONTACT_EMAIL = "tobiasz7182@gmail.com";
const DEVELOPER_NAME = "Tobiasz Mazurek";

const CONSOLE_LOG_INTERVAL_MS = 1500;

const sectionContent = {
  about: {
    title: "About Me",
    render: () => `
      ${renderField("Role", "Unity Developer")}
      ${renderStackedField("Bio", "Passionate about building gameplay systems, tools and editor extensions in Unity. Focused on clean architecture, testable game code, and shipping playable builds instead of endless prototypes.")}
      ${renderField("Specialization", "Gameplay / Tools / C#")}
    `
  },

  cv: {
    title: "CV",
    render: () => `
      ${renderComponentCard("GameplayProgrammer.cs", "2023 — Present", `
        Implemented core gameplay systems, custom editor tools and CI-friendly build pipelines
        for multiple Unity titles.
      `)}
      ${renderComponentCard("ToolsDeveloper.cs", "2021 — 2023", `
        Built internal Unity editor extensions to speed up level design and debugging workflows.
      `)}
      ${renderComponentCard("JuniorDeveloper.cs", "2019 — 2021", `
        Started as a gameplay programmer on small indie projects, learning the Unity pipeline
        end to end.
      `)}
    `
  },

  gamesProjects: {
    title: "Projects — Games",
    render: () => `
      ${renderProjectCard("LB", "Little Bit Luck", "A small-scale roguelike about risk and chance.", ITCH_IO_URL)}
      ${renderProjectCard("PG", "Placeholder Game Two", "Replace with a real project description.", "#")}
      ${renderProjectCard("PG", "Placeholder Game Three", "Replace with a real project description.", "#")}
    `
  },

  toolsProjects: {
    title: "Projects — Tools",
    render: () => `
      ${renderProjectCard("HA", "HermesArch", "Custom architecture / messaging framework for Unity projects.", "#")}
      ${renderProjectCard("DC", "Debug Commands", "In-game debug console with custom command registration.", "#")}
      ${renderProjectCard("EX", "Editor Extension Kit", "Reusable custom inspectors and editor windows.", "#")}
    `
  },

  techStack: {
    title: "Tech Stack",
    render: () => `
      ${renderSkillBar("Unity", 90)}
      ${renderSkillBar("C#", 85)}
      ${renderSkillBar(".NET", 70)}
      ${renderSkillBar("Git", 80)}
      ${renderSkillBar("Shaders / HLSL", 55)}
      ${renderSkillBar("Multiplayer Netcode", 50)}
    `
  },

  contact: {
    title: "Contact",
    render: () => `
      <ul class="contact-list">
        <li>GitHub: <a href="${GITHUB_URL}" target="_blank" rel="noopener">${GITHUB_URL}</a></li>
        <li>LinkedIn: <a href="${LINKEDIN_URL}" target="_blank" rel="noopener">${LINKEDIN_URL}</a></li>
        <li>Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></li>
      </ul>
    `
  }
};

function renderField(label, value) {
  return `
    <div class="inspector-field">
      <span class="inspector-field__label">${label}</span>
      <span class="inspector-field__value">${value}</span>
    </div>
  `;
}

function renderStackedField(label, value) {
  return `
    <div class="inspector-field inspector-field--stacked">
      <span class="inspector-field__label">${label}</span>
      <span class="inspector-field__value">${value}</span>
    </div>
  `;
}

function renderComponentCard(componentName, period, description) {
  return `
    <div class="component-card">
      <div class="component-card__header">
        <input type="checkbox" class="component-card__checkbox" checked disabled />
        <span class="component-card__icon">⚙</span>
        <span class="component-card__name">${componentName}</span>
        <span class="component-card__period">${period}</span>
        <span class="component-card__caret">▼</span>
      </div>
      <div class="component-card__body">${description}</div>
    </div>
  `;
}

function renderProjectCard(initials, title, description, link) {
  return `
    <div class="project-card">
      <div class="project-card__thumb">${initials}</div>
      <div>
        <p class="project-card__title">${title}</p>
        <p class="project-card__desc">${description}</p>
        <a class="project-card__link" href="${link}" target="_blank" rel="noopener">View project →</a>
      </div>
    </div>
  `;
}

function renderSkillBar(label, percent) {
  return `
    <div class="skill-bar">
      <div class="skill-bar__label">
        <span>${label}</span>
        <span>${percent}%</span>
      </div>
      <div class="skill-bar__track">
        <div class="skill-bar__fill" style="width: ${percent}%"></div>
      </div>
    </div>
  `;
}

function selectSection(sectionKey) {
  const section = sectionContent[sectionKey];
  if (!section) {
    return;
  }

  document.querySelectorAll(".hierarchy__item").forEach((item) => {
    item.classList.toggle("is-selected", item.dataset.section === sectionKey);
  });

  const inspectorContent = document.getElementById("inspector-content");
  inspectorContent.innerHTML = `
    <h3 class="inspector-section__title">${section.title}</h3>
    ${section.render()}
    <button class="inspector__add-component" type="button">Add Component</button>
  `;

  inspectorContent.classList.remove("is-animating");
  void inspectorContent.offsetHeight; // force reflow so the animation restarts
  inspectorContent.classList.add("is-animating");
}

function setupHierarchy() {
  const items = document.querySelectorAll(".hierarchy__item");
  items.forEach((item) => {
    item.addEventListener("click", () => selectSection(item.dataset.section));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectSection(item.dataset.section);
      }
    });
  });
}

function setupHierarchySearch() {
  const input = document.getElementById("hierarchy-search");
  const items = document.querySelectorAll(".hierarchy__item");

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    items.forEach((item) => {
      const label = item.querySelector(".hierarchy__label").textContent.toLowerCase();
      item.classList.toggle("is-hidden", query.length > 0 && !label.includes(query));
    });
  });
}

function setupTransformTools() {
  const tools = document.querySelectorAll(".tool-btn");
  tools.forEach((tool) => {
    tool.addEventListener("click", () => {
      tools.forEach((other) => other.classList.remove("is-active"));
      tool.classList.add("is-active");
    });
  });
}

function setupSceneTabs() {
  const sceneTab = document.getElementById("tab-scene");
  const gameTab = document.getElementById("tab-game");

  sceneTab.addEventListener("click", () => {
    sceneTab.classList.add("is-active");
    gameTab.classList.remove("is-active");
  });

  gameTab.addEventListener("click", () => {
    gameTab.classList.add("is-active");
    sceneTab.classList.remove("is-active");
  });
}

function setupHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const hierarchy = document.querySelector(".hierarchy");

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = hierarchy.classList.toggle("is-mobile-open");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
  });
}

function openItchBuild() {
  window.open(ITCH_IO_URL, "_blank", "noopener");
}

function setupPlayButtons() {
  document.getElementById("scene-play-btn").addEventListener("click", openItchBuild);
  document.getElementById("btn-play").addEventListener("click", () => {
    setPlayState(true);
    openItchBuild();
  });
  document.getElementById("btn-pause").addEventListener("click", () => setPlayState(false));
  document.getElementById("btn-step").addEventListener("click", () => {
    logToConsole("info", "Step: advanced one frame.");
  });
}

function setPlayState(isPlaying) {
  const scenePanel = document.getElementById("scene-panel");
  const playBtn = document.getElementById("btn-play");
  const pauseBtn = document.getElementById("btn-pause");

  scenePanel.classList.toggle("is-playing", isPlaying);
  playBtn.classList.toggle("is-active", isPlaying);
  pauseBtn.classList.toggle("is-active", !isPlaying);
}

function setupFpsCounter() {
  const fpsLabel = document.getElementById("fps-counter");
  let frameCount = 0;
  let lastTimestamp = performance.now();

  function tick(timestamp) {
    frameCount += 1;
    const elapsed = timestamp - lastTimestamp;

    if (elapsed >= 1000) {
      fpsLabel.textContent = Math.round((frameCount * 1000) / elapsed);
      frameCount = 0;
      lastTimestamp = timestamp;
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

const consoleLogQueue = [
  { level: "info", message: "Initializing portfolio..." },
  { level: "info", message: "Loading projects... done" },
  { level: "warning", message: "Too many side projects detected" },
  { level: "info", message: `Unity Developer found: ${DEVELOPER_NAME}` },
  { level: "info", message: "IL Weaving module loaded successfully" },
  { level: "warning", message: "Coffee levels critical" },
  { level: "info", message: "Ready. Press Play to launch game." }
];

const consoleLevelIcons = {
  info: "ℹ️",
  warning: "⚠️",
  error: "❌"
};

const consoleLogCounts = { info: 0, warning: 0, error: 0 };
const consoleFilterState = { info: true, warning: true, error: true };

function logToConsole(level, message) {
  const list = document.getElementById("console-log-list");
  const entry = document.createElement("div");
  entry.className = `console__log-entry console__log-entry--${level}`;
  entry.dataset.level = level;
  entry.innerHTML = `
    <span class="console__log-icon">${consoleLevelIcons[level]}</span>
    <span class="console__log-text">${message}</span>
  `;
  entry.addEventListener("click", () => {
    document.querySelectorAll(".console__log-entry.is-selected").forEach((selected) => {
      selected.classList.remove("is-selected");
    });
    entry.classList.add("is-selected");
  });

  if (!consoleFilterState[level]) {
    entry.classList.add("is-hidden");
  }

  list.appendChild(entry);
  list.scrollTop = list.scrollHeight;

  consoleLogCounts[level] += 1;
  updateConsoleFilterCounts();
}

function updateConsoleFilterCounts() {
  document.getElementById("count-info").textContent = consoleLogCounts.info;
  document.getElementById("count-warning").textContent = consoleLogCounts.warning;
  document.getElementById("count-error").textContent = consoleLogCounts.error;
}

function setupConsoleFilters() {
  const filterButtons = document.querySelectorAll(".console__filter-btn");

  filterButtons.forEach((button) => {
    button.classList.add("is-active");
    button.addEventListener("click", () => {
      const level = button.dataset.level;
      consoleFilterState[level] = !consoleFilterState[level];
      button.classList.toggle("is-active", consoleFilterState[level]);

      document.querySelectorAll(`.console__log-entry[data-level="${level}"]`).forEach((entry) => {
        entry.classList.toggle("is-hidden", !consoleFilterState[level]);
      });
    });
  });
}

function setupConsoleHeaderButtons() {
  document.getElementById("console-clear-btn").addEventListener("click", () => {
    document.getElementById("console-log-list").innerHTML = "";
    consoleLogCounts.info = 0;
    consoleLogCounts.warning = 0;
    consoleLogCounts.error = 0;
    updateConsoleFilterCounts();
  });

  document.getElementById("console-collapse-btn").addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-active");
  });

  document.getElementById("console-error-pause-btn").addEventListener("click", (event) => {
    event.currentTarget.classList.toggle("is-active");
  });
}

function playConsoleQueue(queue) {
  if (queue.length === 0) {
    return;
  }

  const [nextLog, ...rest] = queue;
  logToConsole(nextLog.level, nextLog.message);

  setTimeout(() => playConsoleQueue(rest), CONSOLE_LOG_INTERVAL_MS);
}

function init() {
  setupHierarchy();
  setupHierarchySearch();
  setupTransformTools();
  setupSceneTabs();
  setupHamburgerMenu();
  setupPlayButtons();
  setupFpsCounter();
  setupConsoleFilters();
  setupConsoleHeaderButtons();
  playConsoleQueue(consoleLogQueue);
  selectSection("about");
}

document.addEventListener("DOMContentLoaded", init);
