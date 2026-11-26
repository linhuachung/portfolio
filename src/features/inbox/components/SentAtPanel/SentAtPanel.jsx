'use client';

import { DetailValue, Panel } from '../../styles/ContactDetail.styles';
import DetailField from '../DetailField';

const formatSentAt = ( value ) => {
  const date = new Date( value );
  return {
    date: date.toLocaleDateString( 'en-US', { year: 'numeric', month: 'long', day: 'numeric' } ),
    time: date.toLocaleTimeString( 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true } )
  };
};

export default function SentAtPanel( { createdAt } ) {
  const { date, time } = formatSentAt( createdAt );
  return (
    <Panel sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 } }>
      <DetailField label="Date Sent"><DetailValue component="p">{ date }</DetailValue></DetailField>
      <DetailField label="Time Sent"><DetailValue component="p">{ time }</DetailValue></DetailField>
    </Panel>
  );
}
