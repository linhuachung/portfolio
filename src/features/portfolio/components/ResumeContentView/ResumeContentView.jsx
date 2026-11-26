'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experiences, projects, resumeSections } from '@/content/public-content';
import ResumeLink from '../ResumeLink';
import { createQueryHref, getAllowedValue } from '../../utils/url-state';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Kicker, SectionTitle, TextLink } from '../../styles/PublicLayout.styles';
import { ResumeScreen } from '../../styles/Resume.styles';
import { RailButton, ResumeContent, ResumeHeading, ResumeRail } from './ResumeContentView.styles';
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
  const previousRole = useRef( null );
  const section = getAllowedValue( searchParams, 'section', resumeSections, 'experience' );
  const roleSlug = getAllowedValue( searchParams, 'role', roles, 'nab' );
  const panel = getAllowedValue( searchParams, 'panel', RESUME_PANELS, 'summary' );
  const roleIndex = experiences.findIndex( item => item.slug === roleSlug );
  const role = experiences[roleIndex];
  const roleProjects = projects.filter( item => item.experienceSlug === roleSlug );
  const roleProjectSlugs = roleProjects.map( item => item.slug );
  const projectSlug = getAllowedValue( searchParams, 'project', roleProjectSlugs, roleProjectSlugs[0] );
  const project = roleProjects.find( item => item.slug === projectSlug );

  const updateState = ( updates ) => {
    router.push( createQueryHref( pathname, searchParams, updates ), { scroll: false } );
  };

  useEffect( () => {
    if ( previousRole.current && previousRole.current !== roleSlug ) {
      headingRef.current?.focus();
    }
    previousRole.current = roleSlug;
  }, [roleSlug] );

  const moveRole = ( direction ) => {
    const nextIndex = ( roleIndex + direction + experiences.length ) % experiences.length;
    updateState( { section: 'experience', role: experiences[nextIndex].slug, panel: 'summary', project: null } );
  };

  const onTimelineKeyDown = ( event ) => {
    if ( event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) {
      event.preventDefault();
      moveRole( event.key === 'ArrowLeft' ? -1 : 1 );
    }
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
        <Box>
          <Kicker component="p">Career record · Sep 2021—Present</Kicker>
          <SectionTitle component="h1" id="resume-title">Continuous work across product systems.</SectionTitle>
        </Box>
        <ResumeLink as={ TextLink }>Download résumé <Typography component="span" aria-hidden="true">↗</Typography></ResumeLink>
      </ResumeHeading>

      <ResumeRail component="nav" aria-label="Resume sections">
        { resumeSections.map( ( item, index ) => (
          <RailButton
            key={ item }
            type="button"
            aria-current={ item === section ? 'page' : undefined }
            onClick={ () => updateState( { section: item } ) }
          >
            <Typography component="span">0{ index + 1 }</Typography>{ capitalize( item ) }
          </RailButton>
        ) ) }
      </ResumeRail>

      <ResumeContent key={ section }>
        { section === 'experience' && (
          <ExperienceView
            role={ role }
            roleSlug={ roleSlug }
            panel={ panel }
            projects={ roleProjects }
            project={ project }
            headingRef={ headingRef }
            onPanelChange={ nextPanel => updateState( { panel: nextPanel } ) }
            projectHref={ nextProject => createQueryHref( pathname, searchParams, { panel: 'projects', project: nextProject } ) }
            onPanelKeyDown={ onPanelKeyDown }
            onRoleChange={ nextRole => updateState( { role: nextRole, panel: 'summary', project: null } ) }
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
