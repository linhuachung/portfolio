import test from 'node:test';
import assert from 'node:assert/strict';
import { education, experiences, profile, projects } from '../content/public-content.js';

test( 'public project content stays within one-screen limits', () => {
  assert.equal( projects.length, 5 );
  projects.forEach( project => {
    assert.ok( project.slug && project.summary && project.role && project.period );
    assert.ok( project.media?.source && project.media?.permission && project.media?.evidenceRole );
    assert.ok( project.contributions.length <= 3 );
    assert.ok( project.technologies.length <= 5 );
  } );
} );

test( 'project order and public media are evidence-led', () => {
  assert.equal( projects[0].slug, 'mercatus' );
  assert.equal( projects[0].number, '01' );

  const publiclyRenderedMedia = projects.filter( project => project.media.permission === 'confirmed' );
  assert.deepEqual( publiclyRenderedMedia.map( project => project.slug ), ['mercatus'] );
  assert.ok( publiclyRenderedMedia.every( project => project.media.evidenceRole === 'product-proof' ) );
} );

test( 'work history is chronological and contains corrected FPT dates', () => {
  assert.deepEqual( experiences.map( item => item.slug ), ['fpt', 'bap', 'mercatus', 'nab'] );
  assert.equal( experiences[0].dates, 'Sep 2021–Jan 2022' );
  assert.equal( experiences.at( -1 ).role, 'Software Engineer (Frontend)' );
} );

test( 'projects keep project, client, employer, role, and project period distinct', () => {
  assert.deepEqual( projects.map( ( { slug, title, client, employer, role, period } ) => ( {
    slug, title, client, employer, role, period
  } ) ), [
    {
      slug: 'mercatus',
      title: 'Mercatus Grocery Commerce',
      client: null,
      employer: 'Mercatus Technologies Inc.',
      role: 'Frontend Developer',
      period: 'Mar 2024–Mar 2025'
    },
    {
      slug: 'nab',
      title: 'Join NAB Customer Onboarding',
      client: 'National Australia Bank (NAB)',
      employer: 'NAB Innovation Centre Vietnam',
      role: 'Software Engineer (Frontend)',
      period: 'Mar 2025–Present'
    },
    {
      slug: 'dronex',
      title: 'DroneX',
      client: null,
      employer: 'BAP IT Co., JSC',
      role: 'Frontend Developer',
      period: 'Feb 2023–Feb 2024'
    },
    {
      slug: 'bintech',
      title: 'Bintech',
      client: null,
      employer: 'BAP IT Co., JSC',
      role: 'Full-stack Developer',
      period: 'Feb 2022–Jan 2023'
    },
    {
      slug: 'shinhan',
      title: 'Shinhan Bank Operations',
      client: 'Shinhan Bank',
      employer: 'FPT Software',
      role: 'Frontend Developer',
      period: 'Oct 2021–Jan 2022'
    }
  ] );
} );

test( 'every project belongs to one resume experience and every company exposes its projects', () => {
  const experienceSlugs = new Set( experiences.map( experience => experience.slug ) );
  assert.ok( projects.every( project => experienceSlugs.has( project.experienceSlug ) ) );

  assert.deepEqual( projects.filter( project => project.experienceSlug === 'bap' ).map( project => project.slug ), ['dronex', 'bintech'] );
  experiences.forEach( experience => {
    assert.ok( projects.some( project => project.experienceSlug === experience.slug ), `${experience.company} needs at least one project` );
  } );
} );

test( 'education reflects the source resume record', () => {
  assert.deepEqual( education.map( ( { slug, school, programs, dates, location } ) => ( {
    slug, school, programs: programs.map( program => program.name ), dates, location
  } ) ), [
    {
      slug: 'open-university',
      school: 'Ho Chi Minh City Open University',
      programs: ['Computer Science'],
      dates: '2016–2022',
      location: 'Ho Chi Minh City, Vietnam'
    },
    {
      slug: 'cybersoft',
      school: 'Cybersoft Academy',
      programs: ['Professional Frontend Developer', 'Professional NodeJS Developer'],
      dates: '2020–2021',
      location: 'Ho Chi Minh City, Vietnam'
    }
  ] );
} );

test( 'profile exposes verified recruiter resources', () => {
  // /cv is redirected to the current résumé in vercel.json
  assert.equal( profile.resume, '/cv' );
  assert.match( profile.linkedin, /^https:\/\/www\.linkedin\.com\// );
  assert.equal( profile.github, 'https://github.com/linhuachung' );
} );
