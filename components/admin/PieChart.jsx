"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

const COLORS = ["#00ff99", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#10b981"];

export default function PieChart( { data, dataKey = "count", nameKey = "status" } ) {
  return (
    <ResponsiveContainer width="100%" height={ 300 }>
      <RechartsPieChart>
        <Pie
          data={ data }
          cx="50%"
          cy="50%"
          labelLine={ false }
          label={ ( { name, percent } ) => `${name}: ${( percent * 100 ).toFixed( 0 )}%` }
          outerRadius={ 80 }
          fill="#8884d8"
          dataKey={ dataKey }
          nameKey={ nameKey }
        >
          { data.map( ( entry, index ) => (
            <Cell key={ `cell-${index}` } fill={ COLORS[index % COLORS.length] }/>
          ) ) }
        </Pie>
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
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

