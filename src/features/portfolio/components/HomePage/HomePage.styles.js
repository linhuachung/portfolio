'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, keyframes, styled } from '@mui/material/styles';
import { AnimatedPanel, ScreenPage } from '../../styles/PublicLayout.styles';
import ResumeLink from '../ResumeLink';

const NARROW = '@media (max-width: 680px)';
const LANDSCAPE = '@media (max-height: 430px) and (orientation: landscape)';
// Phones shorter than an iPhone 14 drop the career path and the facts row from the card.
const SHORT_PHONE = '@media (max-width: 680px) and (max-height: 760px)';
const TINY_PHONE = '@media (max-width: 680px) and (max-height: 620px)';

const livePulse = keyframes`
  0% { box-shadow: 0 0 0 0 var(--pulse-color); }
  70% { box-shadow: 0 0 0 6px transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
`;

export const HomeScreen = styled( ScreenPage )( {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.1fr) minmax(380px, .9fr)',
  alignItems: 'start',
  gap: 'clamp(2rem, 6vw, 6.5rem)',
  // A hero, so it sits in the optical centre once the screen is tall enough to leave room.
  '@media (min-width: 681px) and (min-height: 700px)': { alignContent: 'center', alignItems: 'center' },
  '@media (max-width: 900px)': { gridTemplateColumns: 'minmax(0, 1fr) minmax(300px, .95fr)', gap: '1.5rem' },
  // Upright tablets stack the card under the copy instead of squeezing two columns.
  '@media (min-width: 681px) and (max-width: 900px) and (min-height: 1000px)': {
    gridTemplateColumns: 'minmax(0, 40rem)',
    justifyContent: 'center',
    gap: '2.5rem'
  },
  [NARROW]: { gridTemplateColumns: '1fr', alignContent: 'start', gap: '1rem' },
  [LANDSCAPE]: { gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, .9fr)', gap: '1.25rem' }
} );

/* ---------- Left: positioning copy ---------- */

export const HomeCopy = styled( AnimatedPanel )( {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 'clamp(.9rem, 2.2vh, 1.4rem)',
  [NARROW]: { gap: '.7rem' },
  [LANDSCAPE]: { gap: '.45rem' }
} );

export const Eyebrow = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: '1rem',
  fontWeight: 600,
  letterSpacing: '-.01em',
  lineHeight: 1.3,
  '& > span': { color: theme.palette.primary.main },
  [NARROW]: { fontSize: '.9375rem' },
  [LANDSCAPE]: { fontSize: '.8125rem' },
  // The smallest phones read the name in the card instead.
  [TINY_PHONE]: { display: 'none' }
} ) );

export const HomeTitle = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '11.5em',
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: 'clamp(2.75rem, 4.4vw, 4.25rem)',
  fontWeight: 580,
  letterSpacing: '-.05em',
  lineHeight: .95,
  textWrap: 'balance',
  '@media (max-width: 900px)': { fontSize: 'clamp(2.5rem, 6.4vw, 3.5rem)' },
  [NARROW]: { fontSize: 'clamp(1.75rem, 8.4vw, 2.75rem)', lineHeight: 1 },
  [LANDSCAPE]: { fontSize: '2.25rem' }
} ) );

export const Positioning = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '34rem',
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: 'clamp(1rem, 1.25vw, 1.125rem)',
  lineHeight: 1.6,
  textWrap: 'pretty',
  [NARROW]: { fontSize: '.9375rem', lineHeight: 1.5 },
  [LANDSCAPE]: { fontSize: '.8125rem', lineHeight: 1.4 },
  // On short phones the headline carries the message; the card keeps the facts.
  '@media (max-width: 680px) and (max-height: 680px)': { display: 'none' }
} ) );

export const HomeActions = styled( Box )( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '.75rem',
  marginTop: '.35rem',
  [NARROW]: { width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.6rem', marginTop: '.15rem' },
  [LANDSCAPE]: { marginTop: 0 }
} );

const actionBase = theme => ( {
  minHeight: 48,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.4rem',
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 8,
  padding: '0 1.35rem',
  fontSize: '.9375rem',
  fontWeight: 620,
  lineHeight: 1,
  textDecoration: 'none',
  textTransform: 'none',
  transition: 'background-color 160ms ease, color 160ms ease, border-color 160ms ease',
  whiteSpace: 'nowrap',
  [NARROW]: { minHeight: 44, padding: '0 .9rem' },
  '@media (max-width: 360px)': { padding: '0 .5rem', fontSize: '.875rem' },
  [LANDSCAPE]: { minHeight: 36, padding: '0 .8rem', fontSize: '.8125rem' }
} );

export const PrimaryAction = styled( Button )( ( { theme } ) => ( {
  ...actionBase( theme ),
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.primary.main }
} ) );

export const SecondaryAction = styled( Button )( ( { theme } ) => ( {
  ...actionBase( theme ),
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  '&:hover': { color: theme.palette.background.default, backgroundColor: theme.palette.text.primary }
} ) );

/* ---------- Right: profile card ---------- */

export const ProfileCard = styled( AnimatedPanel )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: 'clamp(1rem, 2.6vh, 1.6rem)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 8,
  padding: 'clamp(1.25rem, 2.2vw, 2rem)',
  background: `radial-gradient(120% 70% at 100% 0%, ${alpha( theme.palette.primary.main, .09 )}, transparent 60%), ${alpha( theme.palette.background.paper, .55 )}`,
  animationDelay: '45ms',
  '& > * + *': { borderTop: `1px solid ${theme.palette.divider}`, paddingTop: 'clamp(1rem, 2.6vh, 1.6rem)' },
  [NARROW]: { gap: '.8rem', padding: '1rem', '& > * + *': { paddingTop: '.8rem' } },
  [LANDSCAPE]: { gap: '.5rem', padding: '.7rem .85rem', '& > * + *': { paddingTop: '.5rem' } }
} ) );

