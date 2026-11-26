'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { skills } from '@/content/public-content';
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { SiAngular, SiCss3, SiDrupal, SiExpress, SiHtml5, SiJavascript, SiJest, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { Kicker, SectionTitle } from '../../styles/PublicLayout.styles';
import { StaticView } from '../../styles/Resume.styles';
import { SkillItem, SkillsGrid } from './SkillsView.styles';

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

export default function SkillsView() {
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
