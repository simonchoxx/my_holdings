import { useState } from 'react';
import { formatMoney } from '../helpers/functions';
import {
	useFetchCash,
	useFetchHolds,
	useFetchPlatforms,
	useFetchPrices,
} from '../hooks/useFetchData';
import { EditPlatfModal } from './EditPlatfModal';

export const PlatformsTable = () => {
	const [show, setShow] = useState(false);
	const [namePlatform, setNamePlatform] = useState();
	const handleClose = () => setShow(false);
	const handleShow = (resp) => {
		setNamePlatform(resp);
		setShow(true);
	};

	let usd,
		eur,
		sumaBtc = 0;

	const { data: prices } = useFetchHolds();
	const { data: platf } = useFetchPlatforms();

	platf.map((el) => {
		return (sumaBtc += el.satoshis);
	});
	prices.forEach((v) => {
		usd ||= v.usd;
		eur ||= v.eur;
	});

	return (
		<>
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
			<EditPlatfModal
				show={show}
				handleClose={handleClose}
				platf={namePlatform}
			/>
		</>
	);
};
