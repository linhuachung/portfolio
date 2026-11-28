'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { AdminSurface } from '@/features/admin-shell/styles/Admin.styles';

export const AccountGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.1fr) minmax(280px, .7fr)',
  gap: theme.spacing( 3 ),
  alignItems: 'start',
  [theme.breakpoints.down( 'md' )]: { gridTemplateColumns: '1fr' }
} ) );

export const SecurityForm = styled( AdminSurface )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 2.25 ),
  '& > header': { display: 'grid', gap: theme.spacing( .6 ), paddingBottom: theme.spacing( 1.5 ), borderBottom: `1px solid ${theme.palette.divider}` }
} ) );

export const SecurityAside = styled( AdminSurface )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 2 ),
  '& ul': { display: 'grid', gap: theme.spacing( 1 ), margin: 0, paddingLeft: theme.spacing( 2.5 ), color: theme.palette.text.secondary, fontSize: '.82rem', lineHeight: 1.45 }
} ) );

export const FormActions = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing( 1 ),
  paddingTop: theme.spacing( 1 ),
  [theme.breakpoints.down( 'sm' )]: { '& .MuiButton-root': { width: '100%' } }
} ) );
