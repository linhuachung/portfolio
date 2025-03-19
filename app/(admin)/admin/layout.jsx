"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

function AdminLayout( { children } ) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect( () => {
    const token = Cookies.get( "token" );

    if ( !token && pathname.startsWith( "/admin" ) && pathname !== "/admin/login" ) {
      router.replace( "/admin/login" );
    }

    if ( token && pathname === "/admin/login" ) {
      router.replace( "/admin" );
    }
  }, [pathname, router] );

  return <div className="h-screen">{ children }</div>;
}

export default AdminLayout;
