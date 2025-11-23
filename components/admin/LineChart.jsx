"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function LineChart( { data, dataKey = "count", name, color = "#00ff99" } ) {
  return (
    <ResponsiveContainer width="100%" height={ 300 }>
      <RechartsLineChart data={ data } margin={ { top: 5, right: 30, left: 20, bottom: 5 } }>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10"/>
        <XAxis
          dataKey="date"
          stroke="#ffffff60"
          style={ { fontSize: "12px" } }
        />
        <YAxis
          stroke="#ffffff60"
          style={ { fontSize: "12px" } }
        />
        <Tooltip
          contentStyle={ {
            backgroundColor: "#27272c",
            border: "1px solid #ffffff20",
            borderRadius: "8px",
            color: "#fff"
          } }
        />
        <Legend
          wrapperStyle={ { color: "#ffffff80" } }
        />
        <Line
          type="monotone"
          dataKey={ dataKey }
          name={ name }
          stroke={ color }
          strokeWidth={ 2 }
          dot={ { fill: color, r: 4 } }
          activeDot={ { r: 6 } }
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

