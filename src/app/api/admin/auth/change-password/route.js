import STATUS_CODES from '@/shared/constants/status';
import { validatePasswordChange } from '@/features/auth/server';
import { clearAuthCookies } from '@/features/auth/server';
import { verifyAuth } from '@/features/auth/server';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { consumeRateLimit } from '@/server/security';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}

  const rateLimit = consumeRateLimit( `admin-password:${authResult.decoded.id}`, { limit: 5, windowMs: 15 * 60 * 1000 } );
  if ( !rateLimit.allowed ) {
    return NextResponse.json( DataResponse( 429, 'Too many password attempts. Try again later.', null ), { status: 429 } );
  }

  try {
    const input = await req.json().catch( () => ( {} ) );
    const validation = validatePasswordChange( input );
    if ( !validation.valid ) {
      return NextResponse.json( DataResponse( 422, validation.message, { field: validation.field } ), { status: 422 } );
    }

    const admin = await prismadb.admin.findUnique( { where: { id: authResult.decoded.id } } );
    if ( !admin || !admin.isActive || !( await bcrypt.compare( validation.data.currentPassword, admin.password ) ) ) {
      return NextResponse.json( DataResponse( 422, 'Current password is incorrect', { field: 'currentPassword' } ), { status: 422 } );
    }

    const password = await bcrypt.hash( validation.data.newPassword, 12 );
    await prismadb.admin.update( { where: { id: admin.id }, data: { password } } );

    const response = NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Password changed successfully', null ), { status: STATUS_CODES.SUCCESS } );
    return clearAuthCookies( response );
  } catch {
    return NextResponse.json( DataResponse( STATUS_CODES.SERVER_ERROR, 'Password change is temporarily unavailable', null ), { status: STATUS_CODES.SERVER_ERROR } );
  }
}
