'use client';

import { getServiceLabel } from '@/features/contact/constants/email';
import { formatPhoneForDisplayWithCountry, generateTelLink } from '@/shared/utils/phone';
import Box from '@mui/material/Box';
import { DetailValue, Panel, PanelTitle } from '../../styles/ContactDetail.styles';
import { DetailLink } from './ContactInfoPanel.styles';
import DetailField from '../DetailField';

const displayName = ( contact ) => contact.name || `${contact.firstname || ''} ${contact.lastname || ''}`.trim();

export default function ContactInfoPanel( { contact } ) {
  return (
    <Panel>
      <PanelTitle component="h3">Contact Information</PanelTitle>
      <Box sx={ { display: 'grid', gap: 1.5 } }>
        <DetailField label="Name"><DetailValue component="p">{ displayName( contact ) }</DetailValue></DetailField>
        <DetailField label="Email"><DetailLink href={ `mailto:${contact.email}` }>{ contact.email }</DetailLink></DetailField>
        { contact.phone && (
          <DetailField label="Phone">
            <DetailLink href={ generateTelLink( contact.phone ) }>{ formatPhoneForDisplayWithCountry( contact.phone ) }</DetailLink>
          </DetailField>
        ) }
        <DetailField label="Service"><DetailValue component="p">{ getServiceLabel( contact.service ) }</DetailValue></DetailField>
      </Box>
    </Panel>
  );
}
