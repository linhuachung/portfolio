'use client';

import { useTheme as usePortfolioTheme } from '@/contexts/ThemeContext';
import { createAppTheme } from '@/theme/createAppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';

export default function MuiProvider( { children, fontFamily } ) {
  const { theme: colorMode } = usePortfolioTheme();
  const theme = useMemo( () => createAppTheme( colorMode, fontFamily ), [colorMode, fontFamily] );

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline/>
      { children }
    </ThemeProvider>
  );
}
