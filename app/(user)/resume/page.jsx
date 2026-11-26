'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { about, education, experiences, projects, resumeSections, skills } from '@/content/public-content';
import ResumeLink from '@/components/ResumeLink';
import { createQueryHref, getAllowedValue } from '@/lib/url-state';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef } from 'react';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Chip from '@mui/material/Chip';
import {
  SiAngular, SiCss3, SiDrupal, SiExpress, SiHtml5, SiJavascript, SiJest,
  SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript
} from 'react-icons/si';
import { BodyCopy, Kicker, ProjectTitle, SectionTitle, TextLink } from '@/app/(user)/components/PublicLayout.styles';
import {
  AboutDomains, AboutEyebrow, AboutNarrative, AboutSequence, AboutSummary, AboutTitle, AboutViewRoot,
  CareerTimeline, CompanyProjects, EducationDates, EducationIndex, EducationLocation, EducationMarker,
  EducationNode, EducationPrograms, EducationTimeline, ExperienceViewRoot, FactCopy, FactIcon, FactLabel,
  FactValue, NumberedList, PanelTab, PanelTabs, ProfileFacts, ProfilePanel, ProfilePanelHeading,
  ProfilePanelMark, ProjectMeta, ProjectSelector, ProjectSummary, RailButton, ResumeContent,
  ResumeHeading, ResumeRail, ResumeScreen, RoleDetail, RoleOverview, RolePanel, RoleSignals,
  SignalLabel, SignalValue, SkillItem, SkillsGrid, StaticView,
  TagList, TimelineButton, TimelineCompany, TimelineMarker, TimelineYear
} from './Resume.styles';

const roles = experiences.map( item => item.slug );
const panels = ['summary', 'projects', 'contributions', 'stack'];
const displayLabel = value => value.charAt( 0 ).toUpperCase() + value.slice( 1 );
const skillIcons = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  AngularJS: SiAngular,
  HTML: SiHtml5,
  CSS: SiCss3,
  'Tailwind CSS': SiTailwindcss,
  'Responsive UI': DevicesOutlinedIcon,
  Accessibility: AccessibilityNewOutlinedIcon,
  'REST APIs': HubOutlinedIcon,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  Drupal: SiDrupal,
  Jest: SiJest
};
const factIcons = {
  'Based in': LocationOnOutlinedIcon,
  Experience: WorkOutlineOutlinedIcon,
  Languages: TranslateOutlinedIcon,
  Focus: CenterFocusStrongOutlinedIcon
};

export default function ResumePage() {
  return <Suspense fallback={ <ResumeScreen/> }><ResumeContentView/></Suspense>;
}

function ResumeContentView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const headingRef = useRef( null );
  const previousRole = useRef( null );
  const section = getAllowedValue( searchParams, 'section', resumeSections, 'experience' );
  const roleSlug = getAllowedValue( searchParams, 'role', roles, 'nab' );
  const panel = getAllowedValue( searchParams, 'panel', panels, 'summary' );
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
    const currentIndex = panels.indexOf( panel );
    let nextIndex = null;
    if ( event.key === 'ArrowLeft' ) {nextIndex = ( currentIndex - 1 + panels.length ) % panels.length;}
    if ( event.key === 'ArrowRight' ) {nextIndex = ( currentIndex + 1 ) % panels.length;}
    if ( event.key === 'Home' ) {nextIndex = 0;}
    if ( event.key === 'End' ) {nextIndex = panels.length - 1;}
    if ( nextIndex === null ) {return;}
    event.preventDefault();
    updateState( { panel: panels[nextIndex] } );
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
            <Typography component="span">0{ index + 1 }</Typography>{ displayLabel( item ) }
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

