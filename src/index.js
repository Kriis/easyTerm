const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron/main')
const path = require('node:path')
const { SerialPort } = require('serialport')
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

ipcMain.handle('list', async (_event, args) => {
  console.log("Receive args", args)
  return {portName: "COM4"}
  // const ports = await SerialPort.list()
  // const listRspData = {term: args, ports}
  // console.log(listRspData)
  // win.webContents.send('show_list', listRspData)
})

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