'use client';

import MobileNav from '../MobileNav';
import Nav from '../Nav';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { BrandAvatar, BrandLink, DesktopActions, HeaderCta, HeaderInner, MobileActions, SiteHeader } from '../../styles/Navigation.styles';
import ThemeToggle from '../ThemeToggle';

function useProfileAvatar() {
  const [profileAvatar, setProfileAvatar] = useState( '' );

  useEffect( () => {
    let active = true;
    fetch( '/api/user/profile', { headers: { Accept: 'application/json' } } )
      .then( response => ( response.ok ? response.json() : null ) )
      .then( payload => { if ( active ) {setProfileAvatar( payload?.data?.avatar || '' );} } )
      .catch( () => { if ( active ) {setProfileAvatar( '' );} } );
    return () => {active = false;};
  }, [] );

  return profileAvatar;
}

/** Public site header. The admin area has its own navigation shell. */
function Header( { links } ) {
  const profileAvatar = useProfileAvatar();
  // Contact has a dedicated call-to-action button on desktop.
  const desktopLinks = links.filter( link => link.path !== '/contact' );

  return (
    <SiteHeader component="header">
      <HeaderInner>
        <BrandLink component={ NextLink } href="/" aria-label="Lin Hua Chung, home">
          <BrandAvatar src={ profileAvatar || undefined } alt="" aria-hidden="true" />
        </BrandLink>
        <DesktopActions>
          <Nav links={ desktopLinks } />
          <ThemeToggle />
          <HeaderCta component={ NextLink } href="/contact">Contact</HeaderCta>
        </DesktopActions>

        <MobileActions>
          <ThemeToggle />
          <MobileNav links={ links } avatar={ profileAvatar } />
        </MobileActions>
      </HeaderInner>
    </SiteHeader>
  );
}

export default Header;
