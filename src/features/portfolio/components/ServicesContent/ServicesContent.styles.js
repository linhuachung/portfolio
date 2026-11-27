'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { AnimatedPanel, TextLink } from '../../styles/PublicLayout.styles';

const NARROW = '@media (max-width: 680px)';
const LANDSCAPE = '@media (max-height: 430px) and (orientation: landscape)';
const SHORT_PHONE = '@media (max-width: 680px) and (max-height: 739px)';
const TINY_PHONE = '@media (max-width: 680px) and (max-height: 600px)';

export const SelectorLayout = styled( Box )( {
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(220px, .34fr) minmax(0, 1fr)',
  [NARROW]: { gridTemplate: 'auto minmax(0, 1fr) / 1fr' },
  [LANDSCAPE]: { gridTemplate: '1fr / minmax(140px, .34fr) minmax(0, 1fr)' }
} );

export const ServiceSelector = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  margin: 0,
  padding: '1rem 0',
  listStyle: 'none',
  borderRight: `1px solid ${theme.palette.divider}`,
  [NARROW]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    paddingTop: 0,
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [LANDSCAPE]: {
    gridTemplateColumns: '1fr',
    paddingTop: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderBottom: 0
  }
} ) );

export const ServiceButton = styled( Button )( ( { theme } ) => ( {
  width: '100%',
  minWidth: 0,
  minHeight: 56,
  display: 'grid',
  gridTemplateColumns: '2.1rem 1fr',
  alignItems: 'center',
  justifyContent: 'initial',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: '.5rem 1rem .5rem 0',
  color: theme.palette.text.secondary,
  textAlign: 'left',
  textTransform: 'none',
  fontSize: '.9375rem',
  '& [data-service-number]': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', lineHeight: 1 },
  '& [data-service-label], & [data-service-compact]': { fontSize: 'inherit', lineHeight: 'inherit' },
  '& [data-service-compact]': { display: 'none' },
  '&:hover': { color: theme.palette.text.primary, backgroundColor: theme.palette.action.hover },
  '&[aria-selected="true"]': { color: theme.palette.text.primary, fontWeight: 620, backgroundColor: alpha( theme.palette.primary.main, .08 ) },
  '&[aria-selected="true"] [data-service-number]': { color: theme.palette.primary.main },
  [NARROW]: {
    minHeight: 44,
    gridTemplateColumns: '1.6rem minmax(0, 1fr)',
    justifyItems: 'start',
    borderTop: 0,
    padding: '.35rem .5rem',
    fontSize: '.8125rem',
    lineHeight: 1.15,
    '& [data-service-label]': { display: 'none' },
    '& [data-service-compact]': { display: 'block', whiteSpace: 'nowrap' }
  },
  [LANDSCAPE]: {
    minHeight: 40,
    gridTemplateColumns: '1.6rem minmax(0, 1fr)',
    justifyItems: 'start',
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: '.25rem .5rem 0 0',
    fontSize: '.75rem',
    lineHeight: 1.2,
    '& [data-service-label]': { display: 'block' },
    '& [data-service-compact]': { display: 'none' }
  }
} ) );

export const DetailPanel = styled( AnimatedPanel )( {
  minHeight: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(260px, .7fr)',
  alignContent: 'start',
  alignItems: 'start',
  gap: '1.5rem clamp(2rem, 5vw, 5rem)',
  padding: '1.5rem 0 1rem clamp(1.3rem, 4vw, 4rem)',
  [NARROW]: { gridTemplateColumns: '1fr', gap: '.75rem', padding: '.8rem 0 0' },
  [LANDSCAPE]: { gridTemplateColumns: '1fr', gap: '.3rem', padding: '.2rem 0 0 .75rem' }
} );

export const DetailCopy = styled( Box )( {
  display: 'grid',
  alignContent: 'start',
  justifyItems: 'start',
  gap: '.75rem',
  [NARROW]: { gap: '.5rem' },
  [LANDSCAPE]: { gap: '.25rem' }
} );

