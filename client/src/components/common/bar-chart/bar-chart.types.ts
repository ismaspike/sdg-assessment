export interface IBarChartProps {
  data: IBarChartData;
}

export interface IBarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

export const barChartOptions = (numberLabels: boolean) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        enabled: false,
        align: 'end',
        anchor: 'end',
        color: '#000',
        font: {
          weight: 'bold'
        },
        formatter: (value) => (numberLabels ? value : '')
      }
    }
  };
};
