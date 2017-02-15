const electron       = require('electron');
const path           = require('path');
const url            = require('url');
const app            = electron.app; 
const BrowserWindow  = electron.BrowserWindow;

const windows        = [];
const windowDefaults = {
  onLoad   : ()=>{},
  onExit   : ()=>{},
  width    : 600,
  height   : 600,
  url      : path.join(__dirname, 'index.html'), //todo sanitize?
  protocol : 'file:',
  slashes  : true,
  _devTools: false
};

//todo replace onExit with more config
function createWindow (params = {}) {
  params = Object.assign({}, windowDefaults, params); 

  const window = new BrowserWindow({
    width: params.width,
    height:params.height
  });
  
  window.loadURL(url.format({
    pathname : params.url,
    protocol : params.protocol,
    slashes  : params.slashes
  }));
  
  if(params._devTools === true){
    window.webContents.openDevTools();
  }
  
  window.on('closed', params.onExit);
  params.onLoad(null, window);
  return window;
}

app.on('ready', init);

function init(){

  app.on('window-all-closed', function () {
    debugger;
    //do something with tray?
  });

  //when tray icon is clicked
  app.on('activate', function () {
    debugger;
    if (windows.length === null) {
      //createWindow(()=>{
      //  mainWindow = null;
      //});
    }
  });

  windows.push(createWindow({
    _devTools: true
  }));  
}
