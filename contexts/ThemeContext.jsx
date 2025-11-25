'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext( undefined );

export function ThemeProvider( { children } ) {
  const [theme, setTheme] = useState( 'dark' );
  const [mounted, setMounted] = useState( false );

  useEffect( () => {
    setMounted( true );
    const savedTheme = localStorage.getItem( 'theme' ) || 'dark';
    setTheme( savedTheme );
    const root = document.documentElement;
    if ( savedTheme === 'dark' ) {
      root.classList.add( 'dark' );
    } else {
      root.classList.remove( 'dark' );
    }
  }, [] );

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme( newTheme );
    localStorage.setItem( 'theme', newTheme );
    const root = document.documentElement;
    if ( newTheme === 'dark' ) {
      root.classList.add( 'dark' );
    } else {
      root.classList.remove( 'dark' );
    }
  };

  return (
    <ThemeContext.Provider value={ { theme, toggleTheme, mounted } }>
      { children }
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext( ThemeContext );
  if ( context === undefined ) {
    throw new Error( 'useTheme must be used within a ThemeProvider' );
  }
  return context;
}

