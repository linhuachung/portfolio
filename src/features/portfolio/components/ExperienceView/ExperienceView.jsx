'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experiences } from '@/content/public-content';
import Button from '@mui/material/Button';
import Image from 'next/image';
import NextLink from 'next/link';
import { BodyCopy, Kicker, ProjectTitle } from '../../styles/PublicLayout.styles';
import { CareerTimeline, CompanyProjects, ExperienceViewRoot, NumberedList, PanelTab, PanelTabs, ProjectMeta, ProjectSelector, ProjectSummary, RoleDetail, RoleOverview, RolePanel, RoleSignals, SignalLabel, SignalValue, TagList, TimelineButton, TimelineCompany, TimelineMarker, TimelineYear } from './ExperienceView.styles';
import { RESUME_PANELS } from '../../constants/resume';
import { capitalize } from '../../utils/text';

export default function ExperienceView( { role, roleSlug, panel, projects: companyProjects, project, headingRef, onPanelChange, onPanelKeyDown, projectHref, onRoleChange, onTimelineKeyDown } ) {
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
          { RESUME_PANELS.map( item => (
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
            >{ capitalize( item ) }</PanelTab>
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
