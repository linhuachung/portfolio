'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, keyframes, styled } from '@mui/material/styles';
import { AnimatedPanel, ScreenPage } from '../../styles/PublicLayout.styles';

const signalPulse = keyframes`
  0%, 100% { opacity: .45; transform: scale(.72); }
  50% { opacity: 1; transform: scale(1); }
`;

const orbitDrift = keyframes`
  0%, 100% { opacity: .28; transform: translate3d(0, 0, 0) rotate(-7deg); }
  50% { opacity: .52; transform: translate3d(-6px, 4px, 0) rotate(2deg); }
`;

export const HomeScreen = styled( ScreenPage )( {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, .92fr) minmax(420px, 1.08fr)',
  alignItems: 'stretch',
  gap: 'clamp(2.4rem, 6vw, 7.5rem)',
  '@media (max-width: 900px)': {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(320px, .9fr)',
    gap: '1.75rem'
  },
  '@media (max-width: 680px)': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    gap: '.85rem'
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplate: 'minmax(0, 1fr) / minmax(0, 1fr) minmax(300px, .88fr)',
    gap: '1.25rem'
  }
} );

export const HomeCopy = styled( AnimatedPanel )( {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: 'clamp(.72rem, 1.65vh, 1.1rem)',
  '@media (max-width: 680px)': { justifyContent: 'flex-start', gap: '.58rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.42rem' }
} );

export const HomeTitle = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '12ch',
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: 'clamp(3.15rem, 6.2vw, 6.4rem)',
  fontWeight: 560,
  letterSpacing: '-.055em',
  lineHeight: .89,
  textWrap: 'balance',
  '@media (max-width: 900px)': { fontSize: 'clamp(2.8rem, 6.8vw, 4.5rem)' },
  '@media (max-width: 680px)': { maxWidth: '14ch', fontSize: 'clamp(2.15rem, 10.7vw, 3.35rem)', lineHeight: .92 },
  '@media (max-height: 430px) and (orientation: landscape)': { maxWidth: '13ch', fontSize: '2.25rem', lineHeight: .91 }
} ) );

export const Positioning = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '39rem',
  margin: 0,
  color: theme.palette.text.secondary,
  fontSize: 'clamp(.98rem, 1.25vw, 1.16rem)',
  lineHeight: 1.52,
  textWrap: 'pretty',
  '@media (max-width: 680px)': { maxWidth: '42rem', fontSize: '.86rem', lineHeight: 1.42 },
  '@media (max-height: 430px) and (orientation: landscape)': { fontSize: '.75rem', lineHeight: 1.35 }
} ) );

export const HomeActions = styled( Box )( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '.65rem',
  marginTop: '.25rem',
  '@media (max-width: 680px)': { marginTop: 0 }
} );

const Action = styled( Button )( ( { theme } ) => ( {
  minHeight: 42,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 10,
  padding: '.68rem 1.05rem',
  fontSize: '.76rem',
  fontWeight: 680,
  lineHeight: 1,
  '@media (max-height: 430px) and (orientation: landscape)': {
    minHeight: 36,
    padding: '.55rem .7rem',
    fontSize: '.68rem'
  }
} ) );

export const PrimaryAction = styled( Action )( ( { theme } ) => ( {
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  '&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.primary.main }
} ) );

export const SecondaryAction = styled( Action )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  '&:hover': { color: theme.palette.background.default, backgroundColor: theme.palette.text.primary }
} ) );

export const ResourceLinks = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '.35rem 1rem',
  '& a': {
    color: theme.palette.text.secondary,
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.67rem',
    textDecorationColor: alpha( theme.palette.text.primary, .45 ),
    textUnderlineOffset: '.28rem'
  },
  '& a:hover': { color: theme.palette.text.primary, textDecorationColor: theme.palette.primary.main },
  '@media (max-width: 680px) and (max-height: 620px)': { display: 'none' },
  '@media (max-height: 430px) and (orientation: landscape)': { display: 'none' }
} ) );

