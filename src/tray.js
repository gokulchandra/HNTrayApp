// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.
import _ from 'lodash';
import path from 'path';
import url from 'url';
import { app, Menu, Tray, ipcRenderer } from 'electron';

import { editMenuTemplate } from './menu/edit_menu_template';
import createWindow from './helpers/window';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from './env';


// trayIcon = new Tray(path.join(__dirname, 'img/app-icon.png'));

let trayMenuTemplate = [
	{
		label: 'Trending',
		enabled: true
	},
	{
		label: 'New',
		enabled: true
	},
	{
		label: 'Quit',
		click: () =>{
			  app.quit();
		}
	}
];

const trayMenu = Menu.buildFromTemplate(trayMenuTemplate);

export default trayMenu;
