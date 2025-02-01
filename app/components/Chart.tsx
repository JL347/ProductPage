"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
}

interface ChartProps {
  sales: Sale[];
}

const Chart = ({ sales }: ChartProps) => {

  const data = {
    labels: sales.map((sale) => {
      const { weekEnding } = sale;
      return dayjs(weekEnding).format('MMMM DD, YYYY');
    }),

    datasets: [
      {
        label: 'Retail Sales',
        data: [
          ...sales.map((sale) => {
            const { retailSales } = sale;
            return retailSales;
          })
        ],
        backgroundColor: 'blue',
        borderColor: 'blue',
        tension: .2,
      },
      {
        label: 'Wholesale Sales',
        data: [
          ...sales.map((sale) => {
            const { wholesaleSales } = sale;
            return wholesaleSales;
          })
        ],
        backgroundColor: 'gray',
        borderColor: 'gray',
        tension: .2,
      }
    ]
  }

  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default Chart;