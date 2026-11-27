'use client';

import Avatar from '@mui/material/Avatar';
import { alpha, styled } from '@mui/material/styles';

export const AvatarImage = styled( Avatar, { shouldForwardProp: prop => prop !== '$size' } )( ( { theme, $size } ) => ( {
  width: $size,
  height: $size,
  flex: '0 0 auto',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: Math.round( $size * .2 ),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0 0 0 4px ${alpha( theme.palette.primary.main, .12 )}`,
  fontSize: Math.round( $size * .3 ),
  fontWeight: 620
} ) );
