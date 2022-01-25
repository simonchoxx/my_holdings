import { useEffect, useState } from 'react';
import { getCoins } from '../helpers/getCoins';

export const useFetchCoins = (coin, buy) => {
	const [state, setState] = useState({ data: [], loading: true });

	useEffect(() => {
		getCoins(coin, buy).then((coi) => {
			setState({
				data: coi,
				loading: false,
			});
		});
	}, [coin, buy]);
	return state;
};
