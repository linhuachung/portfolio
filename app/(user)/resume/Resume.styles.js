'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import { AnimatedPanel, PageHeading, ScreenPage } from '@/app/(user)/components/PublicLayout.styles';

export const ResumeScreen = styled( ScreenPage )( {
  display: 'grid',
  minHeight: 0,
  gridTemplate: 'auto minmax(0, 1fr) / minmax(135px, .22fr) minmax(0, 1fr)',
  columnGap: 'clamp(1.2rem, 3vw, 3.5rem)',
  '@media (max-width: 900px)': { gridTemplate: 'auto auto minmax(0, 1fr) / 1fr' },
  '@media (max-width: 680px)': { paddingBlock: '.4rem' }
} );

export const ResumeHeading = styled( PageHeading )( {
  gridColumn: '1 / -1',
  '@media (max-width: 900px)': { gridColumn: 1 },
  '@media (max-width: 680px)': { '& > a': { display: 'none' } }
} );

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
  borderRadius: 10,
  padding: '.4rem .8rem .4rem 0',
  color: theme.palette.text.secondary,
  textAlign: 'left',
  textTransform: 'capitalize',
  '& span': { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.64rem' },
  '&[aria-current="page"]': { color: theme.palette.text.primary, fontWeight: 620 },
  '@media (max-width: 900px)': { minHeight: 38, gridTemplateColumns: 'auto auto', gap: '.35rem', padding: '.35rem .65rem', fontSize: '.72rem' },
  '@media (max-width: 680px)': { width: '100%', justifyContent: 'center', paddingInline: '.2rem', '& span': { display: 'none' } },
  '@media (max-height: 430px) and (orientation: landscape)': { minHeight: 30 }
} ) );

export const ResumeContent = styled( AnimatedPanel )( {
  minWidth: 0,
  minHeight: 0,
  paddingTop: 'clamp(.8rem, 2vh, 1.2rem)',
  '@media (max-width: 900px)': { paddingTop: '.65rem' },
  '@media (max-width: 680px)': { paddingTop: '.45rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { paddingTop: '.35rem' }
} );

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

export const StaticView = styled( Box )( {
  maxWidth: 1050,
  width: '100%',
  height: '100%',
  display: 'grid',
  alignContent: 'start',
  gap: '1rem',
  padding: 'clamp(.75rem, 1.8vh, 1.25rem) clamp(1rem, 3vw, 3rem)',
  '& > h2': { maxWidth: '19ch' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.35rem', padding: '.25rem 0', '& > h2': { fontSize: '1.15rem', lineHeight: 1.03 } }
} );

export const SkillsGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  '& section': { borderTop: `1px solid ${alpha( theme.palette.text.primary, .5 )}`, paddingTop: '.65rem' },
  '& h3': { margin: '0 0 .5rem', fontSize: '.76rem' },
  '& ul': { margin: 0, padding: 0, listStyle: 'none', color: theme.palette.text.secondary, fontSize: '.78rem', lineHeight: 1.7 },
  '@media (max-width: 680px)': { gap: '.45rem', '& h3': { fontSize: '.68rem' }, '& ul': { fontSize: '.66rem', lineHeight: 1.55 } }
} ) );

export const SkillItem = styled( Box )( ( { theme } ) => ( {
  display: 'flex', alignItems: 'center', gap: '.5rem',
  '& svg': { width: '1rem', height: '1rem', flex: '0 0 auto', color: theme.palette.primary.main, strokeWidth: 1.7 },
  '@media (max-width: 680px)': { gap: '.32rem', '& svg': { width: '.82rem', height: '.82rem' } }
} ) );

export const EducationTimeline = styled( Box )( ( { theme } ) => ( {
  '--education-gap': 'clamp(1.5rem, 6vw, 5rem)',
  display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--education-gap)', margin: '.35rem 0 0', padding: 0, listStyle: 'none',
  '& > li': { position: 'relative', minWidth: 0 },
  '& > li:first-of-type::after': { position: 'absolute', zIndex: 0, top: 21, left: 21, width: 'calc(100% + var(--education-gap))', height: 2, content: '""', backgroundColor: alpha( theme.palette.text.primary, .5 ) },
  '& h3': { margin: 0, fontSize: 'clamp(.9rem, 1.5vw, 1.1rem)', lineHeight: 1.25 },
  '@media (max-width: 680px)': { '--education-gap': '.8rem', '& > li:first-of-type::after': { top: 17, left: 17 } },
  '@media (max-height: 430px) and (orientation: landscape)': { '& > li:first-of-type::after': { top: 14, left: 14 } }
} ) );

export const EducationNode = styled( Box )( { position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '.65rem', '@media (max-width: 680px)': { gap: '.4rem' } } );
export const EducationMarker = styled( Box )( ( { theme } ) => ( { width: 44, height: 44, display: 'grid', flex: '0 0 auto', placeItems: 'center', overflow: 'hidden', border: `1px solid ${alpha( theme.palette.text.primary, .5 )}`, borderRadius: '50%', backgroundColor: theme.palette.background.default, '& img': { width: '100%', height: '100%', objectFit: 'cover' }, '@media (max-width: 680px)': { width: 36, height: 36 }, '@media (max-height: 430px) and (orientation: landscape)': { width: 30, height: 30 } } ) );
export const EducationIndex = styled( Box )( ( { theme } ) => ( { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.64rem', letterSpacing: '.04em' } ) );
export const EducationDates = styled( EducationIndex )( { margin: '.65rem 0 .25rem', '@media (max-width: 680px)': { marginTop: '.45rem' }, '@media (max-height: 430px) and (orientation: landscape)': { marginTop: '.25rem' } } );
export const EducationLocation = styled( Box )( ( { theme } ) => ( { margin: '.25rem 0 .5rem', color: theme.palette.text.secondary, fontSize: '.68rem', '@media (max-width: 680px)': { fontSize: '.62rem' }, '@media (max-height: 430px) and (orientation: landscape)': { marginBlock: '.12rem .2rem' } } ) );
export const EducationPrograms = styled( Box )( ( { theme } ) => ( { display: 'grid', gap: '.24rem', margin: 0, padding: 0, listStyle: 'none', fontSize: '.75rem', '& a': { color: theme.palette.text.primary, textDecorationColor: theme.palette.divider, textUnderlineOffset: '.2em' }, '& a:hover': { color: theme.palette.primary.main }, '@media (max-width: 680px)': { fontSize: '.68rem' }, '@media (max-height: 430px) and (orientation: landscape)': { gap: '.08rem', fontSize: '.62rem' } } ) );

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
