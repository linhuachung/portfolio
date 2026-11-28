'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import { StaticView } from '../../styles/Resume.styles';

const NARROW = '@media (max-width: 680px)';
const LANDSCAPE = '@media (max-height: 520px) and (orientation: landscape)';

export const AboutViewRoot = styled( StaticView )( {
  maxWidth: 1180,
  gridTemplate: 'auto / minmax(0, 1.1fr) minmax(300px, .9fr)',
  alignItems: 'start',
  gap: 'clamp(2rem, 5vw, 5rem)',
  [NARROW]: { gridTemplate: 'auto auto / 1fr', alignContent: 'start', gap: '.75rem' },
  [LANDSCAPE]: { gridTemplate: '1fr / minmax(0, 1.1fr) minmax(250px, .9fr)', gap: '1rem' }
} );

export const AboutNarrative = styled( Box )( { minWidth: 0, display: 'grid', alignContent: 'start', gap: 'clamp(.75rem, 1.6vh, 1.1rem)', [NARROW]: { gap: '.5rem' }, [LANDSCAPE]: { gap: '.35rem' } } );

export const AboutSummary = styled( Box )( ( { theme } ) => ( { maxWidth: '58ch', margin: 0, color: theme.palette.text.secondary, fontSize: '1rem', lineHeight: 1.6, textWrap: 'pretty', [NARROW]: { maxWidth: 'none', fontSize: '.8125rem', lineHeight: 1.45 }, [LANDSCAPE]: { fontSize: '.75rem', lineHeight: 1.35 } } ) );

// Short phones drop the domain chips; Home and Experience already list the domains.
export const AboutDomains = styled( Box )( ( { theme } ) => ( { display: 'flex', flexWrap: 'wrap', gap: '.45rem', margin: '.2rem 0 0', padding: 0, listStyle: 'none', '& .MuiChip-root': { height: 30, borderColor: theme.palette.divider, borderRadius: 6, color: theme.palette.text.primary, fontSize: '.8125rem' }, [NARROW]: { gap: '.3rem', marginTop: 0, '& .MuiChip-root': { height: 26, fontSize: '.75rem' } }, [LANDSCAPE]: { '& .MuiChip-root': { height: 24, fontSize: '.6875rem' } }, '@media (max-width: 680px) and (max-height: 620px)': { display: 'none' } } ) );

export const ProfilePanel = styled( Paper )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: '.6rem', border: `1px solid ${theme.palette.divider}`, borderRadius: 8, padding: 'clamp(1rem, 2.4vw, 1.5rem)', color: theme.palette.text.primary, backgroundColor: alpha( theme.palette.background.paper, .58 ), [NARROW]: { gap: '.3rem', padding: '.6rem .75rem' }, [LANDSCAPE]: { gap: '.2rem', padding: '.45rem .65rem' } } ) );

export const ProfileFacts = styled( Box )( ( { theme } ) => ( { display: 'grid', gridTemplateColumns: '1fr', margin: 0, padding: 0, listStyle: 'none', '& > li': { minWidth: 0, display: 'grid', gridTemplateColumns: '2rem minmax(0, 1fr)', alignItems: 'center', gap: '.75rem', borderTop: `1px solid ${theme.palette.divider}`, padding: '.75rem 0' }, [NARROW]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 .7rem', '& > li': { gridTemplateColumns: '1.4rem minmax(0, 1fr)', gap: '.35rem', padding: '.4rem 0' } }, [LANDSCAPE]: { '& > li': { padding: '.3rem 0' } }, '@media (max-width: 900px), (max-height: 760px)': { '& > li:nth-of-type(5)': { display: 'none' } } } ) );

export const FactIcon = styled( Box )( ( { theme } ) => ( { width: '2rem', height: '2rem', display: 'grid', placeItems: 'center', color: theme.palette.text.secondary, [NARROW]: { width: '1.4rem', height: '1.4rem', '& svg': { fontSize: '1rem' } } } ) );

export const FactCopy = styled( Box )( { minWidth: 0, display: 'grid', gap: '.15rem' } );

export const FactLabel = styled( Box )( ( { theme } ) => ( { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', letterSpacing: '.08em', textTransform: 'uppercase' } ) );

export const FactValue = styled( Box )( ( { theme } ) => ( { minWidth: 0, overflowWrap: 'anywhere', color: theme.palette.text.primary, fontSize: '.875rem', fontWeight: 600, lineHeight: 1.35, [NARROW]: { fontSize: '.75rem' } } ) );
