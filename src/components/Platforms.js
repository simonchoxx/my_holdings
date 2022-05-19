import React, { useEffect, useState } from 'react';
import { dataCrypto, formatMoney } from '../helpers/functions';
import { getPlatforms } from '../helpers/getInternalsApis';
import { getUsdEurBtcRate } from '../helpers/getExternalsApis';
import { DoughnutChart } from './Chart';

export const Platforms = ({ handleShow }) => {
	const [platf, setPlatf] = useState([]);
	const [usdEurBtc, setUsdEurBtc] = useState();
	let sumaBtc = 0;

	const fetchPlatforms = async () => {
		let response = await getPlatforms();
		setPlatf(response);
	};

	const fetchUsdEurBtc = async () => {
		let response = await getUsdEurBtcRate();
		setUsdEurBtc(response);
	};

	useEffect(() => {
		fetchPlatforms();
		setInterval(() => {
			fetchUsdEurBtc();
		}, 5000);
	}, []);

	platf.map((el) => (sumaBtc += el.satoshis));

	return (
		<>
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
														{formatMoney(
															res.satoshis * usdEurBtc?.priceUSD,
															'USD'
														)}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(
															res.satoshis * usdEurBtc?.priceEUR,
															'EUR'
														)}
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
													{formatMoney(sumaBtc * usdEurBtc?.priceUSD, 'USD')}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{formatMoney(sumaBtc * usdEurBtc?.priceEUR, 'EUR')}
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
		</>
	);
};
