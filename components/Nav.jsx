'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function Nav( { links } ) {
  const pathName = usePathname();

  useEffect( () => {
    const getTitleByPath = ( path ) => {
      switch ( path ) {
        case '/':
          return 'Home';
        case '/resume':
          return 'Resume';
        case '/work':
          return 'Work';
        case '/contact':
          return 'Contact';
        case '/admin':
          return 'Dashboard';
        case '/admin/user':
          return 'User';
        case '/admin/experience':
          return 'Experience';
        case '/admin/education':
          return 'Education';
        case '/admin/project':
          return 'Project';
        default:
          return 'ChungLH Portfolio';
      }
    };

    document.title = getTitleByPath( pathName );
  }, [pathName] );
  return (
    <nav className="flex gap-8">
      { links?.map( ( { name, path } ) => {
        return <Link href={ path } key={ path }
          className={ `${path === pathName && 'text-accent-light dark:text-accent border-b-2 border-accent-light dark:border-accent'} capitalize font-medium text-gray-700 dark:text-white hover:text-accent-light dark:hover:text-accent transition-all` }>
          { name }
        </Link>;
      } ) }
    </nav>
  );
}

export default Nav;