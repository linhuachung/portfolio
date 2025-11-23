"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function StatCard( { title, value, icon: Icon, color = "accent", trend, trendValue } ) {
  const colorClasses = {
    accent: "bg-accent/10 text-accent border-accent/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  };

  return (
    <motion.div
      initial={ { opacity: 0, y: 20 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.5 } }
      className={ `p-6 rounded-xl border ${colorClasses[color]} backdrop-blur-sm` }
    >
      <div className="flex items-center justify-between mb-4">
        <div className={ `p-3 rounded-lg ${colorClasses[color]}` }>
          { Icon && <Icon className="text-2xl"/> }
        </div>
        { trend && (
          <div className={ `text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}` }>
            { trend === "up" ? "↑" : "↓" } { trendValue }%
          </div>
        ) }
      </div>
      <h3 className="text-sm text-white/60 mb-2">{ title }</h3>
      <div className="text-3xl font-bold">
        <CountUp
          end={ value }
          duration={ 2 }
          separator=","
        />
      </div>
    </motion.div>
  );
}

