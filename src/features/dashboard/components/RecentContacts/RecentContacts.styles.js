'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

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
