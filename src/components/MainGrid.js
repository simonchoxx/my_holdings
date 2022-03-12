import React from 'react';
import { holds, cash } from '../helpers/data';
import { DoughnutChart } from './Chart';
import {
	useFetchPrices,
	useFetchHolds,
	useFetchCash,
} from '../hooks/useFetchData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBitcoinSign,
	faEuroSign,
	faUsd,
} from '@fortawesome/free-solid-svg-icons';

export const MainGrid = () => {
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
	const { data: priceBTC, loading } = useFetchPrices('USDT', '');
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
	holds.map((el) => (sumaBtc += el.btc));
	eurCash ||= usdCash * usdeur;
	usdTotal ||= sumaBtc * usd + usdCash;
	eurTotal ||= usdTotal * usdeur;

	const formatMoney = (val) => {
		return isNaN(val)
			? '-'
			: val?.toLocaleString('de-DE', {
					maximumFractionDigits: 2,
			  });
	};

	// const pricesWs = new WebSocket(
	// 	'wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin'
	// );

	// pricesWs.onmessage = function(msg) {
	// 	console.log(msg.data);
	// };

	const dataCrypto = {
		labels: holds.map((el) => el.platform),
		datasets: [
			{
				data: holds.map((el) => ((el.btc / sumaBtc) * 100).toFixed(2)),
				backgroundColor: [
					'rgb(133, 105, 241)',
					'rgb(164, 101, 241)',
					'rgb(101, 143, 241)',
				],
				hoverOffset: 4,
			},
		],
	};

	const dataCash = {
		labels: ['Cash'],
		datasets: [
			{
				data: [100],
				backgroundColor: ['rgb(101, 143, 241)'],
				hoverOffset: 4,
			},
		],
	};

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
											{holds.map((res, i) => (
												<tr className="bg-white border-b" key={i}>
													<td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
														{res.platform}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{res.btc}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.btc * usd, 'USD')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.btc * eur, 'EUR')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														<button className="btn btn-sm btn-outline-success">
															{/* <i
																className="fas fa-pencil-alt"
																title="Edit"
																data-bs-toggle="tooltip"
															></i> */}
															A
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
													{sumaBtc}
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
					<DoughnutChart chartData={dataCrypto} height={200} />
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
															A
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
					<DoughnutChart chartData={dataCash} />
				</div>
			</div>
		</>
	);
};
