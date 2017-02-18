import _ from 'lodash';
import { app, Menu, Tray, MenuItem } from 'electron';

import {trendingItems, newItems, getNewItems, getTrendingItems} from './helpers/loadData'

let trayIcon = null;

const buildMenu =  (_trayIcon) => {
	trayIcon = _trayIcon
	setTimeout(refreshMenu, 1000 * 5)
	setInterval(refreshMenu, 1000 * 60 * 1)
}

const refreshMenu = () => {
  getTrendingItems()
  getNewItems()
  _buildMenu()
}

const _buildMenu = () => {
  let menu = new Menu();
 	menu.append(new MenuItem({
    label: 'Refresh',
    click: () => refreshMenu()
  }));


 	menu.append(new MenuItem({
    type: 'separator'
  }));
  
  menu.append(new MenuItem({
    label: 'Trending',
    submenu: trendingItems
  }))
  
  menu.append(new MenuItem({
    label: 'New',
    submenu: newItems
  }))

  menu.append(new MenuItem({
  	label: 'Quit',
  	click: () => app.quit()
  }))
  trayIcon.setContextMenu(menu);
}

export default buildMenu;
