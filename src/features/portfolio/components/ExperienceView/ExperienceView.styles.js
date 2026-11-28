'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { AnimatedPanel } from '../../styles/PublicLayout.styles';

const NARROW = '@media (max-width: 680px)';
const LANDSCAPE = '@media (max-height: 430px) and (orientation: landscape)';
// Facts collapse to one line wherever the role header shares a single column.
const COMPACT = '@media (max-width: 680px), (max-height: 430px) and (orientation: landscape)';
// Upright tablets: one column, facts in a row of four.
const TABLET = '@media (min-width: 681px) and (max-width: 1099px) and (min-height: 900px)';
// Contributions shrink 3 → 2 → 1 with the screen height and are never hidden completely.
const SHORT = '@media (max-height: 739px), (max-width: 680px) and (max-height: 859px)';
// Short phones spend their height on contributions rather than the one-line role summary.
const NARROW_SHORT = '@media (max-width: 680px) and (max-height: 739px)';
const SHORTER = '@media (max-height: 600px), (max-height: 430px) and (orientation: landscape)';
const ROOMY = '@media (min-width: 1100px) and (min-height: 820px)';
const META_TEXT = { fontSize: '.8125rem', '@media (max-width: 389px), (max-height: 430px) and (orientation: landscape)': { fontSize: '.6875rem' } };

export const ExperienceViewRoot = styled( Box )( {
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto minmax(0, 1fr)',
  gap: 'clamp(.8rem, 2.4vh, 1.6rem)',
  [NARROW]: { gap: '.6rem' },
  // iPhone SE class: the timeline's two-line year labels take the height back from here.
  '@media (max-width: 680px) and (max-height: 600px)': { gap: '.35rem' },
  [LANDSCAPE]: {
    gridTemplate: '1fr / minmax(230px, .7fr) minmax(0, 1fr)',
    alignItems: 'start',
    gap: '1rem'
  }
} );

export const RoleDetail = styled( AnimatedPanel )( ( { theme } ) => ( {
  minHeight: 0,
  display: 'grid',
  gridTemplate: 'auto minmax(0, 1fr) / minmax(220px, .8fr) minmax(0, 1.2fr)',
  columnGap: 'clamp(1.2rem, 4vw, 4rem)',
  alignContent: 'start',
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: 'clamp(1rem, 2.5vh, 1.6rem) 0 0',
  '& > header': { gridRow: '1 / 3', display: 'grid', alignContent: 'start', gap: '.55rem' },
  // Phones read the dates in the facts line just below, so the eyebrow keeps only the company.
  [COMPACT]: { '& > header [data-dates]': { display: 'none' } },
  [ROOMY]: { paddingTop: '2rem' },
  [TABLET]: { gridTemplate: 'auto auto minmax(0, 1fr) / 1fr', rowGap: '.9rem', '& > header': { gridRow: 'auto' } },
  [NARROW]: {
    gridTemplate: 'auto auto minmax(0, 1fr) / 1fr',
    gap: '.4rem',
    paddingTop: '.6rem',
    '@media (max-height: 600px)': { gap: '.3rem', paddingTop: '.4rem' },
    '& > header': { gridRow: 'auto', gap: '.3rem' }
  },
  [LANDSCAPE]: {
    alignSelf: 'stretch',
    gridTemplate: 'auto auto minmax(0, 1fr) / 1fr',
    gap: '.15rem',
    borderTop: 0,
    paddingTop: 0,
    '& > header': { gridRow: 'auto', gap: '.1rem' },
    '& > header p': { fontSize: '.6875rem', lineHeight: 1.2 }
  }
} ) );

export const RoleTitle = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: '1.75rem',
  fontWeight: 580,
  letterSpacing: '-.035em',
  lineHeight: 1.08,
  textWrap: 'balance',
  [NARROW]: { fontSize: '1.25rem' },
  [LANDSCAPE]: { fontSize: '1.0625rem' }
} ) );

export const FactLabel = styled( Box )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.6875rem',
  fontWeight: 600,
  letterSpacing: '.08em',
  lineHeight: 1.3,
  textTransform: 'uppercase'
} ) );

export const FactValue = styled( Box )( ( { theme } ) => ( {
  overflowWrap: 'anywhere',
  color: theme.palette.text.primary,
  fontSize: '.875rem',
  fontWeight: 600,
  lineHeight: 1.35,
  [ROOMY]: { fontSize: '.9375rem' }
} ) );

