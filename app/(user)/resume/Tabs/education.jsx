'use client';
'use client';
import React from 'react';
import { education } from '@/app/(user)/resume/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import Timeline from '@/components/TimeLine/TimeLine';
import ResumeSectionHeader from '@/components/ResumeSectionHeader';
import { useTranslations } from 'next-intl';

function Education() {
  const t = useTranslations( 'resume.education' );

  return (
    <>
      <ResumeSectionHeader title={ t( 'title' ) } description={ t( 'description' ) } />
      <ScrollArea className="h-[400px]">
        { education.educationExperiences.map( ( item, index ) => {
          return (
            <Timeline
              key={ item.id || item.school }
              title={ item.school }
              index={ index }
              type={ 'school' }
              startDate={ item.startDate }
              endDate={ item.endDate }
              isCurrent={ item.isCurrent }
              location={ item.location }
              info={ item.degree }
              logo={ item?.logo }
              link={ item?.link }
            />
          );
        } ) }
      </ScrollArea>
    </>
  );
}

export default Education;