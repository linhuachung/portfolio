import STATUS_CODES from '@/constants/status';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}

  try {
    const [unread, total, latest] = await Promise.all( [
      prismadb.contact.count( { where: { status: 'pending' } } ),
      prismadb.contact.count(),
      prismadb.contact.findFirst( {
        orderBy: { createdAt: 'desc' },
        select: { id: true, createdAt: true, status: true }
      } )
    ] );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Inbox summary retrieved', {
        unread,
        total,
        latest
      } ),
      { status: STATUS_CODES.SUCCESS }
    );
  } catch {
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVICE_UNAVAILABLE, 'Inbox summary is temporarily unavailable', null ),
      { status: STATUS_CODES.SERVICE_UNAVAILABLE }
    );
  }
}
