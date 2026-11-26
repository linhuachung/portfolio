'use client';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import {
  ClearState,
  InboxIdentity,
  InboxItem,
  InboxList,
  InboxMessage,
  InboxTime,
  InboxTopic,
  OverviewSurface,
  StatusChip,
  SurfaceDescription,
  SurfaceHeader,
  SurfaceTitle,
  TextLinkButton
} from '../../styles/Overview.styles';

const serviceLabels = {
  frontend: 'Product Interface',
  ui: 'Design System & UI',
  performance: 'Performance & Accessibility',
  fullstack: 'Engineering Collaboration'
};

const dateFormatter = new Intl.DateTimeFormat( 'en-US', {
  timeZone: 'Asia/Bangkok',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
} );

function formatDate( value ) {
  const date = new Date( value );
  return Number.isNaN( date.getTime() ) ? 'Date unavailable' : dateFormatter.format( date );
}

function statusColor( status ) {
  if ( status === 'pending' ) {return 'warning';}
  if ( status === 'replied' ) {return 'success';}
  if ( status === 'read' ) {return 'info';}
  return 'default';
}

function initials( name ) {
  return String( name || '?' )
    .split( /\s+/ )
    .slice( 0, 2 )
    .map( part => part.charAt( 0 ) )
    .join( '' )
    .toUpperCase();
}

export default function RecentContacts( { contacts = [], pendingCount = 0, sx } ) {
  const visibleContacts = contacts.slice( 0, 4 );

  return (
    <OverviewSurface component="section" aria-labelledby="inbox-preview-title" sx={ sx }>
      <SurfaceHeader>
        <Box>
          <SurfaceTitle component="h2" id="inbox-preview-title">Inbox</SurfaceTitle>
          <SurfaceDescription component="p">
            { pendingCount ? `${pendingCount} ${pendingCount === 1 ? 'conversation needs' : 'conversations need'} a reply.` : 'Recent portfolio conversations.' }
          </SurfaceDescription>
        </Box>
        <TextLinkButton
          component={ NextLink }
          href="/admin/contact"
          endIcon={ <ArrowForwardRoundedIcon fontSize="small" /> }
        >
          View Inbox
        </TextLinkButton>
      </SurfaceHeader>

      { visibleContacts.length ? (
        <InboxList component="ul">
          { visibleContacts.map( contact => (
            <Box component="li" key={ contact.id }>
              <InboxItem component={ NextLink } href={ `/admin/contact?message=${contact.id}` }>
                <InboxIdentity>
                  <Avatar
                    aria-hidden="true"
                    sx={ { width: 26, height: 26, bgcolor: 'action.hover', color: 'text.secondary', fontSize: '.64rem', fontWeight: 750 } }
                  >
                    { initials( contact.name ) }
                  </Avatar>
                  <Typography component="h3">{ contact.name }</Typography>
                  <StatusChip
                    size="small"
                    color={ statusColor( contact.status ) }
                    variant="outlined"
                    label={ contact.status }
                  />
                </InboxIdentity>
                <InboxTime component="time" dateTime={ contact.createdAt }>{ formatDate( contact.createdAt ) }</InboxTime>
                <InboxTopic component="p">{ serviceLabels[contact.service] || 'General Inquiry' }</InboxTopic>
                <InboxMessage component="p">{ contact.message || 'No message preview available.' }</InboxMessage>
              </InboxItem>
            </Box>
          ) ) }
        </InboxList>
      ) : (
        <ClearState role="status">
          <Box>
            <InboxOutlinedIcon aria-hidden="true" />
            <Typography component="p">No recent conversations</Typography>
            <Typography component="p">New portfolio inquiries will appear here.</Typography>
          </Box>
        </ClearState>
      ) }
    </OverviewSurface>
  );
}
