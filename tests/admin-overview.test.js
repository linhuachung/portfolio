import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildAudienceSummary,
  buildOverviewContent,
  formatChartData,
  toRecentContact
} from '../lib/admin-overview.js';

const fixtures = {
  experiences: [{ slug: 'nab', dates: 'Mar 2025–Present' }],
  education: [{ slug: 'school', programs: [{ name: 'Computer Science', credential: '/degree.pdf' }] }],
  projects: [
    { slug: 'public', media: { permission: 'confirmed' } },
    { slug: 'review', media: { permission: 'needs-review' } }
  ],
  skills: [{ group: 'Frontend', items: ['React', 'TypeScript'] }]
};

test( 'overview content uses canonical local records and surfaces actionable media review', () => {
  const overview = buildOverviewContent( { ...fixtures, pendingContacts: 3 } );

  assert.deepEqual( overview.stats, {
    publishedProjects: 2,
    pendingContacts: 3,
    totalExperiences: 1,
    totalEducation: 1
  } );
  assert.equal( overview.contentSummary.projects.issues, 1 );
  assert.equal( overview.actionQueue[0].type, 'inbox' );
  assert.equal( overview.actionQueue[0].count, 3 );
  assert.equal( overview.actionQueue[1].href, '/admin/project' );
} );

test( 'overview content shows a healthy state when no action is required', () => {
  const overview = buildOverviewContent( {
    ...fixtures,
    pendingContacts: 0,
    projects: [{ slug: 'public', media: { permission: 'confirmed' } }]
  } );

  assert.equal( overview.actionQueue.length, 0 );
  assert.equal( overview.contentSummary.projects.status, 'ready' );
} );

test( 'audience summary uses selected-period series instead of lifetime totals', () => {
  const summary = buildAudienceSummary( {
    databaseAvailable: true,
    visits: [{ date: '2026-10', count: 40 }, { date: '2026-11', count: 60 }],
    downloads: [{ date: '2026-10', count: 4 }, { date: '2026-11', count: 6 }]
  } );

  assert.deepEqual( summary, {
    visits: 100,
    downloads: 10,
    downloadsPerHundredVisits: 10
  } );
} );

test( 'audience summary reports unavailable live data truthfully', () => {
  const summary = buildAudienceSummary( {
    databaseAvailable: false,
    visits: [],
    downloads: []
  } );

  assert.deepEqual( summary, {
    visits: null,
    downloads: null,
    downloadsPerHundredVisits: null
  } );
} );

test( 'recent contact preview includes bounded operational context', () => {
  const preview = toRecentContact( {
    id: 'contact-1',
    name: 'Avery Morgan',
    email: 'avery@example.com',
    service: 'frontend',
    message: `  ${'A'.repeat( 220 )}  `,
    status: 'pending',
    createdAt: new Date( '2026-11-24T08:00:00.000Z' )
  } );

  assert.equal( preview.service, 'frontend' );
  assert.equal( preview.message.length, 180 );
  assert.equal( preview.message.endsWith( '…' ), true );
  assert.equal( preview.name, 'Avery Morgan' );
  assert.equal( 'email' in preview, false );
} );

test( 'weekly dashboard series run from oldest week to newest week', () => {
  const series = formatChartData( [
    { createdAt: '2026-11-24T10:00:00.000Z' },
    { createdAt: '2026-11-03T10:00:00.000Z' },
    { createdAt: '2026-11-17T10:00:00.000Z' },
    { createdAt: '2026-11-04T10:00:00.000Z' }
  ], 'week' );

  assert.deepEqual( series, [
    { date: 'Nov 2', count: 2 },
    { date: 'Nov 16', count: 1 },
    { date: 'Nov 23', count: 1 }
  ] );
} );
