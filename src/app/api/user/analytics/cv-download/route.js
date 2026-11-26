import STATUS_CODES from '@/shared/constants/status';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { consumeRateLimit, getClientKey } from '@/server/security';
import { parseDownloadTelemetry } from '@/features/analytics/server';
import { withTimeout } from '@/server/utils';
import { NextResponse } from 'next/server';

export async function POST( req ) {
  const rateLimit = consumeRateLimit( getClientKey( req, 'cv-telemetry' ), { limit: 30, windowMs: 15 * 60 * 1000 } );
  if ( !rateLimit.allowed ) {return new NextResponse( null, { status: 204 } );}

  try {
    const body = await req.json().catch( () => ( {} ) );
    const data = parseDownloadTelemetry( body );
    const forwarded = req.headers.get( 'x-forwarded-for' )?.split( ',' )[0]?.trim();
    const ip = forwarded || req.headers.get( 'x-real-ip' ) || null;
    await withTimeout( prismadb.cvDownload.create( { data: { ...data, ip, userId: null, country: null, city: null } } ), 1500 );
  } catch {
    // Telemetry is best-effort and must never interrupt the public experience.
  }

  return NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, 'Download accepted', null ), { status: STATUS_CODES.SUCCESS } );
}
