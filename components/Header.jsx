'use client';

import MobileNav from '@/components/MobileNav';
import Nav from '@/components/Nav';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Moon, Sun } from 'lucide-react';

function Header( { isAdmin = false, title, links } ) {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations( 'common' );

  return (
    <header className="py-8 xl:py-12 text-gray-900 dark:text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={ isAdmin ? '/admin' : '/' }>
          <h1 className="text-4xl font-semibold">
            { !isAdmin ? t( 'brand' ) : title }
            <span className="text-accent-light dark:text-accent">.</span></h1>
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav
            links={ links }
          />
          { !isAdmin && <LanguageSwitcher/> }
          <button
            onClick={ toggleTheme }
            className="p-2 rounded-full hover:bg-[#f0f0f0] dark:hover:bg-secondary transition-colors"
            aria-label={ t( 'toggleTheme' ) }
          >
            { theme === 'dark' ? (
              <Sun className="w-5 h-5 text-accent-light dark:text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-accent-light dark:text-accent" />
            ) }
          </button>
          { !isAdmin && (
            <Link href="/contact">
              <Button>{ t( 'hireMe' ) }</Button>
            </Link>
          ) }
        </div>

        <div className="xl:hidden flex items-center gap-4">
          <button
            onClick={ toggleTheme }
            className="p-2 rounded-full hover:bg-[#f0f0f0] dark:hover:bg-secondary transition-colors"
            aria-label={ t( 'toggleTheme' ) }
          >
            { theme === 'dark' ? (
              <Sun className="w-5 h-5 text-accent-light dark:text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-accent-light dark:text-accent" />
            ) }
          </button>
          <MobileNav
            links={ links }
            isAdmin={ isAdmin }
            title={ title }
          />
        </div>
      </div>
    </header>
  );
}

export default Header;