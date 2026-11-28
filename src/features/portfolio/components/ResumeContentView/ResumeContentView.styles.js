'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { AnimatedPanel, PageHeading } from '../../styles/PublicLayout.styles';

const NARROW = '@media (max-width: 680px)';
const SHORT_OR_LANDSCAPE = '@media (max-height: 600px), (max-height: 430px) and (orientation: landscape)';

export const ResumeHeading = styled( PageHeading )( {
  gridColumn: '1 / -1',
  '@media (max-width: 900px)': { gridColumn: 1 },
  [NARROW]: { alignItems: 'stretch', '& > [data-aside]': { display: 'none' } }
} );

// Photo beside the eyebrow, name and identity line. Phones drop the photo and the line.
export const HeadingIdentity = styled( Box )( {
  // Triple class: beats PageHeading's `& > div:first-of-type { display: grid }`.
  '&&&': { minWidth: 0, display: 'flex', alignItems: 'center', gap: '1.25rem' },
  '& > div': { minWidth: 0, display: 'grid', gap: '.4rem' },
  '@media (max-width: 1099px), (max-height: 820px)': { '& > .MuiAvatar-root': { width: 64, height: 64, borderRadius: 13, fontSize: 19 } },
  [NARROW]: { '&&&': { width: '100%' }, '& > .MuiAvatar-root': { display: 'none' }, '& > div': { width: '100%', gap: '.35rem' } },
  // Phone landscape: only the one-line career summary and the CV buttons.
  '@media (max-height: 430px) and (orientation: landscape)': { '& > .MuiAvatar-root': { display: 'none' }, '& > div > p': { display: 'none' } }
} );

export const IdentityLine = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0 1rem',
  '& > span': { display: 'inline-flex', alignItems: 'center', gap: '.3rem', color: theme.palette.text.secondary, fontSize: '.8125rem' },
  '& > span svg': { fontSize: '.95rem' },
  // Only on large desktops; Home and Contact carry the same links everywhere else.
  '@media (max-width: 1099px), (max-height: 820px)': { display: 'none' }
} ) );

export const ResumeTitle = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: 'clamp(2rem, 3vw, 2.75rem)',
  fontWeight: 580,
  letterSpacing: '-.04em',
  lineHeight: 1,
  // Beats PageHeading's generic `& h1` sizes.
  '&&': { [NARROW]: { fontSize: '1.5rem' } },
  // Short screens keep the name for assistive tech but spend the height on content.
  [SHORT_OR_LANDSCAPE]: { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }
} ) );

export const CompactCareer = styled( Box )( ( { theme } ) => ( {
  display: 'none',
  [NARROW]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '.75rem',
    '& > span': { color: theme.palette.text.secondary, fontSize: '.8125rem', fontWeight: 560, lineHeight: 1.3 },
    '& > div': { display: 'flex', flex: '0 0 auto', gap: '.4rem' },
    // The narrowest phones keep this to one line beside the CV buttons.
    '@media (max-width: 400px)': { '& [data-markets]': { display: 'none' } }
  }
} ) );

export const CvButton = styled( Button )( ( { theme } ) => ( {
  minHeight: 40,
  flex: '0 0 auto',
  gap: '.3rem',
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 8,
  padding: '0 1rem',
  color: theme.palette.text.primary,
  fontSize: '.8125rem',
  fontWeight: 620,
  lineHeight: 1,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  '&:hover': { color: theme.palette.background.default, backgroundColor: theme.palette.text.primary },
  '&[data-filled]': { color: theme.palette.background.default, backgroundColor: theme.palette.text.primary },
  '&[data-filled]:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.primary.main },
  [NARROW]: { minHeight: 40, padding: '0 .75rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { minHeight: 36 }
} ) );

export const HeadingAside = styled( Box )( {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem'
} );

// The PDF as the button, the online view as a quiet link under it.
export const CvLinks = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  justifyItems: 'stretch',
  gap: '.3rem',
  '& > a:last-of-type': { justifySelf: 'center', paddingBlock: '.2rem', color: theme.palette.text.secondary, fontSize: '.8125rem', textDecoration: 'none' },
  '& > a:last-of-type:hover': { color: theme.palette.primary.main },
  '@media (max-width: 1099px), (max-height: 620px)': { gridAutoFlow: 'column', alignItems: 'center', gap: '.75rem' }
} ) );

// Four numbers a recruiter can read before anything else on the page.
export const CareerStats = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& > li': {
    display: 'grid',
    justifyItems: 'center',
    gap: '.3rem',
    padding: '0 1.1rem',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.6875rem',
    letterSpacing: '.08em',
    textTransform: 'uppercase'
  },
  '& > li + li': { borderLeft: `1px solid ${theme.palette.divider}` },
  '& strong': {
    color: theme.palette.text.primary,
    fontFamily: 'var(--portfolio-sans), sans-serif',
    fontSize: 'clamp(1.125rem, 1.6vw, 1.5rem)',
    fontWeight: 650,
    letterSpacing: '-.02em',
    lineHeight: 1,
    textTransform: 'none'
  },
  '@media (max-width: 860px), (max-height: 620px)': { display: 'none' }
} ) );

export const ResumeRail = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  paddingTop: '1rem',
  borderRight: `1px solid ${theme.palette.divider}`,
  '@media (max-width: 900px)': {
    display: 'flex',
    paddingTop: '.4rem',
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '@media (max-width: 680px)': { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }
} ) );

export const RailButton = styled( Button )( ( { theme } ) => ( {
  minHeight: 48,
  display: 'grid',
  gridTemplateColumns: '2rem 1fr',
  alignItems: 'center',
  justifyContent: 'initial',
  borderRadius: 8,
  padding: '.4rem .8rem .4rem 0',
  color: theme.palette.text.secondary,
  textAlign: 'left',
  textTransform: 'capitalize',
  '& span': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem' },
  '&[aria-current="page"]': { color: theme.palette.text.primary, fontWeight: 620 },
  '&[aria-current="page"] span': { color: theme.palette.primary.main },
  '@media (max-width: 900px)': { minHeight: 44, gridTemplateColumns: 'auto auto', gap: '.35rem', padding: '.35rem .65rem', fontSize: '.8125rem' },
  '@media (max-width: 680px)': { width: '100%', justifyContent: 'center', paddingInline: '.2rem', '& span': { display: 'none' } },
  '@media (max-width: 360px)': { fontSize: '.75rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { minHeight: 36 }
} ) );

export const ResumeContent = styled( AnimatedPanel )( {
  minWidth: 0,
  minHeight: 0,
  paddingTop: 'clamp(.8rem, 2vh, 1.2rem)',
  '@media (max-width: 900px)': { paddingTop: '.65rem' },
  '@media (max-width: 680px)': { paddingTop: '.45rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { paddingTop: '.35rem' }
} );
