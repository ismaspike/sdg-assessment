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
      title: {
        display: true,
        text: 'Gráfico de Ventas'
      },
      // Configuración del plugin datalabels
      datalabels: {
        enabled: false,
        align: 'end', // Alinea las etiquetas en la parte superior
        anchor: 'end', // Ancla las etiquetas al final de la barra
        color: '#000', // Color de las etiquetas
        font: {
          weight: 'bold' // Puedes modificar el estilo de la fuente
        },
        formatter: (value) => (numberLabels ? value : '') // Formatea el valor mostrado
      }
    }
  };
};
