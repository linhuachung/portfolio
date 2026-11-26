'use client';

import Box from '@mui/material/Box';
import { about } from '@/content/public-content';
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Chip from '@mui/material/Chip';
import { Kicker } from '../../styles/PublicLayout.styles';
import { AboutDomains, AboutEyebrow, AboutNarrative, AboutSequence, AboutSummary, AboutTitle, AboutViewRoot, FactCopy, FactIcon, FactLabel, FactValue, ProfileFacts, ProfilePanel, ProfilePanelHeading, ProfilePanelMark } from './AboutView.styles';

const factIcons = {
  'Based in': LocationOnOutlinedIcon,
  Experience: WorkOutlineOutlinedIcon,
  Languages: TranslateOutlinedIcon,
  Focus: CenterFocusStrongOutlinedIcon
};

export default function AboutView() {
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
