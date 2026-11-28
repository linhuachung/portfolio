'use client';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

// Phones and phone landscape show skills as chips.
const NARROW = '@media (max-width: 680px), (max-height: 430px) and (orientation: landscape)';
const LANDSCAPE = '@media (max-height: 430px) and (orientation: landscape)';
// Short phones: the current stack is repeated in the groups below, so it gives way.
const SHORT_PHONE = '@media (max-width: 680px) and (max-height: 739px)';
// Text-only chips so each group wraps onto fewer rows.
const TIGHT_CHIPS = '@media (max-width: 680px) and (max-height: 739px), (max-height: 430px) and (orientation: landscape)';

// What the owner works with today, read first.
export const CurrentStack = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '.5rem 1rem',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: '.75rem 1rem',
  backgroundColor: alpha( theme.palette.primary.main, .06 ),
  '& > p': { margin: 0, color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', fontWeight: 650, letterSpacing: '.08em', textTransform: 'uppercase' },
  '& > ul': { display: 'flex', flexWrap: 'wrap', gap: '.4rem', margin: 0, padding: 0, listStyle: 'none' },
  '& li': { display: 'inline-flex', alignItems: 'center', gap: '.4rem', border: `1px solid ${theme.palette.divider}`, borderRadius: 6, padding: '.25rem .55rem', color: theme.palette.text.primary, backgroundColor: theme.palette.background.default, fontSize: '.8125rem', fontWeight: 560 },
  '& li svg': { width: '.9rem', height: '.9rem', color: theme.palette.text.secondary },
  [NARROW]: { gap: '.4rem .6rem', padding: '.5rem .6rem', '& li': { padding: '.15rem .45rem', fontSize: '.75rem' } },
  [SHORT_PHONE]: { display: 'none' },
  [LANDSCAPE]: { padding: '.3rem .5rem', '& li': { fontSize: '.6875rem' } }
} ) );

export const SkillsGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 'clamp(1rem, 3vw, 2.5rem)',
  '& section': { borderTop: `1px solid ${theme.palette.divider}`, paddingTop: '.75rem' },
  '& h3': { margin: '0 0 .4rem', color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' },
  '& ul': { display: 'grid', margin: 0, padding: 0, listStyle: 'none' },
  // Phones: one row per group, skills as wrapping chips without the usage detail.
  [NARROW]: {
    gridTemplateColumns: '1fr',
    gap: '.6rem',
    '& section': { paddingTop: '.5rem' },
    '& h3': { marginBottom: '.4rem' },
    '& ul': { display: 'flex', flexWrap: 'wrap', gap: '.35rem' }
  },
  // Phone landscape: group label beside its chips instead of above them.
  [LANDSCAPE]: {
    gap: '.4rem',
    '& section': { display: 'grid', gridTemplateColumns: '6.5rem minmax(0, 1fr)', alignItems: 'center', paddingTop: '.4rem' },
    '& h3': { margin: 0 }
  }
} ) );

export const SkillItem = styled( Box )( ( { theme } ) => ( {
  minHeight: 36,
  display: 'grid',
  gridTemplateColumns: '1.1rem minmax(0, 1fr) auto',
  alignItems: 'center',
  columnGap: '.55rem',
  borderBottom: `1px solid ${alpha( theme.palette.text.primary, .08 )}`,
  color: theme.palette.text.primary,
  '& svg': { width: '1rem', height: '1rem', color: theme.palette.text.secondary },
  '& > span:first-of-type': { fontSize: '.9375rem', fontWeight: 520, lineHeight: 1.3 },
  '@media (max-height: 699px)': { minHeight: 30 },
  [NARROW]: {
    minHeight: 0,
    display: 'inline-flex',
    gap: '.35rem',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 6,
    padding: '.25rem .5rem',
    '& svg': { width: '.85rem', height: '.85rem' },
    '& > span:first-of-type': { fontSize: '.8125rem' }
  },
  [LANDSCAPE]: { '& > span:first-of-type': { fontSize: '.75rem' } },
  [TIGHT_CHIPS]: { padding: '.15rem .45rem', '& svg': { display: 'none' } }
} ) );

// Earlier tools, kept apart so the main groups read as the current toolkit.
export const AlsoUsed = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '.4rem .9rem',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: '.6rem',
  '& h3': { margin: 0, color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' },
  '& ul': { display: 'flex', flexWrap: 'wrap', gap: '.35rem', margin: 0, padding: 0, listStyle: 'none' },
  '& li': { display: 'inline-flex', alignItems: 'center', gap: '.35rem', border: `1px solid ${theme.palette.divider}`, borderRadius: 6, padding: '.15rem .5rem', color: theme.palette.text.secondary, fontSize: '.8125rem' },
  '& li svg': { width: '.85rem', height: '.85rem' },
  [TIGHT_CHIPS]: { paddingTop: '.4rem', '& li': { padding: '.1rem .4rem', fontSize: '.75rem' }, '& li svg': { display: 'none' } }
} ) );

// Logos of the employers whose stack or projects list the skill.
export const Usage = styled( Box )( ( { theme } ) => ( {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.45rem',
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.6875rem',
  whiteSpace: 'nowrap',
  [NARROW]: { display: 'none' }
} ) );

export const UsageLogos = styled( Box )( ( { theme } ) => ( {
  display: 'inline-flex',
  '& img': { width: 20, height: 20, border: `2px solid ${theme.palette.background.default}`, borderRadius: '50%', objectFit: 'cover', backgroundColor: theme.palette.background.paper },
  '& img + img': { marginLeft: -6 }
} ) );

export const VisuallyHidden = styled( Box )( {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap'
} );
