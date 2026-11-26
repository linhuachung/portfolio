import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { projects } from '@/content/public-content';
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

const permissionTone = permission => permission === 'confirmed' ? 'positive' : permission === 'needs-review' ? 'caution' : 'info';

export default function ProjectAdminPage() {
  const internalCount = projects.filter( project => project.confidentiality === 'internal' ).length;
  const reviewCount = projects.filter( project => project.media.permission === 'needs-review' ).length;

  return (
    <StudioPage>
      <StudioHeader>
        <Box>
          <StudioEyebrow component="p">Content Studio · Project Registry</StudioEyebrow>
          <StudioTitle component="h1">Project evidence</StudioTitle>
          <StudioDescription component="p">Audit employer relationships, confidentiality, media permissions, and public case-study coverage.</StudioDescription>
        </Box>
        <StudioActions>
          <PreviewButton component={ NextLink } href="/resume?section=experience&role=mercatus&panel=projects&project=mercatus" target="_blank" rel="noreferrer" variant="outlined" endIcon={ <OpenInNewOutlinedIcon /> }>Open Public View</PreviewButton>
        </StudioActions>
      </StudioHeader>

      <SourceNotice>
        <PolicyOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">Publication gate is visible</Typography>
          <Typography component="p">Internal work and media awaiting review stay explicitly labeled instead of being presented as public product evidence.</Typography>
        </Box>
      </SourceNotice>

      <FactStrip component="dl">
        <Fact><Typography component="dt">Projects</Typography><Typography component="dd">{ projects.length }</Typography></Fact>
        <Fact><Typography component="dt">Internal</Typography><Typography component="dd">{ internalCount }</Typography></Fact>
        <Fact><Typography component="dt">Media Review</Typography><Typography component="dd">{ reviewCount }</Typography></Fact>
        <Fact><Typography component="dt">External Links</Typography><Typography component="dd">{ projects.filter( project => project.live ).length }</Typography></Fact>
      </FactStrip>

      <RecordList aria-label="Project records">
        { projects.map( project => (
          <RecordRow key={ project.slug } component="article">
            <RecordIdentity>
              <RecordAvatar src={ project.media.src } alt="" variant="rounded">{ project.number }</RecordAvatar>
              <Box>
                <Typography component="h2">{ project.number } · { project.title }</Typography>
                <Typography component="p">{ project.employer } · { project.period }</Typography>
              </Box>
            </RecordIdentity>
            <RecordBody>
              <Typography component="p">{ project.summary }</Typography>
              <TagRow aria-label={ `${project.title} technology stack` }>
                { project.technologies.map( item => <Tag component="span" key={ item }>{ item }</Tag> ) }
              </TagRow>
              <Typography component="p">{ project.domain } · { project.market } · { project.media.label }</Typography>
            </RecordBody>
            <RecordAside>
              <StateBadge component="span" $tone={ project.confidentiality === 'public' ? 'positive' : 'neutral' }>{ project.confidentiality }</StateBadge>
              <StateBadge component="span" $tone={ permissionTone( project.media.permission ) }>{ project.media.permission }</StateBadge>
              <TextAction component={ NextLink } href={ `/resume?section=experience&role=${project.experienceSlug}&panel=projects&project=${project.slug}` } target="_blank" rel="noreferrer">Preview Project</TextAction>
            </RecordAside>
          </RecordRow>
        ) ) }
      </RecordList>
    </StudioPage>
  );
}