export const ServiceTitle = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '20ch',
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: '1.75rem',
  fontWeight: 580,
  letterSpacing: '-.035em',
  lineHeight: 1.1,
  textWrap: 'balance',
  [NARROW]: { maxWidth: 'none', fontSize: '1.25rem' },
  [LANDSCAPE]: { maxWidth: 'none', fontSize: '1rem' }
} ) );

export const CapabilityList = styled( Box )( ( { theme } ) => ( {
  width: '100%',
  maxWidth: '34rem',
  margin: '.25rem 0 0',
  padding: 0,
  listStyle: 'none',
  '& li': { display: 'flex', gap: '.6rem', padding: '.6rem 0', borderTop: `1px solid ${theme.palette.divider}`, color: theme.palette.text.primary, fontSize: '.9375rem', lineHeight: 1.4 },
  '& li::before': { content: '"✓"', color: theme.palette.primary.main, fontWeight: 700 },
  [NARROW]: { '& li': { padding: '.4rem 0', fontSize: '.8125rem' } },
  [SHORT_PHONE]: { '& li': { paddingBlock: '.3rem' } },
  [LANDSCAPE]: { margin: 0, '& li': { padding: '.2rem 0', fontSize: '.75rem' } }
} ) );

export const DiscussAction = styled( Button )( ( { theme } ) => ( {
  minHeight: 44,
  gap: '.4rem',
  marginTop: '.5rem',
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 8,
  padding: '0 1.2rem',
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  fontSize: '.875rem',
  fontWeight: 620,
  textTransform: 'none',
  '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.primary.main },
  [NARROW]: { marginTop: '.25rem' },
  [LANDSCAPE]: { minHeight: 36, marginTop: '.15rem', fontSize: '.75rem' }
} ) );

export const EvidenceCard = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gap: '.75rem',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: '1.25rem',
  backgroundColor: alpha( theme.palette.background.paper, .55 ),
  '& [data-project]': { margin: 0, color: theme.palette.text.primary, fontSize: '1rem', fontWeight: 620 },
  // Phones show the role line and the link; the stack and project name return on taller screens.
  [NARROW]: { gap: '.4rem', padding: '.7rem .8rem', '& > p:first-of-type': { display: 'none' } },
  [SHORT_PHONE]: { '& [data-project], & > ul': { display: 'none' } },
  [TINY_PHONE]: { display: 'none' },
  [LANDSCAPE]: { display: 'none' }
} ) );

export const EvidenceRole = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: '.75rem',
  '& [data-logo]': { width: 40, height: 40, overflow: 'hidden', border: `1px solid ${theme.palette.divider}`, borderRadius: 8, backgroundColor: theme.palette.background.paper },
  '& img': { display: 'block', width: '100%', height: '100%', objectFit: 'cover' },
  '& p': { margin: 0 },
  '& p:first-of-type': { color: theme.palette.text.primary, fontSize: '.9375rem', fontWeight: 620, lineHeight: 1.3 },
  '& p + p': { color: theme.palette.text.secondary, fontSize: '.8125rem', lineHeight: 1.35 },
  [NARROW]: { gap: '.6rem', '& [data-logo]': { width: 32, height: 32 }, '& p:first-of-type': { fontSize: '.8125rem' }, '& p + p': { fontSize: '.75rem' } }
} ) );

export const EvidenceStack = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '.35rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& li': { border: `1px solid ${theme.palette.divider}`, borderRadius: 6, padding: '.25rem .55rem', color: theme.palette.text.secondary, fontSize: '.8125rem' }
} ) );

export const EvidenceLink = styled( TextLink )( {
  justifySelf: 'start',
  display: 'inline-flex',
  gap: '.3rem',
  paddingBlock: '.35rem',
  fontSize: '.8125rem'
} );
