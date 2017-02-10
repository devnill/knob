const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');s

let mainWindow;

//todo replace onExit with more config
function createWindow (onExit = ()=>{}) {
  const window = new BrowserWindow({width: 600, height: 600});
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  //window.webContents.openDevTools();
  window.on('closed', onExit);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
 //do something with tray?
});


//when tray icon is clicked
app.on('activate', function () {
  if (mainWindow === null) {
    mainWindow = createWindow(()=>{
      mainWindow = null;
    });
  }
});
