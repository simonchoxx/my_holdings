import React, { useState } from 'react';
import { EditPlatfModal } from './EditPlatfModal';
import { Totals } from './Totals';
import { Platforms } from './Platforms';
import { Cashs } from './Cashs';
import { EditCashModal } from './EditCashModal';

export const MainGrid = () => {
	const [showPlatf, setShowPlatf] = useState(false);
	const [showCash, setShowCash] = useState(false);
	const [namePlatform, setNamePlatform] = useState();
	const [nameCash, setNameCash] = useState();
	const handleClosePlatf = () => setShowPlatf(false);
	const handleCloseCash = () => setShowCash(false);
	const handleShowPlatf = (resp) => {
		setNamePlatform(resp);
		setShowPlatf(true);
	};
	const handleShowCash = (resp) => {
		setNameCash(resp);
		setShowCash(true);
	};

	return (
		<>
			<Totals />
			<Platforms handleShow={handleShowPlatf} />
			<Cashs handleShow={handleShowCash} />
			<EditPlatfModal
				show={showPlatf}
				handleClose={handleClosePlatf}
				platf={namePlatform}
			/>
			<EditCashModal
				show={showCash}
				handleClose={handleCloseCash}
				cash={nameCash}
			/>
		</>
	);
};
