const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron/main')
const path = require('node:path')
const { exec } = require('child_process');
const env = process.env.NODE_ENV || 'dev'
let win
if (env === 'dev') {
    try {
        require('electron-reloader')(module);
    } catch {}
}

function createWindow () {
  win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true,
    backgroundColor: '#1d2026',
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // // Register a 'CommandOrControl+Y' shortcut listener.
  // globalShortcut.register('CommandOrControl+W', () => {
  //   // Do stuff when W and either Command/Control is pressed.
  //   console.log("Ctrl+W pressed")
  // })
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})