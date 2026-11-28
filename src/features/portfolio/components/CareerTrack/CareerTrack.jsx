'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';
import { forwardRef } from 'react';
import { NowBadge, Segment, SegmentBar, SegmentBody, SegmentCompany, SegmentDetail, SegmentDuration, SegmentHeading, SegmentLogo, SegmentRole, YearRange, TrackList } from './CareerTrack.styles';

/**
 * One segment per employer, sized by tenure, so the length of each stay reads at a glance.
 * Only the selected segment is in the tab order; arrow keys move between roles (`onKeyDown`).
 */
const CareerTrack = forwardRef( function CareerTrack( { roles, activeSlug, onSelect, onKeyDown }, ref ) {
  const columns = roles.map( role => `minmax(var(--segment-min), ${role.months}fr)` ).join( ' ' );

  return (
    <TrackList ref={ ref } component="ol" aria-label="Work history" onKeyDown={ onKeyDown } sx={ { '--track-columns': columns } }>
      { roles.map( role => {
        const active = role.slug === activeSlug;
        return (
          <Box component="li" key={ role.slug }>
            <Segment
              type="button"
              aria-current={ active ? 'step' : undefined }
              tabIndex={ active ? 0 : -1 }
              data-current={ role.isCurrent || undefined }
              onClick={ () => onSelect( role.slug ) }
            >
              <SegmentBar aria-hidden="true"/>
              <SegmentBody>
                <SegmentLogo component="span" data-logo>
                  <Box component={ Image } src={ role.logo } alt="" width={ 36 } height={ 36 }/>
                </SegmentLogo>
                <SegmentHeading component="span">
                  <SegmentCompany component="span">
                    <Box component="span">{ role.shortLabel }</Box>
                    <SegmentRole component="span">{ role.role }</SegmentRole>
                  </SegmentCompany>
                  <SegmentDuration component="span">
                    <Box component="span" data-full>{ `${role.startLabel} – ${role.endLabel}` }</Box>
                    { /* A break opportunity after the dash lets narrow segments wrap "2021–2022" instead of clipping it. */ }
                    <YearRange component="span">{ role.years.replace( '–', '–​' ) }</YearRange>
                    { role.isCurrent && <NowBadge component="span">Now</NowBadge> }
                  </SegmentDuration>
                </SegmentHeading>
                <SegmentDetail component="span">{ role.role }</SegmentDetail>
              </SegmentBody>
            </Segment>
          </Box>
        );
      } ) }
    </TrackList>
  );
} );

export default CareerTrack;