export const RoleFacts = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  margin: '.6rem 0 0',
  padding: 0,
  listStyle: 'none',
  borderTop: `1px solid ${theme.palette.divider}`,
  '& > li': {
    minWidth: 0,
    display: 'grid',
    alignContent: 'start',
    gap: '.25rem',
    padding: '.7rem .75rem .7rem 0',
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '& > li:nth-of-type(even)': { borderLeft: `1px solid ${theme.palette.divider}`, paddingLeft: '.75rem' },
  [ROOMY]: { marginTop: '1rem', '& > li': { gap: '.3rem', paddingBlock: '1rem' } },
  [TABLET]: {
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    marginTop: '.4rem',
    '& > li + li': { borderLeft: `1px solid ${theme.palette.divider}`, paddingLeft: '.75rem' }
  },
  // Small screens: one line of values, e.g. "2 yrs 1 mo · Japan · Drone operations".
  [COMPACT]: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '.1rem .45rem',
    margin: 0,
    border: 0,
    '& > li, & > li:nth-of-type(even)': { display: 'block', padding: 0, border: 0 },
    '& > li + li::before': { marginRight: '.45rem', content: '"·"', color: theme.palette.text.secondary },
    // Tenure and market; the domain is repeated in each project's meta line.
    '& > li:nth-of-type(n+3)': { display: 'none' },
    '& span:first-of-type': { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' },
    '& span:last-of-type': { color: theme.palette.text.secondary, fontWeight: 560, ...META_TEXT }
  }
} ) );

export const PanelTabs = styled( Box )( ( { theme } ) => ( {
  alignSelf: 'start',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  borderBottom: `1px solid ${theme.palette.divider}`
} ) );

export const PanelTab = styled( Button )( ( { theme } ) => ( {
  position: 'relative',
  minWidth: 0,
  minHeight: 40,
  borderRadius: '8px 8px 0 0',
  padding: '.25rem 0',
  color: theme.palette.text.secondary,
  fontSize: '.875rem',
  fontWeight: 560,
  textTransform: 'none',
  '&::after': { position: 'absolute', right: 0, bottom: -1, left: 0, height: 2, content: '""', backgroundColor: theme.palette.primary.main, transform: 'scaleX(0)', transition: 'transform 160ms ease' },
  '&[aria-selected="true"]': { color: theme.palette.text.primary, fontWeight: 650 },
  '&[aria-selected="true"]::after': { transform: 'scaleX(1)' },
  '@media (max-width: 900px)': { minHeight: 44, fontSize: '.8125rem' },
  [LANDSCAPE]: { minHeight: 36 }
} ) );

export const RolePanel = styled( AnimatedPanel )( {
  minHeight: 0,
  display: 'grid',
  alignContent: 'start',
  gap: '.85rem',
  paddingTop: '.9rem',
  [NARROW]: { gap: '.45rem', paddingTop: '.5rem' },
  [LANDSCAPE]: { gap: '.2rem', paddingTop: '.25rem' }
} );

export const RoleOverview = styled( Box )( {
  display: 'grid',
  gap: 'clamp(.85rem, 2.2vh, 1.35rem)',
  '& > p': { maxWidth: '62ch' },
  [COMPACT]: { gap: '.5rem' },
  [NARROW_SHORT]: { '& > p': { display: 'none' } },
  [SHORTER]: { '& > p': { display: 'none' } }
} );

export const OverviewBlock = styled( Box )( {
  display: 'grid',
  gap: '.45rem',
  [NARROW]: { gap: '.3rem' },
  [LANDSCAPE]: { gap: '.15rem' }
} );

export const NumberedList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& li': { display: 'grid', gridTemplateColumns: '2rem minmax(0, 1fr)', gap: '.55rem', padding: '.55rem 0', borderTop: `1px solid ${theme.palette.divider}`, color: theme.palette.text.secondary, fontSize: '.9375rem', lineHeight: 1.45 },
  '& li > span:first-of-type': { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', lineHeight: 2 },
  [ROOMY]: { '& li': { padding: '.8rem 0' } },
  [NARROW]: { '& li': { gridTemplateColumns: '1.6rem minmax(0, 1fr)', gap: '.4rem', padding: '.4rem 0', fontSize: '.8125rem', lineHeight: 1.4 } },
  [SHORT]: {
    '& li:nth-of-type(n+3)': { display: 'none' },
    '& li > span:last-of-type': { display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }
  },
  [SHORTER]: { '& li:nth-of-type(n+2)': { display: 'none' } },
  [LANDSCAPE]: { '& li': { padding: '.25rem 0', fontSize: '.8125rem' } }
} ) );

