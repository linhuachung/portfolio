'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';

export const ProfileFormGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, .82fr) minmax(0, 1.18fr)',
  gap: theme.spacing( 2.5 ),
  alignItems: 'start',
  [theme.breakpoints.down( 'lg' )]: { gridTemplateColumns: '1fr' }
} ) );

export const ProfileStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 2.5 ) } ) );

export const ProfileReadOnlyRoot = styled( Box )( {
  cursor: 'default',
  '& *': { cursor: 'default' }
} );

export const ProfileIdentity = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: theme.spacing( 2 ),
  paddingBottom: theme.spacing( 2 ),
  borderBottom: `1px solid ${theme.palette.divider}`
} ) );

export const ProfileFacts = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gap: 0,
  margin: 0,
  '& > div:last-of-type': { borderBottom: 0 },
  [theme.breakpoints.down( 'sm' )]: { gap: theme.spacing( .5 ) }
} ) );

export const ProfileFact = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gridTemplateColumns: 'minmax(104px, .34fr) minmax(0, 1fr)',
  gap: theme.spacing( 2 ),
  paddingBlock: theme.spacing( 1.25 ),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& dt': {
    color: theme.palette.text.secondary,
    fontSize: '.7rem',
    fontWeight: 700,
    letterSpacing: '.06em',
    textTransform: 'uppercase'
  },
  '& dd': {
    minWidth: 0,
    margin: 0,
    color: theme.palette.text.primary,
    fontSize: '.84rem',
    lineHeight: 1.55,
    overflowWrap: 'anywhere',
    whiteSpace: 'pre-wrap'
  },
  [theme.breakpoints.down( 'sm' )]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing( .4 ),
    paddingBlock: theme.spacing( 1 )
  }
} ) );

export const ProfileSection = styled( Paper )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( 2 ),
  padding: theme.spacing( 2.5 ),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  [theme.breakpoints.down( 'sm' )]: { padding: theme.spacing( 2 ) }
} ) );

export const ProfileActionBar = styled( Paper )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  padding: theme.spacing( 1.5, 2 ),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  backgroundColor: alpha( theme.palette.background.paper, .96 ),
  boxShadow: 'none',
  '& > div:last-of-type': { display: 'flex', gap: theme.spacing( 1 ), flexWrap: 'wrap', justifyContent: 'flex-end' },
  [theme.breakpoints.down( 'sm' )]: {
    alignItems: 'stretch',
    flexDirection: 'column',
    '& > div:last-of-type': { display: 'grid', gridTemplateColumns: '1fr 1fr' },
    '& .MuiButton-root': { width: '100%' }
  }
} ) );
