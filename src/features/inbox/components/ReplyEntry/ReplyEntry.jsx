'use client';

import { AdminRow } from '@/features/admin-shell/styles/Admin.styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReplyItem } from './ReplyEntry.styles';

const smallActionSx = { px: 1, py: .5, fontSize: '.75rem' };

export default function ReplyEntry( { reply, actionsVisible, onEdit, onDelete } ) {
  const edited = reply.updatedAt && reply.updatedAt !== reply.createdAt;

  return (
    <ReplyItem>
      <Box sx={ { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 } }>
        <Box sx={ { flex: 1 } }>
          <Typography component="p" sx={ { mb: 1, color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'pre-wrap' } }>{ reply.message }</Typography>
          <AdminRow sx={ { gap: 1.5, color: 'text.secondary', fontSize: '.75rem' } }>
            <Typography component="span">{ new Date( reply.createdAt ).toLocaleString() }</Typography>
            { reply.emailSent && <Typography component="span" color="success.main">📧 Sent</Typography> }
            { edited && <Typography component="span" color="info.main">(Edited)</Typography> }
          </AdminRow>
        </Box>
        { actionsVisible && (
          <AdminRow sx={ { gap: 1 } }>
            <Button variant="outlined" size="small" sx={ smallActionSx } onClick={ () => onEdit( reply ) }>Edit</Button>
            <Button variant="outlined" size="small" color="error" sx={ smallActionSx } onClick={ () => onDelete( reply.id ) }>Delete</Button>
          </AdminRow>
        ) }
      </Box>
    </ReplyItem>
  );
}
