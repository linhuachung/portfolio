'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { AnimatedPanel, PageHeading } from '../../styles/PublicLayout.styles';

export const ResumeHeading = styled( PageHeading )( {
  gridColumn: '1 / -1',
  '@media (max-width: 900px)': { gridColumn: 1 },
  '@media (max-width: 680px)': { '& > a': { display: 'none' } }
} );

export const ResumeRail = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  alignContent: 'start',
  paddingTop: '1rem',
  borderRight: `1px solid ${theme.palette.divider}`,
  '@media (max-width: 900px)': {
    display: 'flex',
    paddingTop: '.4rem',
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '@media (max-width: 680px)': { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }
} ) );

export const RailButton = styled( Button )( ( { theme } ) => ( {
  minHeight: 48,
  display: 'grid',
  gridTemplateColumns: '2rem 1fr',
  alignItems: 'center',
  justifyContent: 'initial',
  borderRadius: 10,
  padding: '.4rem .8rem .4rem 0',
  color: theme.palette.text.secondary,
  textAlign: 'left',
  textTransform: 'capitalize',
  '& span': { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.64rem' },
  '&[aria-current="page"]': { color: theme.palette.text.primary, fontWeight: 620 },
  '@media (max-width: 900px)': { minHeight: 38, gridTemplateColumns: 'auto auto', gap: '.35rem', padding: '.35rem .65rem', fontSize: '.72rem' },
  '@media (max-width: 680px)': { width: '100%', justifyContent: 'center', paddingInline: '.2rem', '& span': { display: 'none' } },
  '@media (max-height: 430px) and (orientation: landscape)': { minHeight: 30 }
} ) );

export const ResumeContent = styled( AnimatedPanel )( {
  minWidth: 0,
  minHeight: 0,
  paddingTop: 'clamp(.8rem, 2vh, 1.2rem)',
  '@media (max-width: 900px)': { paddingTop: '.65rem' },
  '@media (max-width: 680px)': { paddingTop: '.45rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { paddingTop: '.35rem' }
} );
