import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { experiences, projects } from '@/content/public-content';
import {
  Fact,
  FactStrip,
  PreviewButton,
  RecordAvatar,
  RecordAside,
  RecordBody,
  RecordIdentity,
  RecordList,
  RecordRow,
  SourceNotice,
  StateBadge,
  StudioActions,
  StudioDescription,
  StudioEyebrow,
  StudioHeader,
  StudioPage,
  StudioTitle,
  Tag,
  TagRow,
  TextAction
} from '@/features/admin-shell/styles/ContentStudio.styles';

export default function ExperienceAdminPage() {
  const currentRole = experiences.find( item => item.dates.includes( 'Present' ) );
  const linkedProjects = new Set( projects.map( project => project.experienceSlug ) ).size;

  return (
    <StudioPage>
      <StudioHeader>
        <Box>
          <StudioEyebrow component="p">Content Studio · Work History</StudioEyebrow>
          <StudioTitle component="h1">Experience records</StudioTitle>
          <StudioDescription component="p">Review the public career timeline, contribution limits, and project relationships from one place.</StudioDescription>
        </Box>
        <StudioActions>
          <PreviewButton component={ NextLink } href="/resume?section=experience&role=nab&panel=overview" target="_blank" rel="noreferrer" variant="outlined" endIcon={ <OpenInNewOutlinedIcon /> }>Open Public View</PreviewButton>
        </StudioActions>
      </StudioHeader>

      <SourceNotice>
        <VerifiedOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">Versioned public source</Typography>
          <Typography component="p">These records render from local content, so the portfolio remains available when the database is offline.</Typography>
        </Box>
      </SourceNotice>

      <FactStrip component="dl">
        <Fact>
          <Typography component="dt">Roles</Typography>
          <Typography component="dd">{ experiences.length }</Typography>
        </Fact>
        <Fact>
          <Typography component="dt">Current</Typography>
          <Typography component="dd">{ currentRole?.shortLabel || '—' }</Typography>
        </Fact>
        <Fact>
          <Typography component="dt">Project Employers</Typography>
          <Typography component="dd">{ linkedProjects }</Typography>
        </Fact>
        <Fact>
          <Typography component="dt">Timeline Starts</Typography>
          <Typography component="dd">2021</Typography>
        </Fact>
      </FactStrip>

      <RecordList aria-label="Experience records">
        { [...experiences].reverse().map( experience => {
          const roleProjects = projects.filter( project => project.experienceSlug === experience.slug );
          const isCurrent = experience.dates.includes( 'Present' );
          return (
            <RecordRow key={ experience.slug } component="article">
              <RecordIdentity>
                <RecordAvatar src={ experience.logo } alt="" variant="rounded">{ experience.shortLabel.slice( 0, 2 ) }</RecordAvatar>
                <Box>
                  <Typography component="h2">{ experience.company }</Typography>
                  <Typography component="p">{ experience.dates }</Typography>
                </Box>
              </RecordIdentity>
              <RecordBody>
                <Typography component="p">
                  { experience.role }
                  { ' ' }
                  ·
                  { ' ' }
                  { experience.summary }
                </Typography>
                <TagRow aria-label={ `${experience.company} technology stack` }>
                  { experience.stack.map( item => <Tag component="span" key={ item }>{ item }</Tag> ) }
                </TagRow>
                <Typography component="p">
                  { experience.contributions.length }
                  { ' ' }
                  verified contributions ·
                  { ' ' }
                  { roleProjects.length }
                  { ' ' }
                  linked
                  { ' ' }
                  { roleProjects.length === 1 ? 'project' : 'projects' }
                </Typography>
              </RecordBody>
              <RecordAside>
                <StateBadge component="span" $tone={ isCurrent ? 'positive' : 'neutral' }>{ isCurrent ? 'Current' : 'Complete' }</StateBadge>
                <TextAction component={ NextLink } href={ `/resume?section=experience&role=${experience.slug}&panel=overview` } target="_blank" rel="noreferrer">Preview Role</TextAction>
              </RecordAside>
            </RecordRow>
          );
        } ) }
      </RecordList>
    </StudioPage>
  );
}
