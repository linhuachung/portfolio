'use client';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const DetailLabel = styled( Typography )( ( { theme } ) => ( { marginBottom: theme.spacing( .5 ), color: theme.palette.text.secondary, fontSize: '.75rem' } ) );
