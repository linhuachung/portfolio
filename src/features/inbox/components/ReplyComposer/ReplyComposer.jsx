'use client';

import Loader from '@/shared/components/Loader';
import { AdminRow } from '@/features/admin-shell/styles/Admin.styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Panel } from '../../styles/ContactDetail.styles';
import AiDraftToolbar from '../AiDraftToolbar';

/** Editor for a new or edited reply. Receives the state from useReplyComposer. */
export default function ReplyComposer( { composer } ) {
  const isEditing = composer.editingReplyId !== null;

  return (
    <Panel ref={ composer.panelRef } sx={ { scrollMarginTop: 12, borderColor: 'info.main', bgcolor: theme => alpha( theme.palette.info.main, .07 ) } }>
      <Typography component="h3" sx={ { mb: 1.5, color: 'info.main', fontSize: '.875rem', fontWeight: 650 } }>
        { isEditing ? 'Edit Reply' : 'New Reply' }
      </Typography>
      { !isEditing && <AiDraftToolbar composer={ composer } /> }
      { composer.aiError && (
        <Typography role="alert" component="p" sx={ { mb: 1.5, color: 'error.main', fontSize: '.76rem' } }>{ composer.aiError }</Typography>
      ) }
      <TextField
        inputRef={ composer.inputRef }
        label="Reply Message"
        name="replyMessage"
        value={ composer.message }
        onChange={ event => composer.setMessage( event.target.value ) }
        placeholder="Write or generate a reply…"
        sx={ { mb: 1.5, '& .MuiInputBase-root': { minHeight: 120, fontSize: '.9rem', lineHeight: 1.45 } } }
        disabled={ composer.sending }
        error={ Boolean( composer.validationError ) }
        helperText={ composer.validationError || 'Review the draft carefully. Sending emails is never automatic.' }
        fullWidth
        multiline
        minRows={ 4 }
      />
      <AdminRow sx={ { gap: 1 } }>
        <Button onClick={ composer.send } disabled={ composer.sending } color="info">
          { composer.sending ? (
            <>
              <Loader type="ClipLoader" color="currentColor" size={ 16 } />
              { isEditing ? 'Updating...' : 'Sending...' }
            </>
          ) : (
            isEditing ? 'Update & Send' : 'Send Reply'
          ) }
        </Button>
        <Button variant="outlined" onClick={ composer.cancel } disabled={ composer.sending }>Cancel</Button>
      </AdminRow>
    </Panel>
  );
}
