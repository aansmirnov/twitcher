const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
const appURL = process.env.VITE_DEV_SERVER_URL;

const createWindow = () => {
   mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         preload: path.join(__dirname, 'preload.js'),
      },
   });

   if (appURL) {
      mainWindow.loadURL(appURL)
   } else {
      mainWindow.loadFile(path.join(__dirname, '../index.html'),)
   }

   // @ToDo: Add only for development mode.
   mainWindow.webContents.openDevTools();
};

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
   mainWindow = null;
   
   if (process.platform !== 'darwin') {
      app.quit();
   }
});

app.on('activate', () => {
   if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
   }
});
