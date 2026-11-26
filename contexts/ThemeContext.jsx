'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext( undefined );

export function ThemeProvider( { children } ) {
  const [theme, setTheme] = useState( 'light' );
  const [mounted, setMounted] = useState( false );

  useEffect( () => {
    const applySavedTheme = () => {
      const defaultTheme = window.location.pathname.startsWith( '/admin' ) ? 'dark' : 'light';
      const storedTheme = localStorage.getItem( 'theme' );
      const savedTheme = ['light', 'dark'].includes( storedTheme ) ? storedTheme : defaultTheme;
      setTheme( savedTheme );
      setMounted( true );
      document.documentElement.classList.toggle( 'dark', savedTheme === 'dark' );
      document.documentElement.style.colorScheme = savedTheme;
    };

    // Let deferred App Router/Suspense boundaries hydrate with the same light
    // theme used during SSR before applying the route-specific preference.
    if ( document.readyState === 'complete' ) {
      window.requestAnimationFrame( applySavedTheme );
      return undefined;
    }

    window.addEventListener( 'load', applySavedTheme, { once: true } );
    return () => window.removeEventListener( 'load', applySavedTheme );
  }, [] );

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme( newTheme );
    localStorage.setItem( 'theme', newTheme );
    const root = document.documentElement;
    root.style.colorScheme = newTheme;
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

