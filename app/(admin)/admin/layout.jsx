'use client';

import Header from '@/components/Header';
import { ADMIN_LINKS } from '@/constants/route';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function AdminLayout( { children } ) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState( null );

  useEffect( () => {
    const token = Cookies.get( 'token' );

    if ( !token && pathname.startsWith( '/admin' ) && pathname !== '/admin/login' ) {
      router.replace( '/admin/login' );
    }

    if ( token && pathname === '/admin/login' ) {
      router.replace( '/admin' );
    }
    setIsLogin( token );
  }, [pathname, router] );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      { isLogin && <Header
        isAdmin={ true }
        title="Admin"
        links={ ADMIN_LINKS }
      /> }

      <div className="flex-1 overflow-hidden">
        { children }
      </div>
    </div>
  );

}

export default AdminLayout;
