import React, { useEffect, useState } from 'react';
import { cash } from '../helpers/data';
import { DoughnutChart } from './Chart';
import { EditPlatfModal } from './EditPlatfModal';
import {
	useFetchPrices,
	useFetchHolds,
	useFetchCash,
	useFetchPlatforms,
} from '../hooks/useFetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBitcoinSign,
	faEuroSign,
	faUsd,
} from '@fortawesome/free-solid-svg-icons';
import { dataCrypto, dataCash, formatMoney } from '../helpers/functions';

export const MainGrid = () => {
	const [show, setShow] = useState(false);
	const [namePlatform, setNamePlatform] = useState();
	const handleClose = () => setShow(false);
	const handleShow = (resp) => {
		setNamePlatform(resp);
		setShow(true);
	};
	let usd,
		eur,
		usdCash,
		eurCash,
		usdTotal,
		eurTotal,
		priceBTCNow,
		usdeur,
		sumaBtc = 0;

	const { data: prices } = useFetchHolds();
	const { data: stocks } = useFetchCash();
	const { data: platf } = useFetchPlatforms();
	const { data: priceBTC } = useFetchPrices('USDT', '');
	priceBTC.forEach((v) => {
		priceBTCNow ||= parseInt(v.price);
	});

	usdeur ||= stocks;
	prices.forEach((v) => {
		usd ||= v.usd;
		eur ||= v.eur;
	});
	cash.forEach((v) => {
		usdCash = v.usd;
	});

	platf.map((el) => (sumaBtc += el.satoshis));
	eurCash ||= usdCash * usdeur;
	usdTotal ||= sumaBtc * usd + usdCash;
	eurTotal ||= usdTotal * usdeur;

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
			<div className="flex justify-center mt-4 mb-2">
				<h4 className="h4">Crypto</h4>
			</div>
			<div className="col-12 flex items-center">
				<div className="col-10 px-4">
					<div className="flex flex-col">
						<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div className="overflow-x-auto">
									<table className="min-w-full">
										<thead className="border-b bg-gray-50">
											<tr>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													Plataforma
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													BTC
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													USD
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													EUR
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												></th>
											</tr>
										</thead>
										<tbody>
											{platf.map((res, i) => (
												<tr className="bg-white border-b" key={i}>
													<td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
														{res.name}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{res.satoshis}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.satoshis * usd, 'USD')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.satoshis * eur, 'EUR')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<button
															className="btn btn-sm btn-outline-success"
															onClick={() => handleShow(res.name)}
														>
															Edit
														</button>
													</td>
												</tr>
											))}
										</tbody>
										<tfoot>
											<tr className="bg-gray-200">
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													Totales
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{sumaBtc.toLocaleString('de-DE', {
														minimumFractionDigits: 8,
													})}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{formatMoney(sumaBtc * usd, 'USD')}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{formatMoney(sumaBtc * eur, 'EUR')}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900"></td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-2">
					<DoughnutChart chartData={dataCrypto(platf, sumaBtc)} height={200} />
				</div>
			</div>

			<div className="col-10 m-auto">
				<hr />
			</div>
			<div className="d-flex justify-content-center mt-4 mb-2">
				<h4 className="h4">Cash</h4>
			</div>
			<div className="col-12 flex items-center">
				<div className="col-10 px-4">
					<div className="flex flex-col mb-3">
						<div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
								<div className="overflow-hidden">
									<table className="min-w-full text-center">
										<thead className="border-b bg-gray-50">
											<tr>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													Plataforma
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													USD
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												>
													EUR
												</th>
												<th
													scope="col"
													className="text-sm font-medium text-gray-900 px-6 py-2"
												></th>
											</tr>
										</thead>
										<tbody>
											{cash.map((res, i) => (
												<tr className="bg-white border-b" key={i}>
													<td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
														{res.platform}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.usd, 'USD')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(eurCash, 'EUR')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<button className="btn btn-sm btn-outline-success">
															{/* <i
																className="fas fa-pencil-alt"
																title="Edit"
																data-bs-toggle="tooltip"
															></i> */}
															Edit
														</button>
													</td>
												</tr>
											))}
										</tbody>
										<tfoot>
											<tr className="bg-gray-200">
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													Totales
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{formatMoney(usdCash, 'USD')}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{formatMoney(eurCash, 'EUR')}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900"></td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-2">
					<DoughnutChart chartData={dataCash()} />
				</div>
			</div>
			<EditPlatfModal
				show={show}
				handleClose={handleClose}
				platf={namePlatform}
			/>
		</>
	);
};
