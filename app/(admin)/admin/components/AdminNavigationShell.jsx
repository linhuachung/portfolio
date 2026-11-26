'use client';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Tooltip from '@mui/material/Tooltip';
import axiosInstance from '@/lib/axios';
import { ADMIN_LINKS } from '@/constants/route';
import { useTheme } from '@/contexts/ThemeContext';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BrandCopy,
  BrandMark,
  DrawerFooter,
  DrawerHeader,
  MainStage,
  Navigation,
  NavigationItem,
  PageName,
  ShellDrawer,
  ShellFrame,
  TopBar,
  TopBarToolbar
} from './AdminNavigationShell.styles';

const icons = {
  Overview: DashboardOutlinedIcon,
  Inbox: InboxOutlinedIcon,
  Profile: AccountCircleOutlinedIcon,
  Experience: WorkOutlineOutlinedIcon,
  Education: SchoolOutlinedIcon,
  Projects: FolderOpenOutlinedIcon,
  Account: SecurityOutlinedIcon
};

function isActiveRoute( pathname, path ) {
  return path === '/admin' ? pathname === path : pathname.startsWith( path );
}

export default function AdminNavigationShell( { children } ) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState( false );
  const [loggingOut, setLoggingOut] = useState( false );
  const [pendingCount, setPendingCount] = useState( 0 );
  const [profileAvatar, setProfileAvatar] = useState( '' );

  const loadPendingCount = useCallback( async () => {
    try {
      const response = await axiosInstance.get( '/api/admin/contact/summary' );
      setPendingCount( response?.data?.unread || 0 );
    } catch {
      setPendingCount( 0 );
    }
  }, [] );

  const loadProfileAvatar = useCallback( async () => {
    try {
      const response = await axiosInstance.get( '/api/admin/user' );
      setProfileAvatar( response?.data?.avatar || '' );
    } catch {
      setProfileAvatar( '' );
    }
  }, [] );

  useEffect( () => {
    loadPendingCount();
    const timer = window.setInterval( loadPendingCount, 30000 );
    window.addEventListener( 'portfolio:inbox-updated', loadPendingCount );
    return () => {
      window.clearInterval( timer );
      window.removeEventListener( 'portfolio:inbox-updated', loadPendingCount );
    };
  }, [loadPendingCount, pathname] );

  useEffect( () => {
    const handleProfileUpdated = event => {
      if ( typeof event.detail?.avatar === 'string' ) {
        setProfileAvatar( event.detail.avatar );
        return;
      }
      loadProfileAvatar();
    };

    loadProfileAvatar();
    window.addEventListener( 'portfolio:profile-updated', handleProfileUpdated );
    return () => window.removeEventListener( 'portfolio:profile-updated', handleProfileUpdated );
  }, [loadProfileAvatar] );

  const currentPage = ADMIN_LINKS.find( link => isActiveRoute( pathname, link.path ) )?.name || 'Admin';
  const groups = useMemo( () => ADMIN_LINKS.reduce( ( result, link ) => {
    const group = link.group || 'Workspace';
    result[group] = [...( result[group] || [] ), link];
    return result;
  }, {} ), [] );

  const handleLogout = async () => {
    if ( loggingOut ) {return;}
    setLoggingOut( true );
    try {
      await fetch( '/api/admin/auth/logout', { method: 'POST', credentials: 'include' } );
      router.replace( '/admin/login' );
      router.refresh();
    } finally {
      setLoggingOut( false );
    }
  };

  const drawer = (
    <Box sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }>
      <DrawerHeader>
        <BrandMark data-testid="admin-brand-avatar" src={ profileAvatar || undefined } alt="" aria-hidden="true" />
        <BrandCopy component="p">Portfolio Admin<Box component="span">Operations Console</Box></BrandCopy>
      </DrawerHeader>
      <Navigation component="nav" aria-label="Admin navigation">
        { Object.entries( groups ).map( ( [group, links] ) => (
          <List
            key={ group }
            disablePadding
            subheader={ <ListSubheader disableSticky sx={ { px: 1.25, pt: 1.5, pb: .5, color: 'text.secondary', bgcolor: 'transparent', fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.58rem', fontWeight: 700, lineHeight: 1.5, letterSpacing: '.1em', textTransform: 'uppercase' } }>{ group }</ListSubheader> }
          >
            { links.map( link => {
              const Icon = icons[link.name] || DashboardOutlinedIcon;
              const selected = isActiveRoute( pathname, link.path );
              return (
                <NavigationItem
                  key={ link.path }
                  component={ NextLink }
                  href={ link.path }
                  selected={ selected }
                  aria-current={ selected ? 'page' : undefined }
                  onClick={ () => setMobileOpen( false ) }
                >
                  <ListItemIcon><Icon fontSize="small" aria-hidden="true" /></ListItemIcon>
                  <ListItemText
                    primary={ link.name }
                    slotProps={ { primary: { fontSize: '.82rem', fontWeight: selected ? 720 : 580 } } }
                  />
                  { link.name === 'Inbox' && pendingCount > 0 && <Badge color="error" badgeContent={ pendingCount } max={ 99 }><Box sx={ { width: 8, height: 8 } } /></Badge> }
                </NavigationItem>
              );
            } ) }
          </List>
        ) ) }
      </Navigation>
      <DrawerFooter>
        <Button component={ NextLink } href="/" target="_blank" rel="noreferrer" color="inherit" startIcon={ <OpenInNewOutlinedIcon fontSize="small" /> }>View Public Site</Button>
        <Button onClick={ handleLogout } disabled={ loggingOut } color="inherit" startIcon={ <LogoutOutlinedIcon fontSize="small" /> }>
          { loggingOut ? 'Signing Out…' : 'Sign Out' }
        </Button>
      </DrawerFooter>
    </Box>
  );

  return (
    <ShellFrame>
      <TopBar position="absolute">
        <TopBarToolbar>
          <IconButton
            onClick={ () => setMobileOpen( true ) }
            aria-label="Open admin navigation"
            sx={ { display: 'inline-flex', '@media (min-width: 1024px)': { display: 'none' } } }
          >
            <MenuOutlinedIcon />
          </IconButton>
          <PageName component="p" sx={ { flex: 1 } }>{ currentPage }</PageName>
          <Tooltip title="New inquiries">
            <IconButton component={ NextLink } href="/admin/contact?status=pending" aria-label={ pendingCount ? `${pendingCount} new inquiries` : 'No new inquiries' }>
              <Badge color="error" badgeContent={ pendingCount } max={ 99 }><NotificationsNoneOutlinedIcon /></Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title={ theme === 'dark' ? 'Use light theme' : 'Use dark theme' }>
            <IconButton onClick={ toggleTheme } aria-label={ theme === 'dark' ? 'Use light theme' : 'Use dark theme' }>
              { theme === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon /> }
            </IconButton>
          </Tooltip>
        </TopBarToolbar>
      </TopBar>
      <ShellDrawer variant="permanent" open sx={ { display: 'none', '@media (min-width: 1024px)': { display: 'block' } } }>{ drawer }</ShellDrawer>
      <ShellDrawer variant="temporary" open={ mobileOpen } onClose={ () => setMobileOpen( false ) } ModalProps={ { keepMounted: true } } sx={ { display: 'block', '@media (min-width: 1024px)': { display: 'none' } } }>{ drawer }</ShellDrawer>
      <MainStage component="main" id="admin-main">{ children }</MainStage>
    </ShellFrame>
  );
}
