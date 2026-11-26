'use client';

import Loader from '@/components/Loader';
import Toast from '@/components/Toast';
import { TOAST_STATUS } from '@/constants/toast';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, useTheme } from '@mui/material/styles';
import { useRef } from 'react';
import { ContactInfoPanel, MessagePanel, SentAtPanel, StatusBar } from './contact-detail/ContactSummary';
import ReplyComposer from './contact-detail/ReplyComposer';
import ReplyList from './contact-detail/ReplyList';
import { ModalStack, SectionStack } from './contact-detail/styles';
import { errorMessage, useContactDetail } from './contact-detail/useContactDetail';
import { useReplyComposer } from './contact-detail/useReplyComposer';

const stickyBar = { position: 'sticky', zIndex: 2, borderColor: 'divider', bgcolor: 'background.paper' };

export default function ContactDetailModal( { contactId, open, onOpenChange, onStatusUpdate } ) {
  const theme = useTheme();
  const compact = useMediaQuery( theme.breakpoints.down( 'sm' ) );
  const dialogContentRef = useRef( null );
  const detail = useContactDetail( contactId, open, onStatusUpdate );
  const composer = useReplyComposer( {
    saveReply: detail.saveReply,
    generateDraft: detail.generateDraft,
    scrollContainerRef: dialogContentRef
  } );

  const deleteReply = async ( replyId ) => {
    if ( !window.confirm( 'Are you sure you want to delete this reply?' ) ) {return;}
    try {
      await detail.deleteReply( replyId );
      Toast( { title: 'Reply deleted successfully', type: TOAST_STATUS.success } );
    } catch ( deleteError ) {
      Toast( { title: errorMessage( deleteError, 'Failed to delete reply' ), type: TOAST_STATUS.error } );
    }
  };

  const requestClose = () => {
    if ( composer.hasUnsentDraft && !window.confirm( 'Discard this unsent reply draft?' ) ) {return;}
    onOpenChange( false );
  };

  if ( !open ) {return null;}

  const { contact, loading, error } = detail;

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
      <DialogTitle sx={ { ...stickyBar, top: 0, borderBottom: 1, fontSize: '1.5rem', fontWeight: 650 } }>
        Contact Details
      </DialogTitle>
      <DialogContent ref={ dialogContentRef } sx={ { flex: 1, minHeight: 0, overflowX: 'hidden', overflowY: 'auto', px: { xs: 2, sm: 3 } } }>
        { loading && (
          <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 } }>
            <Loader type="ClipLoader" size={ 40 } />
          </Box>
        ) }

        { error && (
          <Box sx={ { p: 2, border: 1, borderColor: 'error.main', borderRadius: 2, bgcolor: ( { palette } ) => alpha( palette.error.main, .08 ) } }>
            <Typography component="p" color="error.main">{ error }</Typography>
          </Box>
        ) }

        { !loading && !error && contact && (
          <ModalStack>
            <StatusBar contact={ contact } updating={ detail.updating } onStatusChange={ detail.updateStatus } />
            <SentAtPanel createdAt={ contact.createdAt } />
            <SectionStack>
              <ContactInfoPanel contact={ contact } />
              <MessagePanel message={ contact.message } />
              <ReplyList
                replies={ contact.replies || [] }
                composerOpen={ composer.open }
                generating={ composer.generating }
                onNewReply={ () => composer.start() }
                onDraftWithAi={ composer.draftWithAi }
                onEdit={ composer.start }
                onDelete={ deleteReply }
              />
              { composer.open && <ReplyComposer composer={ composer } /> }
            </SectionStack>
          </ModalStack>
        ) }
      </DialogContent>
      <DialogActions sx={ { ...stickyBar, bottom: 0, borderTop: 1 } }>
        <Button onClick={ requestClose } variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
