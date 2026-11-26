'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const OverviewPage = styled( Box )( ( { theme } ) => ( {
  width: 'min(100%, 1280px)',
  minHeight: '100%',
  marginInline: 'auto',
  padding: theme.spacing( 3 ),
  display: 'grid',
  alignContent: 'start',
  gap: theme.spacing( 2.5 ),
  [theme.breakpoints.down( 'sm' )]: {
    padding: theme.spacing( 2 ),
    gap: theme.spacing( 2 )
  }
} ) );

export const OverviewHeaderRoot = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing( 3 ),
  paddingBottom: theme.spacing( 2.5 ),
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down( 'lg' )]: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
} ) );

export const OverviewHeaderCopy = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .65 )
} ) );

export const OverviewEyebrow = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.primary.main,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.65rem',
  fontWeight: 750,
  letterSpacing: '.1em',
  textTransform: 'uppercase'
} ) );

export const OverviewTitle = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
  fontWeight: 680,
  letterSpacing: '-.035em',
  lineHeight: 1.05,
  textWrap: 'balance'
} ) );

export const OverviewDescription = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '64ch',
  color: theme.palette.text.secondary,
  fontSize: '.86rem',
  lineHeight: 1.5,
  textWrap: 'pretty'
} ) );

export const HeaderActions = styled( Box )( ( { theme } ) => ( {
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing( 1 ),
  flexWrap: 'wrap',
  [theme.breakpoints.down( 'lg' )]: {
    width: '100%',
    justifyContent: 'flex-start'
  },
  [theme.breakpoints.down( 'sm' )]: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    '& .MuiButton-root': { minWidth: 0 }
  }
} ) );

export const UpdatedMeta = styled( Typography )( ( { theme } ) => ( {
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing( .65 ),
  marginRight: theme.spacing( .5 ),
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.68rem',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down( 'sm' )]: { gridColumn: '1 / -1' }
} ) );

export const RefreshButton = styled( Button )( ( { theme } ) => ( {
  borderColor: theme.palette.divider,
  color: theme.palette.text.primary,
  '&:hover': { borderColor: theme.palette.text.secondary }
} ) );

export const OperationsGrid = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.45fr) minmax(320px, .75fr)',
  gridTemplateAreas: '"attention inbox" "content inbox"',
  gap: theme.spacing( 2 ),
  alignItems: 'stretch',
  [theme.breakpoints.down( 'lg' )]: {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: '"attention" "inbox" "content"'
  }
} ) );

export const OverviewSurface = styled( Paper )( ( { theme } ) => ( {
  minWidth: 0,
  padding: theme.spacing( 2.5 ),
  border: `1px solid ${alpha( theme.palette.text.primary, .13 )}`,
  borderRadius: 10,
  color: theme.palette.text.primary,
  backgroundColor: alpha( theme.palette.background.paper, .82 ),
  backgroundImage: 'none',
  boxShadow: 'none',
  [theme.breakpoints.down( 'sm' )]: { padding: theme.spacing( 2 ) }
} ) );

export const SurfaceHeader = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  marginBottom: theme.spacing( 2 )
} ) );

export const SurfaceTitle = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: '1.05rem',
  fontWeight: 700,
  letterSpacing: '-.012em',
  lineHeight: 1.25
} ) );

export const SurfaceDescription = styled( Typography )( ( { theme } ) => ( {
  marginTop: theme.spacing( .45 ),
  color: theme.palette.text.secondary,
  fontSize: '.73rem',
  lineHeight: 1.45
} ) );

export const TextLinkButton = styled( Button )( ( { theme } ) => ( {
  minHeight: 34,
  flexShrink: 0,
  paddingInline: theme.spacing( 1 ),
  color: theme.palette.text.secondary,
  fontSize: '.72rem',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: alpha( theme.palette.primary.main, .08 )
  }
} ) );

export const QueueList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  margin: 0,
  padding: 0,
  borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  listStyle: 'none'
} ) );

