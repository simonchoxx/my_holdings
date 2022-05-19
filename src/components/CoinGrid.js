import React, { useEffect, useState } from 'react';
import { getCoinsData } from '../helpers/getExternalsApis';
import { getCoins } from '../helpers/getInternalsApis';
import { CoinCard } from './CoinCard';
import { Spinner } from './Spinner';

export const CoinGrid = () => {
	const [coins, setCoins] = useState([]);

	const fetchCoins = async () => {
		const response = await getCoins();
		setCoins(response);
	};

	useEffect(() => {
		fetchCoins();
	}, []);

	return (
		<>
			<div>
				{!coins.length ? (
					<div className="d-flex justify-content-center">
						<Spinner />
					</div>
				) : (
					<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
						{coins.map((el, i) => (
							<CoinCard key={i} {...el} />
						))}
					</div>
				)}
			</div>
		</>
	);
};
