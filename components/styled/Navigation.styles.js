'use client';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { alpha, styled } from '@mui/material/styles';

export const SiteHeader = styled( Box )( ( { theme } ) => ( {
  minHeight: 0,
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha( theme.palette.background.default, .94 )
} ) );

export const HeaderInner = styled( Box )( {
  width: 'min(100%, 1536px)',
  height: '100%',
  marginInline: 'auto',
  paddingRight: 'max(var(--shell-gutter), env(safe-area-inset-right))',
  paddingLeft: 'max(var(--shell-gutter), env(safe-area-inset-left))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@media (max-width: 360px)': { paddingInline: '.8rem' }
} );

export const BrandLink = styled( Link )( ( { theme } ) => ( {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 11,
  textDecoration: 'none',
  '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 }
} ) );

export const BrandAvatar = styled( Avatar )( ( { theme } ) => ( {
  width: 38,
  height: 38,
  border: `1px solid ${alpha( theme.palette.primary.main, .48 )}`,
  borderRadius: 11,
  color: theme.palette.text.secondary,
  backgroundColor: alpha( theme.palette.primary.main, .14 ),
  '& .MuiAvatar-img': { objectFit: 'cover' },
  '& .MuiSvgIcon-root': { fontSize: '1.4rem' }
} ) );

export const DesktopActions = styled( Box )( {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(.65rem, 1.6vw, 1.5rem)',
  '@media (max-width: 900px)': { display: 'none' }
} );

export const MobileActions = styled( Box )( {
  display: 'none',
  alignItems: 'center',
  gap: '.65rem',
  '@media (max-width: 900px)': { display: 'flex' }
} );

export const NavRoot = styled( Box )( {
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(.85rem, 2vw, 2rem)'
} );

export const NavLink = styled( Link )( ( { theme } ) => ( {
  position: 'relative',
  color: theme.palette.text.secondary,
  fontSize: '.82rem',
  fontWeight: 520,
  textDecoration: 'none',
  transition: theme.transitions.create( 'color', { duration: 180 } ),
  '&::after': {
    position: 'absolute',
    right: 0,
    bottom: '-.45rem',
    left: 0,
    height: 2,
    content: '""',
    backgroundColor: theme.palette.primary.main,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: theme.transitions.create( 'transform', { duration: 180 } )
  },
  '&:hover, &[aria-current="page"]': { color: theme.palette.text.primary },
  '&[aria-current="page"]::after': { transform: 'scaleX(1)' }
} ) );

export const ThemeButton = styled( IconButton )( ( { theme } ) => ( {
  width: 40,
  height: 40,
  color: theme.palette.text.primary,
  '& svg': { color: 'currentColor' }
} ) );

export const HeaderCta = styled( Button )( ( { theme } ) => ( {
  minHeight: 42,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 10,
  padding: '.66rem 1rem',
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  fontSize: '.78rem',
  fontWeight: 620,
  lineHeight: 1,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main
  }
} ) );

export const MenuButton = styled( IconButton )( ( { theme } ) => ( {
  width: 40,
  height: 40,
  color: theme.palette.text.primary
} ) );

export const MobileDrawer = styled( Drawer )( ( { theme } ) => ( {
  '& .MuiDrawer-paper': {
    width: 'min(88vw, 380px)',
    padding: theme.spacing( 3 ),
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default
  }
} ) );

export const MobileBrand = styled( Box )( {
  paddingTop: 56,
  paddingBottom: 24,
  '& a': { display: 'inline-flex', borderRadius: 12, textDecoration: 'none' }
} );

export const MobileLinks = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  '& a': {
    borderTop: `1px solid ${theme.palette.divider}`,
    paddingBlock: theme.spacing( 2 ),
    color: theme.palette.text.secondary,
    fontSize: '1.25rem',
    textDecoration: 'none'
  },
  '& a[aria-current="page"]': { color: theme.palette.primary.main }
} ) );

export const AdminHeader = styled( Box )( ( { theme } ) => ( {
  minHeight: 68,
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  backgroundColor: alpha( theme.palette.background.default, .95 ),
  backdropFilter: 'blur(12px)'
} ) );

export const AdminHeaderInner = styled( Box )( {
  width: 'min(100% - 2rem, 1536px)',
  height: 68,
  marginInline: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
} );

export const AdminLogoutButton = styled( Button )( ( { theme } ) => ( {
  minHeight: 38,
  paddingInline: theme.spacing( 1.25 ),
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',
  fontSize: '.72rem',
  '&:hover': { borderColor: theme.palette.error.main, color: theme.palette.error.main, backgroundColor: alpha( theme.palette.error.main, .07 ) }
} ) );
