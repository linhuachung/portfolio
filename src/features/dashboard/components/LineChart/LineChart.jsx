'use client';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';

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

export default function LineChart( {
  data,
  dataKey = 'count',
  name,
  height = 300,
  ariaLabel = 'Line chart'
} ) {
  const theme = useTheme();
  const reduceMotion = useMediaQuery( '(prefers-reduced-motion: reduce)', { noSsr: true } );
  const color = theme.palette.primary.main;
  const chartData = {
    labels: data.map( ( item ) => item.date ),
    datasets: [
      {
        label: name,
        data: data.map( ( item ) => item[dataKey] || 0 ),
        borderColor: color,
        backgroundColor: alpha( color, .08 ),
        borderWidth: 2,
        fill: false,
        tension: 0.32,
        pointRadius: data.length === 1 ? 3 : 0,
        pointHoverRadius: 4,
        pointBackgroundColor: color,
        pointBorderColor: theme.palette.background.paper
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: reduceMotion ? false : { duration: 260 },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        borderRadius: 8,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.primary,
        padding: 12,
        displayColors: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 12
          }
        },
        grid: {
          display: false,
          drawBorder: false
        }
      },
      y: {
        ticks: {
          color: theme.palette.text.secondary,
          font: {
            size: 12
          }
        },
        grid: {
          color: alpha( theme.palette.text.primary, .08 ),
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
    <Box role="img" aria-label={ ariaLabel } sx={ { height } }>
      <Line data={ chartData } options={ options } />
    </Box>
  );
}
