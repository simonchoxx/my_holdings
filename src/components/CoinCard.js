import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useFetchPrices } from '../hooks/useFetchData';

export const CoinCard = (coins) => {
	const { symbol, name, logotipo, buy } = coins;
	const { data: prices, loading } = useFetchPrices(symbol, buy);
	let price,
		percentage,
		priceChange,
		priceChangePercent = 0;
	prices.forEach((v) => {
		price = v.price;
		percentage = v.percentage;
		// priceChange = v.priceChange;
		// priceChangePercent = v.priceChangePercent;
	});

	// if (!allCoins.find((o) => o.symbol === coins.symbol && o.buy === buy))
	// 	allCoins.push({ ...coins, percentage });

	// allCoins.sort((a, b) => (a.per < b.percentage ? 1 : -1));
	// console.log(allCoins);

	return (
		<>
			<Col className="my-3">
				<Card className="text-center">
					<div className="row">
						<div className="col-5">
							<Card.Img src={logotipo} />
						</div>
						<div className="col-7 d-flex align-items-center justify-content-center">
							<Card.Title className="fs-6">
								{name} ({symbol})
							</Card.Title>
						</div>
					</div>
					<hr className="my-0" />
					<Card.Body className="py-1 row">
						<div className="col-7">
							<Card.Text className="text-start">
								Compra: <strong>{buy.toFixed(8)}</strong>
							</Card.Text>
							<Card.Text className="text-start">
								Actual: <strong>{loading ? '-' : price}</strong>
							</Card.Text>
						</div>
						<div className="col-5 d-flex align-items-center justify-content-end">
							<Card.Text className="text-start fs-3">
								<strong
									className={percentage > 0 ? 'text-success' : 'text-danger'}
								>
									{loading ? '-' : percentage}
								</strong>
							</Card.Text>
						</div>
					</Card.Body>
					<Card.Footer className="text-muted d-inline-flex justify-content-evenly">
						<button type="btn" className="btn btn-outline-success">
							Cerrar
						</button>
						<button type="btn" className="btn btn-outline-primary">
							Recomprar
						</button>
					</Card.Footer>
				</Card>
			</Col>
		</>
	);
};
