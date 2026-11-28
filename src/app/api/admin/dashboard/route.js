import { verifyAuth } from '@/features/auth/server';
import { getDashboardOverview, parseDashboardPeriod } from '@/features/dashboard/server';
import { successResponse } from '@/server/http';

export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}

  const period = parseDashboardPeriod( new URL( req.url ).searchParams );
  const { databaseAvailable, overview } = await getDashboardOverview( period );
  return successResponse( databaseAvailable ? 'Dashboard data retrieved' : 'Dashboard is using offline data', overview );
}
