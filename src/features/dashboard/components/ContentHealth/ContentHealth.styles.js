'use client';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { alpha, styled } from '@mui/material/styles';
import { OverviewSurface } from '../../styles/Overview.styles';

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
