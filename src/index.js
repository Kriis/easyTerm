const { app, BrowserWindow, ipcMain  } = require('electron/main')
const path = require('node:path')
const { exec } = require('child_process');
const env = process.env.NODE_ENV || 'dev'

if (env === 'dev') {
    try {
        require('electron-reloader')(module);
    } catch {}
}

function createWindow () {
  const win = new BrowserWindow({
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