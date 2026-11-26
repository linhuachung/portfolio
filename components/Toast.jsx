'use client';

import { TOAST_POSITION } from '@/constants/toast';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';

const TOAST_EVENT = 'portfolio:toast';

const getAnchorOrigin = position => {
  const [vertical = 'top', horizontal = 'center'] = position.split( '-' );
  return { vertical, horizontal };
};

function Toast( { title, type = 'info', position = TOAST_POSITION.topCenter, autoClose = 2500 } ) {
  if ( typeof window !== 'undefined' ) {
    window.dispatchEvent( new CustomEvent( TOAST_EVENT, {
      detail: { title, type, position, autoClose, key: Date.now() }
    } ) );
  }
}

export function ToastHost() {
  const [toast, setToast] = useState( null );

  useEffect( () => {
    const showToast = event => setToast( { ...event.detail, open: true } );
    window.addEventListener( TOAST_EVENT, showToast );
    return () => window.removeEventListener( TOAST_EVENT, showToast );
  }, [] );

  const closeToast = ( _event, reason ) => {
    if ( reason !== 'clickaway' ) {
      setToast( current => current ? { ...current, open: false } : current );
    }
  };

  return (
    <Snackbar
      key={ toast?.key }
      open={ !!toast?.open }
      autoHideDuration={ toast?.autoClose }
      anchorOrigin={ getAnchorOrigin( toast?.position || TOAST_POSITION.topCenter ) }
      onClose={ closeToast }
    >
      <Alert onClose={ closeToast } severity={ toast?.type || 'info' } variant="filled" sx={ { width: '100%' } }>
        { toast?.title }
      </Alert>
    </Snackbar>
  );
}

export default Toast;
