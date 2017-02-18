import axios from 'axios';
import when from 'when';
import {shell} from 'electron';

axios.defaults.adapter = require('axios/lib/adapters/http');

let client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  timeout: 10000
});

export var trendingItems = [];
export var newItems = [];

export const getTrendingItems  = (callback) => {
	client.get('/topstories.json?print=pretty')
		.then(res => {
			let promises = 
				res.data.slice(0,9).map((item, index) => {
					return getItemDetails(item)
				})

			let promise = when.all(promises);
			promise.then(resolved => {
				trendingItems = resolved.map((obj) => {
					return {
						label: obj.data.title + ' [' + obj.data.score+'] ',
						click: () => { shell.openExternal(obj.data.url) }
					}
				});
			});
		});
}

const getItemDetails = (id) => {
	return client.get(`/item/${id}.json?print=pretty`)
}

export const getNewItems  = () => {
	client.get('/newstories.json?print=pretty')
	.then(res => {
		let promises =
			res.data.slice(0,9).map((item, index) => {
				return getItemDetails(item)
			});

		let promise = when.all(promises);
		promise.then(resolved => {
			newItems = resolved.map((obj) => {
				return {
					label: obj.data.title + ' [' + obj.data.score+'] ',
					click: () => { shell.openExternal(obj.data.url) }
				};
			});
		});
	});
}

