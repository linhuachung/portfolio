'use client';

import { styled } from '@mui/material/styles';
import { OverviewSurface } from '../../styles/Overview.styles';

export const SkeletonSurface = styled( OverviewSurface )( ( { theme } ) => ( {
  display: 'grid',
  gap: theme.spacing( 1.5 )
} ) );
