'use client';

import Toast from '@/components/Toast';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import { useCallback, useEffect, useRef, useState } from 'react';

const contactUrl = id => `/api/admin/contact/${id}`;
const repliesUrl = ( id, replyId ) => `${contactUrl( id )}/replies${replyId ? `/${replyId}` : ''}`;

export const errorMessage = ( error, fallback ) => error?.response?.data?.message || error?.message || fallback;

// axiosInstance resolves to the DataResponse body; every contact endpoint returns its record in `data`.
const unwrap = ( result ) => {
  if ( !result?.data ) {throw new Error( result?.message || 'Invalid response format' );}
  return result.data;
};

/**
 * Loads one contact and exposes the admin actions on it. Requests go through
 * axiosInstance so an expired access token is refreshed instead of failing.
 */
export function useContactDetail( contactId, open, onStatusUpdate ) {
  const [contact, setContact] = useState( null );
  const [loading, setLoading] = useState( false );
  const [updating, setUpdating] = useState( false );
  const [error, setError] = useState( null );
  // Opening a pending message marks it read once; a manual status change disables that.
  const autoMarkedRef = useRef( false );

  const applyStatus = useCallback( async ( status ) => {
    const updated = unwrap( await axiosInstance.put( contactUrl( contactId ), { status } ) );
    setContact( updated );
    onStatusUpdate?.( updated );
    return updated;
  }, [contactId, onStatusUpdate] );

  const reload = useCallback( async () => {
    setLoading( true );
    setError( null );
    try {
      const loaded = unwrap( await axiosInstance.get( contactUrl( contactId ) ) );
      setContact( loaded );
      if ( loaded.status === 'pending' && !autoMarkedRef.current ) {
        autoMarkedRef.current = true;
        applyStatus( 'read' ).catch( () => {} );
      }
    } catch ( loadError ) {
      setError( errorMessage( loadError, 'Failed to load contact details' ) );
    } finally {
      setLoading( false );
    }
  }, [contactId, applyStatus] );

  useEffect( () => {
    autoMarkedRef.current = false;
    if ( open && contactId ) {
      reload();
    } else {
      setContact( null );
      setError( null );
    }
  // Reload only when a different contact is opened, not when callbacks change identity.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contactId] );

  const updateStatus = async ( status ) => {
    setUpdating( true );
    setError( null );
    autoMarkedRef.current = true;
    try {
      await applyStatus( status );
      Toast( { title: `Status updated to ${status.toUpperCase()}`, type: TOAST_STATUS.success } );
    } catch ( updateError ) {
      const message = errorMessage( updateError, 'Failed to update status' );
      setError( message );
      Toast( { title: message, type: TOAST_STATUS.error } );
    } finally {
      setUpdating( false );
    }
  };

  /** Creates a reply, or updates `replyId`, and emails it. Resolves to `{ emailSent }`. */
  const saveReply = async ( { replyId, message } ) => {
    const body = { message, sendEmail: true };
    const url = repliesUrl( contactId, replyId );
    const saved = unwrap( await ( replyId ? axiosInstance.put( url, body ) : axiosInstance.post( url, body ) ) );
    await reload();
    onStatusUpdate?.();
    return saved;
  };

  const deleteReply = async ( replyId ) => {
    await axiosInstance.delete( repliesUrl( contactId, replyId ) );
    await reload();
    onStatusUpdate?.();
  };

  const generateDraft = async ( tone ) => {
    const result = await axiosInstance.post( `${contactUrl( contactId )}/ai-draft`, { tone } );
    if ( !result?.data?.draft ) {throw new Error( result?.message || 'Unable to create an AI draft.' );}
    return result.data.draft;
  };

  return { contact, loading, updating, error, updateStatus, saveReply, deleteReply, generateDraft };
}
