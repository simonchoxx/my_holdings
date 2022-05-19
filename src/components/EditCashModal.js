import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { getCashByName, updateCash } from '../helpers/getInternalsApis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const EditCashModal = ({ show, handleClose, cash = '' }) => {
	const [dataCash, setDataCash] = useState({});

	useEffect(() => {
		cash !== '' && getCash(cash);
	}, [cash]);

	const getCash = async (cash) => {
		const cash1 = await getCashByName(cash);
		setDataCash(cash1);
	};

	const saveCash = async (e) => {
		e.preventDefault();
		const { name, usd, eur } = dataCash;
		const data = await updateCash(name, usd, eur);
		if (data.ok === true) {
			notifySuccess('Cash actulizada');
		} else {
			notifyError(data.msg);
		}
		handleClose();
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
					<Modal.Title>Editar cash</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicTicker">
							<Form.Label>Cash</Form.Label>
							<Form.Control
								type="text"
								placeholder="Plataforma"
								onChange={(event) =>
									setDataCash({ ...dataCash, name: event.target.value })
								}
								value={dataCash.name || ''}
							/>
							<Form.Text className="text-muted">Ejemplo: Caja</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>USD</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Cantidad de USD"
								onChange={(event) =>
									setDataCash({ ...dataCash, usd: event.target.value })
								}
								value={dataCash.usd || 0}
							/>
							<Form.Text className="text-muted">Ejemplo: 100</Form.Text>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicPrice">
							<Form.Label>EUR</Form.Label>
							<Form.Control
								type="Text"
								placeholder="Cantidad de EUR"
								onChange={(event) =>
									setDataCash({ ...dataCash, eur: event.target.value })
								}
								value={dataCash.eur || 0}
							/>
							<Form.Text className="text-muted">Ejemplo: 100</Form.Text>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						type="button"
						className="inline-block px-7 py-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out border-none"
						onClick={saveCash}
					>
						Guardar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
