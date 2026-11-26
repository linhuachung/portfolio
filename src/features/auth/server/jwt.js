import { createHmac, timingSafeEqual } from 'node:crypto';

export const ACCESS_TTL_SECONDS = 60 * 60;
export const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 7;

const TOKEN_TYPE = { ACCESS: 'access', REFRESH: 'refresh' };

const accessSecret = () => process.env.JWT_SECRET;
const refreshSecret = () => process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

function encode( value ) {
  return Buffer.from( JSON.stringify( value ) ).toString( 'base64url' );
}

function decode( segment ) {
  return JSON.parse( Buffer.from( segment, 'base64url' ).toString( 'utf8' ) );
}

function sign( claims, typ, secret, ttlSeconds ) {
  if ( !secret ) {throw new Error( 'JWT secret is not configured' );}
  const now = Math.floor( Date.now() / 1000 );
  const header = encode( { alg: 'HS256', typ: 'JWT' } );
  const body = encode( { id: claims.id, username: claims.username, role: claims.role, typ, iat: now, exp: now + ttlSeconds } );
  const signature = createHmac( 'sha256', secret ).update( `${header}.${body}` ).digest( 'base64url' );
  return `${header}.${body}.${signature}`;
}

/**
 * Returns the payload when the token is correctly signed, unexpired and of the
 * expected type; otherwise null. The type check keeps a refresh token from being
 * accepted as an access token when both share a secret.
 */
function verify( token, typ, secret ) {
  if ( !token || !secret ) {return null;}
  const parts = token.split( '.' );
  if ( parts.length !== 3 ) {return null;}

  try {
    if ( decode( parts[0] ).alg !== 'HS256' ) {return null;}
    const expected = createHmac( 'sha256', secret ).update( `${parts[0]}.${parts[1]}` ).digest();
    const received = Buffer.from( parts[2], 'base64url' );
    if ( expected.length !== received.length || !timingSafeEqual( expected, received ) ) {return null;}

    const payload = decode( parts[1] );
    if ( payload.typ !== typ ) {return null;}
    if ( typeof payload.exp !== 'number' || payload.exp <= Math.floor( Date.now() / 1000 ) ) {return null;}
    return payload;
  } catch {
    return null;
  }
}

export const generateToken = ( claims ) => sign( claims, TOKEN_TYPE.ACCESS, accessSecret(), ACCESS_TTL_SECONDS );
export const generateRefreshToken = ( claims ) => sign( claims, TOKEN_TYPE.REFRESH, refreshSecret(), REFRESH_TTL_SECONDS );
export const verifyToken = ( token ) => verify( token, TOKEN_TYPE.ACCESS, accessSecret() );
export const verifyRefreshToken = ( token ) => verify( token, TOKEN_TYPE.REFRESH, refreshSecret() );
