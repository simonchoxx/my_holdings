import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getPlatformByName, updatePlatform } from '../helpers/getInternalsApis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const EditPlatfModal = ({ show, handleClose, platf = '' }) => {
	const [platform, setPlatform] = useState();
	const [price, setPrice] = useState();

	useEffect(() => {
		platf !== '' && getPlatform(platf);
	}, [platf]);

	// const handleClean = () => {
	// 	setPlatform('');
	// 	setPrice('');
	// };

	const getPlatform = async (platform) => {
		const platform1 = await getPlatformByName(platform);
		setPlatform(platform1.name);
		setPrice(platform1.satoshis);
	};

	const savePlatform = async (e) => {
		e.preventDefault();
		const regExpr = /^([0-9]).([0-9]){8}$/;
		if (regExpr.test(price)) {
			const data = await updatePlatform(platform, price);
			if (data.ok === true) {
				notifySuccess('Plataforma actulizada');
			} else {
				notifyError(data.msg);
			}
			// handleClean();
			handleClose();
		} else {
			notifyError('Formato incorrecto');
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
			<Modal show={show} onHide={handleClose} keyboard={false} centered>
				<Modal.Header closeButton>
					<Modal.Title>Editar plataforma</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicTicker">
							<Form.Label>Plataforma</Form.Label>
							<Form.Control
								type="text"
								placeholder="Plataforma"
								onChange={(event) => setPlatform(event.target.value)}
								value={platform || ''}
							/>
							<Form.Text className="text-muted">Ejemplo: Binance</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>Satoshis</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Cantidad de satoshis"
								onChange={(event) => setPrice(event.target.value)}
								value={price || 0}
							/>
							<Form.Text className="text-muted">Ejemplo: 0.00000001</Form.Text>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					{/* <Button
						type="button"
						className="inline-block px-7 py-2 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out border-none"
						onClick={handleClean}
					>
						<i
							className="fas fa-trash"
							title="Clear"
							data-bs-toggle="tooltip"
						></i>
					</Button> */}
					<Button
						type="button"
						className="inline-block px-7 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out border-none"
						onClick={savePlatform}
					>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
