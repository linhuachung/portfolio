'use client';

import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';

const getStatusStyles = ( status ) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    replied: 'bg-green-500/20 text-green-400',
    archived: 'bg-gray-500/20 text-gray-400'
  };
  return styles[status] || styles.archived;
};

export default function RecentContacts( { contacts, delay = 0.8 } ) {
  return (
    <motion.div
      initial={ { opacity: 0, y: 20 } }
      animate={ { opacity: 1, y: 0 } }
      transition={ { delay } }
      className="bg-secondary rounded-xl p-6 border border-white/20"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Recent Contacts</h3>
      <div className="space-y-3">
        { contacts && contacts.length > 0 ? (
          contacts.map( ( contact ) => (
            <div
              key={ contact.id }
              className="flex items-center justify-between p-3 bg-primary rounded-lg border border-white/10"
            >
              <div>
                <p className="text-white font-medium">{ contact.name }</p>
                <p className="text-white/60 text-sm">{ contact.email }</p>
              </div>
              <div className="text-right">
                <span
                  className={ `px-2 py-1 rounded text-xs ${getStatusStyles( contact.status )}` }
                >
                  { contact.status }
                </span>
                <p className="text-white/40 text-xs mt-1">
                  { new Date( contact.createdAt ).toLocaleDateString() }
                </p>
              </div>
            </div>
          ) )
        ) : (
          <EmptyState message="No recent contacts" height="h-[200px]" />
        ) }
      </div>
    </motion.div>
  );
}

