import { app, BrowserWindow, dialog } from 'electron';
import ElectronReload from 'electron-reload';
import windowSaveState from 'electron-window-state';

// auto reload application
ElectronReload(__dirname);

// window application function
const windowApp = () => {
    let splashScreen = new BrowserWindow({
        width: 350,
        height: 350,
        maxHeight: 350,
        maxWidth: 350,
        minHeight: 350,
        minWidth: 350,
        frame: false,
        resizable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        focusable: false,
        fullscreenable: false,
    });

    splashScreen.center();

    const mainWindowState = windowSaveState({
        defaultHeight: 700,
        defaultWidth: 1200,
    });

    let mainWindow = new BrowserWindow({
        width: mainWindowState.width,
        height: mainWindowState.height,
        x: mainWindowState.x,
        y: mainWindowState.y,
        show: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    console.log(mainWindow.webContents);

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    splashScreen.loadURL(`file://${__dirname}/splash-screen.html`);

    mainWindow.once('ready-to-show', () => {
        setTimeout(() => {
            splashScreen.close();
            splashScreen = null;

            setTimeout(() => {
                mainWindow.show();
                mainWindowState.manage(mainWindow);
            }, 500);
        }, 1000);
    });

    mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.webContents.closeDevTools();
    })
}

// app runner
app.on('ready', windowApp);
