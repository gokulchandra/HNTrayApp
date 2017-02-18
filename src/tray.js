import _ from 'lodash';
import when from 'when';
import { app, Menu, Tray, MenuItem } from 'electron';

import {getItemDetails, getNewItems, getTrendingItems} from './helpers/loadData'

let trayIcon = null;


const buildMenu =  (_trayIcon) => {
	trayIcon = _trayIcon
	setTimeout(_buildMenu, 1000 * 5)
	setInterval(_buildMenu, 1000 * 60 * 1)
}

const createItems = (res, menu, position, name) => {
  let promises =
    res.data.slice(0,9).map((item) => {
      return getItemDetails(item)
    })
  let promise = when.all(promises);
  promise.then(resolved => {
    let items = resolved.map((obj) => {
      return {
        label: obj.data.title + ' [' + obj.data.score+'] ',
        click: () => { shell.openExternal(obj.data.url) }
      }
    });
    menu.append(new MenuItem({label:name, submenu:items}))
    trayIcon.setContextMenu(menu);
  });
}

const refreshMenu = (menu) => {
  getTrendingItems()
    .then(res =>{ createItems(res, menu, 2, 'Trending') })
  getNewItems()
    .then(res => createItems(res, menu, 3, 'New'))
  // _buildMenu()
}

const _buildMenu = () => {
  let menu = new Menu();
  refreshMenu(menu);
  menu.append(new MenuItem({
    label: 'Quit',
    click: () => app.quit()
  }))

 	menu.append(new MenuItem({
    type: 'separator'
  }));

  menu.append(new MenuItem({
    label: 'Refresh',
    click: () => _buildMenu()
  }));

  trayIcon.setContextMenu(menu);
}

export default buildMenu;
