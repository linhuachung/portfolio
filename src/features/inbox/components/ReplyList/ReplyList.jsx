'use client';

import { AdminRow } from '@/features/admin-shell/styles/Admin.styles';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Panel } from '../../styles/ContactDetail.styles';
import ReplyEntry from '../ReplyEntry';

/** Sent replies plus the entry points for a new one. Actions hide while the composer is open. */
export default function ReplyList( { replies = [], composerOpen, generating, onNewReply, onDraftWithAi, onEdit, onDelete } ) {
  return (
    <Panel>
      <AdminRow sx={ { justifyContent: 'space-between', mb: 2 } }>
        <Typography component="h3" sx={ { fontSize: '.875rem', fontWeight: 650 } }>
          Replies (
          { replies.length }
          )
        </Typography>
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
