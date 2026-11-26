'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import { StaticView } from '../../styles/Resume.styles';

export const AboutViewRoot = styled( StaticView )( {
  maxWidth: 1180,
  gridTemplate: 'auto / minmax(0, 1.18fr) minmax(300px, .82fr)',
  alignItems: 'start',
  gap: 'clamp(2rem, 5vw, 5rem)',
  '@media (max-width: 680px)': { gridTemplate: 'auto auto / 1fr', alignContent: 'start', gap: '.65rem', padding: '.35rem 0' },
  '@media (max-height: 520px) and (orientation: landscape)': {
    gridTemplate: '1fr / minmax(0, 1.15fr) minmax(250px, .85fr)',
    gap: '1rem',
    padding: '.25rem 0'
  }
} );

export const AboutNarrative = styled( Box )( { minWidth: 0, display: 'grid', alignContent: 'start', gap: 'clamp(.75rem, 1.6vh, 1.1rem)', '@media (max-width: 680px)': { gap: '.45rem' } } );

export const AboutEyebrow = styled( Box )( { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' } );

export const AboutSequence = styled( Box )( ( { theme } ) => ( { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.62rem', letterSpacing: '.08em', '@media (max-width: 680px)': { display: 'none' } } ) );

export const AboutTitle = styled( Box )( ( { theme } ) => ( { margin: 0, maxWidth: '14ch', color: theme.palette.text.primary, fontSize: 'clamp(2.45rem, 4.7vw, 5.3rem)', fontWeight: 560, letterSpacing: '-.045em', lineHeight: .93, textWrap: 'balance', '@media (max-width: 680px)': { maxWidth: '15ch', fontSize: '1.7rem', lineHeight: .96 }, '@media (max-height: 520px) and (orientation: landscape)': { maxWidth: '17ch', fontSize: '1.55rem' } } ) );

export const AboutSummary = styled( Box )( ( { theme } ) => ( { maxWidth: '58ch', margin: 0, color: theme.palette.text.secondary, fontSize: 'clamp(.82rem, 1.05vw, 1rem)', lineHeight: 1.55, textWrap: 'pretty', '@media (max-width: 680px)': { maxWidth: 'none', fontSize: '.72rem', lineHeight: 1.35 }, '@media (max-height: 520px) and (orientation: landscape)': { fontSize: '.66rem', lineHeight: 1.3 } } ) );

export const AboutDomains = styled( Box )( ( { theme } ) => ( { display: 'flex', flexWrap: 'wrap', gap: '.45rem', margin: '.2rem 0 0', padding: 0, listStyle: 'none', '& .MuiChip-root': { height: 28, borderColor: theme.palette.divider, borderRadius: 0, color: theme.palette.text.primary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.62rem', letterSpacing: '.03em' }, '@media (max-width: 680px)': { gap: '.3rem', marginTop: 0, '& .MuiChip-root': { height: 23, fontSize: '.54rem' } } } ) );

export const ProfilePanel = styled( Paper )( ( { theme } ) => ( { position: 'relative', minWidth: 0, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, padding: 'clamp(1rem, 2.4vw, 1.75rem)', color: theme.palette.text.primary, backgroundColor: alpha( theme.palette.background.paper, .58 ), '@media (max-width: 680px)': { padding: '.55rem .7rem' }, '@media (max-height: 520px) and (orientation: landscape)': { padding: '.4rem .65rem' } } ) );

export const ProfilePanelHeading = styled( Box )( { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', paddingBottom: '.8rem', '@media (max-width: 680px)': { paddingBottom: '.3rem' } } );

export const ProfilePanelMark = styled( Box )( ( { theme } ) => ( { color: alpha( theme.palette.text.primary, .55 ), fontSize: 'clamp(3.5rem, 7vw, 6.5rem)', fontWeight: 680, lineHeight: .72, '@media (max-width: 680px)': { display: 'none' } } ) );

export const ProfileFacts = styled( Box )( ( { theme } ) => ( { display: 'grid', gridTemplateColumns: '1fr', margin: 0, padding: 0, listStyle: 'none', '& > li': { minWidth: 0, display: 'grid', gridTemplateColumns: '2rem minmax(0, 1fr)', alignItems: 'center', gap: '.75rem', borderTop: `1px solid ${theme.palette.divider}`, padding: '.75rem 0' }, '@media (max-width: 680px)': { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0 .7rem', '& > li': { gridTemplateColumns: '1.4rem minmax(0, 1fr)', gap: '.35rem', padding: '.38rem 0' } }, '@media (max-height: 520px) and (orientation: landscape)': { '& > li': { padding: '.42rem 0' } } } ) );

export const FactIcon = styled( Box )( ( { theme } ) => ( { width: '2rem', height: '2rem', display: 'grid', placeItems: 'center', color: theme.palette.primary.main, '@media (max-width: 680px)': { width: '1.4rem', height: '1.4rem', '& svg': { fontSize: '1rem' } } } ) );

export const FactCopy = styled( Box )( { minWidth: 0, display: 'grid', gap: '.12rem' } );

export const FactLabel = styled( Box )( ( { theme } ) => ( { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.58rem', letterSpacing: '.08em', textTransform: 'uppercase', '@media (max-width: 680px)': { fontSize: '.5rem' } } ) );

export const FactValue = styled( Box )( ( { theme } ) => ( { minWidth: 0, overflowWrap: 'anywhere', color: theme.palette.text.primary, fontSize: '.78rem', fontWeight: 620, lineHeight: 1.3, '@media (max-width: 680px)': { fontSize: '.64rem' } } ) );
