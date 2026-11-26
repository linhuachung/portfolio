import { NextResponse } from 'next/server';

// Logout stays public so cookies can be cleared after the access token expires.
const PUBLIC_AUTH_APIS = new Set( ['/api/admin/auth/login', '/api/admin/auth/refresh', '/api/admin/auth/logout'] );

// Mirrors verifyToken() in lib/jwt.js with Web Crypto, since middleware runs on the Edge runtime.

function decodeBase64Url( value ) {
  const normalized = value.replace( /-/g, '+' ).replace( /_/g, '/' );
  const binary = atob( normalized.padEnd( Math.ceil( normalized.length / 4 ) * 4, '=' ) );
  return Uint8Array.from( binary, character => character.charCodeAt( 0 ) );
}

async function isValidAccessToken( token ) {
  if ( !token || !process.env.JWT_SECRET ) {return false;}
  const parts = token.split( '.' );
  if ( parts.length !== 3 ) {return false;}

  try {
    const header = JSON.parse( new TextDecoder().decode( decodeBase64Url( parts[0] ) ) );
    const payload = JSON.parse( new TextDecoder().decode( decodeBase64Url( parts[1] ) ) );
    if ( header.alg !== 'HS256' || payload.typ !== 'access' || typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now() || payload.role !== 'admin' ) {return false;}

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode( process.env.JWT_SECRET ),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    return crypto.subtle.verify( 'HMAC', key, decodeBase64Url( parts[2] ), new TextEncoder().encode( `${parts[0]}.${parts[1]}` ) );
  } catch {
    return false;
  }
}

export async function middleware( req ) {
  const pathname = req.nextUrl.pathname;
  const isLogin = pathname === '/admin/login';
  if ( PUBLIC_AUTH_APIS.has( pathname ) ) {return NextResponse.next();}

  const bearer = req.headers.get( 'authorization' )?.replace( /^Bearer\s+/i, '' );
  const token = bearer || req.cookies.get( 'token' )?.value;
  const authenticated = await isValidAccessToken( token );

  if ( isLogin ) {
    return authenticated ? NextResponse.redirect( new URL( '/admin', req.url ) ) : NextResponse.next();
  }

  if ( !authenticated && pathname.startsWith( '/api/admin/' ) ) {
    return NextResponse.json( { status: 401, message: 'Unauthorized', data: null }, { status: 401 } );
  }

  if ( !authenticated && pathname.startsWith( '/admin' ) ) {
    return NextResponse.redirect( new URL( '/admin/login', req.url ) );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
