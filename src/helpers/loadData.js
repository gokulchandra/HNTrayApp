import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');

let client = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
  timeout: 10000
});

export const getTrendingItems  = () => {
	return client.get('/topstories.json?print=pretty')
}

export const getItemDetails = (id) => {
	return client.get(`/item/${id}.json?print=pretty`)
}

export const getNewItems  = () => {
	return client.get('/newstories.json?print=pretty')
}

