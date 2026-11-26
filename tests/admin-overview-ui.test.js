import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = path => readFile( new URL( `../${path}`, import.meta.url ), 'utf8' );

test( 'overview is an operations workspace instead of a vanity-card grid', async () => {
  const source = await read( 'src/features/dashboard/components/DashboardPage/DashboardPage.jsx' );

  assert.doesNotMatch( source, /StatsGrid/ );
  assert.doesNotMatch( source, /ChartContainer/ );
  assert.match( source, /ActionQueue/ );
  assert.match( source, /AudienceOverview/ );
  assert.match( source, /RecentContacts/ );
  assert.match( source, /ContentHealth/ );
} );

test( 'overview styling caps the content rail and prioritizes the operations column', async () => {
  const source = await read( 'src/features/dashboard/styles/Overview.styles.js' );

  assert.match( source, /1280px/ );
  assert.match( source, /minmax\(0,\s*1\.45fr\)/ );
  assert.doesNotMatch( source, /overflowY:\s*'auto'/ );
} );

test( 'overview modules avoid delayed entrance animation', async () => {
  const sources = await Promise.all( [
    read( 'src/features/dashboard/components/ActionQueue/ActionQueue.jsx' ),
    read( 'src/features/dashboard/components/RecentContacts/RecentContacts.jsx' ),
    read( 'src/features/dashboard/components/AudienceOverview/AudienceOverview.jsx' )
  ] );

  sources.forEach( source => {
    assert.doesNotMatch( source, /framer-motion/ );
    assert.doesNotMatch( source, /initial=|animate=|transition=/ );
  } );
} );

test( 'overview does not render a healthy workspace after the initial request fails', async () => {
  const source = await read( 'src/features/dashboard/components/DashboardPage/DashboardPage.jsx' );

  assert.match( source, /if\s*\(\s*!dashboardData\s*\)\s*\{\s*return/ );
} );

test( 'overview metrics use valid list semantics and reduced-motion styles', async () => {
  const overviewSource = await read( 'src/features/dashboard/components/AudienceOverview/AudienceOverview.jsx' );
  // Each component with interactive list items owns its reduced-motion rule.
  const interactiveStyles = await Promise.all( ['ActionQueue', 'RecentContacts', 'ContentHealth'].map(
    name => read( `src/features/dashboard/components/${name}/${name}.styles.js` )
  ) );

  assert.match( overviewSource, /MetricBand component="ul"/ );
  assert.match( overviewSource, /Metric component="li"/ );
  assert.doesNotMatch( overviewSource, /MetricBand component="dl"/ );
  interactiveStyles.forEach( source => assert.match( source, /prefers-reduced-motion:\s*reduce/ ) );
} );
