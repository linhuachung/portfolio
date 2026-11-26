'use client';

import { AdminRow } from '@/components/styled/Admin.styles';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Panel, ReplyItem } from './styles';

const smallActionSx = { px: 1, py: .5, fontSize: '.75rem' };

function ReplyEntry( { reply, actionsVisible, onEdit, onDelete } ) {
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

/** Sent replies plus the entry points for a new one. Actions hide while the composer is open. */
export default function ReplyList( { replies = [], composerOpen, generating, onNewReply, onDraftWithAi, onEdit, onDelete } ) {
  return (
    <Panel>
      <AdminRow sx={ { justifyContent: 'space-between', mb: 2 } }>
        <Typography component="h3" sx={ { fontSize: '.875rem', fontWeight: 650 } }>Replies ({ replies.length })</Typography>
        { !composerOpen && (
          <AdminRow sx={ { gap: 1, flexWrap: 'wrap', justifyContent: 'flex-end' } }>
            <Button variant="outlined" size="small" onClick={ onNewReply }>Write Reply</Button>
            <Button variant="contained" size="small" startIcon={ <AutoAwesomeOutlinedIcon /> } onClick={ onDraftWithAi } disabled={ generating }>
              { generating ? 'Drafting…' : 'Draft with AI' }
            </Button>
          </AdminRow>
        ) }
      </AdminRow>

      { replies.length > 0 ? (
        <Box sx={ { display: 'grid', gap: 1.5, mb: 2 } }>
          { replies.map( reply => (
            <ReplyEntry key={ reply.id } reply={ reply } actionsVisible={ !composerOpen } onEdit={ onEdit } onDelete={ onDelete } />
          ) ) }
        </Box>
      ) : (
        <Typography component="p" sx={ { mb: 2, color: 'text.secondary', fontSize: '.875rem' } }>
          No replies yet. Click &quot;Write Reply&quot; to send your first reply.
        </Typography>
      ) }
    </Panel>
  );
}
