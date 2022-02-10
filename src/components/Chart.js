import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
ChartJS.register(ArcElement, Tooltip);
export const DoughnutChart = ({ chartData }) => {
	return (
		<div>
			<Doughnut
				data={chartData}
				options={{
					parsing: {
						key: 'nested.value',
					},
				}}
			/>
		</div>
	);
};
