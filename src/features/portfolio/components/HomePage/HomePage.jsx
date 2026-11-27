import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import NextLink from 'next/link';
import CareerPath from '../CareerPath';
import ProfileAvatar from '../ProfileAvatar';
import SocialLinks from '../SocialLinks';
import { experiences, profile, projects } from '@/content/public-content';
import { buildCareerTimeline } from '../../utils/career';
import {
  CardSection,
  CvAction,
  CvRow,
  Eyebrow,
  HomeActions,
  HomeCopy,
  HomeScreen,
  HomeTitle,
  Identity,
  LiveDot,
  Positioning,
  PrimaryAction,
  ProfileCard,
  SecondaryAction,
  SectionLabel,
  StatGrid,
  StatusPill
} from './HomePage.styles';

const experienceHref = '/resume?section=experience&role=nab&panel=overview';

export default function Home() {
  // The home page is static, so these figures are fixed at build time; whole years keep them stable.
  const career = buildCareerTimeline( experiences, projects );
  const current = career.roles.find( role => role.isCurrent );
  const stats = [
    [`${career.totalYears}+`, 'Years'],
    [career.companyCount, 'Companies'],
    [career.marketCount, 'Markets']
  ];

  return (
    <HomeScreen component="section" aria-labelledby="home-title">
      <HomeCopy>
        <Eyebrow component="p">
          { profile.name }
          { ' ' }
          <Box component="span" aria-hidden="true">—</Box>
          { ' ' }
          { profile.role }
        </Eyebrow>
        <HomeTitle component="h1" id="home-title">Clear interfaces for complex product systems.</HomeTitle>
        <Positioning component="p">Frontend engineering across banking, commerce, and internal operations—where reliable workflows matter as much as visual polish.</Positioning>
        <HomeActions>
          <PrimaryAction component={ NextLink } href={ experienceHref }>View Experience</PrimaryAction>
          <SecondaryAction component={ NextLink } href="/contact">
            Get in touch
            { ' ' }
            <Box component="span" aria-hidden="true">→</Box>
          </SecondaryAction>
        </HomeActions>
      </HomeCopy>

      <ProfileCard component="aside" aria-label="Professional identity">
        <CardSection>
          <Identity>
            <ProfileAvatar size={ 84 }/>
            <Box>
              <Typography component="p">{ profile.name }</Typography>
              <Typography component="p">
                { current.role }
                { ' ' }
                ·
                { ' ' }
                { current.shortLabel }
              </Typography>
              <Typography component="p">
                <LocationOnOutlinedIcon aria-hidden="true" fontSize="inherit"/>
                { profile.location }
              </Typography>
            </Box>
            <StatusPill component="span">
              <LiveDot aria-hidden="true"/>
              Building at
              { ' ' }
              { current.shortLabel }
            </StatusPill>
          </Identity>
          <SocialLinks/>
        </CardSection>

        <CvRow>
          <SectionLabel component="p">Résumé</SectionLabel>
          <CvAction download data-filled>
            <Box component="span" aria-hidden="true">↓</Box>
            { ' ' }
            Download PDF
          </CvAction>
          <CvAction>
            View online
            { ' ' }
            <Box component="span" aria-hidden="true">↗</Box>
          </CvAction>
        </CvRow>

        <StatGrid component="ul" aria-label="Career at a glance">
          { stats.map( ( [value, label] ) => (
            <Box component="li" key={ label }>
              <Typography component="span">{ value }</Typography>
              <Typography component="span">{ label }</Typography>
            </Box>
          ) ) }
        </StatGrid>

        <CardSection data-path>
          <SectionLabel component="p">Career path</SectionLabel>
          <CareerPath roles={ career.roles }/>
        </CardSection>
      </ProfileCard>
    </HomeScreen>
  );
}
