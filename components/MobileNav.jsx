'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BrandAvatar, MenuButton, MobileBrand, MobileDrawer, MobileLinks } from '@/components/styled/Navigation.styles';

function MobileNav( { links, isAdmin, avatar, loggingOut = false, onLogout } ) {
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
          <MuiLink
            component={ NextLink }
            underline="none"
            color="inherit"
            href={ isAdmin ? '/admin' : '/' }
            aria-label={ isAdmin ? 'Admin home' : 'Lin Hua Chung, home' }
            onClick={ () => setOpen( false ) }
          >
            <BrandAvatar src={ avatar || undefined } alt="" aria-hidden="true" sx={ { width: 44, height: 44 } } />
          </MuiLink>
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
        { isAdmin && (
          <Button
            variant="outlined"
            color="inherit"
            startIcon={ <LogoutOutlinedIcon/> }
            disabled={ loggingOut }
            onClick={ onLogout }
            sx={ { mt: 3, alignSelf: 'stretch', justifyContent: 'flex-start' } }
          >
            { loggingOut ? 'Signing Out…' : 'Sign Out' }
          </Button>
        ) }
      </MobileDrawer>
    </>
  );
}

export default MobileNav;
