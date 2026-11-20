const windowContainer = document.getElementById("windowContainer"); // Grabs window container from index.html

let highestZIndex = 1000;
let windowCount = 0;

function openApp(name, path) {
  windowCount++;

  const appWindow = document.createElement("div");
  appWindow.className = "window";

  const offset = (windowCount * 30) % 200;

  appWindow.style.left = `calc(50% - 350px + ${offset}px)`;
  appWindow.style.top = `calc(50% - 250px + ${offset}px)`;

  appWindow.style.zIndex = ++highestZIndex;

  appWindow.innerHTML = `
        <div class="window-titlebar">
            <span class="window-title">${name}</span>

            <div class="window-controls">
                <button class="close" title="Close">✕</button>
            </div>
        </div>

        <iframe
            src="${path}"
            title="${name}"
            sandbox="allow-scripts allow-forms"
        ></iframe>
    `; //Iframe allows me to embed app info inside of the main html page

  windowContainer.appendChild(appWindow);

  const titlebar = appWindow.querySelector(".window-titlebar");
  const closeButton = appWindow.querySelector(".close");

  appWindow.addEventListener("pointerdown", () => {
    highestZIndex++;
    appWindow.style.zIndex = highestZIndex;
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    appWindow.remove();
  });

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titlebar.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;

    dragging = true;

    const rect = appWindow.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    titlebar.setPointerCapture(event.pointerId);
  });

  titlebar.addEventListener("pointermove", (event) => {
    if (!dragging) return;

    appWindow.style.left = `${event.clientX - offsetX}px`;
    appWindow.style.top = `${event.clientY - offsetY}px`;
  });

  titlebar.addEventListener("pointerup", () => {
    dragging = false;
  });

  titlebar.addEventListener("pointercancel", () => {
    dragging = false;
  });
}
