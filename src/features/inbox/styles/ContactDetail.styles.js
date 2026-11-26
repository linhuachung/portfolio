'use client';

// Styles shared by several contact detail parts.
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

export const Panel = styled( Box )( ( { theme } ) => ( { minWidth: 0, maxWidth: '100%', padding: theme.spacing( 2 ), border: `1px solid ${theme.palette.divider}`, borderRadius: 8, backgroundColor: alpha( theme.palette.background.default, .55 ) } ) );

export const PanelTitle = styled( Typography )( ( { theme } ) => ( { marginBottom: theme.spacing( 1.5 ), color: theme.palette.text.primary, fontSize: '.875rem', fontWeight: 650 } ) );

export const DetailValue = styled( Typography )( ( { theme } ) => ( { color: theme.palette.text.primary, fontSize: '.9rem', fontWeight: 500 } ) );
