'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

export const panelIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PublicShell = styled( Box, {
  shouldForwardProp: property => !['$sansFont', '$monoFont'].includes( property )
} )( ( { theme, $sansFont, $monoFont } ) => ( {
  '--portfolio-sans': $sansFont,
  '--portfolio-mono': $monoFont,
  '--shell-gutter': 'clamp(1rem, 4vw, 4.5rem)',
  position: 'fixed',
  inset: 0,
  display: 'grid',
  gridTemplateRows: '70px minmax(0, 1fr)',
  height: '100dvh',
  overflow: 'hidden',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  fontFamily: 'var(--portfolio-sans), Arial, sans-serif',
  '& *, & *::before, & *::after': { boxSizing: 'border-box' },
  '& a, & button, & input, & textarea, & select': {
    touchAction: 'manipulation',
    font: 'inherit'
  },
  '& :focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 3
  },
  '@media (max-width: 900px)': { gridTemplateRows: '54px minmax(0, 1fr)' },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplateRows: '48px minmax(0, 1fr)'
  },
  '@media (min-resolution: 2dppx), (min-width: 2000px)': {
    position: 'relative',
    minHeight: '100dvh',
    overflow: 'visible'
  },
  '@media (prefers-reduced-motion: reduce)': {
    '& *, & *::before, & *::after': {
      scrollBehavior: 'auto !important',
      transitionDuration: '.001ms !important',
      animationDuration: '.001ms !important',
      animationIterationCount: '1 !important'
    }
  }
} ) );

export const SkipLink = styled( Link )( ( { theme } ) => ( {
  position: 'fixed',
  zIndex: theme.zIndex.tooltip + 1,
  top: theme.spacing( .5 ),
  left: theme.spacing( 1.5 ),
  padding: theme.spacing( 1, 1.5 ),
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  transform: 'translateY(-180%)',
  '&:focus': { transform: 'translateY(0)' }
} ) );

export const ViewportMain = styled( Box )( {
  minWidth: 0,
  minHeight: 0,
  overflowX: 'hidden',
  overflowY: 'auto'
} );

export const ShellContainer = styled( Box )( {
  width: 'min(100%, 1536px)',
  marginInline: 'auto',
  paddingRight: 'max(var(--shell-gutter), env(safe-area-inset-right))',
  paddingLeft: 'max(var(--shell-gutter), env(safe-area-inset-left))',
  '@media (max-width: 360px)': { paddingInline: '.8rem' }
} );

export const ScreenPage = styled( ShellContainer )( {
  minHeight: '100%',
  height: '100%',
  paddingTop: 'clamp(1.2rem, 3.2vh, 2.2rem)',
  paddingBottom: 'clamp(1.2rem, 3.2vh, 2.2rem)',
  '@media (max-width: 900px)': {
    paddingTop: 'clamp(.8rem, 2.3vh, 1.3rem)',
    paddingBottom: 'clamp(.8rem, 2.3vh, 1.3rem)'
  },
  '@media (max-height: 620px)': { paddingBlock: '.65rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { paddingBlock: '.15rem' }
} );

export const Kicker = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.primary.main,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: 'clamp(.65rem, .8vw, .75rem)',
  fontWeight: 650,
  letterSpacing: '.08em',
  lineHeight: 1.35,
  textTransform: 'uppercase'
} ) );

const heading = theme => ( {
  margin: 0,
  color: theme.palette.text.primary,
  fontWeight: 560,
  letterSpacing: '-.045em',
  textWrap: 'balance'
} );

export const DisplayTitle = styled( Typography )( ( { theme } ) => ( {
  ...heading( theme ),
  maxWidth: '12ch',
  fontSize: 'clamp(3rem, 6.8vw, 6.8rem)',
  lineHeight: .91,
  '@media (max-width: 680px)': { fontSize: 'clamp(2.6rem, 14vw, 4.5rem)', lineHeight: .92 },
  '@media (max-height: 430px) and (orientation: landscape)': { fontSize: '2.45rem' }
} ) );

export const SectionTitle = styled( Typography )( ( { theme } ) => ( {
  ...heading( theme ),
  fontSize: 'clamp(1.8rem, 3.4vw, 3.8rem)',
  lineHeight: .98
} ) );

export const ProjectTitle = styled( Typography )( ( { theme } ) => ( {
  ...heading( theme ),
  fontSize: 'clamp(1.75rem, 3vw, 3.3rem)',
  lineHeight: .96,
  '@media (max-width: 680px)': { fontSize: '1.35rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { fontSize: '1.15rem' }
} ) );

export const BodyCopy = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: 'clamp(.88rem, 1.05vw, 1.05rem)',
  lineHeight: 1.55
} ) );

export const PageHeading = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  paddingBottom: 'clamp(.85rem, 2vh, 1.25rem)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& > div:first-of-type': { display: 'grid', gap: '.45rem' },
  '@media (max-width: 680px)': {
    alignItems: 'center',
    paddingBottom: '.6rem',
    '& h1': { fontSize: '1.42rem' }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    paddingBottom: '.35rem',
    '& h1': { fontSize: '1.25rem' }
  }
} ) );

export const AnimatedPanel = styled( Box )( {
  animation: `${panelIn} 190ms ease-out both`
} );

export const TextLink = styled( Link )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: '.76rem',
  fontWeight: 620,
  textUnderlineOffset: '.3rem'
} ) );
