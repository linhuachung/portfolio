'use client';

// Styles shared by the services page and its content view.
import { styled } from '@mui/material/styles';
import { ScreenPage } from './PublicLayout.styles';

export const ServicesScreen = styled( ScreenPage )( {
  display: 'grid',
  minHeight: 0,
  gridTemplateRows: 'auto minmax(0, 1fr)',
  '@media (max-height: 430px) and (orientation: landscape)': {
    gridTemplate: '1fr / minmax(130px, .24fr) minmax(0, 1fr)',
    columnGap: '.75rem',
    '& > header': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '.35rem',
      padding: 0,
      borderBottom: 0
    }
  }
} );
