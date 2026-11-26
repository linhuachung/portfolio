'use client';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const drawerWidth = 248;

export const ShellFrame = styled( Box )( {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 0,
  display: 'flex',
  overflow: 'hidden'
} );

export const ShellDrawer = styled( Drawer )( ( { theme } ) => ( {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none'
  }
} ) );

export const DrawerHeader = styled( Box )( ( { theme } ) => ( {
  height: 64,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing( 1.25 ),
  paddingInline: theme.spacing( 2.25 ),
  borderBottom: `1px solid ${theme.palette.divider}`
} ) );

export const BrandMark = styled( Avatar )( ( { theme } ) => ( {
  width: 34,
  height: 34,
  borderRadius: 9,
  border: `1px solid ${alpha( theme.palette.primary.main, .48 )}`,
  color: theme.palette.primary.contrastText,
  backgroundColor: alpha( theme.palette.primary.main, .18 ),
  '& .MuiAvatar-img': { objectFit: 'cover' },
  '& .MuiSvgIcon-root': { fontSize: '1.25rem' }
} ) );

export const BrandCopy = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontSize: '.85rem',
  fontWeight: 760,
  letterSpacing: '-.01em',
  '& span': {
    display: 'block',
    marginTop: 1,
    color: theme.palette.text.secondary,
    fontFamily: 'var(--portfolio-mono), monospace',
    fontSize: '.58rem',
    fontWeight: 600,
    letterSpacing: '.08em',
    textTransform: 'uppercase'
  }
} ) );

export const Navigation = styled( Box )( ( { theme } ) => ( {
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: theme.spacing( 1.5 )
} ) );

export const NavigationItem = styled( ListItemButton )( ( { theme } ) => ( {
  minHeight: 42,
  gap: theme.spacing( 1.25 ),
  marginBottom: theme.spacing( .25 ),
  borderRadius: 9,
  paddingInline: theme.spacing( 1.25 ),
  color: theme.palette.text.secondary,
  '& .MuiListItemIcon-root': { minWidth: 24, color: 'inherit' },
  '&:hover': { color: theme.palette.text.primary, backgroundColor: alpha( theme.palette.primary.main, .08 ) },
  '&.Mui-selected': {
    color: theme.palette.text.primary,
    backgroundColor: alpha( theme.palette.primary.main, .14 ),
    '&::before': {
      width: 3,
      height: 20,
      position: 'absolute',
      left: 0,
      borderRadius: '0 4px 4px 0',
      backgroundColor: theme.palette.primary.main,
      content: '""'
    }
  },
  '&.Mui-selected:hover': { backgroundColor: alpha( theme.palette.primary.main, .18 ) }
} ) );

export const DrawerFooter = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 1 ),
  padding: theme.spacing( 1.5 ),
  borderTop: `1px solid ${theme.palette.divider}`
} ) );

export const TopBar = styled( AppBar )( ( { theme } ) => ( {
  width: 'auto',
  left: 0,
  right: 0,
  marginLeft: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  backgroundColor: alpha( theme.palette.background.default, .94 ),
  backgroundImage: 'none',
  boxShadow: 'none',
  backdropFilter: 'blur(14px)',
  '@media (min-width: 1024px)': { left: drawerWidth }
} ) );

export const TopBarToolbar = styled( Toolbar )( ( { theme } ) => ( {
  minHeight: '64px !important',
  gap: theme.spacing( 1 ),
  paddingInline: `${theme.spacing( 2 )} !important`,
  [theme.breakpoints.up( 'sm' )]: { paddingInline: `${theme.spacing( 3 )} !important` }
} ) );

export const PageName = styled( Typography )( ( { theme } ) => ( {
  minWidth: 0,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  fontSize: '.92rem',
  fontWeight: 720,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
} ) );

export const MainStage = styled( Box )( {
  flex: 1,
  width: 'auto',
  height: '100%',
  minWidth: 0,
  paddingTop: 64,
  overflowX: 'hidden',
  overflowY: 'auto'
} );
