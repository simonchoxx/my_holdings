import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { porc } from '../helpers/functions';

export const CoinCard = (coins) => {
	const { symbol, name, logotipo, description, price, buy } = coins;
	var percentege = porc(price, buy);
	// const [priceCoin, setPriceCoin] = useState('');
	// setPriceCoin(price);

	return (
		<>
			<Col className="my-3">
				<Card className="text-center">
					<div className="row">
						<div className="col-6">
							<Card.Img src={logotipo} />
						</div>
						<div className="col-6 d-flex align-items-center">
							<Card.Title className="fs-6">
								{name} ({symbol})
							</Card.Title>
						</div>
					</div>
					<hr />
					<Card.Body className="pt-0">
						<Card.Text className="text-start">
							Compra: <strong>{buy.toFixed(8)}</strong>
						</Card.Text>
						<Card.Text className="text-start">
							Actual: <strong>{price}</strong>
						</Card.Text>
						<Card.Text className="text-start">
							%:{' '}
							<strong
								className={percentege > 0 ? 'text-success' : 'text-danger'}
							>
								{percentege}
							</strong>
						</Card.Text>
						{/* <Card.Text>{description}</Card.Text> */}
						{/* <Button variant="primary">Go somewhere</Button> */}
					</Card.Body>
				</Card>
			</Col>
		</>
	);
};
