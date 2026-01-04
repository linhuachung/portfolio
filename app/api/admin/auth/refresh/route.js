import { NextResponse } from 'next/server';
import { verifyRefreshToken, generateToken, generateRefreshToken } from '@/lib/jwt';
import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { cookies } from 'next/headers';

export async function POST( req ) {
  try {
    // Get refresh token from request body or cookies
    const body = await req.json().catch( () => ( {} ) );
    let refreshToken = body.refreshToken;

    // Fallback to cookies if not in body
    if ( !refreshToken ) {
      const cookieStore = cookies();
      refreshToken = cookieStore.get( 'refreshToken' )?.value;
    }

    if ( !refreshToken ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.UNAUTHORIZED, 'Refresh token not found', null ),
        { status: STATUS_CODES.UNAUTHORIZED }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken( refreshToken );

    if ( !decoded ) {
      return NextResponse.json(
        DataResponse( STATUS_CODES.UNAUTHORIZED, 'Invalid or expired refresh token', null ),
        { status: STATUS_CODES.UNAUTHORIZED }
      );
    }

    // Generate new access token and refresh token (token rotation)
    const newAccessToken = generateToken( {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role || 'admin'
    } );

    const newRefreshToken = generateRefreshToken( {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role || 'admin'
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Token refreshed successfully', {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      } ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, error.message || 'Internal server error', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}

