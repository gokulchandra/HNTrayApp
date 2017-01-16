import _ from 'lodash';
import { app, Menu, Tray, MenuItem } from 'electron';

import {getTrendingItems, trendingItems} from './helpers/loadData'

let trayIcon = null;
let itemsTrending = [];

const buildMenu =  (_trayIcon) => {
	getTrendingItems()
	trayIcon = _trayIcon
	setTimeout(_buildMenu, 1000 * 5)
	setInterval(_buildMenu, 1000 * 60 * 15)	
}

const _buildMenu = () => {
  let menu = new Menu();
 	menu.append(new MenuItem({
    label: 'Refresh',
    click: () => {_buildMenu()}
  }));

 	menu.append(new MenuItem({
    type: 'separator'
  }));
  menu.append(new MenuItem({
    label: 'Trending',
    submenu: trendingItems
  }))
  trayIcon.setContextMenu(menu);
}

const buildTrendingMenu = () => {
  return new MenuItem({
    label: 'Trending',
    submenu: itemsTrending
  })
}


export default buildMenu;