export const QueueItem = styled( ListItemButton )( ( { theme } ) => ( {
  minWidth: 0,
  minHeight: 74,
  display: 'grid',
  gridTemplateColumns: '40px minmax(0, 1fr) auto',
  gap: theme.spacing( 1.5 ),
  alignItems: 'center',
  padding: theme.spacing( 1.5, .5 ),
  borderBottom: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  borderRadius: 0,
  textAlign: 'left',
  transition: theme.transitions.create( ['background-color'], { duration: 160 } ),
  '&:hover': {
    backgroundColor: alpha( theme.palette.primary.main, .055 )
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2
  },
  [theme.breakpoints.down( 'sm' )]: {
    gridTemplateColumns: '36px minmax(0, 1fr)',
    '& > *:last-child': { gridColumn: 2, justifySelf: 'start' }
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' }
} ) );

export const QueueIcon = styled( Box, {
  shouldForwardProp: property => property !== '$severity'
} )( ( { theme, $severity } ) => {
  const color = $severity === 'high' ? theme.palette.error.main : theme.palette.warning.main;
  return {
    width: 38,
    height: 38,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 9,
    color,
    backgroundColor: alpha( color, .1 )
  };
} );

export const QueueCopy = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .35 ),
  '& h3': { fontSize: '.84rem', fontWeight: 700, lineHeight: 1.35 },
  '& p': { color: theme.palette.text.secondary, fontSize: '.72rem', lineHeight: 1.45 }
} ) );

export const QueueAction = styled( Typography )( ( { theme } ) => ( {
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing( .5 ),
  color: theme.palette.text.secondary,
  fontSize: '.69rem',
  fontWeight: 700,
  whiteSpace: 'nowrap'
} ) );

export const ClearState = styled( Box )( ( { theme } ) => ( {
  minHeight: 164,
  display: 'grid',
  placeItems: 'center',
  padding: theme.spacing( 3 ),
  color: theme.palette.text.secondary,
  textAlign: 'center',
  '& svg': { color: theme.palette.success.main },
  '& p:first-of-type': { marginTop: theme.spacing( 1 ), color: theme.palette.text.primary, fontWeight: 700 },
  '& p:last-of-type': { marginTop: theme.spacing( .5 ), fontSize: '.75rem' }
} ) );

export const InboxList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  margin: 0,
  padding: 0,
  borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  listStyle: 'none'
} ) );

export const InboxItem = styled( ListItemButton )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: theme.spacing( .6, 1.5 ),
  alignItems: 'start',
  padding: theme.spacing( 1.35, .5 ),
  borderBottom: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  borderRadius: 0,
  textAlign: 'left',
  transition: theme.transitions.create( ['background-color'], { duration: 160 } ),
  '&:hover': {
    backgroundColor: alpha( theme.palette.primary.main, .055 )
  },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' }
} ) );

export const InboxIdentity = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing( 1 ),
  '& h3': { minWidth: 0, overflow: 'hidden', fontSize: '.79rem', fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
} ) );

export const InboxTime = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.62rem',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap'
} ) );

export const InboxTopic = styled( Typography )( ( { theme } ) => ( {
  minWidth: 0,
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  fontSize: '.69rem',
  fontWeight: 650,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
} ) );

export const InboxMessage = styled( Typography )( ( { theme } ) => ( {
  gridColumn: '1 / -1',
  display: '-webkit-box',
  overflow: 'hidden',
  color: theme.palette.text.secondary,
  fontSize: '.72rem',
  lineHeight: 1.45,
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2
} ) );

export const StatusChip = styled( Chip )( ( { theme } ) => ( {
  height: 22,
  borderRadius: 6,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.6rem',
  fontWeight: 700,
  '& .MuiChip-label': { paddingInline: theme.spacing( .75 ) }
} ) );

export const AudienceSurface = styled( OverviewSurface )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 2 )
} ) );

export const AudienceHeader = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  [theme.breakpoints.down( 'sm' )]: {
    flexDirection: 'column',
    '& .MuiInputBase-root': { width: '100%' }
  }
} ) );

export const PeriodSelect = styled( Select )( ( { theme } ) => ( {
  width: 176,
  minHeight: 40,
  flexShrink: 0,
  '& .MuiSelect-select': { paddingBlock: theme.spacing( 1 ), fontSize: '.78rem' }
} ) );

export const MetricBand = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  margin: 0,
  padding: 0,
  borderRadius: 8,
  backgroundColor: alpha( theme.palette.background.default, .46 ),
  listStyle: 'none',
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: '1fr' }
} ) );

