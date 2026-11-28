'use client';

import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';
import { alpha, styled } from '@mui/material/styles';
import { OverviewSurface } from '../../styles/Overview.styles';

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
