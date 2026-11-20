var selectedIcon = undefined;

const appWindow = document.getElementById("appWindow");
const appFrame = document.getElementById("appFrame");

const windowTitle = document.getElementById("windowTitle");
const titlebar = document.getElementById("windowTitlebar");

const closeButton = document.getElementById("closeWindow");

// Open app

function openApp(name, path) {
  windowTitle.textContent = name;

  appFrame.src = path;

  appWindow.style.display = "block";
}

// Close app

closeButton.addEventListener("click", () => {
  appWindow.style.display = "none";

  appFrame.src = "about:blank";
});

// Drag windows

let dragging = false;

let offsetX = 0;
let offsetY = 0;

titlebar.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button")) return;

  dragging = true;

  const rect = appWindow.getBoundingClientRect();

  appWindow.style.transform = "none";

  appWindow.style.left = rect.left + "px";
  appWindow.style.top = rect.top + "px";

  offsetX = event.clientX - rect.left;
  offsetY = event.clientY - rect.top;

  titlebar.setPointerCapture(event.pointerId);
});

titlebar.addEventListener("pointermove", (event) => {
  if (!dragging) return;

  const x = event.clientX - offsetX;
  const y = event.clientY - offsetY;

  appWindow.style.left = x + "px";
  appWindow.style.top = y + "px";
});

titlebar.addEventListener("pointerup", () => {
  dragging = false;
});

titlebar.addEventListener("pointercancel", () => {
  dragging = false;
});
