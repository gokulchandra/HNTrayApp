// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import path from 'path';
import { app, Menu, Tray, ipcRenderer } from 'electron';
import buildMenu from './tray'

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';

let trayIcon = null;

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    var userDataPath = app.getPath('userData');
    app.setPath('userData', userDataPath + ' (' + env.name + ')');
}

app.on('ready', function () {
    trayIcon = new Tray(path.join(__dirname, 'assets/app-icon.png'));
    trayIcon.setToolTip('This is my application.');
    buildMenu(trayIcon);
    app.dock.hide();
});


app.on('window-all-closed', function () {
    app.quit();
});
