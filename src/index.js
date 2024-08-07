const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const env = process.env.NODE_ENV || 'dev'

if (env === 'dev') {
    try {
        require('electron-reloader')(module);
    } catch {}
}

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    backgroundColor: '#1d2026',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
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