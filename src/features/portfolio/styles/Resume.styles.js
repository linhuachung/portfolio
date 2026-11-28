'use client';

// Styles shared by several resume views.
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

// Skills, Education and About start on the same left edge as the Experience timeline.
export const StaticView = styled( Box )( {
  maxWidth: 1050,
  width: '100%',
  height: '100%',
  display: 'grid',
  alignContent: 'start',
  gap: '1rem',
  '@media (max-width: 680px)': { gap: '.6rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { gap: '.35rem' }
} );

/** Section heading inside a résumé panel; always smaller than the page H1. */
export const PanelTitle = styled( Typography )( ( { theme } ) => ( {
  maxWidth: '24ch',
  margin: 0,
  color: theme.palette.text.primary,
  fontSize: '1.75rem',
  fontWeight: 580,
  letterSpacing: '-.035em',
  lineHeight: 1.1,
  textWrap: 'balance',
  '@media (max-width: 680px)': { fontSize: '1.25rem' },
  '@media (max-width: 360px)': { fontSize: '1.0625rem' },
  '@media (max-height: 430px) and (orientation: landscape)': { fontSize: '1rem' }
} ) );
