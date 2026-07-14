"use strict";

// --- Placeholder links: replace with your own before deploying ---
const ITCH_IO_URL = "https://your-username.itch.io/little-bit-luck";
const GITHUB_URL = "https://github.com/tobiaszmazurek";
const LINKEDIN_URL = "https://linkedin.com/in/tobiaszmazurek";
const CONTACT_EMAIL = "tobiasz7182@gmail.com";
const DEVELOPER_NAME = "Tobiasz Mazurek";

const sectionContent = {
  about: {
    title: "About Me",
    render: () => `
      <div class="inspector-field">
        <span class="inspector-field__label">Role</span>
        Unity Developer
      </div>
      <div class="inspector-field">
        <span class="inspector-field__label">Bio</span>
        Passionate about building gameplay systems, tools and editor extensions in Unity.
        Focused on clean architecture, testable game code, and shipping playable builds
        instead of endless prototypes.
      </div>
      <div class="inspector-field">
        <span class="inspector-field__label">Specialization</span>
        Gameplay Programming · Editor Tooling · C# Architecture
      </div>
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

function renderComponentCard(componentName, period, description) {
  return `
    <div class="component-card">
      <div class="component-card__header">
        <span>${componentName}</span>
        <span class="component-card__period">${period}</span>
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
        <a href="${link}" target="_blank" rel="noopener">View project →</a>
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

function logToConsole(level, message) {
  const list = document.getElementById("console-log-list");
  const entry = document.createElement("div");
  entry.className = `console__log-entry console__log-entry--${level}`;
  entry.textContent = `[${level.charAt(0).toUpperCase() + level.slice(1)}] ${message}`;
  list.appendChild(entry);
  list.scrollTop = list.scrollHeight;
}

function playConsoleQueue(queue) {
  if (queue.length === 0) {
    return;
  }

  const [nextLog, ...rest] = queue;
  logToConsole(nextLog.level, nextLog.message);

  const delay = 2000 + Math.random() * 1000;
  setTimeout(() => playConsoleQueue(rest), delay);
}

function init() {
  setupHierarchy();
  setupPlayButtons();
  setupFpsCounter();
  playConsoleQueue(consoleLogQueue);
  selectSection("about");
}

document.addEventListener("DOMContentLoaded", init);
