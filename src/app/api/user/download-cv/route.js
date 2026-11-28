import { getOwnerCv } from '@/features/uploads/server';
import { HttpError } from '@/server/http';
import { NextResponse } from 'next/server';
import { profile } from '@/content/public-content';

// Fetches from storage at request time.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET( req ) {
  try {
    const { buffer, fileName } = await getOwnerCv();
    return new NextResponse( buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    } );
  } catch ( error ) {
    // Visitors click this from a button: with no uploaded PDF (or storage down) they get
    // the online CV instead of an error page. The cause is still logged for the owner.
    if ( !( error instanceof HttpError ) || error.status >= 500 ) {console.error( 'Error downloading CV:', error );}
    else {console.warn( `CV download unavailable (${error.status}): ${error.message}` );}
    return NextResponse.redirect( new URL( profile.resume, req.url ), 307 );
  }
}
