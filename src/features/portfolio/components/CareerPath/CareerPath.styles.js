'use client';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const PathList = styled( Box )( ( { theme } ) => ( {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  // The line runs from the first logo's centre to the last one's.
  '&::before': {
    position: 'absolute',
    top: 17,
    right: 'calc(12.5% - 2px)',
    left: 'calc(12.5% - 2px)',
    height: 2,
    content: '""',
    borderRadius: 2,
    background: `linear-gradient(90deg, ${alpha( theme.palette.primary.main, .3 )}, ${theme.palette.primary.main})`
  },
  '& > li': { position: 'relative', minWidth: 0 }
} ) );

export const PathStop = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  justifyItems: 'center',
  gap: '.3rem',
  borderRadius: 8,
  padding: '0 .2rem .35rem',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'background-color 160ms ease',
  '&:hover': { backgroundColor: alpha( theme.palette.text.primary, .04 ) },
  '&:hover [data-logo]': { borderColor: theme.palette.primary.main },
  '&[data-current] [data-logo]': { borderColor: theme.palette.primary.main, boxShadow: `0 0 0 3px ${alpha( theme.palette.primary.main, .18 )}` }
} ) );

export const PathLogo = styled( Box )( ( { theme } ) => ( {
  position: 'relative',
  width: 36,
  height: 36,
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper,
  transition: 'border-color 160ms ease',
  '& img': { width: '100%', height: '100%', objectFit: 'cover' },
  '@media (max-height: 430px) and (orientation: landscape)': { width: 30, height: 30 }
} ) );

export const PathCompany = styled( Box )( ( { theme } ) => ( {
  maxWidth: '100%',
  overflow: 'hidden',
  color: theme.palette.text.primary,
  fontSize: '.8125rem',
  fontWeight: 620,
  lineHeight: 1.2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
} ) );

export const PathYears = styled( Box )( ( { theme } ) => ( {
  color: theme.palette.text.secondary,
  fontFamily: 'var(--portfolio-mono), monospace',
  fontSize: '.6875rem',
  lineHeight: 1.2,
  whiteSpace: 'nowrap',
  '[data-current] &': { color: theme.palette.primary.main, fontWeight: 650 }
} ) );
