const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
    kiosk: true,
  });

  const indexPath = path.join(__dirname, `/index.html`);
  win
    .loadURL(
      url.format({
        pathname: indexPath,
        protocol: "file:",
        slashes: true,
      })
    )
    .then((res) => {
      console.log("URL loaded", indexPath);
    })
    .catch((err) => {
      console.error("Could not load url", indexPath);
    });

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
