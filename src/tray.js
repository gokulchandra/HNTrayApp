import _ from 'lodash';
import axios from 'axios';
import { app, Menu, Tray } from 'electron';

axios.defaults.adapter = require('axios/lib/adapters/http');

let client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  timeout: 10000,
  headers: {'X-Custom-Header': 'foobar'}
});

let getTrendingItems  = () => {
	client.get('/topstories.json?print=pretty')
		.then(res => {
			trendingItems = res.data.slice(0,9).map((item, index) => {
				return {
					label: item,
					enabled: false
				}
			})
		})
}

let getNewItems = () => {
	return client.get('/newstories.json?print=pretty')
			.then(res => {
				return res.data.slice(0,9).map((item, index) => {
					return {
						label: item,
						enabled: false
					}
				})
			})
}


let trayMenuTemplate = [
	{
		label: 'Reload',
		role: 'reload'
	},
	{
		label: 'Trending',
		enabled: true,
		submenu: []
	},
	{
		label: 'New',
		enabled: true,
		submenu: getNewItems()
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
