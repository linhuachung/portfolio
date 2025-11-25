import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma';
import { DataResponse } from '@/lib/data-response';
import STATUS_CODES from '@/constants/status';

export async function POST( req ) {
  try {
    // Handle both JSON and Blob (from sendBeacon)
    let body;
    const contentType = req.headers.get( 'content-type' );

    if ( contentType?.includes( 'application/json' ) ) {
      body = await req.json();
    } else {
      // Handle Blob from sendBeacon
      const blob = await req.blob();
      const text = await blob.text();
      body = JSON.parse( text );
    }

    const { userAgent } = body;

    // Get IP address from request headers
    const forwarded = req.headers.get( 'x-forwarded-for' );
    const realIp = req.headers.get( 'x-real-ip' );
    const ip = forwarded ? forwarded.split( ',' )[0].trim() : realIp || null;

    // Get or create user (optional)
    let userId = null;
    const user = await prismadb.user.findFirst();
    if ( user ) {
      userId = user.id;
    }

    // Create CV download record
    const cvDownload = await prismadb.cvDownload.create( {
      data: {
        userId: userId || null,
        ip: ip || null,
        userAgent: userAgent || null,
        country: null,
        city: null
      }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.CREATED, 'CV download recorded', cvDownload ),
      { status: STATUS_CODES.CREATED }
    );

  } catch ( error ) {
    // Silently fail - don't interrupt user experience
    // Return success to prevent blocking download
    return NextResponse.json(
      DataResponse( STATUS_CODES.CREATED, 'CV download recorded', null ),
      { status: STATUS_CODES.CREATED }
    );
  }
}

