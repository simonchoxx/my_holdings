import { useEffect, useState } from 'react';
import {
	getCoins,
	getCash,
	getHolds,
	getPrices,
	getPlatforms,
	getCashs,
} from '../helpers/getDataApi';

export const useFetchHolds = () => {
	const [state, setState] = useState({ data: [] });

	useEffect(() => {
		getHolds().then((res) => {
			setState({
				data: res,
			});
		});
	}, []);
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
	}, []);
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
		setInterval(
			() => {
				getPrices(coin, buy).then((coi) => {
					setState({
						data: coi,
						loading: false,
					});
				});
			},
			coin === 'USDT' ? 5000 : 15 * 1000
		);
	}, []);
	return state;
};

export const useFetchPlatforms = () => {
	const [state, setState] = useState({ data: [] });

	useEffect(() => {
		getPlatforms().then((plat) => {
			setState({
				data: plat,
				loading: false,
			});
		});
	}, [state]);
	return state;
};

export const useFetchCashs = () => {
	const [state, setState] = useState({ data: [] });

	useEffect(() => {
		getCashs().then((cash) => {
			setState({
				data: cash,
				loading: false,
			});
		});
	}, []);
	return state;
};
// export const useFetchPlatformSatoshis = (platf) => {
// 	const [state, setState] = useState({ data: [] });

// 	useEffect(() => {
// 		getPlatformSats(platf).then((plat) => {
// 			setState({
// 				data: plat,
// 				loading: false,
// 			});
// 		});
// 	}, [platf]);
// 	return state;
// };
