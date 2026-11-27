'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { alpha, styled } from '@mui/material/styles';

const NARROW = '@media (max-width: 680px)';
const LANDSCAPE = '@media (max-height: 430px) and (orientation: landscape)';
// Certificate thumbnails only where there is room for them.
const ROOMY = '@media (min-width: 1100px) and (min-height: 820px)';
const SHORT_PHONE = '@media (max-width: 680px) and (max-height: 739px)';

// Years on one axis with a bar per study period (they overlap: training ran during the degree).
export const StudyStrip = styled( Box )( {
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--years), minmax(0, 1fr))',
  rowGap: '.35rem',
  maxWidth: 720,
  [SHORT_PHONE]: { display: 'none' },
  [LANDSCAPE]: { display: 'none' }
} );

export const StudyBar = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  overflow: 'hidden',
  borderRadius: 6,
  padding: '.3rem .6rem',
  color: theme.palette.text.primary,
  backgroundColor: alpha( theme.palette.primary.main, theme.palette.mode === 'dark' ? .3 : .16 ),
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  fontSize: '.8125rem',
  fontWeight: 600,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [NARROW]: { padding: '.25rem .45rem', fontSize: '.75rem' }
} ) );

export const StudyTicks = styled( Box )( ( { theme } ) => ( {
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: '.3rem',
  '& > span': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem' }
} ) );

export const EducationCards = styled( Box )( {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 'clamp(.75rem, 2vw, 1.5rem)',
  margin: '.25rem 0 0',
  padding: 0,
  listStyle: 'none',
  [NARROW]: { gridTemplateColumns: '1fr', gap: '.6rem' },
  [LANDSCAPE]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '.6rem' }
} );

export const EducationCard = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  alignContent: 'start',
  gap: '1rem',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: 'clamp(1rem, 1.8vw, 1.5rem)',
  backgroundColor: alpha( theme.palette.background.paper, .55 ),
  [NARROW]: { gap: '.55rem', padding: '.75rem .85rem' },
  [SHORT_PHONE]: { gap: '.4rem', padding: '.6rem .75rem' },
  [LANDSCAPE]: { gap: '.35rem', padding: '.5rem .65rem' }
} ) );

export const EducationHeader = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: '.85rem',
  '& h3': { margin: 0, color: theme.palette.text.primary, fontSize: '1.0625rem', fontWeight: 620, lineHeight: 1.3 },
  '& p': { margin: '.2rem 0 0', color: theme.palette.text.secondary, fontSize: '.8125rem', lineHeight: 1.35 },
  [NARROW]: { gap: '.65rem', '& h3': { fontSize: '.9375rem' }, '& p': { fontSize: '.75rem' } },
  [LANDSCAPE]: { gap: '.5rem', '& h3': { fontSize: '.8125rem' }, '& p': { fontSize: '.6875rem' } }
} ) );

export const EducationMarker = styled( Box )( ( { theme } ) => ( {
  width: 48,
  height: 48,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  backgroundColor: theme.palette.background.paper,
  '& img': { width: '100%', height: '100%', objectFit: 'cover' },
  [NARROW]: { width: 38, height: 38, borderRadius: 8 },
  [LANDSCAPE]: { width: 28, height: 28, borderRadius: 6 }
} ) );

export const ProgramList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gap: '.75rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& > li': { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '.9rem', alignItems: 'center', borderTop: `1px solid ${theme.palette.divider}`, paddingTop: '.75rem' },
  '& > li[data-preview]': { [ROOMY]: { gridTemplateColumns: 'auto minmax(0, 1fr)' } },
  '& p': { margin: 0 },
  '& p:first-of-type': { color: theme.palette.text.primary, fontSize: '.9375rem', fontWeight: 600, lineHeight: 1.35 },
  '& p + p': { marginTop: '.15rem', color: theme.palette.text.secondary, fontSize: '.8125rem', lineHeight: 1.35 },
  [NARROW]: { gap: '.4rem', '& > li': { gap: '.4rem', paddingTop: '.45rem' }, '& p:first-of-type': { fontSize: '.8125rem' }, '& p + p': { fontSize: '.75rem' } },
  // Short phones: programme name and its credential link share one line.
  [SHORT_PHONE]: { '& p + p': { display: 'none' }, '& > li > div': { display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '0 .75rem' }, '& > li > div > a': { marginTop: 0 } },
  [LANDSCAPE]: { gap: '.25rem', '& > li': { paddingTop: '.25rem' }, '& p:first-of-type': { fontSize: '.75rem' }, '& p + p': { display: 'none' } }
} ) );

export const CertificateThumb = styled( Box )( ( { theme } ) => ( {
  display: 'none',
  width: 64,
  height: 90,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 6,
  boxShadow: `0 6px 16px ${alpha( theme.palette.text.primary, .12 )}`,
  '& img': { display: 'block', width: '100%', height: '100%', objectFit: 'cover' },
  [ROOMY]: { display: 'block' }
} ) );

export const CredentialLink = styled( Link )( ( { theme } ) => ( {
  display: 'inline-flex',
  gap: '.25rem',
  marginTop: '.35rem',
  paddingBlock: '.25rem',
  color: theme.palette.text.primary,
  fontWeight: 600,
  textDecorationColor: theme.palette.divider,
  // Doubled class: the theme's Link typography would otherwise win.
  '&&': { fontSize: '.8125rem', [NARROW]: { fontSize: '.75rem' }, [LANDSCAPE]: { fontSize: '.6875rem' } },
  textUnderlineOffset: '.2em',
  '&:hover': { color: theme.palette.primary.main },
  [NARROW]: { marginTop: '.1rem', paddingBlock: '.2rem' },
  [LANDSCAPE]: { marginTop: 0, paddingBlock: 0 }
} ) );