export const CardSection = styled( Box )( {
  minWidth: 0,
  display: 'grid',
  gap: '.85rem',
  [NARROW]: { gap: '.6rem' },
  [LANDSCAPE]: { gap: '.35rem' },
  '&[data-path]': { [SHORT_PHONE]: { display: 'none' }, [LANDSCAPE]: { display: 'none' } }
} );

export const SectionLabel = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.6875rem',
  fontWeight: 600,
  letterSpacing: '.1em',
  lineHeight: 1.3,
  textTransform: 'uppercase'
} ) );

// Photo, name, current role and place, with the live "Building at" status on the right.
export const Identity = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
  alignItems: 'center',
  gap: '1.1rem',
  '& p': { margin: 0 },
  '& p:first-of-type': { color: theme.palette.text.primary, fontSize: 'clamp(1.25rem, 1.7vw, 1.5rem)', fontWeight: 620, letterSpacing: '-.02em', lineHeight: 1.2 },
  '& p:nth-of-type(2)': { marginTop: '.25rem', color: theme.palette.text.secondary, fontSize: '.9375rem', lineHeight: 1.35 },
  '& p:nth-of-type(3)': { display: 'flex', alignItems: 'center', gap: '.3rem', marginTop: '.15rem', color: theme.palette.text.secondary, fontSize: '.8125rem', lineHeight: 1.35 },
  '& p:nth-of-type(3) svg': { fontSize: '.95rem' },
  [NARROW]: { gridTemplateColumns: 'auto minmax(0, 1fr)', gap: '.8rem', '& p:first-of-type': { fontSize: '1.125rem' }, '& p:nth-of-type(2)': { fontSize: '.8125rem' }, '& p:nth-of-type(3)': { fontSize: '.75rem' } },
  [LANDSCAPE]: { gridTemplateColumns: 'auto minmax(0, 1fr)', gap: '.6rem', '& p:first-of-type': { fontSize: '.9375rem' }, '& p:nth-of-type(2), & p:nth-of-type(3)': { fontSize: '.75rem' } },
  // Smaller photo where the card has to share the screen.
  '& .MuiAvatar-root': {
    [NARROW]: { width: 60, height: 60, borderRadius: 14, fontSize: 18 },
    [TINY_PHONE]: { width: 46, height: 46, borderRadius: 11, fontSize: 15 },
    [LANDSCAPE]: { width: 40, height: 40, borderRadius: 10, fontSize: 13, boxShadow: 'none' }
  }
} ) );

export const StatusPill = styled( Box )( ( { theme } ) => ( {
  alignSelf: 'start',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.5rem',
  borderRadius: 999,
  padding: '.25rem .65rem',
  color: theme.palette.primary.main,
  backgroundColor: alpha( theme.palette.primary.main, .1 ),
  fontSize: '.75rem',
  fontWeight: 620,
  lineHeight: 1.3,
  whiteSpace: 'nowrap',
  [NARROW]: { display: 'none' },
  [LANDSCAPE]: { display: 'none' }
} ) );

export const LiveDot = styled( Box )( ( { theme } ) => ( {
  '--pulse-color': alpha( theme.palette.primary.main, .5 ),
  width: 7,
  height: 7,
  flex: '0 0 auto',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: `${livePulse} 2.2s ease-out infinite`
} ) );

// "Résumé" label, then the PDF (filled) and the online view (outlined).
export const CvRow = styled( Box )( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr) minmax(0, 1fr)',
  alignItems: 'center',
  gap: '.6rem',
  '& > p': { marginRight: '.5rem' },
  [NARROW]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', '& > p': { display: 'none' } },
  [LANDSCAPE]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', '& > p': { display: 'none' } }
} );

export const CvAction = styled( ResumeLink )( ( { theme } ) => ( {
  ...actionBase( theme ),
  minHeight: 44,
  padding: '0 .9rem',
  fontSize: '.875rem',
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  '&:hover': { color: theme.palette.background.default, backgroundColor: theme.palette.text.primary },
  '&[data-filled]': { color: theme.palette.background.default, backgroundColor: theme.palette.text.primary },
  '&[data-filled]:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.primary.main },
  '@media (max-width: 360px)': { padding: '0 .5rem', fontSize: '.8125rem' }
} ) );

export const StatGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  margin: 0,
  paddingInline: 0,
  paddingBottom: 0,
  listStyle: 'none',
  '& > li': { minWidth: 0, display: 'grid', gap: '.3rem', paddingRight: '.75rem' },
  '& > li + li': { borderLeft: `1px solid ${theme.palette.divider}`, paddingLeft: 'clamp(.75rem, 1.6vw, 1.25rem)' },
  '& > li > span:first-of-type': { color: theme.palette.text.primary, fontSize: 'clamp(1.75rem, 2.4vw, 2.125rem)', fontWeight: 620, letterSpacing: '-.04em', lineHeight: 1 },
  '& > li > span:last-of-type': { color: theme.palette.text.secondary, fontSize: '.8125rem', lineHeight: 1.3 },
  '& [data-phone]': { display: 'none' },
  [NARROW]: { '& > li > span:first-of-type': { fontSize: '1.625rem' }, '& > li > span:last-of-type': { fontSize: '.75rem' }, '& [data-wide]': { display: 'none' }, '& [data-phone]': { display: 'inline' } },
  [LANDSCAPE]: { '& > li': { gap: '.1rem' }, '& > li > span:first-of-type': { fontSize: '1.25rem' }, '& > li > span:last-of-type': { fontSize: '.6875rem' } }
} ) );