function ExperienceView( { role, roleSlug, panel, projects: companyProjects, project, headingRef, onPanelChange, onPanelKeyDown, projectHref, onRoleChange, onTimelineKeyDown } ) {
  const deliveryScopes = [...new Set( companyProjects.map( item => item.domain ) )];

  return (
    <ExperienceViewRoot>
      <CareerTimeline component="ol" aria-label="Work history" onKeyDown={ onTimelineKeyDown }>
        { experiences.map( item => (
          <Box component="li" key={ item.slug }>
            <TimelineButton
              type="button"
              aria-current={ item.slug === roleSlug ? 'step' : undefined }
              onClick={ () => onRoleChange( item.slug ) }
            >
              <TimelineMarker component="span" data-marker>
                <Image src={ item.logo } alt="" width={ 34 } height={ 34 } />
              </TimelineMarker>
              <TimelineCompany component="span">{ item.shortLabel }</TimelineCompany>
              <TimelineYear component="span">{ item.year }</TimelineYear>
            </TimelineButton>
          </Box>
        ) ) }
      </CareerTimeline>

      <RoleDetail component="article" key={ role.slug }>
        <Box component="header">
          <Kicker component="p">{ role.company } · { role.dates }</Kicker>
          <ProjectTitle component="h2" ref={ headingRef } tabIndex="-1">{ role.role }</ProjectTitle>
        </Box>

        <PanelTabs role="tablist" aria-label="Role details">
          { panels.map( item => (
            <PanelTab
              type="button"
              role="tab"
              aria-selected={ panel === item }
              aria-controls="role-panel"
              id={ `role-tab-${item}` }
              tabIndex={ panel === item ? 0 : -1 }
              key={ item }
              onKeyDown={ onPanelKeyDown }
              onClick={ () => onPanelChange( item ) }
            >{ displayLabel( item ) }</PanelTab>
          ) ) }
        </PanelTabs>

        <RolePanel id="role-panel" role="tabpanel" aria-labelledby={ `role-tab-${panel}` } key={ `${role.slug}-${panel}` }>
          { panel === 'summary' && (
            <RoleOverview>
              <BodyCopy component="p">{ role.summary }</BodyCopy>
              <RoleSignals component="ul" aria-label="Role overview">
                <Box component="li">
                  <SignalLabel component="span">Period</SignalLabel>
                  <SignalValue component="span">{ role.dates }</SignalValue>
                </Box>
                <Box component="li">
                  <SignalLabel component="span">Project record</SignalLabel>
                  <SignalValue component="span">{ companyProjects.length } { companyProjects.length === 1 ? 'documented project' : 'documented projects' }</SignalValue>
                </Box>
                <Box component="li">
                  <SignalLabel component="span">Delivery scope</SignalLabel>
                  <SignalValue component="span">{ deliveryScopes.join( ', ' ) || 'Product delivery' }</SignalValue>
                </Box>
              </RoleSignals>
              <TagList component="ul" aria-label="Core technology stack">
                { role.stack.map( item => <Box component="li" key={ item }>{ item }</Box> ) }
              </TagList>
            </RoleOverview>
          ) }
          { panel === 'projects' && project && (
            <CompanyProjects>
              <ProjectSelector component="ol" aria-label={ `${role.company} projects` }>
                { companyProjects.map( item => (
                  <Box component="li" key={ item.slug }>
                    <Button
                      component={ NextLink }
                      href={ projectHref( item.slug ) }
                      aria-current={ item.slug === project.slug ? 'true' : undefined }
                    >
                      { item.number } { item.title }
                    </Button>
                  </Box>
                ) ) }
              </ProjectSelector>
              <ProjectSummary>
                <ProjectMeta>
                  <Typography component="span">{ project.period }</Typography>
                  <Typography component="span">{ project.domain }</Typography>
                  <Typography component="span">{ project.market }</Typography>
                  { project.client && <Typography component="span">{ project.client }</Typography> }
                  <Typography component="span">{ project.confidentiality === 'internal' ? 'Internal product' : 'Public product' }</Typography>
                </ProjectMeta>
                <Typography component="h3">{ project.title }</Typography>
                <BodyCopy component="p">{ project.summary }</BodyCopy>
                <TagList component="ul" aria-label={ `${project.title} technologies` }>
                  { project.technologies.map( item => <Box component="li" key={ item }>{ item }</Box> ) }
                </TagList>
              </ProjectSummary>
            </CompanyProjects>
          ) }
          { panel === 'contributions' && (
            <NumberedList component="ul">
              { role.contributions.map( ( item, index ) => <Box component="li" key={ item }><Typography component="span">0{ index + 1 }</Typography>{ item }</Box> ) }
            </NumberedList>
          ) }
          { panel === 'stack' && (
            <TagList component="ul" aria-label="Technology stack">
              { role.stack.map( item => <Box component="li" key={ item }>{ item }</Box> ) }
            </TagList>
          ) }
        </RolePanel>
      </RoleDetail>
    </ExperienceViewRoot>
  );
}

