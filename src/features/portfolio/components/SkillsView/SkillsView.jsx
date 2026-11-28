'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useMemo } from 'react';
import { experiences, projects, skills, skillsAlsoUsed } from '@/content/public-content';
import { Kicker } from '../../styles/PublicLayout.styles';
import { PanelTitle, StaticView } from '../../styles/Resume.styles';
import { buildCareerTimeline, skillRoles } from '../../utils/career';
import SkillIcon from '../SkillIcon';
import { AlsoUsed, CurrentStack, SkillItem, SkillsGrid, Usage, UsageLogos, VisuallyHidden } from './SkillsView.styles';

export default function SkillsView() {
  // The current role depends on today's date; the résumé only renders in the browser.
  const { roles } = useMemo( () => buildCareerTimeline( experiences, projects ), [] );
  const current = roles.find( role => role.isCurrent );

  return (
    <StaticView component="article" aria-labelledby="skills-title">
      <Kicker component="p">Working toolkit</Kicker>
      <PanelTitle component="h2" id="skills-title">What I use day to day.</PanelTitle>

      <CurrentStack>
        <Typography component="p">
          Current stack ·
          { ' ' }
          { current.shortLabel }
        </Typography>
        <Box component="ul" aria-label={ `Current stack at ${current.shortLabel}` }>
          { current.stack.map( item => (
            <Box component="li" key={ item }>
              <SkillIcon name={ item }/>
              { item }
            </Box>
          ) ) }
        </Box>
      </CurrentStack>

      <SkillsGrid>
        { skills.map( group => (
          <Box component="section" key={ group.group }>
            <Typography component="h3">{ group.group }</Typography>
            <Box component="ul" aria-label={ `${group.group} skills` }>
              { group.items.map( item => {
                const usedAt = skillRoles( item, roles, projects );
                return (
                  <SkillItem component="li" key={ item }>
                    <SkillIcon name={ item }/>
                    <Typography component="span">{ item }</Typography>
                    { /* Where it was used, as employer logos; no year counts, which read inconsistently. */ }
                    { usedAt.length > 0 && (
                      <Usage component="span">
                        <UsageLogos component="span" aria-hidden="true">
                          { usedAt.map( role => <Box component={ Image } key={ role.slug } src={ role.logo } alt="" width={ 20 } height={ 20 }/> ) }
                        </UsageLogos>
                        <VisuallyHidden component="span">{ `Used at ${usedAt.map( role => role.shortLabel ).join( ', ' )}` }</VisuallyHidden>
                      </Usage>
                    ) }
                  </SkillItem>
                );
              } ) }
            </Box>
          </Box>
        ) ) }
      </SkillsGrid>

      <AlsoUsed>
        <Typography component="h3">Also used</Typography>
        <Box component="ul" aria-label="Also used skills">
          { skillsAlsoUsed.map( item => (
            <Box component="li" key={ item }>
              <SkillIcon name={ item }/>
              { item }
            </Box>
          ) ) }
        </Box>
      </AlsoUsed>
    </StaticView>
  );
}
