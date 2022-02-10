import React from 'react';
// import { useFetchCoins } from '../hooks/useFetchCoins';
import { useFetchCoins } from '../hooks/useFetchData';
import { CoinCard } from './CoinCard';

export const CoinGrid = ({ coin, buy }) => {
	const { data: coins, loading } = useFetchCoins(coin, buy);

	return (
		<>
			{/* {loading && <p className="text-center">Loading</p>} */}
			{coins.map((coi, i) => (
				<CoinCard key={i} {...coi} />
			))}
		</>
	);
};
