import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET - Track reply email open (pixel tracking)
 * Returns a 1x1 transparent PNG image
 */
export async function GET( req, { params } ) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if ( !id ) {
      return getTransparentPixel();
    }

    // Mark reply as opened (optional - can add repliedEmailOpenedAt field later)
    // For now, just return pixel
    // Could update a field like repliedEmailOpenedAt if needed

    return getTransparentPixel();

  } catch ( error ) {
    console.error( 'Error tracking reply email open:', error );
    return getTransparentPixel();
  }
}

/**
 * Generate a 1x1 transparent PNG image
 */
function getTransparentPixel() {
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

