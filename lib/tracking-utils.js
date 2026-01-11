import { NextResponse } from 'next/server';

const TRANSPARENT_PIXEL_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export function getTransparentPixel() {
  const transparentPixel = Buffer.from( TRANSPARENT_PIXEL_BASE64, 'base64' );

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
