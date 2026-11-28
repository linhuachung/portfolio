'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const ModalStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 3 ), marginTop: theme.spacing( 2 ) } ) );

export const SectionStack = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 2 ) } ) );
