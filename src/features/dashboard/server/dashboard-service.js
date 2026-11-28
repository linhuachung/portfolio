import { contentVersion, education, experiences, projects, skills } from '@/content/public-content';
import prismadb from '@/server/db';
import { withTimeout } from '@/server/utils';
import { buildOverviewContent, formatChartData, toRecentContact } from '../utils/overview';

const DATABASE_TIMEOUT_MS = 3500;
const TOP_PATHS = 10;
const RECENT_CONTACTS = 5;

// The dashboard still renders, with zeros, when the database is unreachable.
const EMPTY_RECORDS = {
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

function periodStart( period, now ) {
  const start = new Date( now );
  if ( period === 'day' ) {start.setDate( now.getDate() - 7 );}
  if ( period === 'week' ) {start.setDate( now.getDate() - 30 );}
  if ( period === 'month' ) {start.setMonth( now.getMonth() - 12 );}
  if ( period === 'year' ) {start.setFullYear( now.getFullYear() - 5 );}
  return start;
}

function countBy( items, key ) {
  return items.reduce( ( counts, item ) => {
    const value = item[key] || 'Unknown';
    counts[value] = ( counts[value] || 0 ) + 1;
    return counts;
  }, {} );
}

async function loadRecords( since ) {
  const inPeriod = { createdAt: { gte: since } };
  const [totalContacts, pendingContacts, totalVisits, totalCvDownloads, visits, cvDownloads, visitsWithPath, contacts, recentContacts] = await Promise.all( [
    prismadb.contact.count(),
    prismadb.contact.count( { where: { status: 'pending' } } ),
    prismadb.visit.count(),
    prismadb.cvDownload.count(),
    prismadb.visit.findMany( { where: inPeriod, select: { createdAt: true } } ),
    prismadb.cvDownload.findMany( { where: inPeriod, select: { createdAt: true } } ),
    prismadb.visit.findMany( { where: { ...inPeriod, path: { not: null } }, select: { path: true } } ),
    prismadb.contact.findMany( { select: { status: true } } ),
    prismadb.contact.findMany( {
      take: RECENT_CONTACTS,
      orderBy: { createdAt: 'desc' },
      select: { id: true, firstname: true, lastname: true, name: true, service: true, message: true, status: true, createdAt: true }
    } )
  ] );
  return { totalContacts, pendingContacts, totalVisits, totalCvDownloads, visits, cvDownloads, visitsWithPath, contacts, recentContacts };
}

/**
 * Admin overview for `period`: content stats from the static portfolio content
 * plus audience and inbox activity from the database.
 * @returns {{ databaseAvailable: boolean, overview: object }}
 */
export async function getDashboardOverview( period, now = new Date() ) {
  let databaseAvailable = true;
  let records;
  try {
    records = await withTimeout( loadRecords( periodStart( period, now ) ), DATABASE_TIMEOUT_MS );
  } catch {
    databaseAvailable = false;
    records = EMPTY_RECORDS;
    console.warn( 'Dashboard database unavailable; serving empty operational data.' );
  }

  const content = buildOverviewContent( { experiences, education, projects, skills, pendingContacts: records.pendingContacts } );
  const visitsByPath = Object.entries( countBy( records.visitsWithPath, 'path' ) )
    .map( ( [path, count] ) => ( { path, count } ) )
    .sort( ( a, b ) => b.count - a.count )
    .slice( 0, TOP_PATHS );

  const overview = {
    meta: { databaseAvailable, contentVersion, generatedAt: now.toISOString() },
    stats: {
      ...content.stats,
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
      visitsByPath,
      contactsByStatus: Object.entries( countBy( records.contacts, 'status' ) ).map( ( [status, count] ) => ( { status, count } ) )
    },
    actionQueue: content.actionQueue,
    contentSummary: content.contentSummary,
    recentContacts: records.recentContacts.map( toRecentContact )
  };

  return { databaseAvailable, overview };
}
