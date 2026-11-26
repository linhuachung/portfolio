'use client';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MuiLink from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { getServiceLabel } from '@/constants/email';
import { TOAST_STATUS } from '@/constants/toast';
import { formatPhoneForDisplayWithCountry, generateTelLink } from '@/lib/phone-utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AdminRow, StatusBadge } from '@/components/styled/Admin.styles';
import { alpha, styled, useTheme } from '@mui/material/styles';

const ModalStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 3 ), marginTop: theme.spacing( 2 ) } ) );
const SectionStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 2 ) } ) );
const Panel = styled( Box )( ( { theme } ) => ( { minWidth: 0, maxWidth: '100%', padding: theme.spacing( 2 ), border: `1px solid ${theme.palette.divider}`, borderRadius: 8, backgroundColor: alpha( theme.palette.background.default, .55 ) } ) );
const PanelTitle = styled( Typography )( ( { theme } ) => ( { marginBottom: theme.spacing( 1.5 ), color: theme.palette.text.primary, fontSize: '.875rem', fontWeight: 650 } ) );
const DetailLabel = styled( Typography )( ( { theme } ) => ( { marginBottom: theme.spacing( .5 ), color: theme.palette.text.secondary, fontSize: '.75rem' } ) );
const DetailValue = styled( Typography )( ( { theme } ) => ( { color: theme.palette.text.primary, fontSize: '.9rem', fontWeight: 500 } ) );
const DetailLink = styled( MuiLink )( ( { theme } ) => ( { color: theme.palette.primary.main, fontSize: '1rem', '&:hover': { textDecoration: 'underline' } } ) );
const ReplyItem = styled( Box )( ( { theme } ) => ( { padding: theme.spacing( 1.5 ), border: `1px solid ${alpha( theme.palette.success.main, .25 )}`, borderRadius: 6, backgroundColor: theme.palette.background.paper } ) );
const AiToolbar = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing( 1 ),
  marginBottom: theme.spacing( 1.5 ),
  padding: theme.spacing( 1 ),
  border: `1px solid ${alpha( theme.palette.primary.main, .2 )}`,
  borderRadius: 8,
  backgroundColor: alpha( theme.palette.primary.main, .055 ),
  [theme.breakpoints.down( 'sm' )]: { alignItems: 'stretch', flexDirection: 'column' }
} ) );

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
  const theme = useTheme();
  const compact = useMediaQuery( theme.breakpoints.down( 'sm' ) );
  const [contact, setContact] = useState( null );
  const [loading, setLoading] = useState( false );
  const [updating, setUpdating] = useState( false );
  const [sendingReply, setSendingReply] = useState( false );
  const [error, setError] = useState( null );
  const [hasAutoMarkedAsRead, setHasAutoMarkedAsRead] = useState( false );
  const [replyMessage, setReplyMessage] = useState( '' );
  const [showReplyForm, setShowReplyForm] = useState( false );
  const [editingReplyId, setEditingReplyId] = useState( null );
  const [generatingDraft, setGeneratingDraft] = useState( false );
  const [aiTone, setAiTone] = useState( 'professional' );
  const [aiError, setAiError] = useState( '' );
  const [replyValidationError, setReplyValidationError] = useState( '' );
  const dialogContentRef = useRef( null );
  const replyPanelRef = useRef( null );
  const replyInputRef = useRef( null );

  const revealReplyComposer = useCallback( ( focusInput = true ) => {
    window.requestAnimationFrame( () => {
      window.requestAnimationFrame( () => {
        const content = dialogContentRef.current;
        const panel = replyPanelRef.current;
        if ( content && panel ) {
          const contentRect = content.getBoundingClientRect();
          const panelRect = panel.getBoundingClientRect();
          content.scrollTo( {
            top: content.scrollTop + panelRect.top - contentRect.top - 12,
            behavior: 'smooth'
          } );
        }
        if ( focusInput ) {replyInputRef.current?.focus( { preventScroll: true } );}
      } );
    } );
  }, [] );

  useEffect( () => {
    if ( open && contactId ) {
      fetchContactDetail();
    } else {
      setContact( null );
      setError( null );
      setHasAutoMarkedAsRead( false );
    }
  // fetchContactDetail is intentionally tied to the modal identity.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, contactId] );

  const fetchContactDetail = async () => {
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

        // Auto-mark as "read" if status is "pending" and not already marked
        if ( contactData.status === 'pending' && !hasAutoMarkedAsRead ) {
          setHasAutoMarkedAsRead( true );
          // Call update status silently (no toast)
          updateStatusSilently( 'read' );
        }
      } else {
        throw new Error( result.message || 'Invalid response format' );
      }
    } catch ( err ) {
      console.error( 'Error fetching contact detail:', err );
      setError( err.message || 'Failed to load contact details' );
    } finally {
      setLoading( false );
    }
  };

  const handleSendReply = async () => {
    if ( !contactId || !replyMessage.trim() ) {
      setReplyValidationError( 'Write a reply or generate a draft before sending.' );
      revealReplyComposer();
      return;
    }

    setReplyValidationError( '' );
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
      console.error( 'Error sending reply:', err );
      setError( err.message || 'Failed to send reply' );
      Toast( {
        title: err.message || 'Failed to send reply',
        type: TOAST_STATUS.error
      } );
    } finally {
      setSendingReply( false );
    }
  };

  const handleGenerateDraft = async () => {
    if ( !contactId ) {return;}
    setGeneratingDraft( true );
    setAiError( '' );
    setShowReplyForm( true );
    setEditingReplyId( null );
    setReplyValidationError( '' );
    revealReplyComposer( false );

    try {
      const response = await fetch( `/api/admin/contact/${contactId}/ai-draft`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { tone: aiTone } )
      } );
      const result = await response.json().catch( () => ( {} ) );
      if ( !response.ok || !result.data?.draft ) {
        throw new Error( result.message || 'Unable to create an AI draft.' );
      }

      setReplyMessage( result.data.draft );
      revealReplyComposer();
      Toast( { title: 'AI draft ready. Review it before sending.', type: TOAST_STATUS.success } );
    } catch ( draftError ) {
      setAiError( draftError.message || 'Unable to create an AI draft.' );
    } finally {
      setGeneratingDraft( false );
    }
  };

  const handleEditReply = ( reply ) => {
    setReplyMessage( reply.message );
    setEditingReplyId( reply.id );
    setShowReplyForm( true );
    setReplyValidationError( '' );
    revealReplyComposer();
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
    setAiError( '' );
    setReplyValidationError( '' );
  };

  const handleNewReply = () => {
    setShowReplyForm( true );
    setReplyMessage( '' );
    setEditingReplyId( null );
    setAiError( '' );
    setReplyValidationError( '' );
    revealReplyComposer();
  };

  const requestClose = () => {
    if ( showReplyForm && replyMessage.trim() && !window.confirm( 'Discard this unsent reply draft?' ) ) {return;}
    onOpenChange( false );
  };

  const updateStatusSilently = async ( newStatus ) => {
    if ( !contactId || !newStatus ) {
      return;
    }

    try {
      const response = await fetch( `/api/admin/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( { status: newStatus } )
      } );

      if ( response.ok ) {
        const result = await response.json();
        if ( result.status === 200 && result.data ) {
          setContact( result.data );
          if ( onStatusUpdate ) {
            onStatusUpdate( result.data );
          }
        }
      }
    } catch ( err ) {
      console.error( 'Error auto-updating status:', err );
      // Silent fail - don't show error for auto-update
    }
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
      console.error( 'Error updating status:', err );
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
    <Dialog
      open={ open }
      onClose={ requestClose }
      disablePortal
      fullScreen={ compact }
      fullWidth
      maxWidth="md"
      slotProps={ { paper: { sx: {
        maxHeight: compact ? '100dvh' : 'min(880px, calc(100dvh - 48px))',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.paper'
      } } } }
    >
      <DialogTitle sx={ { position: 'sticky', top: 0, zIndex: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper', fontSize: '1.5rem', fontWeight: 650 } }>
        Contact Details
      </DialogTitle>
      <DialogContent ref={ dialogContentRef } sx={ { flex: 1, minHeight: 0, overflowX: 'hidden', overflowY: 'auto', px: { xs: 2, sm: 3 } } }>

        { loading && (
          <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 } }>
            <Loader type="ClipLoader" size={ 40 } />
          </Box>
        ) }

        { error && (
          <Box sx={ { p: 2, border: 1, borderColor: 'error.main', borderRadius: 2, bgcolor: theme => alpha( theme.palette.error.main, .08 ) } }>
            <Typography component="p" color="error.main">{ error }</Typography>
          </Box>
        ) }

        { !loading && !error && contact && (
          <ModalStack>
            { /* Status Badge & Update */ }
            <AdminRow sx={ { justifyContent: 'space-between', flexWrap: 'wrap' } }>
              <AdminRow sx={ { gap: 1.5 } }>
                <StatusBadge component="span" $status={ contact.status } sx={ { px: 1.5, py: .75, border: 1, borderColor: 'currentColor', fontSize: '.875rem', fontWeight: 600 } }>
                  { contact.status.toUpperCase() }
                </StatusBadge>
                { updating && (
                  <Loader type="ClipLoader" size={ 16 } />
                ) }
              </AdminRow>
              <AdminRow sx={ { gap: 1 } }>
                <Select
                  value={ contact.status }
                  onChange={ event => updateStatus( event.target.value ) }
                  disabled={ updating }
                  size="small"
                  inputProps={ { 'aria-label': 'Contact status' } }
                  sx={ { width: 140 } }
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="read">Read</MenuItem>
                  <MenuItem value="replied">Replied</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
                <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: .5 } }>
                  { contact.emailOpenedAt && (
                    <Typography component="span" sx={ { color: 'success.main', fontSize: '.75rem', whiteSpace: 'nowrap' } }>
                    📧 Opened: { new Date( contact.emailOpenedAt ).toLocaleString() }
                    </Typography>
                  ) }
                  { contact.repliedAt && (
                    <Typography component="span" sx={ { color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'nowrap' } }>
                    Replied: { new Date( contact.repliedAt ).toLocaleDateString() }
                    </Typography>
                  ) }
                </Box>
              </AdminRow>
            </AdminRow>

            { /* Date & Time */ }
            <Panel sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 } }>
              <Box>
                <DetailLabel component="p">Date Sent</DetailLabel>
                <DetailValue component="p">{ date }</DetailValue>
              </Box>
              <Box>
                <DetailLabel component="p">Time Sent</DetailLabel>
                <DetailValue component="p">{ time }</DetailValue>
              </Box>
            </Panel>

            { /* Contact Information */ }
            <SectionStack>
              <Panel>
                <PanelTitle component="h3">
                  Contact Information
                </PanelTitle>
                <Box sx={ { display: 'grid', gap: 1.5 } }>
                  <Box>
                    <DetailLabel component="p">Name</DetailLabel>
                    <DetailValue component="p">
                      { displayName }
                    </DetailValue>
                  </Box>
                  <Box>
                    <DetailLabel component="p">Email</DetailLabel>
                    <DetailLink
                      href={ `mailto:${contact.email}` }
                    >
                      { contact.email }
                    </DetailLink>
                  </Box>
                  { contact.phone && (
                    <Box>
                      <DetailLabel component="p">Phone</DetailLabel>
                      <DetailLink
                        href={ generateTelLink( contact.phone ) }
                      >
                        { formatPhoneForDisplayWithCountry( contact.phone ) }
                      </DetailLink>
                    </Box>
                  ) }
                  <Box>
                    <DetailLabel component="p">Service</DetailLabel>
                    <DetailValue component="p">
                      { getServiceLabel( contact.service ) }
                    </DetailValue>
                  </Box>
                </Box>
              </Panel>

              { /* Message */ }
              <Panel>
                <PanelTitle component="h3">
                  Message
                </PanelTitle>
                <Box sx={ { p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' } }>
                  <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'pre-wrap' } }>
                    { contact.message }
                  </Typography>
                </Box>
              </Panel>

              { /* Replies Section */ }
              <Panel>
                <AdminRow sx={ { justifyContent: 'space-between', mb: 2 } }>
                  <Typography component="h3" sx={ { fontSize: '.875rem', fontWeight: 650 } }>
                    Replies ({ contact.replies?.length || 0 })
                  </Typography>
                  { !showReplyForm && <AdminRow sx={ { gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' } }>
                    <Button variant="outlined" size="small" onClick={ handleNewReply }>Write Reply</Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={ <AutoAwesomeOutlinedIcon /> }
                      onClick={ handleGenerateDraft }
                      disabled={ generatingDraft }
                    >
                      { generatingDraft ? 'Drafting…' : 'Draft with AI' }
                    </Button>
                  </AdminRow> }
                </AdminRow>

                { /* Replies List */ }
                { contact.replies && contact.replies.length > 0 ? (
                  <Box sx={ { display: 'grid', gap: 1.5, mb: 2 } }>
                    { contact.replies.map( ( reply ) => (
                      <ReplyItem
                        key={ reply.id }
                      >
                        <Box sx={ { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 } }>
                          <Box sx={ { flex: 1 } }>
                            <Typography component="p" sx={ { mb: 1, color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'pre-wrap' } }>
                              { reply.message }
                            </Typography>
                            <AdminRow sx={ { gap: 1.5, color: 'text.secondary', fontSize: '.75rem' } }>
                              <Typography component="span">
                                { new Date( reply.createdAt ).toLocaleString() }
                              </Typography>
                              { reply.emailSent && (
                                <Typography component="span" color="success.main">
                                  📧 Sent
                                </Typography>
                              ) }
                              { reply.updatedAt && reply.updatedAt !== reply.createdAt && (
                                <Typography component="span" color="info.main">
                                  (Edited)
                                </Typography>
                              ) }
                            </AdminRow>
                          </Box>
                          { !showReplyForm && (
                            <AdminRow sx={ { gap: 1 } }>
                              <Button
                                variant="outlined"
                                size="small"
                                sx={ { px: 1, py: .5, fontSize: '.75rem' } }
                                onClick={ () => handleEditReply( reply ) }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                sx={ { px: 1, py: .5, fontSize: '.75rem' } }
                                onClick={ () => handleDeleteReply( reply.id ) }
                              >
                                Delete
                              </Button>
                            </AdminRow>
                          ) }
                        </Box>
                      </ReplyItem>
                    ) ) }
                  </Box>
                ) : (
                  <Typography component="p" sx={ { mb: 2, color: 'text.secondary', fontSize: '.875rem' } }>
                    No replies yet. Click &quot;Add Reply&quot; to send your first reply.
                  </Typography>
                ) }
              </Panel>

              { /* Reply Form */ }
              { showReplyForm && (
                <Panel ref={ replyPanelRef } sx={ { scrollMarginTop: 12, borderColor: 'info.main', bgcolor: theme => alpha( theme.palette.info.main, .07 ) } }>
                  <Typography component="h3" sx={ { mb: 1.5, color: 'info.main', fontSize: '.875rem', fontWeight: 650 } }>
                    { editingReplyId ? 'Edit Reply' : 'New Reply' }
                  </Typography>
                  { !editingReplyId && <AiToolbar>
                    <Box sx={ { minWidth: 0 } }>
                      <Typography component="p" sx={ { fontSize: '.78rem', fontWeight: 700 } }>AI-assisted draft</Typography>
                      <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.68rem', lineHeight: 1.4 } }>Customer text is sent to Google Gemini only when you generate a draft. Review and edit every draft before sending.</Typography>
                    </Box>
                    <AdminRow sx={ {
                      width: { xs: '100%', sm: 'auto' },
                      gap: 1,
                      flexShrink: 0,
                      flexWrap: 'wrap',
                      '& .MuiInputBase-root, & .MuiButton-root': { minWidth: 0, flex: { xs: '1 1 110px', sm: 'initial' } }
                    } }>
                      <Select
                        value={ aiTone }
                        onChange={ event => setAiTone( event.target.value ) }
                        size="small"
                        inputProps={ { 'aria-label': 'AI reply tone' } }
                        disabled={ generatingDraft || sendingReply }
                      >
                        <MenuItem value="professional">Professional</MenuItem>
                        <MenuItem value="warm">Warm</MenuItem>
                        <MenuItem value="concise">Concise</MenuItem>
                      </Select>
                      <Button
                        variant="outlined"
                        startIcon={ <AutoAwesomeOutlinedIcon /> }
                        onClick={ handleGenerateDraft }
                        disabled={ generatingDraft || sendingReply }
                      >
                        { generatingDraft ? 'Drafting…' : replyMessage.trim() ? 'Regenerate' : 'Generate' }
                      </Button>
                    </AdminRow>
                  </AiToolbar> }
                  { aiError && <Typography role="alert" component="p" sx={ { mb: 1.5, color: 'error.main', fontSize: '.76rem' } }>{ aiError }</Typography> }
                  <TextField
                    inputRef={ replyInputRef }
                    label="Reply Message"
                    name="replyMessage"
                    value={ replyMessage }
                    onChange={ ( e ) => setReplyMessage( e.target.value ) }
                    placeholder="Write or generate a reply…"
                    sx={ { mb: 1.5, '& .MuiInputBase-root': { minHeight: 120, fontSize: '.9rem', lineHeight: 1.45 } } }
                    disabled={ sendingReply }
                    error={ Boolean( replyValidationError ) }
                    helperText={ replyValidationError || 'Review the draft carefully. Sending emails is never automatic.' }
                    fullWidth
                    multiline
                    minRows={ 4 }
                  />
                  <AdminRow sx={ { gap: 1 } }>
                    <Button
                      onClick={ handleSendReply }
                      disabled={ sendingReply }
                      color="info"
                    >
                      { sendingReply ? (
                        <>
                          <Loader type="ClipLoader" color="currentColor" size={ 16 } />
                          { editingReplyId ? 'Updating...' : 'Sending...' }
                        </>
                      ) : (
                        editingReplyId ? 'Update & Send' : 'Send Reply'
                      ) }
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={ handleCancelReply }
                      disabled={ sendingReply }
                    >
                      Cancel
                    </Button>
                  </AdminRow>
                </Panel>
              ) }
            </SectionStack>
          </ModalStack>
        ) }

      </DialogContent>
      <DialogActions sx={ { position: 'sticky', bottom: 0, zIndex: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' } }>
        <Button onClick={ requestClose } variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

