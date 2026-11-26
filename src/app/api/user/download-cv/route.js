import { getOwnerCv } from '@/features/uploads/server';
import { HttpError } from '@/server/http';
import { NextResponse } from 'next/server';

// Fetches from storage at request time.
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// This route answers `{ error, code? }` instead of the DataResponse envelope.
const errorJson = ( { status, message, code } ) => NextResponse.json( { error: message, ...( code && { code } ) }, { status } );

export async function GET() {
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
    if ( error instanceof HttpError ) {return errorJson( error );}
    console.error( 'Error downloading CV:', error );
    return errorJson( { status: 500, message: 'Failed to download CV' } );
  }
}
