import path from "node:path";
import { fileURLToPath } from "node:url";
import { app, shell, BrowserWindow } from "electron";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "../..");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
const preload = path.join(__dirname$1, "../preload/index.mjs");
const indexHtml = path.join(RENDERER_DIST, "index.html");
const ALLOWED_ORIGINS = /* @__PURE__ */ new Set([
  "http://localhost:5173",
  // typical Vite dev; adjust port if needed
  "http://127.0.0.1:5173",
  "file://"
]);
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });
  win.webContents.on("will-navigate", (event, navigationUrl) => {
    const parsed = new URL(navigationUrl);
    const origin = parsed.origin;
    const isFile = parsed.protocol === "file:";
    if (!isFile && !ALLOWED_ORIGINS.has(origin)) {
      event.preventDefault();
    }
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }
}
app.on("web-contents-created", (_event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:") || url.startsWith("http:")) {
      void shell.openExternal(url);
    }
    return { action: "deny" };
  });
});
app.whenReady().then(() => {
  createWindow();
});
