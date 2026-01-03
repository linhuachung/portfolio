import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma';
import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { formatUserData } from '@/lib/user-formatter';
import { handleApiError, createErrorResponse } from '@/lib/api-error-handler';

// Force dynamic rendering - this route queries database at runtime
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// GET public user profile (for homepage and contact page)
export async function GET( req ) {
  try {
    const { searchParams } = new URL( req.url );
    const includeContact = searchParams.get( 'includeContact' ) === 'true';

    // Get first user (portfolio owner)
    const user = await prismadb.user.findFirst( {
      include: {
        socialLinks: {
          orderBy: { order: 'asc' }
        }
      }
    } );

    if ( !user ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );
    }

    // Format response for public access
    const userData = formatUserData( user, false );

    // Include contact fields if requested (for contact page)
    if ( includeContact && userData ) {
      userData.email = user.email || null;
      userData.phone = user.phone || null;
      userData.addressCountry = user.addressCountry || null;
      userData.addressCity = user.addressCity || null;
      userData.address = user.address || null;
    }

    // Filter out empty social links
    if ( userData ) {
      userData.socialLinks = userData.socialLinks.filter( link => link.url && link.url.trim() !== '' );
    }

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'User profile retrieved', userData ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Get public user profile' );
  }
}

