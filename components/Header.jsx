'use client';

import MobileNav from '@/components/MobileNav';
import Nav from '@/components/Nav';
import { useTheme } from '@/contexts/ThemeContext';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  AdminHeader,
  AdminHeaderInner,
  BrandAvatar,
  BrandLink,
  DesktopActions,
  HeaderCta,
  HeaderInner,
  MobileActions,
  SiteHeader,
  ThemeButton,
  AdminLogoutButton
} from '@/components/styled/Navigation.styles';

function Header( { isAdmin = false, links } ) {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState( false );
  const [profileAvatar, setProfileAvatar] = useState( '' );
  const desktopLinks = isAdmin ? links : links?.filter( link => link.path !== '/contact' );

  useEffect( () => {
    let active = true;

    const loadProfileAvatar = async () => {
      try {
        const response = await fetch( '/api/user/profile', { headers: { Accept: 'application/json' } } );
        if ( !response.ok ) {return;}
        const payload = await response.json();
        if ( active ) {setProfileAvatar( payload?.data?.avatar || '' );}
      } catch {
        if ( active ) {setProfileAvatar( '' );}
      }
    };

    loadProfileAvatar();
    return () => {active = false;};
  }, [] );

  const handleLogout = async () => {
    if ( loggingOut ) {return;}
    setLoggingOut( true );
    try {
      const response = await fetch( '/api/admin/auth/logout', { method: 'POST', credentials: 'include' } );
      if ( response.ok ) {
        router.replace( '/admin/login' );
        router.refresh();
      }
    } finally {
      setLoggingOut( false );
    }
  };

  const HeaderRoot = isAdmin ? AdminHeader : SiteHeader;
  const HeaderContent = isAdmin ? AdminHeaderInner : HeaderInner;

  return (
    <HeaderRoot component="header">
      <HeaderContent>
        <BrandLink component={ NextLink } href={ isAdmin ? '/admin' : '/' } aria-label={ isAdmin ? 'Admin home' : 'Lin Hua Chung, home' }>
          <BrandAvatar src={ profileAvatar || undefined } alt="" aria-hidden="true" />
        </BrandLink>
        <DesktopActions sx={ isAdmin ? { display: { xs: 'none', lg: 'flex' } } : undefined }>
          <Nav
            links={ desktopLinks }
          />
          <ThemeButton
            onClick={ toggleTheme }
            aria-label={ theme === 'dark' ? 'Use light theme' : 'Use dark theme' }
          >
            { theme === 'dark' ? (
              <LightModeOutlinedIcon fontSize="small" />
            ) : (
              <DarkModeOutlinedIcon fontSize="small" />
            ) }
          </ThemeButton>
          { isAdmin && (
            <AdminLogoutButton onClick={ handleLogout } disabled={ loggingOut } startIcon={ <LogoutOutlinedIcon fontSize="small" /> }>
              { loggingOut ? 'Signing Out…' : 'Sign Out' }
            </AdminLogoutButton>
          ) }
          { !isAdmin && (
            <HeaderCta component={ NextLink } href="/contact">
              Contact
            </HeaderCta>
          ) }
        </DesktopActions>

        <MobileActions sx={ isAdmin ? { display: { xs: 'flex', lg: 'none' } } : undefined }>
          <ThemeButton
            onClick={ toggleTheme }
            aria-label={ theme === 'dark' ? 'Use light theme' : 'Use dark theme' }
          >
            { theme === 'dark' ? (
              <LightModeOutlinedIcon fontSize="small" />
            ) : (
              <DarkModeOutlinedIcon fontSize="small" />
            ) }
          </ThemeButton>
          <MobileNav
            links={ links }
            isAdmin={ isAdmin }
            avatar={ profileAvatar }
            loggingOut={ loggingOut }
            onLogout={ handleLogout }
          />
        </MobileActions>
      </HeaderContent>
    </HeaderRoot>
  );
}

export default Header;
