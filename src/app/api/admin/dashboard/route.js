import STATUS_CODES from '@/shared/constants/status';
import { parseDashboardPeriod } from '@/features/dashboard/server';
import { verifyAuth } from '@/features/auth/server';
import { DataResponse } from '@/server/http';
import prismadb from '@/server/db';
import { withTimeout } from '@/server/utils';
import { NextResponse } from 'next/server';
import { contentVersion, education, experiences, projects, skills } from '@/content/public-content';
import { buildOverviewContent, formatChartData, toRecentContact } from '@/features/dashboard/utils/overview';

function getStartDate( period, now ) {
  const startDate = new Date( now );
  if ( period === 'day' ) {startDate.setDate( now.getDate() - 7 );}
  if ( period === 'week' ) {startDate.setDate( now.getDate() - 30 );}
  if ( period === 'month' ) {startDate.setMonth( now.getMonth() - 12 );}
  if ( period === 'year' ) {startDate.setFullYear( now.getFullYear() - 5 );}
  return startDate;
}

function countBy( items, key ) {
  const counts = {};
  items.forEach( item => {
    const value = item[key] || 'Unknown';
    counts[value] = ( counts[value] || 0 ) + 1;
  } );
  return counts;
}

const emptyData = {
  totalContacts: 0,
  pendingContacts: 0,
  totalVisits: 0,
  totalCvDownloads: 0,
  visits: [],
  cvDownloads: [],
  visitsWithPath: [],
  contacts: [],
  recentContacts: []
};

async function loadDashboardData( startDate ) {
  const [
    totalContacts,
    pendingContacts,
    totalVisits,
    totalCvDownloads,
    visits,
    cvDownloads,
    visitsWithPath,
    contacts,
    recentContacts
  ] = await Promise.all( [
    prismadb.contact.count(),
    prismadb.contact.count( { where: { status: 'pending' } } ),
    prismadb.visit.count(),
    prismadb.cvDownload.count(),
    prismadb.visit.findMany( { where: { createdAt: { gte: startDate } }, select: { createdAt: true } } ),
    prismadb.cvDownload.findMany( { where: { createdAt: { gte: startDate } }, select: { createdAt: true } } ),
    prismadb.visit.findMany( { where: { createdAt: { gte: startDate }, path: { not: null } }, select: { path: true } } ),
    prismadb.contact.findMany( { select: { status: true } } ),
    prismadb.contact.findMany( {
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        name: true,
        service: true,
        message: true,
        status: true,
        createdAt: true
      }
    } )
  ] );

  return {
    totalContacts,
    pendingContacts,
    totalVisits,
    totalCvDownloads,
    visits,
    cvDownloads,
    visitsWithPath,
    contacts,
    recentContacts
  };
}

export async function GET( req ) {
  const authResult = await verifyAuth( req );
  if ( authResult.error ) {return authResult.error;}

  const { searchParams } = new URL( req.url );
  const period = parseDashboardPeriod( searchParams );
  const now = new Date();
  let databaseAvailable = true;
  let records;

  try {
    records = await withTimeout( loadDashboardData( getStartDate( period, now ) ), 3500 );
  } catch {
    databaseAvailable = false;
    records = emptyData;
    console.warn( 'Dashboard database unavailable; serving empty operational data.' );
  }

  const pathCounts = countBy( records.visitsWithPath, 'path' );
  const statusCounts = countBy( records.contacts, 'status' );
  const canonicalOverview = buildOverviewContent( { experiences, education, projects, skills, pendingContacts: records.pendingContacts } );
  const dashboardData = {
    meta: { databaseAvailable, contentVersion, generatedAt: now.toISOString() },
    stats: {
      ...canonicalOverview.stats,
      publishedProjects: projects.length,
      totalSkills: skills.reduce( ( total, group ) => total + group.items.length, 0 ),
      totalExperiences: experiences.length,
      totalEducation: education.length,
      totalContacts: records.totalContacts,
      pendingContacts: records.pendingContacts,
      totalVisits: records.totalVisits,
      totalCvDownloads: records.totalCvDownloads
    },
    charts: {
      visits: formatChartData( records.visits, period ),
      cvDownloads: formatChartData( records.cvDownloads, period ),
      visitsByPath: Object.entries( pathCounts ).map( ( [path, count] ) => ( { path, count } ) ).sort( ( a, b ) => b.count - a.count ).slice( 0, 10 ),
      contactsByStatus: Object.entries( statusCounts ).map( ( [status, count] ) => ( { status, count } ) )
    },
    actionQueue: canonicalOverview.actionQueue,
    contentSummary: canonicalOverview.contentSummary,
    recentContacts: records.recentContacts.map( toRecentContact )
  };

  return NextResponse.json(
    DataResponse( STATUS_CODES.SUCCESS, databaseAvailable ? 'Dashboard data retrieved' : 'Dashboard is using offline data', dashboardData ),
    { status: STATUS_CODES.SUCCESS }
  );
}
