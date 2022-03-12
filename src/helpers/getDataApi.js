import { porc } from './functions';

export const getCoins = async (coin, buy) => {
	var coins = [];
	const urlCMC = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${coin}`;

	const keyCMC = 'e0338c48-da12-4fa6-a65b-d963dffdccd1';
	const response = await fetch(urlCMC, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-CMC_PRO_API_KEY': keyCMC,
		},
	});

	const { data } = await response.json();
	const { symbol, name, id } = data[coin];
	const logotipo = `https://s2.coinmarketcap.com/static/img/coins/128x128/${id}.png`;
	coins.push({ symbol, name, logotipo, buy });
	const result = coins.map((coi) => {
		return {
			symbol: coi.symbol,
			name: coi.name,
			logotipo: coi.logotipo,
			buy: buy,
		};
	});
	return result;
};

export const getHolds = async () => {
	var prices = [];
	const urlBitPay = `https://bitpay.com/api/rates`;
	const response = await fetch(urlBitPay);
	const result = await response.json();

	const priceUSD = result.filter((res) => res.name === 'US Dollar')[0].rate;
	const priceEUR = result.filter((res) => res.name === 'Eurozone Euro')[0].rate;

	prices.push({
		usd: priceUSD,
		eur: priceEUR,
	});
	return prices;
};

export const getCash = async () => {
	const urlConvertion = `https://www.freeforexapi.com/api/live?pairs=USDEUR`;
	const response = await fetch(urlConvertion);
	const result = await response.json();
	return result.rates.USDEUR.rate;
};

export const getPrices = async (coin, buy) => {
	var coins = [];
	let urlBinance, result;

	if (coin !== 'USDT') {
		urlBinance = `https://api.binance.com/api/v3/ticker/price?symbol=${coin}BTC`;

		const resPrice = await fetch(urlBinance);
		const { price } = await resPrice.json();
		var percentage = porc(price, buy);
		let percent = parseFloat(percentage);
		const lastDay = `https://api.binance.com/api/v3/ticker/24hr?symbol=${coin}BTC`;
		const lastDayPrice = await fetch(lastDay);
		const { priceChange, priceChangePercent } = await lastDayPrice.json();
		coins.push({ coin, price, buy, percent, priceChange, priceChangePercent });
		// coins.push({ coin, price, buy, percent });

		result = coins.map((coi) => {
			return {
				coin: coi.coin,
				price: coi.price,
				buy: buy,
				percentage: percent,
				priceChange: priceChange,
				priceChangePercent: priceChangePercent,
			};
		});
	} else {
		urlBinance = `https://api.binance.com/api/v3/ticker/price?symbol=BTC${coin}`;
		const resPrice = await fetch(urlBinance);
		const { price } = await resPrice.json();
		coins.push({ coin, price });
		result = coins.map((coi) => {
			return {
				coin: coi.coin,
				price: coi.price,
			};
		});
	}
	return result;
};