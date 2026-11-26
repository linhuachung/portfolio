'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { education } from '@/content/public-content';
import MuiLink from '@mui/material/Link';
import Image from 'next/image';
import { Kicker, SectionTitle } from '../../styles/PublicLayout.styles';
import { StaticView } from '../../styles/Resume.styles';
import { EducationDates, EducationIndex, EducationLocation, EducationMarker, EducationNode, EducationPrograms, EducationTimeline } from './EducationView.styles';

export default function EducationView() {
  return (
    <StaticView component="article" aria-labelledby="education-title">
      <Kicker component="p">Education · 2016—2022</Kicker>
      <SectionTitle component="h2" id="education-title">Formal study, followed by practical web training.</SectionTitle>
      <EducationTimeline component="ol" aria-label="Education history">
        { education.map( ( item, index ) => (
          <Box component="li" key={ item.slug }>
            <EducationNode>
              <EducationMarker component="span">
                <Image src={ item.logo } alt="" width={ 42 } height={ 42 }/>
              </EducationMarker>
              <EducationIndex component="span" aria-hidden="true">0{ index + 1 }</EducationIndex>
            </EducationNode>
            <EducationDates component="p">{ item.dates }</EducationDates>
            <Typography component="h3">{ item.school }</Typography>
            <EducationLocation component="p">{ item.location }</EducationLocation>
            <EducationPrograms component="ul">
              { item.programs.map( program => (
                <Box component="li" key={ program.name }>
                  { program.credential ? (
                    <MuiLink href={ program.credential } target="_blank" rel="noreferrer" aria-label={ `${program.name} — view credential` }>
                      { program.name } <Typography component="span" aria-hidden="true">↗</Typography>
                    </MuiLink>
                  ) : program.name }
                </Box>
              ) ) }
            </EducationPrograms>
          </Box>
        ) ) }
      </EducationTimeline>
    </StaticView>
  );
}
