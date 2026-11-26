'use client';

import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

export const EducationTimeline = styled( Box )( ( { theme } ) => ( {
  '--education-gap': 'clamp(1.5rem, 6vw, 5rem)',
  display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--education-gap)', margin: '.35rem 0 0', padding: 0, listStyle: 'none',
  '& > li': { position: 'relative', minWidth: 0 },
  '& > li:first-of-type::after': { position: 'absolute', zIndex: 0, top: 21, left: 21, width: 'calc(100% + var(--education-gap))', height: 2, content: '""', backgroundColor: alpha( theme.palette.text.primary, .5 ) },
  '& h3': { margin: 0, fontSize: 'clamp(.9rem, 1.5vw, 1.1rem)', lineHeight: 1.25 },
  '@media (max-width: 680px)': { '--education-gap': '.8rem', '& > li:first-of-type::after': { top: 17, left: 17 } },
  '@media (max-height: 430px) and (orientation: landscape)': { '& > li:first-of-type::after': { top: 14, left: 14 } }
} ) );

export const EducationNode = styled( Box )( { position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '.65rem', '@media (max-width: 680px)': { gap: '.4rem' } } );

export const EducationMarker = styled( Box )( ( { theme } ) => ( { width: 44, height: 44, display: 'grid', flex: '0 0 auto', placeItems: 'center', overflow: 'hidden', border: `1px solid ${alpha( theme.palette.text.primary, .5 )}`, borderRadius: '50%', backgroundColor: theme.palette.background.default, '& img': { width: '100%', height: '100%', objectFit: 'cover' }, '@media (max-width: 680px)': { width: 36, height: 36 }, '@media (max-height: 430px) and (orientation: landscape)': { width: 30, height: 30 } } ) );

export const EducationIndex = styled( Box )( ( { theme } ) => ( { color: theme.palette.primary.main, fontFamily: 'var(--portfolio-mono), monospace', fontSize: '.64rem', letterSpacing: '.04em' } ) );

export const EducationDates = styled( EducationIndex )( { margin: '.65rem 0 .25rem', '@media (max-width: 680px)': { marginTop: '.45rem' }, '@media (max-height: 430px) and (orientation: landscape)': { marginTop: '.25rem' } } );

export const EducationLocation = styled( Box )( ( { theme } ) => ( { margin: '.25rem 0 .5rem', color: theme.palette.text.secondary, fontSize: '.68rem', '@media (max-width: 680px)': { fontSize: '.62rem' }, '@media (max-height: 430px) and (orientation: landscape)': { marginBlock: '.12rem .2rem' } } ) );

export const EducationPrograms = styled( Box )( ( { theme } ) => ( { display: 'grid', gap: '.24rem', margin: 0, padding: 0, listStyle: 'none', fontSize: '.75rem', '& a': { color: theme.palette.text.primary, textDecorationColor: theme.palette.divider, textUnderlineOffset: '.2em' }, '& a:hover': { color: theme.palette.primary.main }, '@media (max-width: 680px)': { fontSize: '.68rem' }, '@media (max-height: 430px) and (orientation: landscape)': { gap: '.08rem', fontSize: '.62rem' } } ) );
