import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma';
import STATUS_CODES from '@/constants/status';
import { DataResponse } from '@/lib/data-response';
import { formatUserData } from '@/lib/user-formatter';
import { handleApiError, createErrorResponse } from '@/lib/api-error-handler';

// GET public user profile (for homepage)
export async function GET() {
  try {
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

