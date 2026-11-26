'use client';

import Loader from '@/components/Loader';
import { AdminRow, StatusBadge } from '@/components/styled/Admin.styles';
import { getServiceLabel } from '@/constants/email';
import { formatPhoneForDisplayWithCountry, generateTelLink } from '@/lib/phone-utils';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DetailLabel, DetailLink, DetailValue, Panel, PanelTitle } from './styles';

const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'read', label: 'Read' },
  { value: 'replied', label: 'Replied' },
  { value: 'archived', label: 'Archived' }
];

const formatSentAt = ( value ) => {
  const date = new Date( value );
  return {
    date: date.toLocaleDateString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' } ),
    time: date.toLocaleTimeString( 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true } )
  };
};

const displayName = ( contact ) => contact.name || `${contact.firstname || ''} ${contact.lastname || ''}`.trim();

function Detail( { label, children } ) {
  return (
    <Box>
      <DetailLabel component="p">{ label }</DetailLabel>
      { children }
    </Box>
  );
}

export function StatusBar( { contact, updating, onStatusChange } ) {
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
              📧 Opened: { new Date( contact.emailOpenedAt ).toLocaleString() }
            </Typography>
          ) }
          { contact.repliedAt && (
            <Typography component="span" sx={ { color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'nowrap' } }>
              Replied: { new Date( contact.repliedAt ).toLocaleDateString() }
            </Typography>
          ) }
        </Box>
      </AdminRow>
    </AdminRow>
  );
}

export function SentAtPanel( { createdAt } ) {
  const { date, time } = formatSentAt( createdAt );
  return (
    <Panel sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 } }>
      <Detail label="Date Sent"><DetailValue component="p">{ date }</DetailValue></Detail>
      <Detail label="Time Sent"><DetailValue component="p">{ time }</DetailValue></Detail>
    </Panel>
  );
}

export function ContactInfoPanel( { contact } ) {
  return (
    <Panel>
      <PanelTitle component="h3">Contact Information</PanelTitle>
      <Box sx={ { display: 'grid', gap: 1.5 } }>
        <Detail label="Name"><DetailValue component="p">{ displayName( contact ) }</DetailValue></Detail>
        <Detail label="Email"><DetailLink href={ `mailto:${contact.email}` }>{ contact.email }</DetailLink></Detail>
        { contact.phone && (
          <Detail label="Phone">
            <DetailLink href={ generateTelLink( contact.phone ) }>{ formatPhoneForDisplayWithCountry( contact.phone ) }</DetailLink>
          </Detail>
        ) }
        <Detail label="Service"><DetailValue component="p">{ getServiceLabel( contact.service ) }</DetailValue></Detail>
      </Box>
    </Panel>
  );
}

export function MessagePanel( { message } ) {
  return (
    <Panel>
      <PanelTitle component="h3">Message</PanelTitle>
      <Box sx={ { p: 1.5, border: 1, borderColor: 'divider', borderRadius: 1, bgcolor: 'background.paper' } }>
        <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.875rem', whiteSpace: 'pre-wrap' } }>{ message }</Typography>
      </Box>
    </Panel>
  );
}
