const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('serial', {
    // list: (args) => ipcRenderer.invoke('list', args),
    listPort: async (arg) => {
        return await ipcRenderer.invoke('listPort', arg)
    },
    onList: (callback) => ipcRenderer.on('show_list', (_event, ...args) => callback(...args))
})