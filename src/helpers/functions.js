import { Spinner } from '../components/Spinner';

export const porc = (price, buy) => {
	return (((price - buy) / buy) * 100).toFixed(2);
};

export const formatMoney = (val) => {
	return isNaN(val) ? (
		<Spinner />
	) : (
		// ? '-'
		// val?.toLocaleString('de-DE', {
		// 	maximumFractionDigits: 2,
		// })
		parseFloat(val).toFixed(2)
	);
};

export const dataCrypto = (platf, sumaBtc) => {
	return {
		labels: platf.map((el) => el.name),
		datasets: [
			{
				data: platf.map((el) => ((el.satoshis / sumaBtc) * 100).toFixed(2)),
				backgroundColor: [
					'rgb(133, 105, 241)',
					'rgb(164, 101, 241)',
					'rgb(101, 143, 241)',
				],
				hoverOffset: 4,
			},
		],
	};
};

export const dataCash = () => {
	return {
		labels: ['Cash'],
		datasets: [
			{
				data: [100],
				backgroundColor: ['rgb(101, 143, 241)'],
				hoverOffset: 4,
			},
		],
	};
};
