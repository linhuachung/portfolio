export const DASHBOARD_PERIODS = ['day', 'week', 'month', 'year'];

export function parseDashboardPeriod( searchParams ) {
  const period = searchParams.get( 'period' );
  return DASHBOARD_PERIODS.includes( period ) ? period : 'month';
}
