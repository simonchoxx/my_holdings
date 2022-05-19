import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { addCoin } from '../helpers/getInternalsApis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const AddCoinsModal = ({ show, handleClose }) => {
	const [coin, setCoin] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [logo, setLogo] = useState('');

	const handleClean = () => {
		setCoin('');
		setName('');
		setPrice('');
		setLogo('');
	};

	const saveCoin = async (e) => {
		e.preventDefault();
		const saveCoin = await addCoin(coin, name, price, logo);
		if (saveCoin.ok) {
			setCoin('');
			setName('');
			setPrice('');
			setLogo('');
			notifySuccess('Coin agregada exitosamente');
		} else {
			notifyError('Error al agregar la coin');
		}
	};

	const notifySuccess = (msg) => {
		toast.success(msg, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const notifyError = (msg) => {
		toast.error(msg, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
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
							<Form.Label>Nombre</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Ingrese nombre"
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
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
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Logo</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Ingrese logo"
								onChange={(event) => setLogo(event.target.value)}
								value={logo}
							/>
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
