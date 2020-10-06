const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');

let sumtime;
let mainWindow;

function createView() {
  const view = new BrowserView();
  mainWindow.setBrowserView(view);

  view.webContents.on('dom-ready', () => {
    console.log('result', Date.now() - sumtime);
    app.quit();
  });

  view.webContents.loadURL('https://www.electronjs.org/');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    // show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  sumtime = Date.now();
  createView();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
