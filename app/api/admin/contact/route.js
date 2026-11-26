import STATUS_CODES from '@/constants/status';
import { parseAdminContactQuery, buildAdminContactWhere } from '@/lib/admin-contact-query';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {
    return authResult.error;
  }

  try {
    const filters = parseAdminContactQuery( new URL( req.url ).searchParams );
    const where = buildAdminContactWhere( filters );
    const skip = ( filters.page - 1 ) * filters.limit;

    const [items, total, statusGroups] = await Promise.all( [
      prismadb.contact.findMany( {
        where,
        skip,
        take: filters.limit,
        orderBy: { createdAt: filters.sort === 'oldest' ? 'asc' : 'desc' },
        select: {
          id: true,
          name: true,
          firstname: true,
          lastname: true,
          email: true,
          service: true,
          message: true,
          status: true,
          createdAt: true,
          _count: { select: { replies: true } }
        }
      } ),
      prismadb.contact.count( { where } ),
      prismadb.contact.groupBy( { by: ['status'], _count: { id: true } } )
    ] );

    const counts = statusGroups.reduce( ( result, group ) => ( {
      ...result,
      [group.status]: group._count.id
    } ), {} );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'Contacts retrieved', {
        items: items.map( item => ( {
          ...item,
          name: item.name || `${item.firstname || ''} ${item.lastname || ''}`.trim() || 'Unknown contact',
          replyCount: item._count.replies,
          _count: undefined
        } ) ),
        counts: { all: Object.values( counts ).reduce( ( sum, count ) => sum + count, 0 ), ...counts },
        pagination: {
          page: filters.page,
          limit: filters.limit,
          total,
          pages: Math.max( 1, Math.ceil( total / filters.limit ) )
        }
      } ),
      { status: STATUS_CODES.SUCCESS }
    );
  } catch ( error ) {
    console.error( 'Failed to retrieve contacts:', error );
    return NextResponse.json(
      DataResponse( STATUS_CODES.SERVER_ERROR, 'Unable to retrieve contacts', null ),
      { status: STATUS_CODES.SERVER_ERROR }
    );
  }
}
