import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware( routing );

export function middleware( req ) {
  const token = req.cookies.get( 'token' )?.value;
  const url = req.nextUrl.pathname;

  // Handle admin routes first (before i18n)
  if ( url.startsWith( '/admin' ) ) {
    if ( token && url === '/admin/login' ) {
      return NextResponse.redirect( new URL( '/admin', req.url ) );
    }

    if ( !token && url.startsWith( '/admin' ) && url !== '/admin/login' ) {
      return NextResponse.redirect( new URL( '/en', req.url ) );
    }

    // Admin routes don't need i18n - skip i18n middleware
    return NextResponse.next();
  }

  // Apply i18n middleware for all other routes
  const response = intlMiddleware( req );
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
