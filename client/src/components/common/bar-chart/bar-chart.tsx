import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { barChartOptions, IBarChartProps } from './bar-chart.types';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const BarChart = (props: IBarChartProps) => {
  const { data } = props;

  return (
    <div className="bar-chart">
      <Bar
        data={data}
        options={barChartOptions(data.labels.length < 15) as any}
      />
    </div>
  );
};

export default BarChart;
