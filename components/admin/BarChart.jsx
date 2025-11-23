'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function BarChart( { data, dataKey = 'count', name, color = '#00ff99' } ) {
  return (
    <ResponsiveContainer width="100%" height={ 300 }>
      <RechartsBarChart data={ data } margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10"/>
        <XAxis
          dataKey={ data[0]?.path ? 'path' : data[0]?.category ? 'category' : 'date' }
          stroke="#ffffff60"
          style={ { fontSize: '12px' } }
          angle={ -45 }
          textAnchor="end"
          height={ 80 }
        />
        <YAxis
          stroke="#ffffff60"
          style={ { fontSize: '12px' } }
        />
        <Tooltip
          contentStyle={ {
            backgroundColor: '#27272c',
            border: '1px solid #ffffff20',
            borderRadius: '8px',
            color: '#fff'
          } }
        />
        <Legend
          wrapperStyle={ { color: '#ffffff80' } }
        />
        <Bar
          dataKey={ dataKey }
          name={ name }
          fill={ color }
          radius={ [8, 8, 0, 0] }
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

