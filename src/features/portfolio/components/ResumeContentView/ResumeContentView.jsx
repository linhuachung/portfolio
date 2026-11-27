'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { experiences, profile, projects, resumeSections } from '@/content/public-content';
import ResumeLink from '../ResumeLink';
import { createQueryHref, getAllowedValue } from '../../utils/url-state';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';
import { Kicker } from '../../styles/PublicLayout.styles';
import { ResumeScreen } from '../../styles/Resume.styles';
import { CareerStats, CompactCareer, CvButton, CvLinks, HeadingAside, HeadingIdentity, IdentityLine, RailButton, ResumeContent, ResumeHeading, ResumeRail, ResumeTitle } from './ResumeContentView.styles';
import ProfileAvatar from '../ProfileAvatar';
import SocialLinks from '../SocialLinks';
import { buildCareerTimeline } from '../../utils/career';
import { RESUME_PANELS } from '../../constants/resume';
import { capitalize } from '../../utils/text';
import ExperienceView from '../ExperienceView';
import SkillsView from '../SkillsView';
import EducationView from '../EducationView';
import AboutView from '../AboutView';

const roles = experiences.map( item => item.slug );

export default function ResumeContentView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const headingRef = useRef( null );
  const trackRef = useRef( null );
  // How the last role change happened: a pointer click moves focus to the role heading,
  // arrow keys keep focus on the timeline.
  const roleChangeSource = useRef( null );
  const section = getAllowedValue( searchParams, 'section', resumeSections, 'experience' );
  const roleSlug = getAllowedValue( searchParams, 'role', roles, 'nab' );
  const panel = getAllowedValue( searchParams, 'panel', RESUME_PANELS, 'overview' );
  // Tenure depends on today's date; this view only renders in the browser (see ResumePage's Suspense).
  const career = useMemo( () => buildCareerTimeline( experiences, projects ), [] );
  const roleIndex = career.roles.findIndex( item => item.slug === roleSlug );
  const role = career.roles[roleIndex];
  const roleProjects = projects.filter( item => item.experienceSlug === roleSlug );
  const roleProjectSlugs = roleProjects.map( item => item.slug );
  const projectSlug = getAllowedValue( searchParams, 'project', roleProjectSlugs, roleProjectSlugs[0] );
  const project = roleProjects.find( item => item.slug === projectSlug );
  const stats = [
    [`${career.totalYears}+ yrs`, 'experience'],
    [career.companyCount, 'companies'],
    [career.projectCount, 'products'],
    [career.marketCount, 'markets']
  ];

  // Tabs, roles and projects are views of one page: replace the URL so Back leaves the résumé.
  const updateState = updates => {
    router.replace( createQueryHref( pathname, searchParams, updates ), { scroll: false } );
  };

  useEffect( () => {
    const source = roleChangeSource.current;
    roleChangeSource.current = null;
    if ( source === 'pointer' ) {headingRef.current?.focus();}
    if ( source === 'keyboard' ) {trackRef.current?.querySelector( '[aria-current="step"]' )?.focus();}
  }, [roleSlug] );

  // The open panel stays open; a new role's Projects tab starts at its first project.
  const selectRole = ( slug, source ) => {
    if ( slug === roleSlug ) {return;}
    roleChangeSource.current = source;
    updateState( { section: 'experience', role: slug, project: null } );
  };

  const onTimelineKeyDown = event => {
    // Up/Down cover the stacked (vertical) layout used on tall phones.
    const direction = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    let nextIndex = direction ? ( roleIndex + direction + career.roles.length ) % career.roles.length : null;
    if ( event.key === 'Home' ) {nextIndex = 0;}
    if ( event.key === 'End' ) {nextIndex = career.roles.length - 1;}
    if ( nextIndex === null ) {return;}
    event.preventDefault();
    selectRole( career.roles[nextIndex].slug, 'keyboard' );
  };

  const onPanelKeyDown = event => {
    const currentIndex = RESUME_PANELS.indexOf( panel );
    let nextIndex = null;
    if ( event.key === 'ArrowLeft' ) {nextIndex = ( currentIndex - 1 + RESUME_PANELS.length ) % RESUME_PANELS.length;}
    if ( event.key === 'ArrowRight' ) {nextIndex = ( currentIndex + 1 ) % RESUME_PANELS.length;}
    if ( event.key === 'Home' ) {nextIndex = 0;}
    if ( event.key === 'End' ) {nextIndex = RESUME_PANELS.length - 1;}
    if ( nextIndex === null ) {return;}
    event.preventDefault();
    updateState( { panel: RESUME_PANELS[nextIndex] } );
    requestAnimationFrame( () => event.currentTarget.parentElement?.querySelectorAll( '[role="tab"]' )[nextIndex]?.focus() );
  };

  return (
    <ResumeScreen component="section" aria-labelledby="resume-title">
      <ResumeHeading component="header">
        <HeadingIdentity>
          <ProfileAvatar size={ 80 }/>
          <Box>
            <Kicker component="p">
              { profile.role }
              { ' ' }
              ·
              { ' ' }
              { career.startLabel }
              –Present
            </Kicker>
            <ResumeTitle component="h1" id="resume-title">{ profile.name }</ResumeTitle>
            <IdentityLine>
              <Typography component="span">
                <LocationOnOutlinedIcon aria-hidden="true" fontSize="inherit"/>
                { profile.location }
              </Typography>
              <SocialLinks variant="text"/>
            </IdentityLine>
            { /* Phones: the same facts in one line, plus the CV the header no longer has room for. */ }
            <CompactCareer>
              <Typography component="span">
                { career.totalYears }
                + yrs ·
                { ' ' }
                { career.companyCount }
                { ' ' }
                companies ·
                { ' ' }
                { career.marketCount }
                { ' ' }
                markets
              </Typography>
              <Box>
                <ResumeLink as={ CvButton } download data-filled>
                  <Box component="span" aria-hidden="true">↓</Box>
                  { ' ' }
                  CV
                </ResumeLink>
                <ResumeLink as={ CvButton }>
                  View
                  { ' ' }
                  <Box component="span" aria-hidden="true">↗</Box>
                </ResumeLink>
              </Box>
            </CompactCareer>
          </Box>
        </HeadingIdentity>
        <HeadingAside data-aside>
          <CareerStats component="ul" aria-label="Career at a glance">
            { stats.map( ( [value, label] ) => (
              <Box component="li" key={ label }>
                <Box component="strong">{ value }</Box>
                { label }
              </Box>
            ) ) }
          </CareerStats>
          <CvLinks>
            <ResumeLink as={ CvButton } download data-filled>
              <Box component="span" aria-hidden="true">↓</Box>
              { ' ' }
              Download CV
            </ResumeLink>
            <ResumeLink>
              View online
              { ' ' }
              <Box component="span" aria-hidden="true">↗</Box>
            </ResumeLink>
          </CvLinks>
        </HeadingAside>
      </ResumeHeading>

      <ResumeRail component="nav" aria-label="Resume sections">
        { resumeSections.map( ( item, index ) => (
          <RailButton
            key={ item }
            type="button"
            aria-current={ item === section ? 'page' : undefined }
            onClick={ () => updateState( { section: item } ) }
          >
            <Typography component="span">
              0
              { index + 1 }
            </Typography>
            { capitalize( item ) }
          </RailButton>
        ) ) }
      </ResumeRail>

      <ResumeContent key={ section }>
        { section === 'experience' && (
          <ExperienceView
            roles={ career.roles }
            role={ role }
            panel={ panel }
            projects={ roleProjects }
            project={ project }
            headingRef={ headingRef }
            trackRef={ trackRef }
            onPanelChange={ nextPanel => updateState( { panel: nextPanel } ) }
            projectHref={ nextProject => createQueryHref( pathname, searchParams, { panel: 'projects', project: nextProject } ) }
            onPanelKeyDown={ onPanelKeyDown }
            onRoleChange={ slug => selectRole( slug, 'pointer' ) }
            onTimelineKeyDown={ onTimelineKeyDown }
          />
        ) }
        { section === 'skills' && <SkillsView/> }
        { section === 'education' && <EducationView/> }
        { section === 'about' && <AboutView/> }
      </ResumeContent>
    </ResumeScreen>
  );
}
