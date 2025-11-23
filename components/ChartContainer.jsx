'use client';

import { motion } from 'framer-motion';
import EmptyState from './EmptyState';

export default function ChartContainer( {
  title,
  children,
  data,
  emptyMessage = 'No data available',
  delay = 0.3,
  className = ''
} ) {
  return (
    <motion.div
      initial={ { opacity: 0, y: 20 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { delay } }
      className={ `bg-secondary rounded-xl p-6 border border-white/20 ${className}` }
    >
      <h3 className="text-xl font-semibold text-white mb-4">{ title }</h3>
      { data && data.length > 0 ? (
        children
      ) : (
        <EmptyState message={ emptyMessage } />
      ) }
    </motion.div>
  );
}

