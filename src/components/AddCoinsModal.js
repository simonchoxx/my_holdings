import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { currencies } from '../helpers/data';

export const AddCoinsModal = ({ show, handleClose }) => {
	const [coin, setCoin] = useState('');
	const [price, setPrice] = useState('');

	const handleClean = () => {
		setCoin('');
		setPrice('');
	};

	const saveCoin = (e) => {
		e.preventDefault();
		currencies.push({ ticker: coin, buy: price });
		setCoin('');
		setPrice('');
	};

	return (
		<>
			<Modal show={show} onHide={handleClose} keyboard={false}>
				<Modal.Header>
					<Modal.Title>Agregar moneda</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicTicker">
							<Form.Label>Ticker</Form.Label>
							<Form.Control
								type="text"
								placeholder="Ingrese ticker"
								onChange={(event) => setCoin(event.target.value)}
								value={coin}
							/>
							<Form.Text className="text-muted">Ejemplo: BTC</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Precio compra</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Ingrese precio de compra"
								onChange={(event) => setPrice(event.target.value)}
								value={price}
							/>
							<Form.Text className="text-muted">Ejemplo: 0.00000001</Form.Text>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						type="button"
						className="inline-block px-7 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out border-none"
						onClick={handleClean}
					>
						<i
							className="fas fa-trash"
							title="Clear"
							data-bs-toggle="tooltip"
						></i>
					</Button>
					<Button
						type="button"
						className="inline-block px-7 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out border-none"
						onClick={saveCoin}
					>
						Agregar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
