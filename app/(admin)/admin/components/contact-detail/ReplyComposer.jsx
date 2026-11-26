'use client';

import Loader from '@/components/Loader';
import { AdminRow } from '@/components/styled/Admin.styles';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { AiToolbar, Panel } from './styles';

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'warm', label: 'Warm' },
  { value: 'concise', label: 'Concise' }
];

function AiDraftToolbar( { composer } ) {
  const busy = composer.generating || composer.sending;
  const generateLabel = composer.message.trim() ? 'Regenerate' : 'Generate';

  return (
    <AiToolbar>
      <Box sx={ { minWidth: 0 } }>
        <Typography component="p" sx={ { fontSize: '.78rem', fontWeight: 700 } }>AI-assisted draft</Typography>
        <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.68rem', lineHeight: 1.4 } }>
          Customer text is sent to Google Gemini only when you generate a draft. Review and edit every draft before sending.
        </Typography>
      </Box>
      <AdminRow sx={ {
        width: { xs: '100%', sm: 'auto' },
        gap: 1,
        flexShrink: 0,
        flexWrap: 'wrap',
        '& .MuiInputBase-root, & .MuiButton-root': { minWidth: 0, flex: { xs: '1 1 110px', sm: 'initial' } }
      } }>
        <Select
          value={ composer.tone }
          onChange={ event => composer.setTone( event.target.value ) }
          size="small"
          inputProps={ { 'aria-label': 'AI reply tone' } }
          disabled={ busy }
        >
          { TONES.map( tone => <MenuItem key={ tone.value } value={ tone.value }>{ tone.label }</MenuItem> ) }
        </Select>
        <Button variant="outlined" startIcon={ <AutoAwesomeOutlinedIcon /> } onClick={ composer.draftWithAi } disabled={ busy }>
          { composer.generating ? 'Drafting…' : generateLabel }
        </Button>
      </AdminRow>
    </AiToolbar>
  );
}

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
