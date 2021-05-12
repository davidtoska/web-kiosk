const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");

function createLocalFileWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
    },
    kiosk: true,
    fullscreen: true,
  });

  const indexPath = path.join(__dirname, `/index.html`);
  const argsUrls = [...process.argv].filter((a) => a.includes("url=http"));

  if (argsUrls.length === 1) {
    const spt_index=argsUrls[0].indexOf('=')
    const argsUrl = argsUrls[0].substring(spt_index + 1).trim();
    win
      .loadURL(argsUrl)
      .then(() => {
        console.log("Url loaded: " + argsUrl);
      })
      .catch((err) => {
        console.log("Error while loading url: " + argsUrl);
        console.log(err);
      });
  } else {
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
  }
}

app.whenReady().then(createLocalFileWindow);

app.on("window-all-closed", () => {
  app.quit();
});
