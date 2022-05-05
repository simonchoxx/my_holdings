import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBitcoinSign,
	faEuroSign,
	faUsd,
} from '@fortawesome/free-solid-svg-icons';
import { formatMoney } from '../helpers/functions';
import {
	getCash,
	getCashs,
	getHolds,
	getPlatforms,
	getPrices,
} from '../helpers/getDataApi';

export const Totals = () => {
	const [priceBtc, setPriceBtc] = useState([]);
	const [usdEurBtc, setUsdEurBtc] = useState([]);
	const [cash, setCash] = useState([]);
	const [platf, setPlatf] = useState([]);
	const [usdEur, setUsdEur] = useState([]);
	let sumaBtc = 0,
		priceBTCNow = 0,
		usdBtc,
		eurBtc,
		totalUsdCash,
		totalEurCash,
		usdTotal,
		eurTotal = 0;

	useEffect(() => {
		setInterval(() => {
			fetchPriceBtc();
			fetchUsdEurBtc();
			fetchCashs();
			fetchUsdEur();
			fetchPlatforms();
		}, 10000);
	}, []);

	// PRECIO ACTUAL DEL BITCOIN EN USDT
	const fetchPriceBtc = async () => {
		let response = await getPrices('USDT', '');
		setPriceBtc(response);
	};

	// PRECIO DEL DOLAR Y EL EURO CONTRA EL BITCOIN
	const fetchUsdEurBtc = async () => {
		let response = await getHolds();
		setUsdEurBtc(response);
	};

	// CANTIDAD DE USD Y EUR EN CASH
	const fetchCashs = async () => {
		let response = await getCashs();
		setCash(response);
	};

	// PRECIO DEL PAR USD-EUR
	const fetchUsdEur = async () => {
		let response = await getCash();
		setUsdEur(response);
	};

	// STOCKS DE LAS PLATAFORMAS
	const fetchPlatforms = async () => {
		let response = await getPlatforms();
		setPlatf(response);
	};

	platf.map((el) => (sumaBtc += el.satoshis));

	priceBtc.forEach((v) => {
		priceBTCNow ||= parseInt(v.price);
	});

	usdEurBtc.forEach((v) => {
		usdBtc ||= v.usd;
		eurBtc ||= v.eur;
	});

	cash.forEach((v) => {
		totalUsdCash = v.usd;
		totalEurCash = v.eur;
	});
	usdTotal ||= sumaBtc * priceBTCNow + totalUsdCash;
	eurTotal ||= usdTotal * usdEur + totalEurCash;

	return (
		<>
			<div className="items-center text-center grid md:grid-cols-5 gap-5 md:mb-5">
				<div className="md:col-span-2">
					<div
						className="bg-indigo-300 rounded-lg py-5 px-6 xs:mb-4 text-base text-slate-900"
						role="alert"
					>
						<div className="h3">
							{formatMoney(usdTotal, 'USD')} <FontAwesomeIcon icon={faUsd} />
						</div>
					</div>
				</div>
				<div className="">
					<div
						className="bg-yellow-400 rounded-lg py-5 px-6 xs:mb-4 text-base text-slate-900"
						role="alert"
					>
						<div className="h4">
							{priceBTCNow?.toLocaleString('de-DE') || '-'}{' '}
							<FontAwesomeIcon icon={faBitcoinSign} />
						</div>
					</div>
				</div>
				<div className="md:col-span-2">
					<div
						className="bg-blue-300 rounded-lg py-5 px-6 xs:mb-4 text-base text-slate-900"
						role="alert"
					>
						<div className="h3">
							{formatMoney(eurTotal, 'EUR')}{' '}
							<FontAwesomeIcon icon={faEuroSign} />
						</div>
					</div>
				</div>
			</div>
			<div className="col-10 m-auto">
				<hr />
			</div>
		</>
	);
};
