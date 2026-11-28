import assert from 'node:assert/strict';
import test from 'node:test';
import { experiences, projects } from '../src/content/public-content.js';
import { buildCareerTimeline, skillRoles, yearRange } from '../src/features/portfolio/utils/career.js';

const now = new Date( 2026, 10, 26 );

test( 'skills credit the roles whose stack or projects list them', () => {
  const { roles } = buildCareerTimeline( experiences, projects, now );
  assert.deepEqual( skillRoles( 'React', roles, projects ).map( role => role.slug ), ['bap', 'mercatus', 'nab'] );
  assert.deepEqual( skillRoles( 'Ant Design', roles, projects ).map( role => role.slug ), ['bap'] );
  assert.deepEqual( skillRoles( 'Tailwind CSS', roles, projects ), [] );
} );

test( 'year ranges label roles without computed durations', () => {
  assert.equal( yearRange( 'Feb 2023–Feb 2024' ), '2023–2024' );
  assert.equal( yearRange( 'Mar 2025–Present' ), '2025–Now' );
  assert.equal( yearRange( 'Mar 2024–Nov 2024' ), '2024' );
} );

test( 'the career track keeps date ranges and the current role open', () => {
  const timeline = buildCareerTimeline( experiences, projects, now );
  const bySlug = Object.fromEntries( timeline.roles.map( role => [role.slug, role] ) );

  assert.equal( bySlug.nab.isCurrent, true );
  assert.equal( bySlug.nab.endLabel, 'Present' );
  assert.equal( bySlug.nab.years, '2025–Now' );
  assert.equal( bySlug.bap.years, '2022–2024' );
  assert.equal( bySlug.fpt.startLabel, 'Sep 2021' );
  assert.ok( !( 'duration' in bySlug.bap ), 'no computed duration is exposed' );

  assert.equal( timeline.totalYears, 5 );
  assert.equal( timeline.companyCount, 4 );
  assert.equal( timeline.projectCount, 5 );
  assert.equal( timeline.marketCount, 4 );
  assert.deepEqual( timeline.marketCodes, ['AU', 'US/CA', 'JP', 'VN'] );
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