export const TagList = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '.4rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& li': { border: `1px solid ${theme.palette.divider}`, borderRadius: 6, padding: '.3rem .6rem', color: theme.palette.text.secondary, lineHeight: 1.3, ...META_TEXT },
  [NARROW]: { gap: '.3rem', '& li': { padding: '.2rem .45rem' } },
  [LANDSCAPE]: { gap: '.2rem', '& li': { padding: '.1rem .35rem' } }
} ) );

export const CompanyProjects = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'minmax(150px, .42fr) minmax(0, 1fr)',
  gap: theme.spacing( 2 ),
  minHeight: 0,
  '&[data-single]': { gridTemplateColumns: 'minmax(0, 1fr)' },
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: '1fr', gap: theme.spacing( .75 ) },
  [LANDSCAPE]: { gridTemplateColumns: 'minmax(132px, .36fr) minmax(0, 1fr)', gap: '.6rem' }
} ) );

export const ProjectSelector = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( .5 ),
  margin: 0,
  padding: 0,
  listStyle: 'none',
  '& .MuiButton-root': { width: '100%', minHeight: 40, justifyContent: 'flex-start', border: `1px solid ${theme.palette.divider}`, borderRadius: 8, color: theme.palette.text.secondary, padding: '.3rem .7rem', fontSize: '.8125rem', lineHeight: 1.2, textAlign: 'left', textTransform: 'none' },
  '& .MuiButton-root[aria-current="true"]': { borderColor: theme.palette.primary.main, color: theme.palette.text.primary, fontWeight: 620, backgroundColor: alpha( theme.palette.primary.main, .08 ) },
  // The narrowest phones show just the project name; the years sit on the timeline above.
  '@media (max-width: 360px)': { '& [data-years]': { display: 'none' } },
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
  [LANDSCAPE]: { gap: '.2rem', '& .MuiButton-root': { minHeight: 36, padding: '.15rem .4rem', fontSize: '.6875rem' } }
} ) );

export const ProjectSummary = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( .75 ),
  '[data-single] > &': { paddingLeft: 0, borderLeft: 0 },
  paddingLeft: theme.spacing( 2 ),
  borderLeft: `1px solid ${theme.palette.divider}`,
  '& h3': { margin: 0, color: theme.palette.text.primary, fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-.03em', lineHeight: 1.08 },
  '& p': { margin: 0 },
  [theme.breakpoints.down( 'sm' )]: { gap: theme.spacing( .5 ), paddingLeft: 0, borderLeft: 0, '& h3': { fontSize: '1.125rem' }, '& > p': { fontSize: '.8125rem', lineHeight: 1.4 } },
  [NARROW_SHORT]: { '& > ul': { display: 'none' } },
  [SHORTER]: { '& > ul': { display: 'none' } },
  [LANDSCAPE]: { gap: '.2rem', paddingLeft: '.55rem', '& h3': { fontSize: '.9375rem' }, '& > p': { display: '-webkit-box', overflow: 'hidden', fontSize: '.75rem', lineHeight: 1.3, WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 } }
} ) );

export const ProjectMeta = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  lineHeight: 1.4,
  '&&': META_TEXT,
  // The picker already shows the years; short screens drop the rest of the meta line.
  [NARROW_SHORT]: { display: 'none' },
  [SHORTER]: { display: 'none' }
} ) );

export const MyPart = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: '.9375rem',
  lineHeight: 1.45,
  '& > span': { display: 'block', marginBottom: '.2rem', color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.6875rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase' },
  [NARROW]: { '&&': { fontSize: '.8125rem' }, '& > span': { display: 'inline', marginRight: '.4rem' } },
  [LANDSCAPE]: { '&&': { fontSize: '.75rem' }, '& > span': { display: 'inline', marginRight: '.4rem' } }
} ) );
