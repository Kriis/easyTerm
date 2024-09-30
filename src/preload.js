const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('serial', {
    // list: (args) => ipcRenderer.invoke('list', args),
    list: async (arg) => {
        console.log(arg)
        return await ipcRenderer.invoke('list', arg)
    },
    onList: (callback) => ipcRenderer.on('show_list', (_event, ...args) => callback(...args))
})