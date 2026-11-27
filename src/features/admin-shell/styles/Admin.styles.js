'use client';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const AdminShell = styled( Box, {
  shouldForwardProp: property => !['$sansFont', '$monoFont'].includes( property )
} )( ( { $sansFont, $monoFont } ) => ( {
  '--portfolio-sans': $sansFont,
  '--portfolio-mono': $monoFont,
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  fontFamily: 'var(--portfolio-sans), Arial, sans-serif',
  '& .MuiTypography-root, & .MuiButton-root, & .MuiInputBase-root, & .MuiInputLabel-root, & .MuiMenuItem-root, & .MuiChip-root': {
    fontFamily: 'var(--portfolio-sans), Arial, sans-serif'
  }
} ) );
export const AdminSurface = styled( Paper )( ( { theme } ) => ( {
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: theme.spacing( 3 ),
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none'
} ) );

export const AdminRow = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing( 2 )
} ) );

export const AdminPageTitle = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
  fontWeight: 700,
  lineHeight: 1.1
} ) );

export const MutedText = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.secondary,
  fontSize: '.875rem'
} ) );

export const SectionHeading = styled( Typography )( ( { theme } ) => ( {
  margin: 0,
  paddingBottom: theme.spacing( 1 ),
  borderBottom: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
  fontWeight: 650
} ) );

export const FormSection = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 2 )
} ) );

export const LoginPanel = styled( AdminSurface )( ( { theme } ) => ( {
  width: 'min(100%, 480px)',
  display: 'grid',
  gap: theme.spacing( 3 ),
  padding: theme.spacing( 5 ),
  [theme.breakpoints.down( 'sm' )]: { padding: theme.spacing( 3 ), border: 0, backgroundColor: 'transparent' }
} ) );

export const LoginShell = styled( Box )( ( { theme } ) => ( {
  width: '100%',
  minHeight: '100%',
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, .85fr) minmax(420px, 1.15fr)',
  [theme.breakpoints.down( 'md' )]: { gridTemplateColumns: '1fr' }
} ) );

export const LoginNarrative = styled( Box )( ( { theme } ) => ( {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
  padding: theme.spacing( 6 ),
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: alpha( theme.palette.primary.main, .075 ),
  '&::after': {
    position: 'absolute',
    width: '70%',
    aspectRatio: '1',
    right: '-24%',
    bottom: '-22%',
    border: `1px solid ${alpha( theme.palette.primary.main, .3 )}`,
    borderRadius: '50%',
    content: '""'
  },
  [theme.breakpoints.down( 'md' )]: { display: 'none' }
} ) );

export const LoginStage = styled( Box )( ( { theme } ) => ( {
  minWidth: 0,
  display: 'grid',
  placeItems: 'center',
  padding: theme.spacing( 4 ),
  [theme.breakpoints.down( 'sm' )]: { padding: theme.spacing( 2 ) }
} ) );

export const LoginMark = styled( Typography )( ( { theme } ) => ( {
  color: theme.palette.text.primary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.78rem',
  fontWeight: 700,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  '& span': { color: theme.palette.primary.main }
} ) );

export const StatusBadge = styled( Box, { shouldForwardProp: property => property !== '$status' } )( ( { theme, $status } ) => {
  const colors = {
    pending: theme.palette.warning.main,
    read: theme.palette.info.main,
    replied: theme.palette.success.main,
    archived: theme.palette.text.secondary
  };
  const color = colors[$status] || colors.pending;
  return { display: 'inline-flex', borderRadius: 6, padding: theme.spacing( .35, .8 ), color, backgroundColor: alpha( color, .13 ), fontSize: '.72rem', lineHeight: 1.2, textTransform: 'capitalize' };
} );
