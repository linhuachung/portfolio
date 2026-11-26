import STATUS_CODES from '@/shared/constants/status';
import { setAuthCookies } from '@/features/auth/server';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { consumeRateLimit, getClientKey } from '@/server/security';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const LOGIN_RATE_LIMIT = { limit: 10, windowMs: 15 * 60 * 1000 };
const MAX_USERNAME_LENGTH = 100;
const MAX_PASSWORD_LENGTH = 200;

const invalidCredentials = () => NextResponse.json(
  DataResponse( STATUS_CODES.UNAUTHORIZED, 'Invalid credentials', null ),
  { status: STATUS_CODES.UNAUTHORIZED }
);

function readCredentials( body ) {
  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const valid = username && password && username.length <= MAX_USERNAME_LENGTH && password.length <= MAX_PASSWORD_LENGTH;
  return valid ? { username, password } : null;
}

export async function POST( req ) {
  const rateLimit = consumeRateLimit( getClientKey( req, 'admin-login' ), LOGIN_RATE_LIMIT );
  if ( !rateLimit.allowed ) {
    return NextResponse.json( DataResponse( 429, 'Too many login attempts', null ), { status: 429 } );
  }

  try {
    const credentials = readCredentials( await req.json().catch( () => ( {} ) ) );
    if ( !credentials ) {return invalidCredentials();}

    const admin = await prismadb.admin.findUnique( { where: { username: credentials.username } } );
    if ( !admin || !admin.isActive || !( await bcrypt.compare( credentials.password, admin.password ) ) ) {
      return invalidCredentials();
    }

    const response = NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Login success', null ), { status: STATUS_CODES.SUCCESS } );
    return setAuthCookies( response, admin );
  } catch {
    return NextResponse.json( DataResponse( STATUS_CODES.SERVER_ERROR, 'Login unavailable', null ), { status: STATUS_CODES.SERVER_ERROR } );
  }
}
