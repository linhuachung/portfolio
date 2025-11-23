'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const COLORS = [
  '#00ff99',
  '#3b82f6',
  '#a855f7',
  '#f59e0b'
];

export default function PieChart( { data, dataKey = 'count', nameKey = 'status' } ) {
  const chartData = {
    labels: data.map( ( item ) => item[nameKey] ),
    datasets: [
      {
        data: data.map( ( item ) => item[dataKey] || 0 ),
        backgroundColor: data.map( ( _, index ) => COLORS[index % COLORS.length] ),
        borderColor: 'transparent',
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff80',
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#27272c',
        borderColor: '#ffffff20',
        borderWidth: 1,
        borderRadius: 8,
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function( context ) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce( ( a, b ) => a + b, 0 );
            const percentage = ( ( value / total ) * 100 ).toFixed( 0 );
            return `${label}: ${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <div style={ { height: '300px' } }>
      <Pie data={ chartData } options={ options } />
    </div>
  );
}
