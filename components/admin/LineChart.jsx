'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart( { data, dataKey = 'count', name, color = '#00ff99' } ) {
  const chartData = {
    labels: data.map( ( item ) => item.date ),
    datasets: [
      {
        label: name,
        data: data.map( ( item ) => item[dataKey] || 0 ),
        borderColor: color,
        backgroundColor: `${color}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: color,
        pointBorderColor: color
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#27272c',
        borderColor: '#ffffff20',
        borderWidth: 1,
        borderRadius: 8,
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        displayColors: true
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff60',
          font: {
            size: 12
          }
        },
        grid: {
          color: '#ffffff10',
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: '#ffffff60',
          font: {
            size: 12
          }
        },
        grid: {
          color: '#ffffff10',
          drawBorder: false
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  return (
    <div style={ { height: '300px' } }>
      <Line data={ chartData } options={ options } />
    </div>
  );
}
