'use client';

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

// Wordmark: the photo lives in the Home card and the résumé header, so the brand is typographic.
export const BrandLink = styled( Link )( ( { theme } ) => ( {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.7rem',
  borderRadius: 8,
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover [data-mark]': { backgroundColor: theme.palette.primary.main },
  '&:focus-visible': { outline: `2px solid ${theme.palette.primary.main}`, outlineOffset: 3 }
} ) );

export const BrandMark = styled( Box )( ( { theme } ) => ( {
  width: 36,
  height: 36,
  display: 'grid',
  flex: '0 0 auto',
  placeItems: 'center',
  borderRadius: 8,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.8125rem',
  fontWeight: 700,
  letterSpacing: '.04em',
  transition: 'background-color 160ms ease'
} ) );

export const BrandName = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  '& > span:first-of-type': { color: theme.palette.text.primary, fontSize: '.9375rem', fontWeight: 620, letterSpacing: '-.01em', lineHeight: 1.15 },
  '& > span:last-of-type': { color: theme.palette.text.secondary, fontSize: '.75rem', lineHeight: 1.3 },
  '@media (max-width: 900px)': { '& > span:last-of-type': { display: 'none' } },
  '@media (max-width: 400px)': { display: 'none' }
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

// Same outlined circle in both themes, so the control does not change shape when toggled.
export const ThemeButton = styled( IconButton )( ( { theme } ) => ( {
  width: 40,
  height: 40,
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  '&:hover': { borderColor: theme.palette.text.primary, backgroundColor: 'transparent' },
  '& svg': { color: 'currentColor' }
} ) );

export const HeaderCta = styled( Button )( ( { theme } ) => ( {
  minHeight: 42,
  border: `1px solid ${theme.palette.text.primary}`,
  borderRadius: 8,
  padding: '.66rem 1rem',
  color: theme.palette.background.default,
  backgroundColor: theme.palette.text.primary,
  fontSize: '.875rem',
  fontWeight: 620,
  lineHeight: 1,
  textTransform: 'none',
  '&:hover, &[aria-current="page"]': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main
  }
} ) );

// Phones keep Contact one tap away next to the menu: 36px tall, with a 44px hit area.
export const MobileCta = styled( HeaderCta )( {
  position: 'relative',
  minHeight: 36,
  padding: '0 .85rem',
  fontSize: '.8125rem',
  '&::before': { position: 'absolute', inset: '-4px 0', content: '""' }
} );

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

