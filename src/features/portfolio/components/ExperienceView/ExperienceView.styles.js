'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { AnimatedPanel } from '../../styles/PublicLayout.styles';

export const ExperienceViewRoot = styled( Box )( {
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: 'clamp(.8rem, 2vh, 1.35rem)',
  '@media (max-width: 680px)': { gap: '.55rem' },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplate: '1fr / minmax(260px, .72fr) minmax(0, 1fr)',
    gap: '1rem'
  }
} );

export const CareerTimeline = styled( Box )( ( { theme } ) => ( {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '&::before': { position: 'absolute', top: 18, right: '12.5%', left: '12.5%', height: 2, content: '""', backgroundColor: alpha( theme.palette.text.primary, .5 ) },
  '& li': { position: 'relative', zIndex: 1 },
  '@media (max-width: 680px)': { '&::before': { top: 14 } },
  '@media (max-height: 430px) and (orientation: landscape)': { alignSelf: 'center' }
} ) );

export const TimelineButton = styled( Button )( ( { theme } ) => ( {
  width: '100%',
  minHeight: 74,
  display: 'grid',
  justifyItems: 'center',
  gap: '.18rem',
  borderRadius: 10,
  padding: '0 .25rem',
  color: theme.palette.text.secondary,
  '&[aria-current="step"], &:hover': { color: theme.palette.text.primary },
  '&[aria-current="step"] [data-marker]': { borderWidth: 2, borderColor: theme.palette.primary.main },
  '&[aria-current="step"] img': { filter: 'none' },
  '@media (max-width: 680px)': { minHeight: 58 },
  '@media (max-height: 430px) and (orientation: landscape)': { minHeight: 54 }
} ) );

