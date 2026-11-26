import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import ResumeLink from '@/features/portfolio/components/ResumeLink';
import { profile } from '@/content/public-content';
import {
  CareerSignal,
  CurrentRole,
  HomeActions,
  HomeCopy,
  HomeScreen,
  HomeTitle,
  IdentityCanvas,
  IdentityStage,
  Positioning,
  PrimaryAction,
  ProofItem,
  ProofRail,
  ResourceLinks,
  RoleLabel,
  SecondaryAction,
  SignalDot,
  SignalHeader,
  Wordmark
} from '@/features/portfolio/components/HomePage/HomePage.styles';
import { Kicker } from '@/features/portfolio/styles/PublicLayout.styles';

const experienceHref = '/resume?section=experience&role=nab&panel=summary';

export default function Home() {
  return (
    <HomeScreen component="section" aria-labelledby="home-title">
      <HomeCopy>
        <Kicker component="p">{ profile.name } · { profile.role }</Kicker>
        <HomeTitle component="h1" id="home-title">Clear interfaces for complex product systems.</HomeTitle>
        <Positioning component="p">Frontend engineering across banking, commerce, and internal operations—where reliable workflows matter as much as visual polish.</Positioning>
        <HomeActions>
          <PrimaryAction component={ NextLink } href={ experienceHref }>View Experience</PrimaryAction>
          <SecondaryAction component={ NextLink } href="/contact">Contact</SecondaryAction>
        </HomeActions>
        <ResourceLinks component="nav" aria-label="Professional links">
          <ResumeLink>Résumé <Typography component="span" aria-hidden="true">↗</Typography></ResumeLink>
          <MuiLink href={ profile.linkedin } target="_blank" rel="noreferrer">LinkedIn <Typography component="span" aria-hidden="true">↗</Typography></MuiLink>
          <MuiLink href={ profile.github } target="_blank" rel="noreferrer">GitHub <Typography component="span" aria-hidden="true">↗</Typography></MuiLink>
        </ResourceLinks>
      </HomeCopy>

      <IdentityStage component="aside" aria-label="Professional identity">
        <SignalHeader>
          <Kicker component="p">Current Chapter</Kicker>
          <CareerSignal>
            <SignalDot aria-hidden="true" />
            <Typography component="span">Building at NAB</Typography>
          </CareerSignal>
        </SignalHeader>

        <IdentityCanvas aria-hidden="true">
          <Wordmark component="p">CHUNG</Wordmark>
          <Typography component="span">Frontend / Systems / Delivery</Typography>
        </IdentityCanvas>

        <CurrentRole>
          <RoleLabel component="p">Now</RoleLabel>
          <Box>
            <Typography component="p">Software Engineer (Frontend)</Typography>
            <Typography component="p">NAB Innovation Centre Vietnam</Typography>
          </Box>
        </CurrentRole>

        <ProofRail component="dl" aria-label="Professional profile">
          <ProofItem>
            <Typography component="dt">Practice</Typography>
            <Typography component="dd">Frontend engineering since 2021</Typography>
          </ProofItem>
          <ProofItem>
            <Typography component="dt">Domains</Typography>
            <Typography component="dd">Banking · Commerce · Operations</Typography>
          </ProofItem>
          <ProofItem>
            <Typography component="dt">Based</Typography>
            <Typography component="dd">Ho Chi Minh City · UTC+7</Typography>
          </ProofItem>
        </ProofRail>
      </IdentityStage>
    </HomeScreen>
  );
}
