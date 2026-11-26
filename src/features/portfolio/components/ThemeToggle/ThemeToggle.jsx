'use client';

import useTheme from '@/shared/hooks/useTheme';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { ThemeButton } from '../../styles/Navigation.styles';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ThemeButton onClick={ toggleTheme } aria-label={ isDark ? 'Use light theme' : 'Use dark theme' }>
      { isDark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" /> }
    </ThemeButton>
  );
}
