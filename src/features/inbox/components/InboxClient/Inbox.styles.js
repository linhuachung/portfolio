'use client';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const InboxToolbar = styled( Paper )( ( { theme } ) => ( {
  width: 'min(100%, 1108px)',
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 720px) 180px 160px',
  justifyContent: 'start',
  gap: theme.spacing( 1.5 ),
  padding: theme.spacing( 1.5 ),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  color: theme.vars?.palette.text.primary || theme.palette.text.primary,
  backgroundColor: theme.vars?.palette.background.paper || theme.palette.background.paper,
  boxShadow: 'none',
  [theme.breakpoints.down( 'xl' )]: {
    width: 'min(100%, 720px)',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    '& > :first-of-type': { gridColumn: '1 / -1' }
  },
  [theme.breakpoints.down( 'sm' )]: {
    width: '100%',
    gridTemplateColumns: '1fr',
    '& > :first-of-type': { gridColumn: 'auto' }
  }
} ) );

export const StatusRail = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  gap: theme.spacing( .75 ),
  overflowX: 'auto',
  paddingBottom: theme.spacing( .5 ),
  scrollbarWidth: 'thin'
} ) );

export const InboxNotice = styled( Paper )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: theme.spacing( 1.25 ),
  padding: theme.spacing( 1.5, 2 ),
  border: `1px solid ${alpha( theme.palette.primary.main, .22 )}`,
  borderRadius: 10,
  backgroundColor: alpha( theme.palette.primary.main, .06 ),
  boxShadow: 'none',
  '& > svg': { color: theme.palette.primary.main },
  '& p:first-of-type': { fontSize: '.82rem', fontWeight: 700 },
  '& p:last-of-type': { color: theme.palette.text.secondary, fontSize: '.72rem', lineHeight: 1.45 }
} ) );

export const InboxList = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  borderTop: `1px solid ${theme.palette.divider}`
} ) );

export const InboxRow = styled( ButtonBase, {
  shouldForwardProp: property => !['$unread', '$selected'].includes( property )
} )( ( { theme, $unread, $selected } ) => ( {
  minWidth: 0,
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'minmax(180px, .75fr) minmax(0, 1.5fr) 150px',
  gap: theme.spacing( 2 ),
  alignItems: 'center',
  padding: theme.spacing( 2 ),
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderLeft: `3px solid ${$unread ? theme.palette.primary.main : 'transparent'}`,
  borderRadius: 0,
  color: theme.palette.text.primary,
  textAlign: 'left',
  backgroundColor: $selected
    ? alpha( theme.palette.primary.main, .1 )
    : $unread ? alpha( theme.palette.primary.main, .045 ) : 'transparent',
  transition: theme.transitions.create( ['background-color', 'border-color'], { duration: 160 } ),
  '&:hover': { backgroundColor: alpha( theme.palette.primary.main, .08 ) },
  [theme.breakpoints.down( 'md' )]: { gridTemplateColumns: 'minmax(0, 1fr) auto', '& > div:nth-of-type(2)': { gridColumn: '1 / -1', gridRow: 2 } },
  [theme.breakpoints.down( 'sm' )]: { paddingInline: theme.spacing( 1 ) }
} ) );

export const Sender = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .25 ),
  '& p:first-of-type': { overflow: 'hidden', color: theme.palette.text.primary, fontSize: '.85rem', fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  '& p:last-of-type': { overflow: 'hidden', color: theme.palette.text.secondary, fontSize: '.72rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }
} ) );

export const MessagePreview = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  gap: theme.spacing( .35 ),
  '& p:first-of-type': { color: theme.palette.text.primary, fontSize: '.78rem', fontWeight: 650 },
  '& p:last-of-type': { display: '-webkit-box', overflow: 'hidden', color: theme.palette.text.secondary, fontSize: '.75rem', lineHeight: 1.4, WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }
} ) );

export const InboxMeta = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  justifyItems: 'end',
  gap: theme.spacing( .55 ),
  '& p': { color: theme.palette.text.secondary, fontSize: '.66rem' }
} ) );

export const InboxFooter = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing( 2 ),
  paddingTop: theme.spacing( 1 ),
  [theme.breakpoints.down( 'sm' )]: { alignItems: 'flex-start', flexDirection: 'column' }
} ) );

export const EmptyInbox = styled( Box )( ( { theme } ) => ( {
  minHeight: 240,
  display: 'grid',
  placeItems: 'center',
  padding: theme.spacing( 4 ),
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  textAlign: 'center'
} ) );

export const InboxCount = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.68rem'
} ) );
