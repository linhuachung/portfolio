'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ScreenPage } from '@/features/portfolio/styles/PublicLayout.styles';

export const ContactScreen = styled( ScreenPage )( {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, .72fr) minmax(520px, 1.28fr)',
  alignItems: 'start',
  gap: 'clamp(2.5rem, 6vw, 7rem)',
  '@media (max-width: 680px)': { gridTemplateColumns: '1fr', alignContent: 'start', gap: '.75rem' },
  '@media (min-width: 681px) and (max-width: 900px)': {
    gridTemplateColumns: 'minmax(180px, .55fr) minmax(0, 1.45fr)',
    gap: '1rem'
  },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplate: '1fr / minmax(230px, .72fr) minmax(0, 1.28fr)',
    gap: '1.4rem'
  }
} );

export const ContactIntro = styled( Box )( {
  display: 'grid',
  alignContent: 'start',
  gap: 'clamp(.7rem, 1.6vh, 1rem)',
  '& h1': { maxWidth: '9.5ch', fontSize: 'clamp(2.8rem, 4.6vw, 4.9rem)', lineHeight: .94 },
  '@media (max-width: 680px)': {
    gap: '.4rem',
    '& h1': { maxWidth: '15ch', fontSize: 'clamp(1.9rem, 9vw, 2.35rem)', lineHeight: .98 },
    '& > p:last-of-type': { fontSize: '.78rem' }
  },
  '@media (min-width: 681px) and (max-width: 900px)': {
    gap: '.55rem',
    '& h1': { maxWidth: '7.5ch', fontSize: '2.5rem', lineHeight: .96 },
    '& > p:last-of-type': { fontSize: '.76rem' }
  },
  '@media (max-height: 620px)': { '& > p:last-of-type': { display: 'none' } },
  '@media (max-height: 430px) and (orientation: landscape)': { '& h1': { fontSize: '2rem' } },
  '@media (max-width: 420px) and (max-height: 610px)': {
    '& > p': { display: 'none' },
    '& h1': { maxWidth: '100%', fontSize: '1.55rem', lineHeight: .98 }
  }
} );

export const ContactDetails = styled( Box )( ( { theme } ) => ( {
  margin: '.5rem 0 0',
  '& > div': {
    display: 'grid',
    gridTemplateColumns: '5.2rem minmax(0, 1fr)',
    gap: '.65rem',
    padding: '.42rem 0',
    borderTop: `1px solid ${theme.palette.divider}`
  },
  '& dt': { color: theme.palette.text.secondary, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.68rem', textTransform: 'uppercase' },
  '& dd': { margin: 0, color: theme.palette.text.primary, fontSize: '.82rem' },
  '& a': { textUnderlineOffset: '.22rem' },
  '@media (max-width: 680px)': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0 .7rem',
    marginTop: 0,
    '& > div': { gridTemplateColumns: '1fr', gap: '.08rem', padding: '.28rem 0' },
    '& > div:first-of-type': { gridColumn: '1 / -1' }
  },
  '@media (min-width: 681px) and (max-width: 900px)': {
    '& > div': { gridTemplateColumns: '1fr', gap: '.08rem', padding: '.3rem 0' },
    '& dt': { fontSize: '.58rem' },
    '& dd': { fontSize: '.72rem', overflowWrap: 'anywhere' }
  },
  '@media (max-height: 620px)': { '& > div': { paddingBlock: '.2rem' } },
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplateColumns: '1fr',
    '& > div:first-of-type': { gridColumn: 1 },
    '& > div:nth-of-type(2)': { display: 'none' }
  },
  '@media (max-width: 420px) and (max-height: 610px)': { '& > div:nth-of-type(n + 2)': { display: 'none' } }
} ) );