function SkillsView() {
  return (
    <StaticView component="article" aria-labelledby="skills-title">
      <Kicker component="p">Working toolkit</Kicker>
      <SectionTitle component="h2" id="skills-title">Tools selected for the product, not the trend.</SectionTitle>
      <SkillsGrid>
        { skills.map( group => (
          <Box component="section" key={ group.group }>
            <Typography component="h3">{ group.group }</Typography>
            <Box component="ul" aria-label={ `${group.group} skills` }>{ group.items.map( item => {
              const Icon = skillIcons[item];
              return <SkillItem component="li" key={ item }>{ Icon && <Icon aria-hidden="true" focusable="false"/> }<Typography component="span">{ item }</Typography></SkillItem>;
            } ) }</Box>
          </Box>
        ) ) }
      </SkillsGrid>
    </StaticView>
  );
}

function EducationView() {
  return (
    <StaticView component="article" aria-labelledby="education-title">
      <Kicker component="p">Education · 2016—2022</Kicker>
      <SectionTitle component="h2" id="education-title">Formal study, followed by practical web training.</SectionTitle>
      <EducationTimeline component="ol" aria-label="Education history">
        { education.map( ( item, index ) => (
          <Box component="li" key={ item.slug }>
            <EducationNode>
              <EducationMarker component="span">
                <Image src={ item.logo } alt="" width={ 42 } height={ 42 }/>
              </EducationMarker>
              <EducationIndex component="span" aria-hidden="true">0{ index + 1 }</EducationIndex>
            </EducationNode>
            <EducationDates component="p">{ item.dates }</EducationDates>
            <Typography component="h3">{ item.school }</Typography>
            <EducationLocation component="p">{ item.location }</EducationLocation>
            <EducationPrograms component="ul">
              { item.programs.map( program => (
                <Box component="li" key={ program.name }>
                  { program.credential ? (
                    <MuiLink href={ program.credential } target="_blank" rel="noreferrer" aria-label={ `${program.name} — view credential` }>
                      { program.name } <Typography component="span" aria-hidden="true">↗</Typography>
                    </MuiLink>
                  ) : program.name }
                </Box>
              ) ) }
            </EducationPrograms>
          </Box>
        ) ) }
      </EducationTimeline>
    </StaticView>
  );
}

function AboutView() {
  return (
    <AboutViewRoot component="article" aria-labelledby="about-title">
      <AboutNarrative>
        <AboutEyebrow>
          <Kicker component="p">Profile · 04</Kicker>
          <AboutSequence component="span" aria-hidden="true">04 / 04</AboutSequence>
        </AboutEyebrow>
        <AboutTitle component="h2" id="about-title">Clear interfaces for complex workflows.</AboutTitle>
        <AboutSummary component="p">{ about.summary }</AboutSummary>
        <AboutDomains component="ul" aria-label="Product domains">
          { about.domains.map( domain => (
            <Box component="li" key={ domain }>
              <Chip label={ domain } size="small" variant="outlined"/>
            </Box>
          ) ) }
        </AboutDomains>
      </AboutNarrative>

      <ProfilePanel component="section" square elevation={ 0 } aria-labelledby="profile-facts-title">
        <ProfilePanelHeading>
          <Kicker component="h3" id="profile-facts-title">Working profile</Kicker>
          <ProfilePanelMark component="span" aria-hidden="true">04</ProfilePanelMark>
        </ProfilePanelHeading>
        <ProfileFacts component="ul" aria-label="Profile facts">
          { about.facts.map( ( [label, value] ) => {
            const Icon = factIcons[label];
            return (
              <Box component="li" key={ label }>
                <FactIcon aria-hidden="true">{ Icon && <Icon fontSize="small"/> }</FactIcon>
                <FactCopy>
                  <FactLabel component="span">{ label }</FactLabel>
                  <FactValue component="span">{ value }</FactValue>
                </FactCopy>
              </Box>
            );
          } ) }
        </ProfileFacts>
      </ProfilePanel>
    </AboutViewRoot>
  );
}
