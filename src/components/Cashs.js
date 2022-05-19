import React, { useEffect, useState } from 'react';
import { dataCash, formatMoney } from '../helpers/functions';
import { getCashs } from '../helpers/getInternalsApis';
import { DoughnutChart } from './Chart';

export const Cashs = ({ handleShow }) => {
	const [cash, setCash] = useState([]);
	let totalUsdCash,
		totalEurCash = 0;

	const fetchCashs = async () => {
		let response = await getCashs();
		setCash(response);
	};

	useEffect(() => {
		fetchCashs();
	}, [cash]);

	cash.forEach((v) => {
		totalUsdCash = v.usd;
		totalEurCash = v.eur;
	});

	return (
		<div>
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
														{res.name}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.usd, 'USD')}
													</td>
													<td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">
														{formatMoney(res.eur, 'EUR')}
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
													{formatMoney(totalUsdCash, 'USD')}
												</td>
												<td className="px-6 py-2 whitespace-nowrap text-base font-medium text-gray-900">
													{formatMoney(totalEurCash, 'EUR')}
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
		</div>
	);
};
