'use client';

import MobileNav from '../MobileNav';
import Nav from '../Nav';
import Box from '@mui/material/Box';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLink, BrandMark, BrandName, DesktopActions, HeaderCta, HeaderInner, MobileActions, MobileCta, SiteHeader } from '../../styles/Navigation.styles';
import ThemeToggle from '../ThemeToggle';

/** Public site header. The admin area has its own navigation shell. */
function Header( { links } ) {
  const onContact = usePathname() === '/contact' ? 'page' : undefined;
  // Contact has a dedicated call-to-action button on desktop.
  const desktopLinks = links.filter( link => link.path !== '/contact' );

  return (
    <SiteHeader component="header">
      <HeaderInner>
        <BrandLink component={ NextLink } href="/" aria-label="Lin Hua Chung, home">
          <BrandMark component="span" data-mark aria-hidden="true">LC</BrandMark>
          <BrandName component="span" aria-hidden="true">
            <Box component="span">Lin Hua Chung</Box>
            <Box component="span">Frontend Engineer</Box>
          </BrandName>
        </BrandLink>
        <DesktopActions>
          <Nav links={ desktopLinks } />
          <ThemeToggle />
          <HeaderCta component={ NextLink } href="/contact" aria-current={ onContact }>Contact</HeaderCta>
        </DesktopActions>

        <MobileActions>
          <ThemeToggle />
          <MobileCta component={ NextLink } href="/contact" aria-current={ onContact }>Contact</MobileCta>
          <MobileNav links={ links } />
        </MobileActions>
      </HeaderInner>
    </SiteHeader>
  );
}

export default Header;
