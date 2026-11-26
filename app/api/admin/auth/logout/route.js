import STATUS_CODES from '@/constants/status';
import { clearAuthCookies } from '@/lib/auth-cookies';
import { DataResponse } from '@/lib/data-response';
import { NextResponse } from 'next/server';

// Public on purpose: clearing cookies must also work when the access token has expired.
export function POST() {
  const response = NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Logged out', null ), { status: STATUS_CODES.SUCCESS } );
  return clearAuthCookies( response );
}
