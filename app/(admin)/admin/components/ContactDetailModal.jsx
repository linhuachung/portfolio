'use client';

import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getServiceLabel } from '@/constants/email';
import { TOAST_STATUS } from '@/constants/toast';
import { formatPhoneForDisplayWithCountry, generateTelLink } from '@/lib/phone-utils';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';

const getStatusStyles = ( status ) => {
  const styles = {
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    read: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    replied: 'bg-green-500/20 text-green-400 border-green-500/30',
    archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  };
  return styles[status] || styles.pending;
};

const formatDateTime = ( dateString ) => {
  const date = new Date( dateString );
  const dateStr = date.toLocaleDateString( 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } );
  const timeStr = date.toLocaleTimeString( 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  } );
  return { date: dateStr, time: timeStr };
};

export default function ContactDetailModal( { contactId, open, onOpenChange, onStatusUpdate } ) {
  const [contact, setContact] = useState( null );
  const [loading, setLoading] = useState( false );
  const [updating, setUpdating] = useState( false );
  const [sendingReply, setSendingReply] = useState( false );
  const [error, setError] = useState( null );
  const [hasAutoMarkedAsRead, setHasAutoMarkedAsRead] = useState( false );
  const [replyMessage, setReplyMessage] = useState( '' );
  const [showReplyForm, setShowReplyForm] = useState( false );
  const [editingReplyId, setEditingReplyId] = useState( null );

  const fetchContactDetail = useCallback( async () => {
    if ( !contactId ) {
      setError( 'Contact ID is required' );
      return;
    }

    setLoading( true );
    setError( null );

    try {
      const response = await fetch( `/api/admin/contact/${contactId}` );

      if ( !response.ok ) {
        const errorData = await response.json().catch( () => ( { message: 'Failed to fetch contact detail' } ) );
        throw new Error( errorData.message || `HTTP error! status: ${response.status}` );
      }

      const result = await response.json();

      if ( result.status === 200 && result.data ) {
        const contactData = result.data;
        setContact( contactData );

        if ( contactData.status === 'pending' && !hasAutoMarkedAsRead ) {
          setHasAutoMarkedAsRead( true );
          try {
            const updateResponse = await fetch( `/api/admin/contact/${contactId}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify( { status: 'read' } )
            } );
            if ( updateResponse.ok ) {
              const updateResult = await updateResponse.json();
              if ( updateResult.status === 200 && updateResult.data ) {
                setContact( updateResult.data );
                if ( onStatusUpdate ) {
                  onStatusUpdate( updateResult.data );
                }
              }
            }
          } catch {
          }
        }
      } else {
        throw new Error( result.message || 'Invalid response format' );
      }
    } catch ( err ) {
      setError( err.message || 'Failed to load contact details' );
    } finally {
      setLoading( false );
    }
  }, [contactId, hasAutoMarkedAsRead, onStatusUpdate] );

  useEffect( () => {
    if ( open && contactId ) {
      fetchContactDetail();
    } else {
      setContact( null );
      setError( null );
      setHasAutoMarkedAsRead( false );
    }
  }, [open, contactId, fetchContactDetail] );

  const handleSendReply = async () => {
    if ( !contactId || !replyMessage.trim() ) {
      return;
    }

    setSendingReply( true );
    setError( null );

    try {
      const isEditing = editingReplyId !== null;
      const url = isEditing
        ? `/api/admin/contact/${contactId}/replies/${editingReplyId}`
        : `/api/admin/contact/${contactId}/replies`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch( url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
          message: replyMessage.trim(),
          sendEmail: true
        } )
      } );

      if ( !response.ok ) {
        const errorData = await response.json().catch( () => ( { message: 'Failed to send reply' } ) );
        throw new Error( errorData.message || `HTTP error! status: ${response.status}` );
      }

      const result = await response.json();

      if ( result.status === 200 && result.data ) {
        // Refresh contact data to get updated replies
        await fetchContactDetail();
        setReplyMessage( '' );
        setShowReplyForm( false );
        setEditingReplyId( null );

        Toast( {
          title: result.data.emailSent
            ? ( isEditing ? 'Reply updated and sent successfully! 📧' : 'Reply sent successfully! 📧' )
            : ( isEditing ? 'Reply updated but email failed to send' : 'Reply saved but email failed to send' ),
          type: result.data.emailSent ? TOAST_STATUS.success : TOAST_STATUS.warning
        } );

        // Notify parent component to refresh list
        if ( onStatusUpdate ) {
          onStatusUpdate();
        }
      } else {
        throw new Error( result.message || 'Invalid response format' );
      }
    } catch ( err ) {
      setError( err.message || 'Failed to send reply' );
      Toast( {
        title: err.message || 'Failed to send reply',
        type: TOAST_STATUS.error
      } );
    } finally {
      setSendingReply( false );
    }
  };

  const handleEditReply = ( reply ) => {
    setReplyMessage( reply.message );
    setEditingReplyId( reply.id );
    setShowReplyForm( true );
  };

  const handleDeleteReply = async ( replyId ) => {
    if ( !confirm( 'Are you sure you want to delete this reply?' ) ) {
      return;
    }

    try {
      const response = await fetch( `/api/admin/contact/${contactId}/replies/${replyId}`, {
        method: 'DELETE'
      } );

      if ( !response.ok ) {
        const errorData = await response.json().catch( () => ( { message: 'Failed to delete reply' } ) );
        throw new Error( errorData.message || `HTTP error! status: ${response.status}` );
      }

      // Refresh contact data
      await fetchContactDetail();

      Toast( {
        title: 'Reply deleted successfully',
        type: TOAST_STATUS.success
      } );

      if ( onStatusUpdate ) {
        onStatusUpdate();
      }
    } catch ( err ) {
      console.error( 'Error deleting reply:', err );
      Toast( {
        title: err.message || 'Failed to delete reply',
        type: TOAST_STATUS.error
      } );
    }
  };

  const handleCancelReply = () => {
    setShowReplyForm( false );
    setReplyMessage( '' );
    setEditingReplyId( null );
  };

  const handleNewReply = () => {
    setShowReplyForm( true );
    setReplyMessage( '' );
    setEditingReplyId( null );
  };


  const updateStatus = async ( newStatus ) => {
    if ( !contactId || !newStatus ) {
      return;
    }

    if ( !contactId || !newStatus ) {
      return;
    }

    setUpdating( true );
    setError( null );

    try {
      const response = await fetch( `/api/admin/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { status: newStatus } )
      } );

      if ( !response.ok ) {
        const errorData = await response.json().catch( () => ( { message: 'Failed to update status' } ) );
        throw new Error( errorData.message || `HTTP error! status: ${response.status}` );
      }

      const result = await response.json();

      if ( result.status === 200 && result.data ) {
        setContact( result.data );
        setHasAutoMarkedAsRead( true );

        Toast( {
          title: `Status updated to ${newStatus.toUpperCase()}`,
          type: TOAST_STATUS.success
        } );

        // Notify parent component to refresh list
        if ( onStatusUpdate ) {
          onStatusUpdate( result.data );
        }
      } else {
        throw new Error( result.message || 'Invalid response format' );
      }
    } catch ( err ) {
      setError( err.message || 'Failed to update status' );
      Toast( {
        title: err.message || 'Failed to update status',
        type: TOAST_STATUS.error
      } );
    } finally {
      setUpdating( false );
    }
  };

  if ( !open ) {return null;}

  const { date, time } = contact ? formatDateTime( contact.createdAt ) : { date: '', time: '' };
  const displayName = contact?.name || ( contact ? `${contact.firstname} ${contact.lastname}`.trim() : '' );

  return (
    <Dialog open={ open } onOpenChange={ onOpenChange }>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-[#f5f5f5] dark:bg-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Contact Details
          </DialogTitle>
        </DialogHeader>

        { loading && (
          <div className="flex items-center justify-center py-12">
            <Loader type="ClipLoader" color="#00ff99" size={ 40 } />
          </div>
        ) }

        { error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-500 dark:text-red-400">{ error }</p>
          </div>
        ) }

        { !loading && !error && contact && (
          <div className="space-y-6 mt-4">
            { /* Status Badge & Update */ }
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className={ cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium border',
                    getStatusStyles( contact.status )
                  ) }
                >
                  { contact.status.toUpperCase() }
                </span>
                { updating && (
                  <Loader type="ClipLoader" color="#00ff99" size={ 16 } />
                ) }
              </div>
              <div className="flex items-center gap-2">
                <Select
                  value={ contact.status }
                  onValueChange={ updateStatus }
                  disabled={ updating }
                >
                  <SelectTrigger className="w-[140px] h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex flex-col items-end gap-1">
                  { contact.emailOpenedAt && (
                    <span className="text-xs text-green-600 dark:text-green-400 whitespace-nowrap">
                    📧 Opened: { new Date( contact.emailOpenedAt ).toLocaleString() }
                    </span>
                  ) }
                  { contact.repliedAt && (
                    <span className="text-sm text-gray-600 dark:text-white/60 whitespace-nowrap">
                    Replied: { new Date( contact.repliedAt ).toLocaleDateString() }
                    </span>
                  ) }
                </div>
              </div>
            </div>

            { /* Date & Time */ }
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-secondary rounded-lg border border-gray-200 dark:border-white/10">
              <div>
                <p className="text-xs text-gray-500 dark:text-white/50 mb-1">Date Sent</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{ date }</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-white/50 mb-1">Time Sent</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{ time }</p>
              </div>
            </div>

            { /* Contact Information */ }
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-secondary rounded-lg border border-gray-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-white/50 mb-1">Name</p>
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      { displayName }
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-white/50 mb-1">Email</p>
                    <a
                      href={ `mailto:${contact.email}` }
                      className="text-base text-accent-light dark:text-accent hover:underline"
                    >
                      { contact.email }
                    </a>
                  </div>
                  { contact.phone && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-white/50 mb-1">Phone</p>
                      <a
                        href={ generateTelLink( contact.phone ) }
                        className="text-base text-accent-light dark:text-accent hover:underline"
                      >
                        { formatPhoneForDisplayWithCountry( contact.phone ) }
                      </a>
                    </div>
                  ) }
                  <div>
                    <p className="text-xs text-gray-500 dark:text-white/50 mb-1">Service</p>
                    <p className="text-base text-gray-900 dark:text-white">
                      { getServiceLabel( contact.service ) }
                    </p>
                  </div>
                </div>
              </div>

              { /* Message */ }
              <div className="p-4 bg-gray-50 dark:bg-secondary rounded-lg border border-gray-200 dark:border-white/10">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80 mb-3">
                  Message
                </h3>
                <div className="p-3 bg-white dark:bg-primary rounded border border-gray-200 dark:border-white/10">
                  <p className="text-sm text-gray-700 dark:text-white/80 whitespace-pre-wrap">
                    { contact.message }
                  </p>
                </div>
              </div>

              { /* Replies Section */ }
              <div className="p-4 bg-gray-50 dark:bg-secondary rounded-lg border border-gray-200 dark:border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-white/80">
                    Replies ({ contact.replies?.length || 0 })
                  </h3>
                  { !showReplyForm && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="px-3 py-1"
                      onClick={ handleNewReply }
                    >
                      + Add Reply
                    </Button>
                  ) }
                </div>

                { /* Replies List */ }
                { contact.replies && contact.replies.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    { contact.replies.map( ( reply ) => (
                      <div
                        key={ reply.id }
                        className="p-3 bg-white dark:bg-primary rounded border border-green-200 dark:border-green-500/20"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm text-gray-700 dark:text-white/80 whitespace-pre-wrap mb-2">
                              { reply.message }
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-white/60">
                              <span>
                                { new Date( reply.createdAt ).toLocaleString() }
                              </span>
                              { reply.emailSent && (
                                <span className="text-green-600 dark:text-green-400">
                                  📧 Sent
                                </span>
                              ) }
                              { reply.updatedAt && reply.updatedAt !== reply.createdAt && (
                                <span className="text-blue-600 dark:text-blue-400">
                                  (Edited)
                                </span>
                              ) }
                            </div>
                          </div>
                          { !showReplyForm && (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="px-2 py-1 text-xs"
                                onClick={ () => handleEditReply( reply ) }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="px-2 py-1 text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                                onClick={ () => handleDeleteReply( reply.id ) }
                              >
                                Delete
                              </Button>
                            </div>
                          ) }
                        </div>
                      </div>
                    ) ) }
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-white/60 mb-4">
                    No replies yet. Click &quot;Add Reply&quot; to send your first reply.
                  </p>
                ) }
              </div>

              { /* Reply Form */ }
              { showReplyForm && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-500/30">
                  <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-3">
                    { editingReplyId ? 'Edit Reply' : 'New Reply' }
                  </h3>
                  <Textarea
                    value={ replyMessage }
                    onChange={ ( e ) => setReplyMessage( e.target.value ) }
                    placeholder="Type your reply message here..."
                    className="min-h-[120px] mb-3"
                    disabled={ sendingReply }
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={ handleSendReply }
                      disabled={ !replyMessage.trim() || sendingReply }
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      { sendingReply ? (
                        <>
                          <Loader type="ClipLoader" color="#ffffff" size={ 16 } className="mr-2" />
                          { editingReplyId ? 'Updating...' : 'Sending...' }
                        </>
                      ) : (
                        editingReplyId ? 'Update & Send' : 'Send Reply'
                      ) }
                    </Button>
                    <Button
                      variant="outline"
                      onClick={ handleCancelReply }
                      disabled={ sendingReply }
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) }
            </div>
          </div>
        ) }

        <DialogFooter>
          <Button onClick={ () => onOpenChange( false ) } variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

