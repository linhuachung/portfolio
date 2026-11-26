import { verifyToken } from '@/lib/jwt';
import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { NextResponse } from 'next/server';

/**
 * Extract token from request (Authorization header or cookies)
 * @param {Request} req - Next.js request object
 * @returns {string|null} - Token string or null
 */
export function getTokenFromRequest( req ) {
  const authHeader = req.headers.get( 'authorization' );
  let token = authHeader?.replace( 'Bearer ', '' );

  if ( !token ) {
    token = req.cookies.get( 'token' )?.value;
  }

  return token || null;
}

/**
 * Verify authentication and return error response if unauthorized
 * @param {Request} req - Next.js request object
 * @returns {Object|null} - { decoded } if authorized, null if unauthorized (response already sent)
 */
export async function verifyAuth( req ) {
  const token = getTokenFromRequest( req );

  if ( !token ) {
    return {
      error: NextResponse.json(
        DataResponse( STATUS_CODES.UNAUTHORIZED, 'Unauthorized', null ),
        { status: STATUS_CODES.UNAUTHORIZED }
      )
    };
  }

  const decoded = verifyToken( token );
  if ( !decoded || decoded.role !== 'admin' ) {
    return {
      error: NextResponse.json(
        DataResponse( STATUS_CODES.UNAUTHORIZED, 'Invalid token', null ),
        { status: STATUS_CODES.UNAUTHORIZED }
      )
    };
  }

  return { decoded };
}

