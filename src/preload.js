const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('serial', {
    // list: (args) => ipcRenderer.invoke('list', args),
    list: async (args) => {
        console.log(args)
        return await ipcRenderer.invoke('list', args)
    },
    onList: (callback) => ipcRenderer.on('show_list', (_event, ...args) => callback(...args))
})