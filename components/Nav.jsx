'use client';

import { Link, usePathname } from '@/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

function Nav( { links } ) {
  const pathName = usePathname();
  const t = useTranslations( 'navigation' );

  useEffect( () => {
    const getTitleByPath = ( path ) => {
      // Remove locale prefix for matching
      const pathWithoutLocale = path.replace( /^\/[a-z]{2}(\/|$)/, '/' );

      switch ( pathWithoutLocale ) {
        case '/':
          return t( 'home' );
        case '/resume':
          return t( 'resume' );
        case '/work':
          return t( 'work' );
        case '/contact':
          return t( 'contact' );
        case '/admin':
          return t( 'dashboard' );
        case '/admin/user':
          return t( 'user' );
        case '/admin/experience':
          return t( 'experience' );
        case '/admin/education':
          return t( 'education' );
        case '/admin/project':
          return t( 'project' );
        default:
          return 'ChungLH Portfolio';
      }
    };

    document.title = getTitleByPath( pathName );
  }, [pathName, t] );

  return (
    <nav className="flex gap-8">
      { links?.map( ( { name, path } ) => {
        // Get translated name
        const translatedName = t( name.toLowerCase() ) || name;

        return <Link href={ path } key={ path }
          className={ `${path === pathName && 'text-accent-light dark:text-accent border-b-2 border-accent-light dark:border-accent'} capitalize font-medium text-gray-700 dark:text-white hover:text-accent-light dark:hover:text-accent transition-all` }>
          { translatedName }
        </Link>;
      } ) }
    </nav>
  );
}

export default Nav;