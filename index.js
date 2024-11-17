const { app, BrowserWindow } = require('electron');

class App {

    #_app = app;
    #_BASEURL = 'https://app.playeternalreturn.com:5000/main/indexlog';

    constructor() {
        this.#_app.disableHardwareAcceleration();
        this.#start();
    }

    #createWindow() {
        return new BrowserWindow({
            title: "ER LAB",
            width: 430,
            height: 932,
            resizable: false,
            center: true,
            autoHideMenuBar: true,
            icon: './assets/icon.ico',
            titleBarStyle: 'hiddenInset',
            backgroundColor: '#17171b',
        })
    }

    #finishLoad(window) {
        window.loadURL(this.#_BASEURL);
        window.webContents.on('did-finish-load', async () => await this.#removeElements(window));
    }

    async #removeElements(window) {
        await window.webContents.executeJavaScript(`
            document.title = 'ER LAB';
            for(const e of ['pop_wrap', 'dimmed']) {
                document.querySelectorAll('.'.concat(e))
                    .forEach(r => r.remove())
            }
            `)
    }

    #start() {
        this.#_app.whenReady().then(() => this.#finishLoad(this.#createWindow()))
        this.#_app.on('window-all-closed', () => this.#_app.quit())
    }
}

new App()