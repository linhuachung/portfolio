'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

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
