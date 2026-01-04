import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET - Track email open (pixel tracking)
 * Returns a 1x1 transparent PNG image
 */
export async function GET( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      // Return transparent pixel even if ID is missing (to prevent broken images)
      return getTransparentPixel();
    }

    // Mark email as opened (only if not already opened)
    // Using update with conditional to avoid errors if field doesn't exist yet
    try {
      await prismadb.contact.updateMany( {
        where: {
          id,
          emailOpenedAt: null
        },
        data: {
          emailOpenedAt: new Date()
        }
      } );
    } catch ( err ) {
      // Field might not exist yet, try without select
      try {
        await prismadb.contact.update( {
          where: { id },
          data: {
            emailOpenedAt: new Date()
          }
        } );
      } catch ( updateErr ) {
        // Silently fail - field might not be in schema yet
        console.log( 'Email tracking: Field emailOpenedAt may not exist yet' );
      }
    }

    // Return transparent 1x1 PNG image
    return getTransparentPixel();

  } catch ( error ) {
    // Silently fail and return pixel to prevent broken images
    console.error( 'Error tracking email open:', error );
    return getTransparentPixel();
  }
}

/**
 * Generate a 1x1 transparent PNG image
 */
function getTransparentPixel() {
  // Base64 encoded 1x1 transparent PNG
  const transparentPixel = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );

  return new NextResponse( transparentPixel, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  } );
}

