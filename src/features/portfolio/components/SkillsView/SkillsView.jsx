'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useMemo } from 'react';
import { experiences, projects, skills } from '@/content/public-content';
import { Kicker } from '../../styles/PublicLayout.styles';
import { PanelTitle, StaticView } from '../../styles/Resume.styles';
import { buildCareerTimeline, formatYearsUsed, skillUsage } from '../../utils/career';
import SkillIcon from '../SkillIcon';
import { CurrentStack, SkillItem, SkillsGrid, Usage, UsageLogos, VisuallyHidden } from './SkillsView.styles';

export default function SkillsView() {
  // Tenure depends on today's date; the résumé only renders in the browser.
  const { roles } = useMemo( () => buildCareerTimeline( experiences, projects ), [] );
  const current = roles.find( role => role.isCurrent );

  return (
    <StaticView component="article" aria-labelledby="skills-title">
      <Kicker component="p">Working toolkit</Kicker>
      <PanelTitle component="h2" id="skills-title">Tools selected for the product, not the trend.</PanelTitle>

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
                const usage = skillUsage( item, roles, projects );
                return (
                  <SkillItem component="li" key={ item }>
                    <SkillIcon name={ item }/>
                    <Typography component="span">{ item }</Typography>
                    { usage.months > 0 && (
                      <Usage component="span">
                        <UsageLogos component="span" aria-hidden="true">
                          { usage.roles.map( role => <Box component={ Image } key={ role.slug } src={ role.logo } alt="" width={ 20 } height={ 20 }/> ) }
                        </UsageLogos>
                        { /* Under a year reads as a weakness on a résumé; the logos still show where it was used. */ }
                        { usage.months >= 12 && formatYearsUsed( usage.months ) }
                        <VisuallyHidden component="span">
                          { ' ' }
                          at
                          { ' ' }
                          { usage.roles.map( role => role.shortLabel ).join( ', ' ) }
                        </VisuallyHidden>
                      </Usage>
                    ) }
                  </SkillItem>
                );
              } ) }
            </Box>
          </Box>
        ) ) }
      </SkillsGrid>
    </StaticView>
  );
}
