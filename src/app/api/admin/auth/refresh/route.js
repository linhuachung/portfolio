import STATUS_CODES from '@/shared/constants/status';
import { REFRESH_COOKIE, clearAuthCookies, setAuthCookies } from '@/features/auth/server';
import { DataResponse } from '@/server/http';
import { verifyRefreshToken } from '@/features/auth/server';
import prismadb from '@/server/db';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

function unauthorized() {
  const response = NextResponse.json( DataResponse( STATUS_CODES.UNAUTHORIZED, 'Unauthorized', null ), { status: STATUS_CODES.UNAUTHORIZED } );
  return clearAuthCookies( response );
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    const decoded = verifyRefreshToken( cookieStore.get( REFRESH_COOKIE )?.value );
    if ( !decoded || decoded.role !== 'admin' ) {return unauthorized();}

    const admin = await prismadb.admin.findUnique( { where: { id: decoded.id } } );
    if ( !admin || !admin.isActive || admin.role !== 'admin' || admin.username !== decoded.username ) {return unauthorized();}

    const response = NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Token refreshed', null ), { status: STATUS_CODES.SUCCESS } );
    return setAuthCookies( response, admin );
  } catch {
    return unauthorized();
  }
}
