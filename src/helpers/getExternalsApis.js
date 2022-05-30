import { porc } from './functions';

export const getCoinsData = async (elem) => {
	const { ticker, precioCompra } = elem;
	const keyNomics = '302ad25ee98878e436ea9823c805496480611af1';
	const urlCMC = `https://cors-anywhere.herokuapp.com/https://api.nomics.com/v1/currencies/ticker?key=${keyNomics}&ids=${ticker}`;
	const response = await fetch(urlCMC, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Origin: 'http://localhost:3000/',
		},
	});

	const data = await response.json();
	const { name, logo_url } = data[0];
	const {
		percent,
		price,
		priceChange,
		priceChangePercent,
	} = await getCoinPrice(ticker, precioCompra);

	const result = {
		ticker,
		name,
		precioCompra,
		logo_url,
		percent,
		price,
		priceChange,
		priceChangePercent,
	};
	return result;
};

export const getCoinPrice = async (coin) => {
	const { ticker, name, logo, precioCompra } = coin;
	const urlBinance = `https://api.binance.com/api/v3/ticker/price?symbol=${ticker}BTC`;
	const resPrice = await fetch(urlBinance);
	const { price } = await resPrice.json();
	var percentage = porc(price, precioCompra);
	let percent = parseFloat(percentage);
	const lastDay = `https://api.binance.com/api/v3/ticker/24hr?symbol=${ticker}BTC`;
	const lastDayPrice = await fetch(lastDay);
	const { priceChange, priceChangePercent } = await lastDayPrice.json();

	return {
		ticker,
		name,
		precioCompra,
		logo,
		price,
		percent,
		priceChange,
		priceChangePercent,
	};
};

export const getUsdEurBtcRate = async () => {
	const urlBitPay = `https://bitpay.com/api/rates`;
	const response = await fetch(urlBitPay);
	const result = await response.json();

	const priceUSD = result.filter((res) => res.name === 'US Dollar')[0].rate;
	const priceEUR = result.filter((res) => res.name === 'Eurozone Euro')[0].rate;

	return { priceUSD, priceEUR };
};

export const getUsdEurRate = async () => {
	// const urlConvertion = `https://www.freeforexapi.com/api/live?pairs=USDEUR`;
	const urlConvertion = `https://api.currencyfreaks.com/latest?apikey=7c77d33d3c7847e8abef9450e97c17c1`;
	const response = await fetch(urlConvertion);
	const result = await response.json();
	return result.rates.EUR;
};

export const getUSDTPrice = async () => {
	const urlBinance = `https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`;
	const resPrice = await fetch(urlBinance);
	const { price } = await resPrice.json();
	return price;
};
