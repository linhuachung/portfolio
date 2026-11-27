import assert from 'node:assert/strict';
import test from 'node:test';
import { experiences, projects } from '../src/content/public-content.js';
import { buildCareerTimeline, formatDuration, formatShortDuration, formatYearsUsed, shortYears, skillUsage } from '../src/features/portfolio/utils/career.js';

test( 'skill usage sums the months of the roles that used it, rounded down', () => {
  const { roles } = buildCareerTimeline( experiences, projects, new Date( 2026, 10, 26 ) );
  const react = skillUsage( 'React', roles, projects );
  assert.deepEqual( react.roles.map( role => role.slug ), ['bap', 'mercatus', 'nab'] );
  assert.equal( react.months, 25 + 13 + 21 );
  assert.equal( formatYearsUsed( react.months ), '4+ yrs' );
  assert.equal( formatYearsUsed( 13 ), '1+ yr' );
  assert.equal( formatYearsUsed( 5 ), '5 mos' );
  assert.equal( skillUsage( 'Tailwind CSS', roles, projects ).months, 0 );
} );


test( 'compact labels fit the narrow track and the project picker', () => {
  assert.equal( formatShortDuration( 5 ), '5m' );
  assert.equal( formatShortDuration( 12 ), '1y' );
  assert.equal( formatShortDuration( 25 ), '2y 1m' );
  assert.equal( shortYears( 'Feb 2023–Feb 2024' ), '2023–24' );
  assert.equal( shortYears( 'Mar 2025–Present' ), '2025–Now' );
  assert.equal( shortYears( 'Mar 2024–Mar 2024' ), '2024' );
} );

test( 'durations read the way a résumé reader counts them', () => {
  assert.equal( formatDuration( 1 ), '1 mo' );
  assert.equal( formatDuration( 5 ), '5 mos' );
  assert.equal( formatDuration( 12 ), '1 yr' );
  assert.equal( formatDuration( 13 ), '1 yr 1 mo' );
  assert.equal( formatDuration( 25 ), '2 yrs 1 mo' );
} );

test( 'the career track counts tenure inclusively and keeps the current role open', () => {
  const timeline = buildCareerTimeline( experiences, projects, new Date( 2026, 10, 26 ) );
  const bySlug = Object.fromEntries( timeline.roles.map( role => [role.slug, role] ) );

  assert.equal( bySlug.fpt.duration, '5 mos' );
  assert.equal( bySlug.bap.duration, '2 yrs 1 mo' );
  assert.equal( bySlug.mercatus.duration, '1 yr 1 mo' );
  assert.equal( bySlug.nab.duration, '1 yr 9 mos' );
  assert.equal( bySlug.nab.isCurrent, true );
  assert.equal( bySlug.nab.endLabel, 'Present' );
  assert.equal( bySlug.fpt.startLabel, 'Sep 2021' );

  assert.equal( timeline.totalDuration, '5 yrs 3 mos' );
  assert.equal( timeline.totalYears, 5 );
  assert.equal( timeline.companyCount, 4 );
  assert.equal( timeline.projectCount, 5 );
  assert.equal( timeline.marketCount, 4 );
  assert.deepEqual( bySlug.bap.markets, ['Japan'] );
  assert.equal( bySlug.bap.projectCount, 2 );

  const shares = timeline.roles.reduce( ( sum, role ) => sum + role.share, 0 );
  assert.ok( Math.abs( shares - 1 ) < 1e-9 );
} );

test( 'every role declares the months its timeline segment needs', () => {
  experiences.forEach( experience => {
    assert.match( experience.start, /^\d{4}-\d{2}$/, `${experience.slug} start` );
    assert.ok( experience.end === null || /^\d{4}-\d{2}$/.test( experience.end ), `${experience.slug} end` );
  } );
} );
