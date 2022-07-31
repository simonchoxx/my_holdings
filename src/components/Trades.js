import React, { useEffect, useState } from 'react';
import { getUSDTPrice } from '../helpers/getExternalsApis';
import { getTrades } from '../helpers/getInternalsApis';

export const Trades = () => {
	const [trades, setTrades] = useState([]);
	const [priceBtc, setPriceBtc] = useState();

	const fetchTrades = async () => {
		const response = await getTrades();
		setTrades(response);
	};

	// PRECIO ACTUAL DEL BITCOIN EN USDT
	const fetchPriceBtc = async () => {
		let response = await getUSDTPrice();
		setPriceBtc(response);
	};

	let GainBTC = 0,
		sumaBTC = 0;

	trades.forEach((elem) => {
		GainBTC += Number.parseFloat(elem.sellBTC) - Number.parseFloat(elem.buyBTC);
		sumaBTC +=
			((Number.parseFloat(elem.sellBTC) - Number.parseFloat(elem.buyBTC)) /
				Number.parseFloat(elem.buyBTC)) *
			100;
	});

	useEffect(() => {
		setInterval(() => {
			fetchTrades();
			fetchPriceBtc();
		}, 5000);
	}, []);
	return (
		<div className="container">
			<div className="my-4 row text-center grid gap-5">
				<div className="col bg-red-400 rounded-lg py-3 px-6 xs:mb-4 text-base text-slate-900">
					<div className="text-xs">BTC Gain</div>
					<span className="text-2xl">
						{GainBTC.toLocaleString('en-IN', {
							maximumFractionDigits: 8,
						})}
					</span>
				</div>
				<div className="col bg-pink-400 rounded-lg py-3 px-6 xs:mb-4 text-base text-slate-900">
					<div className="text-xs">USD Gain</div>
					<span className="text-2xl">
						{(GainBTC * priceBtc).toLocaleString('de-DE', {
							maximumFractionDigits: 2,
						})}
					</span>
				</div>
				<div className="col bg-indigo-400 rounded-lg py-3 px-6 xs:mb-4 text-base text-slate-900">
					<div className="text-xs">Trades</div>
					<span className="text-2xl">{trades.length}</span>
				</div>
				<div className="col bg-blue-400 rounded-lg py-3 px-6 xs:mb-4 text-base text-slate-900">
					<div className="text-xs">AVG_BTC</div>
					<span className="text-2xl">
						{(sumaBTC / trades.length).toLocaleString('de-DE', {
							maximumFractionDigits: 2,
						})}
					</span>
				</div>
			</div>

			<table className="table table-hover text-center my-3">
				<thead>
					<tr>
						<th scope="col">Fecha</th>
						<th scope="col">Coin</th>
						<th scope="col">BTC Buy</th>
						<th scope="col">BTC Sell</th>
						<th scope="col">BTC Gain</th>
						<th scope="col">% BTC</th>
						<th scope="col">USD Gain</th>
					</tr>
				</thead>
				<tbody>
					{trades.map((elem) => {
						return (
							<tr key={elem._id}>
								<td>{new Date(elem.date).toLocaleDateString()}</td>
								<td>
									<div className="d-flex justify-content-center">
										<img
											className="mr-2"
											src={elem.data[0].logo}
											alt="logo"
											height={20}
											width={20}
										></img>
										{elem.ticker}
									</div>
								</td>
								<td>{elem.buyBTC}</td>
								<td>{elem.sellBTC}</td>
								<td>
									{(
										Number.parseFloat(elem.sellBTC) -
										Number.parseFloat(elem.buyBTC)
									).toLocaleString('de-DE', {
										maximumFractionDigits: 8,
									})}
								</td>
								<td>
									{(
										((Number.parseFloat(elem.sellBTC) -
											Number.parseFloat(elem.buyBTC)) /
											Number.parseFloat(elem.buyBTC)) *
										100
									).toLocaleString('de-DE', {
										maximumFractionDigits: 2,
									})}
								</td>
								<td>
									{(
										(Number.parseFloat(elem.sellBTC) -
											Number.parseFloat(elem.buyBTC)) *
										Number.parseInt(priceBtc)
									).toLocaleString('de-DE', {
										maximumFractionDigits: 2,
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
