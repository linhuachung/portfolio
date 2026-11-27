import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import { education } from '@/content/public-content';
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
  TextAction
} from '@/features/admin-shell/styles/ContentStudio.styles';

export default function EducationAdminPage() {
  const credentialCount = education.reduce( ( count, item ) => count + item.programs.filter( program => program.credential ).length, 0 );

  return (
    <StudioPage>
      <StudioHeader>
        <Box>
          <StudioEyebrow component="p">Content Studio · Education</StudioEyebrow>
          <StudioTitle component="h1">Education timeline</StudioTitle>
          <StudioDescription component="p">Verify institutions, study periods, programs, and downloadable credential coverage.</StudioDescription>
        </Box>
        <StudioActions>
          <PreviewButton component={ NextLink } href="/resume?section=education" target="_blank" rel="noreferrer" variant="outlined" endIcon={ <OpenInNewOutlinedIcon /> }>Open Public View</PreviewButton>
        </StudioActions>
      </StudioHeader>

      <SourceNotice>
        <SchoolOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">Timeline completeness</Typography>
          <Typography component="p">Every public education record includes an institution, study period, location, and at least one program.</Typography>
        </Box>
      </SourceNotice>

      <FactStrip component="dl">
        <Fact>
          <Typography component="dt">Institutions</Typography>
          <Typography component="dd">{ education.length }</Typography>
        </Fact>
        <Fact>
          <Typography component="dt">Programs</Typography>
          <Typography component="dd">{ education.reduce( ( count, item ) => count + item.programs.length, 0 ) }</Typography>
        </Fact>
        <Fact>
          <Typography component="dt">Credentials</Typography>
          <Typography component="dd">{ credentialCount }</Typography>
        </Fact>
        <Fact>
          <Typography component="dt">Coverage</Typography>
          <Typography component="dd">100%</Typography>
        </Fact>
      </FactStrip>

      <RecordList aria-label="Education records">
        { [...education].reverse().map( item => (
          <RecordRow key={ item.slug } component="article">
            <RecordIdentity>
              <RecordAvatar src={ item.logo } alt="" variant="rounded">{ item.school.slice( 0, 2 ) }</RecordAvatar>
              <Box>
                <Typography component="h2">{ item.school }</Typography>
                <Typography component="p">
                  { item.dates }
                  { ' ' }
                  ·
                  { ' ' }
                  { item.location }
                </Typography>
              </Box>
            </RecordIdentity>
            <RecordBody>
              { item.programs.map( program => (
                <Box key={ program.name } sx={ { display: 'grid', gap: .5 } }>
                  <Typography component="p" sx={ { color: 'text.primary !important', fontWeight: 650 } }>{ program.name }</Typography>
                  <Typography component="p">{ program.credential ? 'Credential document attached' : 'Credential document missing' }</Typography>
                </Box>
              ) ) }
            </RecordBody>
            <RecordAside>
              <StateBadge component="span" $tone={ item.programs.every( program => program.credential ) ? 'positive' : 'caution' }>{ item.programs.every( program => program.credential ) ? 'Verified' : 'Review' }</StateBadge>
              { item.programs.map( program => program.credential && (
                <TextAction key={ program.name } component={ NextLink } href={ program.credential } target="_blank" rel="noreferrer">Open Credential</TextAction>
              ) ) }
            </RecordAside>
          </RecordRow>
        ) ) }
      </RecordList>
    </StudioPage>
  );
}
