import { NextResponse } from "next/server";

export function middleware( req ) {
  const token = req.cookies.get( "token" )?.value;
  const url = req.nextUrl.pathname;

  if ( token && url === "/admin/login" ) {
    return NextResponse.redirect( new URL( "/admin", req.url ) );
  }

  if ( !token && url.startsWith( "/admin" ) && url !== "/admin/login" ) {
    return NextResponse.redirect( new URL( "/", req.url ) );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
