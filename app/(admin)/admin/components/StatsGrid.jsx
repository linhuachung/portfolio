'use client';

import StatCard from '@/components/admin/StatCard';
import { motion } from 'framer-motion';

export default function StatsGrid( { stats, statsConfig } ) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      { statsConfig.map( ( stat, index ) => (
        <motion.div
          key={ stat.key }
          initial={ { opacity: 0, y: 20 } }
          animate={ { opacity: 1, y: 0 } }
          transition={ { delay: index * 0.1 } }
        >
          <StatCard
            title={ stat.title }
            value={ stats[stat.key] || 0 }
            icon={ stat.icon }
            color={ stat.color }
          />
        </motion.div>
      ) ) }
    </div>
  );
}

