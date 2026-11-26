'use client';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const SkillsGrid = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  '& section': { borderTop: `1px solid ${alpha( theme.palette.text.primary, .5 )}`, paddingTop: '.65rem' },
  '& h3': { margin: '0 0 .5rem', fontSize: '.76rem' },
  '& ul': { margin: 0, padding: 0, listStyle: 'none', color: theme.palette.text.secondary, fontSize: '.78rem', lineHeight: 1.7 },
  '@media (max-width: 680px)': { gap: '.45rem', '& h3': { fontSize: '.68rem' }, '& ul': { fontSize: '.66rem', lineHeight: 1.55 } }
} ) );

export const SkillItem = styled( Box )( ( { theme } ) => ( {
  display: 'flex', alignItems: 'center', gap: '.5rem',
  '& svg': { width: '1rem', height: '1rem', flex: '0 0 auto', color: theme.palette.primary.main, strokeWidth: 1.7 },
  '@media (max-width: 680px)': { gap: '.32rem', '& svg': { width: '.82rem', height: '.82rem' } }
} ) );
