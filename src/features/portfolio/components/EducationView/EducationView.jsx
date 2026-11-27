'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { education } from '@/content/public-content';
import Image from 'next/image';
import { Kicker } from '../../styles/PublicLayout.styles';
import { PanelTitle, StaticView } from '../../styles/Resume.styles';
import { CertificateThumb, CredentialLink, EducationCard, EducationCards, EducationHeader, EducationMarker, ProgramList, StudyBar, StudyStrip, StudyTicks } from './EducationView.styles';

const yearsOf = dates => dates.split( '–' ).map( Number );
const firstYear = Math.min( ...education.map( item => yearsOf( item.dates )[0] ) );
const lastYear = Math.max( ...education.map( item => yearsOf( item.dates )[1] ) );
const ticks = Array.from( { length: lastYear - firstYear + 1 }, ( _, index ) => firstYear + index );
// Each study period spans its years on one shared axis, so overlapping study reads as overlapping.
const barColumn = dates => {
  const [start, end] = yearsOf( dates );
  return `${start - firstYear + 1} / ${end - firstYear + 2}`;
};
const shortSchool = school => school.replace( 'Ho Chi Minh City ', '' ).replace( ' Academy', '' );

export default function EducationView() {
  return (
    <StaticView component="article" aria-labelledby="education-title">
      <Kicker component="p">Education · 2016—2022</Kicker>
      <PanelTitle component="h2" id="education-title">A computer science degree, sharpened by focused web training.</PanelTitle>

      <StudyStrip aria-hidden="true" sx={ { '--years': ticks.length } }>
        { education.map( ( item, index ) => (
          <StudyBar key={ item.slug } sx={ { gridColumn: barColumn( item.dates ), gridRow: index + 1 } }>{ shortSchool( item.school ) }</StudyBar>
        ) ) }
        <StudyTicks>{ ticks.map( year => <Box component="span" key={ year }>{ year }</Box> ) }</StudyTicks>
      </StudyStrip>

      <EducationCards component="ol" aria-label="Education history">
        { education.map( item => (
          <EducationCard component="li" key={ item.slug }>
            <EducationHeader>
              <EducationMarker component="span">
                <Box component={ Image } src={ item.logo } alt="" width={ 48 } height={ 48 }/>
              </EducationMarker>
              <Box>
                <Typography component="h3">{ item.school }</Typography>
                <Typography component="p">
                  { item.kind }
                  { ' ' }
                  ·
                  { ' ' }
                  <Box component="span">{ item.dates }</Box>
                </Typography>
              </Box>
            </EducationHeader>
            <ProgramList component="ul">
              { item.programs.map( program => (
                <Box component="li" key={ program.name } data-preview={ program.preview ? true : undefined }>
                  { program.preview && (
                    <CertificateThumb component="span">
                      <Box component={ Image } src={ program.preview } alt="" width={ 84 } height={ 119 }/>
                    </CertificateThumb>
                  ) }
                  <Box>
                    <Typography component="p">{ program.name }</Typography>
                    { program.result && (
                      <Typography component="p">
                        { program.duration }
                        { ' ' }
                        ·
                        { ' ' }
                        { program.result }
                        { ' ' }
                        ·
                        { ' ' }
                        { program.issued }
                      </Typography>
                    ) }
                    <CredentialLink href={ program.credential } target="_blank" rel="noreferrer" aria-label={ `${program.name} — view credential` }>
                      { program.credentialLabel }
                      { ' ' }
                      <Box component="span" aria-hidden="true">↗</Box>
                    </CredentialLink>
                  </Box>
                </Box>
              ) ) }
            </ProgramList>
          </EducationCard>
        ) ) }
      </EducationCards>
    </StaticView>
  );
}
