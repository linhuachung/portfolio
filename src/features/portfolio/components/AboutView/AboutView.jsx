'use client';

import Box from '@mui/material/Box';
import { about } from '@/content/public-content';
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Chip from '@mui/material/Chip';
import { Kicker } from '../../styles/PublicLayout.styles';
import { PanelTitle } from '../../styles/Resume.styles';
import { AboutDomains, AboutNarrative, AboutSummary, AboutViewRoot, FactCopy, FactIcon, FactLabel, FactValue, ProfileFacts, ProfilePanel } from './AboutView.styles';

const factIcons = {
  'Based in': LocationOnOutlinedIcon,
  Experience: WorkOutlineOutlinedIcon,
  Languages: TranslateOutlinedIcon,
  Focus: CenterFocusStrongOutlinedIcon,
  'This site': CodeOutlinedIcon
};

export default function AboutView() {
  return (
    <AboutViewRoot component="article" aria-labelledby="about-title">
      <AboutNarrative>
        <Kicker component="p">Profile</Kicker>
        <PanelTitle component="h2" id="about-title">Dependable interfaces for banking and commerce teams.</PanelTitle>
        <AboutSummary component="p">{ about.summary }</AboutSummary>
        <AboutDomains component="ul" aria-label="Product domains">
          { about.domains.map( domain => (
            <Box component="li" key={ domain }>
              <Chip label={ domain } size="small" variant="outlined"/>
            </Box>
          ) ) }
        </AboutDomains>
      </AboutNarrative>

      <ProfilePanel component="section" elevation={ 0 } aria-labelledby="profile-facts-title">
        <Kicker component="h3" id="profile-facts-title">Working profile</Kicker>
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