export const IdentityStage = styled( AnimatedPanel )( ( { theme } ) => ( {
  position: 'relative',
  minWidth: 0,
  minHeight: 0,
  display: 'grid',
  gridTemplateRows: 'auto minmax(150px, 1fr) auto auto',
  isolation: 'isolate',
  overflow: 'hidden',
  padding: 'clamp(1rem, 2.1vw, 1.65rem)',
  borderTop: `1px solid ${theme.palette.text.primary}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha( theme.palette.background.paper, .4 ),
  animationDelay: '45ms',
  '&::before': {
    position: 'absolute',
    zIndex: -2,
    inset: '12% -12% 18% 22%',
    border: `1px solid ${alpha( theme.palette.primary.main, .32 )}`,
    borderRadius: '50%',
    content: '""',
    transform: 'rotate(-7deg)',
    animation: `${orbitDrift} 7s ease-in-out infinite`
  },
  '&::after': {
    position: 'absolute',
    zIndex: -3,
    width: '62%',
    aspectRatio: '1',
    right: '-12%',
    top: '8%',
    borderRadius: '50%',
    content: '""',
    background: `radial-gradient(circle, ${alpha( theme.palette.primary.main, .18 )} 0, transparent 68%)`
  },
  '@media (max-width: 680px)': {
    gridTemplateRows: 'auto minmax(82px, 1fr) auto',
    padding: '.65rem .75rem',
    '&::before': { inset: '2% -12% 8% 38%' }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplateRows: 'auto minmax(76px, 1fr) auto',
    padding: '.55rem .7rem'
  }
} ) );

export const SignalHeader = styled( Box )( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem'
} );

export const CareerSignal = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  gap: '.45rem',
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.63rem',
  letterSpacing: '.035em',
  textTransform: 'uppercase'
} ) );

export const SignalDot = styled( Box )( ( { theme } ) => ( {
  width: 7,
  height: 7,
  flex: '0 0 auto',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  animation: `${signalPulse} 2.2s ease-in-out infinite`
} ) );

export const IdentityCanvas = styled( Box )( ( { theme } ) => ( {
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  overflow: 'hidden',
  color: theme.palette.text.primary,
  '& > span': {
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.62rem',
    letterSpacing: '.11em',
    textTransform: 'uppercase'
  },
  '@media (max-width: 680px)': { alignItems: 'flex-start' }
} ) );

export const Wordmark = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: 'transparent',
  fontSize: 'clamp(4.4rem, 10vw, 10.5rem)',
  fontWeight: 720,
  letterSpacing: '-.085em',
  lineHeight: .74,
  WebkitTextStroke: `1px ${alpha( theme.palette.text.primary, .72 )}`,
  '@media (max-width: 900px)': { fontSize: 'clamp(4rem, 10.5vw, 6.8rem)' },
  '@media (max-width: 680px)': { fontSize: 'clamp(3.7rem, 19vw, 6.8rem)', lineHeight: .78 },
  '@media (max-height: 430px) and (orientation: landscape)': { fontSize: '4.35rem' }
} ) );

export const CurrentRole = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: '3.2rem minmax(0, 1fr)',
  gap: '.8rem',
  paddingBlock: 'clamp(.7rem, 1.6vh, 1rem)',
  borderTop: `1px solid ${theme.palette.divider}`,
  '& > div': { display: 'grid', gap: '.15rem' },
  '& > div p:first-of-type': { color: theme.palette.text.primary, fontSize: '.9rem', fontWeight: 650 },
  '& > div p:last-of-type': { color: theme.palette.text.secondary, fontSize: '.75rem' },
  '& p': { margin: 0 },
  '@media (max-width: 680px), (max-height: 430px) and (orientation: landscape)': { display: 'none' }
} ) );

export const RoleLabel = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.primary.main,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.63rem',
  fontWeight: 650,
  letterSpacing: '.08em',
  textTransform: 'uppercase'
} ) );

export const ProofRail = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: '1.12fr 1.18fr .9fr',
  margin: 0,
  paddingTop: 'clamp(.7rem, 1.6vh, 1rem)',
  borderTop: `1px solid ${theme.palette.divider}`,
  '@media (max-width: 680px)': { gridTemplateColumns: '1.12fr .88fr', paddingTop: '.55rem' },
  '@media (max-width: 390px)': { gridTemplateColumns: '1fr' }
} ) );

export const ProofItem = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: '.25rem',
  margin: 0,
  paddingInline: '.75rem',
  borderLeft: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': { paddingLeft: 0, borderLeft: 0 },
  '& dt': {
    color: theme.palette.text.secondary,
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.56rem',
    letterSpacing: '.07em',
    textTransform: 'uppercase'
  },
  '& dd': { margin: 0, color: theme.palette.text.primary, fontSize: '.67rem', lineHeight: 1.35 },
  '@media (max-width: 680px)': { '&:nth-of-type(3)': { display: 'none' } },
  '@media (max-width: 390px)': { '&:nth-of-type(2)': { display: 'none' } }
} ) );
