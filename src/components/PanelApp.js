import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { currencies } from '../helpers/data';
import { AddCoinsModal } from './AddCoinsModal';
import { CoinGrid } from './CoinGrid';
import { MainGrid } from './MainGrid';

export const PanelApp = () => {
	const [coins, setCoins] = useState(currencies);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<ul
				className="nav nav-pills flex flex-col md:flex-row flex-wrap list-none pl-0 mb-4 justify-center"
				id="pills-tab"
				role="tablist"
			>
				<li className="nav-item" role="presentation">
					<a
						href="#pills-home"
						className="nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 my-2 md:mr-2 focus:outline-none focus:ring-0 active"
						id="pills-home-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-home"
						role="tab"
						aria-controls="pills-home"
						aria-selected="true"
					>
						Main
					</a>
				</li>
				<li className="nav-item" role="presentation">
					<a
						href="#pills-alts"
						className="nav-link block font-medium text-xs leading-tight uppercase rounded px-6 py-3 my-2 md:mx-2 focus:outline-none focus:ring-0"
						id="pills-profile-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-alts"
						role="tab"
						aria-controls="pills-profile"
						aria-selected="false"
					>
						AltCoins
					</a>
				</li>
			</ul>
			<div className="tab-content" id="pills-tabContent">
				<div
					className="tab-pane fade show active"
					id="pills-home"
					role="tabpanel"
					aria-labelledby="pills-home-tab"
				>
					<MainGrid />
				</div>
				<div
					className="tab-pane fade"
					id="pills-alts"
					role="tabpanel"
					aria-labelledby="pills-profile-tab"
				>
					<div className="flex justify-end">
						<button
							type="button"
							className="btn btn-primary"
							onClick={handleShow}
						>
							<i
								className="fas fa-plus"
								title="Add"
								data-bs-toggle="tooltip"
							></i>
						</button>
					</div>
					{coins.length > 0 ? (
						<Row className="d-flex row-cols-3">
							{coins.map((coi) => (
								<CoinGrid key={coi.ticker} coin={coi.ticker} buy={coi.buy} />
							))}
						</Row>
					) : (
						<p className="text-center">Loading</p>
					)}
				</div>
			</div>
			<AddCoinsModal
				show={show}
				handleClose={handleClose}
				handleShow={handleShow}
			/>
		</div>
	);
};
