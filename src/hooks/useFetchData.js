import { useEffect, useState } from 'react';
import { getCoins, getCash, getHolds, getPrices } from '../helpers/getDataApi';

export const useFetchHolds = () => {
	const [state, setState] = useState({ data: [] });

	useEffect(() => {
		getHolds().then((res) => {
			setState({
				data: res,
			});
		});
	}, [state]);
	return state;
};

export const useFetchCash = () => {
	const [state, setState] = useState({ data: [] });

	useEffect(() => {
		getCash().then((res) => {
			setState({
				data: res,
			});
		});
	}, [state]);
	return state;
};

export const useFetchCoins = (coin, buy) => {
	const [state, setState] = useState({ data: [], loading: true });

	useEffect(() => {
		getCoins(coin, buy).then((coi) => {
			setState({
				data: coi,
				loading: false,
			});
		});
	}, []);
	return state;
};

export const useFetchPrices = (coin, buy) => {
	const [state, setState] = useState({ data: [], loading: true });

	useEffect(() => {
		setInterval(() => {
			getPrices(coin, buy).then((coi) => {
				setState({
					data: coi,
					loading: false,
				});
			});
		}, 5000);
	}, []);
	return state;
};