export const TimelineMarker = styled( Box )( ( { theme } ) => ( {
  width: 38,
  height: 38,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  border: `1px solid ${alpha( theme.palette.text.primary, .5 )}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.default,
  '& img': { width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' },
  '@media (max-width: 680px)': { width: 30, height: 30 }
} ) );

export const TimelineCompany = styled( Box )( { fontSize: '.68rem', fontWeight: 620, '@media (max-width: 680px)': { fontSize: '.58rem' } } );

export const TimelineYear = styled( Box )( { fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.58rem', '@media (max-width: 680px)': { display: 'none' } } );

export const RoleDetail = styled( AnimatedPanel )( ( { theme } ) => ( {
  minHeight: 0,
  display: 'grid',
  gridTemplate: 'auto minmax(0, 1fr) / minmax(220px, .85fr) minmax(0, 1.15fr)',
  columnGap: 'clamp(1.2rem, 4vw, 4rem)',
  alignContent: 'start',
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: 'clamp(1rem, 2.5vh, 1.6rem) 0 0',
  '& > header': { gridRow: '1 / 3', display: 'grid', alignContent: 'start', gap: '.5rem' },
  '@media (max-width: 680px)': {
    gridTemplate: 'auto auto minmax(0, 1fr) / 1fr',
    gap: '.35rem',
    paddingTop: '.55rem',
    '& > header': { gridRow: 'auto' }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    alignSelf: 'stretch',
    gridTemplate: 'auto auto minmax(0, 1fr) / 1fr',
    gap: '.15rem',
    paddingTop: 0,
    '& > header': {
      gridRow: 'auto',
      gap: '.08rem'
    },
    '& > header p': { fontSize: '.54rem', lineHeight: 1.15 },
    '& > header h2': { fontSize: '1rem', lineHeight: 1.05 }
  }
} ) );

export const PanelTabs = styled( Box )( ( { theme } ) => ( {
  alignSelf: 'start',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, auto))',
  gap: '1.1rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '@media (max-width: 680px)': { gridTemplateColumns: 'repeat(4, 1fr)', gap: '.3rem' }
} ) );

export const PanelTab = styled( Button )( ( { theme } ) => ( {
  position: 'relative',
  minWidth: 0,
  minHeight: 38,
  borderRadius: 10,
  padding: '.25rem 0',
  color: theme.palette.text.secondary,
  fontSize: '.72rem',
  textTransform: 'capitalize',
  '&::after': { position: 'absolute', right: 0, bottom: -1, left: 0, height: 2, content: '""', backgroundColor: theme.palette.primary.main, transform: 'scaleX(0)' },
  '&[aria-selected="true"]': { color: theme.palette.text.primary },
  '&[aria-selected="true"]::after': { transform: 'scaleX(1)' },
  '@media (max-width: 680px)': { minHeight: 32, paddingInline: '.1rem', fontSize: '.61rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { minHeight: 28, fontSize: '.58rem' }
} ) );

export const RolePanel = styled( AnimatedPanel )( {
  minHeight: 0,
  display: 'grid',
  alignContent: 'start',
  gap: '.85rem',
  paddingTop: '.9rem',
  '@media (max-width: 680px)': { gap: '.45rem', paddingTop: '.4rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.2rem', paddingTop: '.18rem' }
} );

export const RoleOverview = styled( Box )( {
  display: 'grid',
  gap: 'clamp(.85rem, 2vh, 1.25rem)',
  '& > p': { maxWidth: '60ch' },
  '@media (max-width: 680px)': { gap: '.55rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.35rem' }
} );

export const RoleSignals = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  borderTop: `1px solid ${theme.palette.divider}`,
  '& > li': {
    minWidth: 0,
    display: 'grid',
    alignContent: 'start',
    gap: '.28rem',
    padding: '.75rem .75rem 0 0'
  },
  '& > li + li': {
    borderLeft: `1px solid ${theme.palette.divider}`,
    paddingLeft: '.75rem'
  },
  '@media (max-width: 680px)': {
    '& > li': { gap: '.16rem', padding: '.45rem .4rem 0 0' },
    '& > li + li': { paddingLeft: '.4rem' }
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    '& > li': { paddingTop: '.3rem' }
  }
} ) );

export const SignalLabel = styled( Box )( ( { theme } ) => ( {
  color: theme.palette.primary.main,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.56rem',
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  '@media (max-width: 680px)': { fontSize: '.48rem' }
} ) );

export const SignalValue = styled( Box )( ( { theme } ) => ( {
  overflowWrap: 'anywhere',
  color: theme.palette.text.primary,
  fontSize: 'clamp(.7rem, .9vw, .84rem)',
  fontWeight: 620,
  lineHeight: 1.35,
  '@media (max-width: 680px)': { fontSize: '.6rem', lineHeight: 1.25 }
} ) );

export const CompanyProjects = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'minmax(130px, .42fr) minmax(0, 1fr)',
  gap: theme.spacing( 2 ),
  minHeight: 0,
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: '1fr', gap: theme.spacing( .75 ) },
  '@media (max-height: 430px) and (orientation: landscape)': { gridTemplateColumns: 'minmax(105px, .34fr) minmax(0, 1fr)', gap: '.6rem' }
} ) );

export const ProjectSelector = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( .5 ),
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& .MuiButton-root': { width: '100%', minHeight: 34, justifyContent: 'flex-start', border: `1px solid ${theme.palette.divider}`, borderRadius: 4, color: theme.palette.text.secondary, padding: '.28rem .5rem', fontSize: '.68rem', lineHeight: 1.1 },
  '& .MuiButton-root[aria-current="true"]': { borderColor: theme.palette.primary.main, color: theme.palette.text.primary, backgroundColor: alpha( theme.palette.primary.main, .1 ) },
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gap: '.2rem',
    '& .MuiButton-root': { minHeight: 28, padding: '.18rem .35rem', fontSize: '.58rem' }
  }
} ) );

export const ProjectSummary = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( .55 ),
  paddingLeft: theme.spacing( 2 ),
  borderLeft: `1px solid ${theme.palette.divider}`,
  '& h3': { margin: 0, color: theme.palette.text.primary, fontSize: 'clamp(1.1rem, 2vw, 1.65rem)', lineHeight: 1.05 },
  '& p': { margin: 0 },
  [theme.breakpoints.down( 'sm' )]: { paddingLeft: 0, borderLeft: 0, '& h3': { fontSize: '1rem' }, '& p': { fontSize: '.72rem', lineHeight: 1.35 } },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gap: '.24rem',
    paddingLeft: '.55rem',
    '& h3': { fontSize: '.9rem' },
    '& p': { fontSize: '.62rem', lineHeight: 1.22 }
  }
} ) );

export const ProjectMeta = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing( .35, .75 ),
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.62rem',
  '@media (max-width: 360px)': { '& span:nth-of-type(3)': { display: 'none' } },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.12rem .45rem', fontSize: '.52rem' }
} ) );

export const TagList = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '.4rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& li': { border: `1px solid ${theme.palette.divider}`, padding: '.35rem .55rem', color: theme.palette.text.secondary, fontSize: '.7rem' },
  '@media (max-width: 680px)': { gap: '.25rem', '& li': { padding: '.2rem .38rem', fontSize: '.6rem' } },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.18rem', '& li': { padding: '.12rem .3rem', fontSize: '.54rem' } }
} ) );

export const NumberedList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& li': { display: 'grid', gridTemplateColumns: '2rem minmax(0, 1fr)', gap: '.55rem', padding: '.52rem 0', borderTop: `1px solid ${theme.palette.divider}`, color: theme.palette.text.secondary, fontSize: 'clamp(.76rem, .9vw, .9rem)', lineHeight: 1.4 },
  '& li span': { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.65rem' },
  '@media (max-width: 680px)': { '& li': { padding: '.35rem 0', fontSize: '.72rem' } },
  '@media (max-height: 430px) and (orientation: landscape)': { '& li': { padding: '.25rem 0', fontSize: '.66rem' } }
} ) );
