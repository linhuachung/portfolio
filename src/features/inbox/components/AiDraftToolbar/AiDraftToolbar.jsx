'use client';

import { AdminRow } from '@/features/admin-shell/styles/Admin.styles';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { AiToolbar } from './AiDraftToolbar.styles';

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'warm', label: 'Warm' },
  { value: 'concise', label: 'Concise' }
];

export default function AiDraftToolbar( { composer } ) {
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
      } }
      >
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
