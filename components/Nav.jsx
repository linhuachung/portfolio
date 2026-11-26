'use client';

import { NavLink, NavRoot } from '@/components/styled/Navigation.styles';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

function Nav( { links } ) {
  const pathName = usePathname();

  return (
    <NavRoot component="nav" aria-label="Primary navigation">
      { links?.map( ( { name, path } ) => {
        return <NavLink component={ NextLink } href={ path } key={ path }
          aria-current={ path === pathName ? 'page' : undefined }
        >
          { name }
        </NavLink>;
      } ) }
    </NavRoot>
  );
}

export default Nav;
