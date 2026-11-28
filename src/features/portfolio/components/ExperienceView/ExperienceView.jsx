'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import { BodyCopy, Kicker } from '../../styles/PublicLayout.styles';
import { CompanyProjects, ExperienceViewRoot, FactLabel, FactValue, MyPart, NumberedList, OverviewBlock, PanelTab, PanelTabs, ProjectMeta, ProjectSelector, ProjectSummary, RoleDetail, RoleFacts, RoleOverview, RolePanel, RoleTitle, TagList } from './ExperienceView.styles';
import { RESUME_PANELS } from '../../constants/resume';
import { capitalize } from '../../utils/text';
import { yearRange } from '../../utils/career';
import CareerTrack from '../CareerTrack';

/** Facts a recruiter scans first: when, where, what kind of product, and which products. */
const roleFacts = role => [
  // Date range, not a computed duration: counting conventions differ (LinkedIn counts the end month).
  ['Period', `${role.startLabel} – ${role.endLabel}`],
  ['Market', role.markets.join( ', ' )],
  ['Domain', role.domains.join( ', ' )],
  ['Projects', role.projectTitles.join( ' · ' )]
];

const projectMeta = project => [
  project.period,
  project.domain,
  project.market,
  project.client,
  project.confidentiality === 'internal' ? 'Internal product' : 'Public product'
].filter( Boolean ).join( ' · ' );

function Tags( { items, label } ) {
  return (
    <TagList component="ul" aria-label={ label }>
      { items.map( item => <Box component="li" key={ item }>{ item }</Box> ) }
    </TagList>
  );
}

export default function ExperienceView( { roles, role, panel, projects: companyProjects, project, headingRef, trackRef, onPanelChange, onPanelKeyDown, projectHref, onRoleChange, onTimelineKeyDown } ) {
  return (
    <ExperienceViewRoot>
      <CareerTrack ref={ trackRef } roles={ roles } activeSlug={ role.slug } onSelect={ onRoleChange } onKeyDown={ onTimelineKeyDown }/>

      <RoleDetail component="article" key={ role.slug }>
        <Box component="header">
          <Kicker component="p">
            { role.company }
            <Box component="span" data-dates>{ ` · ${role.dates}` }</Box>
          </Kicker>
          <RoleTitle component="h2" ref={ headingRef } tabIndex="-1">{ role.role }</RoleTitle>
          <RoleFacts component="ul" aria-label="Role at a glance">
            { roleFacts( role ).map( ( [label, value] ) => (
              <Box component="li" key={ label }>
                <FactLabel component="span">{ label }</FactLabel>
                <FactValue component="span">{ value }</FactValue>
              </Box>
            ) ) }
          </RoleFacts>
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
            >
              { capitalize( item ) }
            </PanelTab>
          ) ) }
        </PanelTabs>

        <RolePanel id="role-panel" role="tabpanel" aria-labelledby={ `role-tab-${panel}` } key={ `${role.slug}-${panel}` }>
          { panel === 'overview' && (
            <RoleOverview>
              <BodyCopy component="p">{ role.summary }</BodyCopy>
              { role.outcome && (
                <OverviewBlock>
                  <FactLabel component="h3">Outcome</FactLabel>
                  <BodyCopy component="p">{ role.outcome }</BodyCopy>
                </OverviewBlock>
              ) }
              <OverviewBlock>
                <FactLabel component="h3">Key contributions</FactLabel>
                <NumberedList component="ol">
                  { role.contributions.map( ( item, index ) => (
                    <Box component="li" key={ item }>
                      <Typography component="span" aria-hidden="true">
                        0
                        { index + 1 }
                      </Typography>
                      <Box component="span">{ item }</Box>
                    </Box>
                  ) ) }
                </NumberedList>
              </OverviewBlock>
              <OverviewBlock>
                <FactLabel component="h3">Core stack</FactLabel>
                <Tags items={ role.stack } label="Core technology stack"/>
              </OverviewBlock>
            </RoleOverview>
          ) }
          { panel === 'projects' && project && (
            <CompanyProjects data-single={ companyProjects.length === 1 || undefined }>
              { companyProjects.length > 1 && (
                <ProjectSelector component="ol" aria-label={ `${role.company} projects` }>
                  { companyProjects.map( item => (
                    <Box component="li" key={ item.slug }>
                      <Button
                        component={ NextLink }
                        href={ projectHref( item.slug ) }
                        replace
                        scroll={ false }
                        aria-current={ item.slug === project.slug ? 'true' : undefined }
                      >
                        { item.title }
                        <Box component="span" data-years>{ ` · ${yearRange( item.period )}` }</Box>
                      </Button>
                    </Box>
                  ) ) }
                </ProjectSelector>
              ) }
              <ProjectSummary>
                <ProjectMeta component="p">{ projectMeta( project ) }</ProjectMeta>
                <Typography component="h3">{ project.title }</Typography>
                <BodyCopy component="p">{ project.summary }</BodyCopy>
                { project.contributions?.[0] && (
                  <MyPart component="p">
                    <Box component="span">My part</Box>
                    { project.contributions[0] }
                  </MyPart>
                ) }
                <Tags items={ project.technologies } label={ `${project.title} technologies` }/>
              </ProjectSummary>
            </CompanyProjects>
          ) }
        </RolePanel>
      </RoleDetail>
    </ExperienceViewRoot>
  );
}
