'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { BrandLink, BrandMark, BrandName, MenuButton, MobileBrand, MobileDrawer, MobileLinks } from '../../styles/Navigation.styles';

function MobileNav( { links } ) {
  const pathname = usePathname();
  const [open, setOpen] = useState( false );

  return (
    <>
      <MenuButton aria-label="Open navigation menu" onClick={ () => setOpen( true ) }>
        <MenuIcon fontSize="large"/>
      </MenuButton>
      <MobileDrawer
        anchor="right"
        open={ open }
        onClose={ () => setOpen( false ) }
        slotProps={ { paper: { 'aria-labelledby': 'mobile-navigation-title' } } }
      >
        <Typography component="h2" id="mobile-navigation-title" sx={ { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clipPath: 'inset(50%)' } }>Navigation</Typography>
        <IconButton
          aria-label="Close navigation menu"
          onClick={ () => setOpen( false ) }
          sx={ { position: 'absolute', right: 24, top: 24 } }
        >
          <CloseIcon/>
        </IconButton>
        <MobileBrand>
          <BrandLink component={ NextLink } href="/" aria-label="Lin Hua Chung, home" onClick={ () => setOpen( false ) }>
            <BrandMark component="span" data-mark aria-hidden="true">LC</BrandMark>
            <BrandName component="span" aria-hidden="true">
              <Box component="span">Lin Hua Chung</Box>
              <Box component="span">Frontend Engineer</Box>
            </BrandName>
          </BrandLink>
        </MobileBrand>
        <MobileLinks component="nav" aria-label="Mobile navigation">
          { links.map( ( { name, path } ) => (
            <MuiLink
              component={ NextLink }
              underline="none"
              color="inherit"
              href={ path }
              aria-current={ path === pathname ? 'page' : undefined }
              key={ path }
              onClick={ () => setOpen( false ) }
            >
              { name }
            </MuiLink>
          ) ) }
        </MobileLinks>
      </MobileDrawer>
    </>
  );
}

export default MobileNav;
