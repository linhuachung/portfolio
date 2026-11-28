'use client';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

export const SocialList = styled( Box )( {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '.6rem',
  '&[data-variant="text"]': { gap: '0 1rem' },
  '@media (max-width: 680px)': { '&[data-variant="buttons"]': { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '.5rem' } }
} );

export const SocialButton = styled( Link )( ( { theme } ) => ( {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '.45rem',
  color: theme.palette.text.primary,
  fontSize: '.875rem',
  fontWeight: 520,
  textDecoration: 'none',
  transition: 'border-color 160ms ease, color 160ms ease',
  '& svg': { fontSize: '1.05rem' },
  '[data-variant="buttons"] > &': {
    minHeight: 40,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    padding: '0 .9rem'
  },
  '[data-variant="buttons"] > &:hover': { borderColor: theme.palette.text.primary },
  '[data-variant="text"] > &': { gap: '.3rem', paddingBlock: '.35rem', color: theme.palette.text.secondary, fontSize: '.8125rem' },
  '[data-variant="text"] > & svg': { fontSize: '.95rem' },
  // Icon-only circles: 32px drawn, 44px hit area.
  '[data-variant="icons"] > &': {
    position: 'relative',
    width: 32,
    height: 32,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',
    color: theme.palette.text.secondary
  },
  '[data-variant="icons"] > &::before': { position: 'absolute', inset: -6, content: '""' },
  '[data-variant="icons"] > & svg': { fontSize: '1rem' },
  '[data-variant="icons"] > &:hover': { borderColor: theme.palette.primary.main },
  '&:hover': { color: theme.palette.primary.main },
  '@media (max-width: 680px)': { fontSize: '.8125rem', '[data-variant="buttons"] > &': { padding: '0 .5rem' } },
  '@media (max-height: 430px) and (orientation: landscape)': { '[data-variant="buttons"] > &': { minHeight: 36 } }
} ) );
