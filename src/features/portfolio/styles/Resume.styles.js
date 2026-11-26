'use client';

// Styles shared by several resume views.
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ScreenPage } from './PublicLayout.styles';

export const ResumeScreen = styled( ScreenPage )( {
  display: 'grid',
  minHeight: 0,
  gridTemplate: 'auto minmax(0, 1fr) / minmax(135px, .22fr) minmax(0, 1fr)',
  columnGap: 'clamp(1.2rem, 3vw, 3.5rem)',
  '@media (max-width: 900px)': { gridTemplate: 'auto auto minmax(0, 1fr) / 1fr' },
  '@media (max-width: 680px)': { paddingBlock: '.4rem' }
} );

export const StaticView = styled( Box )( {
  maxWidth: 1050,
  width: '100%',
  height: '100%',
  display: 'grid',
  alignContent: 'start',
  gap: '1rem',
  padding: 'clamp(.75rem, 1.8vh, 1.25rem) clamp(1rem, 3vw, 3rem)',
  '& > h2': { maxWidth: '19ch' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.35rem', padding: '.25rem 0', '& > h2': { fontSize: '1.15rem', lineHeight: 1.03 } }
} );
