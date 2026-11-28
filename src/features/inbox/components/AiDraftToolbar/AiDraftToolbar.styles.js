'use client';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const AiToolbar = styled( Box )( ( { theme } ) => ( {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing( 1 ),
  marginBottom: theme.spacing( 1.5 ),
  padding: theme.spacing( 1 ),
  border: `1px solid ${alpha( theme.palette.primary.main, .2 )}`,
  borderRadius: 8,
  backgroundColor: alpha( theme.palette.primary.main, .055 ),
  [theme.breakpoints.down( 'sm' )]: { alignItems: 'stretch', flexDirection: 'column' }
} ) );
