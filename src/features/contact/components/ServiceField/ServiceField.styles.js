'use client';

import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';

export const ServiceControl = styled( FormControl )( {
  gridColumn: '1 / -1',
  '@media (max-width: 680px)': { gridColumn: 1 },
  '@media (max-height: 430px) and (orientation: landscape)': { gridColumn: '1 / -1' }
} );
