const { app, BrowserWindow } = require("electron");

app
  .whenReady()
  .then(() => {
    const win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false, // is default value after Electron v5
        contextIsolation: true, // protect against prototype pollution
        enableRemoteModule: false, // turn off remote
      },

      kiosk: true,
      fullscreen: true,
    });

    const argsUrls = [...process.argv].filter((a) => a.includes("url=http"));

    if (argsUrls.length === 1) {
      const spt_index = argsUrls[0].indexOf("=");
      const argsUrl = argsUrls[0].substring(spt_index + 1).trim();
      win
        .loadURL(argsUrl)
        .then(() => {
          console.log("Url loaded: " + argsUrl);
        })
        .catch((err) => {
          console.error("Error while loading url: " + argsUrl);
          console.error(err);
        });
    } else {
      win
        .loadFile("index.html")
        .then(() => {
          console.log("Did load empty information page");
          console.log("No url given to web-kiosk");
          console.log(
            "Use this format when running program: web-kiosk url=https://google.com"
          );
        })
        .catch((err) => {
          console.error("Fatal error. Could not load empty information page.");
          console.error(err);
        });
    }
  })
  .catch((err) => {
    console.error("Unknown error wile running web-kiosk.");
    console.error(err);
  });

app.on("window-all-closed", () => {
  app.quit();
});
