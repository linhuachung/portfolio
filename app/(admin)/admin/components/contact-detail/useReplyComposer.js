'use client';

import Toast from '@/components/Toast';
import { TOAST_STATUS } from '@/constants/toast';
import { useCallback, useRef, useState } from 'react';
import { errorMessage } from './useContactDetail';

function replyToast( emailSent, isEditing ) {
  if ( emailSent ) {
    return { title: isEditing ? 'Reply updated and sent successfully! 📧' : 'Reply sent successfully! 📧', type: TOAST_STATUS.success };
  }
  return { title: isEditing ? 'Reply updated but email failed to send' : 'Reply saved but email failed to send', type: TOAST_STATUS.warning };
}

/**
 * State for writing, editing and AI-drafting a reply. `scrollContainerRef` is the
 * dialog body; the composer is scrolled into view and focused when it opens.
 */
export function useReplyComposer( { saveReply, generateDraft, scrollContainerRef } ) {
  const [open, setOpen] = useState( false );
  const [message, setMessage] = useState( '' );
  const [editingReplyId, setEditingReplyId] = useState( null );
  const [tone, setTone] = useState( 'professional' );
  const [aiError, setAiError] = useState( '' );
  const [validationError, setValidationError] = useState( '' );
  const [generating, setGenerating] = useState( false );
  const [sending, setSending] = useState( false );
  const panelRef = useRef( null );
  const inputRef = useRef( null );

  // Two frames: the first mounts the panel, the second has its final layout.
  const reveal = useCallback( ( focusInput = true ) => {
    window.requestAnimationFrame( () => window.requestAnimationFrame( () => {
      const container = scrollContainerRef.current;
      const panel = panelRef.current;
      if ( container && panel ) {
        const offset = panel.getBoundingClientRect().top - container.getBoundingClientRect().top;
        container.scrollTo( { top: container.scrollTop + offset - 12, behavior: 'smooth' } );
      }
      if ( focusInput ) {inputRef.current?.focus( { preventScroll: true } );}
    } ) );
  }, [scrollContainerRef] );

  const start = ( reply = null ) => {
    setOpen( true );
    setMessage( reply?.message || '' );
    setEditingReplyId( reply?.id ?? null );
    setAiError( '' );
    setValidationError( '' );
    reveal();
  };

  const cancel = () => {
    setOpen( false );
    setMessage( '' );
    setEditingReplyId( null );
    setAiError( '' );
    setValidationError( '' );
  };

  const draftWithAi = async () => {
    setGenerating( true );
    setAiError( '' );
    setOpen( true );
    setEditingReplyId( null );
    setValidationError( '' );
    reveal( false );
    try {
      setMessage( await generateDraft( tone ) );
      reveal();
      Toast( { title: 'AI draft ready. Review it before sending.', type: TOAST_STATUS.success } );
    } catch ( draftError ) {
      setAiError( errorMessage( draftError, 'Unable to create an AI draft.' ) );
    } finally {
      setGenerating( false );
    }
  };

  const send = async () => {
    if ( !message.trim() ) {
      setValidationError( 'Write a reply or generate a draft before sending.' );
      reveal();
      return;
    }

    setValidationError( '' );
    setSending( true );
    const isEditing = editingReplyId !== null;
    try {
      const { emailSent } = await saveReply( { replyId: editingReplyId, message: message.trim() } );
      cancel();
      Toast( replyToast( emailSent, isEditing ) );
    } catch ( sendError ) {
      Toast( { title: errorMessage( sendError, 'Failed to send reply' ), type: TOAST_STATUS.error } );
    } finally {
      setSending( false );
    }
  };

  const hasUnsentDraft = open && Boolean( message.trim() );

  return {
    open, message, setMessage, editingReplyId, tone, setTone, aiError, validationError,
    generating, sending, panelRef, inputRef, hasUnsentDraft,
    start, cancel, draftWithAi, send
  };
}
