'use client';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const ReplyItem = styled( Box )( ( { theme } ) => ( { padding: theme.spacing( 1.5 ), border: `1px solid ${alpha( theme.palette.success.main, .25 )}`, borderRadius: 6, backgroundColor: theme.palette.background.paper } ) );
