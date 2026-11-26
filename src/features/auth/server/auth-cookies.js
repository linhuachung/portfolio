import { ACCESS_TTL_SECONDS, REFRESH_TTL_SECONDS, generateRefreshToken, generateToken } from '@/features/auth/server/jwt';

export const ACCESS_COOKIE = 'token';
export const REFRESH_COOKIE = 'refreshToken';

const REFRESH_COOKIE_PATH = '/api/admin/auth';

function cookieOptions( path, maxAge ) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path,
    maxAge
  };
}

export function setAuthCookies( response, admin ) {
  const claims = { id: admin.id, username: admin.username, role: admin.role };
  response.cookies.set( ACCESS_COOKIE, generateToken( claims ), cookieOptions( '/', ACCESS_TTL_SECONDS ) );
  response.cookies.set( REFRESH_COOKIE, generateRefreshToken( claims ), cookieOptions( REFRESH_COOKIE_PATH, REFRESH_TTL_SECONDS ) );
  return response;
}

export function clearAuthCookies( response ) {
  response.cookies.set( ACCESS_COOKIE, '', cookieOptions( '/', 0 ) );
  response.cookies.set( REFRESH_COOKIE, '', cookieOptions( REFRESH_COOKIE_PATH, 0 ) );
  return response;
}
