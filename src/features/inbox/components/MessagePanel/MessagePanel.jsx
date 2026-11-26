'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Panel, PanelTitle } from '../../styles/ContactDetail.styles';

export default function MessagePanel( { message } ) {
  return (
    <Panel>
      <PanelTitle component="h3">Message</PanelTitle>
      <Box sx={ { p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' } }>
        <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'pre-wrap' } }>{ message }</Typography>
      </Box>
    </Panel>
  );
}
