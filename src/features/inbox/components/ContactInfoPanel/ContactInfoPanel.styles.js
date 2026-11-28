'use client';

import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';

export const DetailLink = styled( MuiLink )( ( { theme } ) => ( { color: theme.palette.primary.main, fontSize: '1rem', '&:hover': { textDecoration: 'underline' } } ) );
