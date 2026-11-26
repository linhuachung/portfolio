'use client';

import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

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
