'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import EmptyState from '@/components/EmptyState';
import ContactDetailModal from './ContactDetailModal';
import { cn } from '@/lib/utils';

const getStatusStyles = ( status ) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    read: 'bg-blue-500/20 text-blue-400',
    replied: 'bg-green-500/20 text-green-400',
    archived: 'bg-gray-500/20 text-gray-400'
  };
  return styles[status] || styles.pending;
};

export default function RecentContacts( { contacts, delay = 0.8, onRefresh } ) {
  const [selectedContactId, setSelectedContactId] = useState( null );
  const [isModalOpen, setIsModalOpen] = useState( false );

  const handleContactClick = ( contactId ) => {
    if ( !contactId ) {
      console.error( 'Contact ID is missing' );
      return;
    }
    console.log( 'Opening contact detail modal for ID:', contactId );
    setSelectedContactId( contactId );
    setIsModalOpen( true );
  };

  const handleStatusUpdate = () => {
    // Refresh the contacts list if callback is provided
    if ( onRefresh ) {
      onRefresh();
    }
  };

  return (
    <>
      <motion.div
        initial={ { opacity: 0, y: 20 } }
        animate={ { opacity: 1, y: 0 } }
        transition={ { delay } }
        className="bg-[#f5f5f5] dark:bg-secondary rounded-xl p-6 border border-gray-300 dark:border-white/20"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Contacts</h3>
        <div className="space-y-3">
          { contacts && contacts.length > 0 ? (
            contacts.map( ( contact ) => (
              <div
                key={ contact.id }
                onClick={ () => handleContactClick( contact.id ) }
                className={ cn(
                  'flex items-center justify-between p-3 bg-gray-50 dark:bg-primary rounded-lg',
                  'border border-gray-200 dark:border-white/10',
                  'cursor-pointer transition-all duration-200',
                  'hover:bg-gray-100 dark:hover:bg-secondary',
                  'hover:border-gray-300 dark:hover:border-white/20',
                  'hover:shadow-sm'
                ) }
              >
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">{ contact.name }</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm">{ contact.email }</p>
                </div>
                <div className="text-right">
                  <span
                    className={ `px-2 py-1 rounded text-xs ${getStatusStyles( contact.status )}` }
                  >
                    { contact.status }
                  </span>
                  <p className="text-gray-500 dark:text-white/40 text-xs mt-1">
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

      { selectedContactId && (
        <ContactDetailModal
          contactId={ selectedContactId }
          open={ isModalOpen }
          onOpenChange={ setIsModalOpen }
          onStatusUpdate={ handleStatusUpdate }
        />
      ) }
    </>
  );
}

