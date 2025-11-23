'use client';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart( { data, dataKey = 'count', name, color = '#00ff99' } ) {
  const labels = data.map( ( item ) => {
    if ( item.path ) {return item.path;}
    if ( item.category ) {return item.category;}
    return item.date;
  } );

  const chartData = {
    labels,
    datasets: [
      {
        label: name,
        data: data.map( ( item ) => item[dataKey] || 0 ),
        backgroundColor: color,
        borderColor: color,
        borderWidth: 0,
        borderRadius: 8
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
        displayColors: true,
        callbacks: {
          label: function( context ) {
            return `${context.dataset.label}: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff60',
          font: {
            size: 12
          },
          maxRotation: 45,
          minRotation: 45
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
    },
    onHover: ( event, activeElements ) => {
      event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
    }
  };

  return (
    <div style={ { height: '300px' } }>
      <Bar data={ chartData } options={ options } />
    </div>
  );
}
