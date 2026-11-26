'use client';

import { createContext } from 'react';

/** Value: { theme: 'light' | 'dark', toggleTheme(), mounted }. Read it with useTheme(). */
export const ThemeContext = createContext( undefined );
