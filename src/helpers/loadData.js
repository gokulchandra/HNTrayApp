import axios from 'axios';
import when from 'when';
import {shell} from 'electron';

axios.defaults.adapter = require('axios/lib/adapters/http');

let client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  timeout: 10000
});

export const getTrendingItems  = () => {
	return client.get('/topstories.json?print=pretty')
		// .then(res => {
		// 	let promises =
		// 		res.data.slice(0,9).map((item, index) => {
		// 			return getItemDetails(item)
		// 		})
    //
		// 	let promise = when.all(promises);
		// 	promise.then(resolved => {
		// 		trendingItems = resolved.map((obj) => {
		// 			return {
		// 				label: obj.data.title + ' [' + obj.data.score+'] ',
		// 				click: () => { shell.openExternal(obj.data.url) }
		// 			}
		// 		});
		// 	});
		// });
}

export const getItemDetails = (id) => {
	return client.get(`/item/${id}.json?print=pretty`)
}

export const getNewItems  = () => {
	return client.get('/newstories.json?print=pretty')
	// .then(res => {
	// 	let promises =
	// 		res.data.slice(0,9).map((item, index) => {
	// 			return getItemDetails(item)
	// 		});
  //
	// 	let promise = when.all(promises);
	// 	promise.then(resolved => {
	// 		newItems = resolved.map((obj) => {
	// 			return {
	// 				label: obj.data.title + ' [' + obj.data.score+'] ',
	// 				click: () => { shell.openExternal(obj.data.url) }
	// 			};
	// 		});
	// 	});
	// });
}

