const { app, BrowserWindow } = require('electron');
const path = require('path');

let sumtime;
let mainWindow;
let windowsCount = 0;
const num = 5;
const windowsTime = [];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');

  mainWindow.webContents.on('dom-ready', () => {
    windowsTime.push(Date.now() - time);
    windowsCount++;
    if (windowsCount === num) {
      const summary = windowsTime.reduce((accumulator, currentValue) => accumulator + currentValue);
      console.log('windowsTime', windowsTime)
      console.log('average', summary / windowsTime.length);
      console.log('result', Date.now() - sumtime)
      app.quit();
    }
  });

  mainWindow.loadURL('https://www.electronjs.org/');

  const time = Date.now();
}

app.whenReady().then(() => {
  sumtime = Date.now();
  for (let count = 0; count < num; count++) {
    createWindow();
  }
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
