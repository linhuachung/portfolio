'use client';

import Loader from '@/shared/components/Loader';
import { AdminRow, StatusBadge } from '@/features/admin-shell/styles/Admin.styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' }
];

export default function StatusBar( { contact, updating, onStatusChange } ) {
  return (
    <AdminRow sx={ { justifyContent: 'space-between', flexWrap: 'wrap' } }>
      <AdminRow sx={ { gap: 1.5 } }>
        <StatusBadge component="span" $status={ contact.status } sx={ { px: 1.5, py: .75, border: 1, borderColor: 'currentColor', fontSize: '.875rem', fontWeight: 600 } }>
          { contact.status.toUpperCase() }
        </StatusBadge>
        { updating && <Loader type="ClipLoader" size={ 16 } /> }
      </AdminRow>
      <AdminRow sx={ { gap: 1 } }>
        <Select
          value={ contact.status }
          onChange={ event => onStatusChange( event.target.value ) }
          disabled={ updating }
          size="small"
          inputProps={ { 'aria-label': 'Contact status' } }
          sx={ { width: 140 } }
        >
          { STATUSES.map( status => <MenuItem key={ status.value } value={ status.value }>{ status.label }</MenuItem> ) }
        </Select>
        <Box sx={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: .5 } }>
          { contact.emailOpenedAt && (
            <Typography component="span" sx={ { color: 'success.main', fontSize: '.75rem', whiteSpace: 'nowrap' } }>
              📧 Opened:
              { ' ' }
              { new Date( contact.emailOpenedAt ).toLocaleString() }
            </Typography>
          ) }
          { contact.repliedAt && (
            <Typography component="span" sx={ { color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'nowrap' } }>
              Replied:
              { ' ' }
              { new Date( contact.repliedAt ).toLocaleDateString() }
            </Typography>
          ) }
        </Box>
      </AdminRow>
    </AdminRow>
  );
}
