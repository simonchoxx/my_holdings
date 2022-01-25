import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Header } from './Header';
import { CoinGrid } from './CoinGrid';
import { currencies } from '../helpers/currencies';

export const App = ({ defaultCoins = currencies }) => {
	const [coins, setCoins] = useState(defaultCoins);
	return (
		<Container fluid>
			<Row>
				<Header></Header>
			</Row>
			{coins.length > 0 ? (
				<Row className="d-flex row-cols-4">
					{coins.map((coi) => (
						<CoinGrid key={coi.ticker} coin={coi.ticker} buy={coi.buy} />
					))}
				</Row>
			) : (
				<p className="text-center">Loading</p>
			)}
		</Container>
	);
};

export default App;
