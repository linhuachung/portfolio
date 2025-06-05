"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import Header from "@/components/Header";
import { ADMIN_LINKS } from "@/constants/route";

function AdminLayout( { children } ) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState( null );

  useEffect( () => {
    const token = Cookies.get( "token" );

    if ( !token && pathname.startsWith( "/admin" ) && pathname !== "/admin/login" ) {
      router.replace( "/admin/login" );
    }

    if ( token && pathname === "/admin/login" ) {
      router.replace( "/admin" );
    }
    setIsLogin( token );
  }, [pathname, router] );

  return (
    <div className="h-screen">
      { isLogin && <Header
        isAdmin={ true }
        title="Admin"
        links={ ADMIN_LINKS }
      /> }

      { children }
    </div>
  );

}

export default AdminLayout;