export const Metric = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .45 ),
  padding: theme.spacing( 1.5, 2 ),
  borderLeft: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  '&:first-of-type': { borderLeft: 0 },
  '& [data-kind="label"]': {
    color: theme.palette.text.secondary,
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.61rem',
    letterSpacing: '.07em',
    textTransform: 'uppercase'
  },
  '& [data-kind="value"]': {
    margin: 0,
    color: theme.palette.text.primary,
    fontSize: 'clamp(1.45rem, 3vw, 2rem)',
    fontWeight: 680,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-.035em',
    lineHeight: 1.1
  },
  '& [data-kind="hint"]': { color: theme.palette.text.secondary, fontSize: '.66rem' },
  [theme.breakpoints.down( 'sm' )]: {
    borderLeft: 0,
    borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
    '&:first-of-type': { borderTop: 0 }
  }
} ) );

export const AudienceBody = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.65fr) minmax(240px, .7fr)',
  gap: theme.spacing( 2.5 ),
  alignItems: 'stretch',
  [theme.breakpoints.down( 'md' )]: { gridTemplateColumns: '1fr' }
} ) );

export const ChartRegion = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  minHeight: 260,
  paddingTop: theme.spacing( .5 )
} ) );

export const TopPagesRegion = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  paddingLeft: theme.spacing( 2.5 ),
  borderLeft: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  '& > h3': { marginBottom: theme.spacing( 1.5 ), fontSize: '.8rem', fontWeight: 700 },
  [theme.breakpoints.down( 'md' )]: {
    paddingTop: theme.spacing( 2 ),
    paddingLeft: 0,
    borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
    borderLeft: 0
  }
} ) );

export const TopPageList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 1.4 ),
  margin: 0,
  padding: 0,
  listStyle: 'none'
} ) );

export const TopPageRow = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .65 ),
  '& > div:first-of-type': { display: 'flex', justifyContent: 'space-between', gap: theme.spacing( 1 ) },
  '& p:first-of-type': { minWidth: 0, overflow: 'hidden', fontSize: '.71rem', fontWeight: 650, textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  '& p:last-of-type': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.65rem', fontVariantNumeric: 'tabular-nums' }
} ) );

export const PageProgress = styled( LinearProgress )( ( { theme } ) => ( {
  height: 4,
  borderRadius: 4,
  backgroundColor: alpha( theme.palette.text.primary, .08 ),
  '& .MuiLinearProgress-bar': { borderRadius: 4 }
} ) );

export const ContentSurface = styled( OverviewSurface )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 1.5 )
} ) );

export const ContentGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  [theme.breakpoints.down( 'lg' )]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' },
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: '1fr' }
} ) );

export const ContentItem = styled( ButtonBase )( ( { theme } ) => ( {
  minWidth: 0,
  minHeight: 76,
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr) auto',
  gap: theme.spacing( 1.25 ),
  alignItems: 'center',
  padding: theme.spacing( 1.5 ),
  borderRight: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
  color: theme.palette.text.primary,
  textAlign: 'left',
  transition: theme.transitions.create( ['background-color'], { duration: 160 } ),
  '&:last-of-type': { borderRight: 0 },
  '&:hover': { backgroundColor: alpha( theme.palette.primary.main, .055 ) },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2
  },
  [theme.breakpoints.down( 'lg' )]: {
    '&:nth-of-type(2)': { borderRight: 0 },
    '&:nth-of-type(n + 3)': { borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}` }
  },
  [theme.breakpoints.down( 'sm' )]: {
    borderRight: 0,
    borderTop: `1px solid ${alpha( theme.palette.text.primary, .11 )}`,
    '&:first-of-type': { borderTop: 0 }
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' }
} ) );

export const ContentStateIcon = styled( Box, {
  shouldForwardProp: property => property !== '$attention'
} )( ( { theme, $attention } ) => {
  const color = $attention ? theme.palette.warning.main : theme.palette.success.main;
  return {
    width: 32,
    height: 32,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 8,
    color,
    backgroundColor: alpha( color, .1 )
  };
} );

export const ContentCopy = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .3 ),
  '& h3': { fontSize: '.77rem', fontWeight: 700 },
  '& p': { overflow: 'hidden', color: theme.palette.text.secondary, fontSize: '.66rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
} ) );

export const SkeletonSurface = styled( OverviewSurface )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 1.5 )
} ) );
