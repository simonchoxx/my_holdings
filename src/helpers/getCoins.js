// 	APIKEY: 'Yo8J7tI5ta6m3WAjoh3ULgKl3iY3ZJlZJLrfwE1ENZ7q6xPnMPLjHjsYl7edrlFA',
// 	APISECRET: 'IsdZIem7X8OjbLYoumPkOTwtO89vIUMSuh7NACwjg3sziIeXlX4GWrK60OorVVzw',

import { porc } from './functions';

// const porc = (price, buy) => {
// 	return ((price - buy) / buy) * 100;
// };

export const getCoins = async (coin, buy) => {
	var coins = [];
	const urlCMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${coin}`;
	const urlBinance = `https://api.binance.com/api/v3/ticker/price?symbol=${coin}BTC`;
	const urlTrades = `https://api.binance.com/api/v3/historicalTrades?symbol=NANOBTC&limit=1`;

	const keyCMC = 'e0338c48-da12-4fa6-a65b-d963dffdccd1';
	const response = await fetch(urlCMC, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Request-Method': 'GET',
			'X-CMC_PRO_API_KEY': keyCMC,
		},
	});

	// const tradesHist = await fetch(urlTrades, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		'Access-Control-Request-Method': 'GET',
	// 		'X-MBX-APIKEY':
	// 			'Yo8J7tI5ta6m3WAjoh3ULgKl3iY3ZJlZJLrfwE1ENZ7q6xPnMPLjHjsYl7edrlFA',
	// 		'X-MBX-SECRETKEY':
	// 			'IsdZIem7X8OjbLYoumPkOTwtO89vIUMSuh7NACwjg3sziIeXlX4GWrK60OorVVzw',
	// 	},
	// });

	// const resTrades = await tradesHist.json();
	// console.log(resTrades);

	const { data } = await response.json();
	const { symbol, name, id, description } = data[coin];

	const resPrice = await fetch(urlBinance);
	const { price } = await resPrice.json();

	const logotipo = `https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`;

	// const porc = porc(price, buy);
	// console.log(porc);
	coins.push({ symbol, name, logotipo, description, price, buy });

	const result = coins.map((coi) => {
		return {
			symbol: coi.symbol,
			name: coi.name,
			logotipo: coi.logotipo,
			description: coi.description,
			price: coi.price,
			buy: buy,
		};
	});

	return result;
};
