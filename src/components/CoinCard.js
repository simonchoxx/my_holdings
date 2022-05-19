import React, { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import { getCoinPrice } from '../helpers/getExternalsApis';
import { Spinner } from './Spinner';

export const CoinCard = (coin) => {
	const { ticker } = coin;
	const [dataCoin, setDataCoin] = useState([]);
	const [loading, setLoading] = useState(true);

	const getDataComplete = async (coin) => {
		const response = await getCoinPrice(coin);
		setDataCoin([response]);
		setLoading(false);
	};

	useEffect(() => {
		setInterval(() => {
			getDataComplete(coin);
		}, 15000);
	}, [ticker]);

	return (
		<>
			{!dataCoin.length && (
				<div className="d-flex justify-content-center">
					<Spinner />
				</div>
			)}
			{dataCoin?.map((elem) => {
				return (
					<Col className="my-3" key={elem.ticker}>
						<Card className="text-center">
							<div className="row">
								<div className="col-5">
									<Card.Img
										src={elem.logo}
										style={{ width: '100px', height: '100px' }}
									/>
								</div>
								<div className="col-7 d-flex align-items-center justify-content-center">
									<Card.Title className="fs-6">
										{elem.name} ({elem.ticker})
									</Card.Title>
								</div>
							</div>
							<hr className="my-0" />
							<Card.Body className="py-1 row">
								<div className="col-7">
									<Card.Text className="text-start">
										Buy: <strong>{elem.precioCompra.toFixed(8)}</strong>
									</Card.Text>
									<Card.Text className="text-start">
										Now: <strong>{loading ? '-' : elem.price}</strong>
									</Card.Text>
								</div>
								<div className="col-5 flex items-center">
									<div>
										<div className="text-center text-2xl">
											<strong
												className={
													elem.percent > 0 ? 'text-success' : 'text-danger'
												}
											>
												{loading ? '-' : elem.percent}
											</strong>
										</div>
										<div className="text-center text-xs">
											<strong
												className={
													elem.priceChangePercent > 0
														? 'text-success'
														: 'text-danger'
												}
											>
												{loading
													? '-'
													: Number(elem.priceChangePercent).toFixed(2)}
											</strong>
										</div>
									</div>
								</div>
							</Card.Body>
							<Card.Footer className="text-muted d-inline-flex justify-content-evenly">
								<button type="btn" className="btn btn-outline-success">
									Cerrar
								</button>
								<button type="btn" className="btn btn-outline-primary">
									Editar
								</button>
							</Card.Footer>
						</Card>
					</Col>
				);
			})}
		</>
	);
};
