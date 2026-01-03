import STATUS_CODES from '@/constants/status';
import { createErrorResponse, handleApiError } from '@/lib/api-error-handler';
import { verifyAuth } from '@/lib/auth-utils';
import { DataResponse } from '@/lib/data-response';
import prismadb from '@/lib/prisma';
import { prepareSocialLinksForDB } from '@/lib/social-links-utils';
import { formatUserData, normalizeOptionalField, normalizeStats } from '@/lib/user-formatter';
import { NextResponse } from 'next/server';

// GET user profile
export async function GET( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

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

    // Format response
    const userData = formatUserData( user, true );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'User profile retrieved', userData ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Get user profile' );
  }
}

// PUT update user profile
export async function PUT( req ) {
  try {
    const authResult = await verifyAuth( req );
    if ( authResult.error ) {
      return authResult.error;
    }

    const body = await req.json();
    const {
      email,
      name,
      avatar,
      bio,
      phone,
      title,
      greeting,
      bioParagraph,
      stats,
      cvPath,
      socialLinks,
      addressCountry,
      addressCity,
      address
    } = body;

    // Get first user (portfolio owner)
    const existingUser = await prismadb.user.findFirst();

    if ( !existingUser ) {
      return createErrorResponse( STATUS_CODES.NOT_FOUND, 'User not found' );
    }

    // Update user - convert empty strings to null for optional fields
    await prismadb.user.update( {
      where: { id: existingUser.id },
      data: {
        email: email || existingUser.email,
        name: name || existingUser.name,
        avatar: normalizeOptionalField( avatar, existingUser.avatar ),
        bio: normalizeOptionalField( bio, existingUser.bio ),
        phone: normalizeOptionalField( phone, existingUser.phone ),
        title: normalizeOptionalField( title, existingUser.title ),
        greeting: normalizeOptionalField( greeting, existingUser.greeting ),
        bioParagraph: normalizeOptionalField( bioParagraph, existingUser.bioParagraph ),
        stats: stats !== undefined ? normalizeStats( stats, existingUser.stats ) : existingUser.stats,
        cvPath: normalizeOptionalField( cvPath, existingUser.cvPath ),
        addressCountry: normalizeOptionalField( addressCountry, existingUser.addressCountry ),
        addressCity: normalizeOptionalField( addressCity, existingUser.addressCity ),
        address: normalizeOptionalField( address, existingUser.address )
      }
    } );

    // Update social links if provided
    if ( socialLinks && Array.isArray( socialLinks ) ) {
      // Delete existing social links
      await prismadb.socialLink.deleteMany( {
        where: { userId: existingUser.id }
      } );

      // Prepare and create social links
      const validSocialLinks = prepareSocialLinksForDB( socialLinks, existingUser.id );

      if ( validSocialLinks.length > 0 ) {
        await prismadb.socialLink.createMany( {
          data: validSocialLinks
        } );
      }
    }

    // Fetch updated user with social links
    const userWithLinks = await prismadb.user.findUnique( {
      where: { id: existingUser.id },
      include: {
        socialLinks: {
          orderBy: { order: 'asc' }
        }
      }
    } );

    const userData = formatUserData( userWithLinks, true );

    return NextResponse.json(
      DataResponse( STATUS_CODES.SUCCESS, 'User profile updated successfully', userData ),
      { status: STATUS_CODES.SUCCESS }
    );

  } catch ( error ) {
    return handleApiError( error, 'Update user profile' );
  }
}

