'use client';
import React, { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Timeline from '@/components/TimeLine/TimeLine';
import Loader from '@/components/Loader';
import EmptyState from '@/components/EmptyState';

function Experience() {
  const [experiences, setExperiences] = useState( [] );
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( null );

  useEffect( () => {
    const fetchExperiences = async () => {
      try {
        setLoading( true );
        setError( null );

        const response = await fetch( '/api/user/experience', {
          cache: 'no-store'
        } );

        const result = await response.json();

        if ( result && result.status === 200 && result.data ) {
          const transformedExperiences = result.data.map( ( exp ) => ( {
            id: exp.id,
            company: exp.company,
            position: exp.position,
            description: exp.description,
            startDate: exp.startDate,
            endDate: exp.endDate,
            isCurrent: exp.isCurrent,
            location: exp.location,
            companyLogo: exp.companyLogo,
            companyWebsite: exp.companyWebsite,
            techStack: exp.techStack || [],
            link: exp.companyWebsite || null,
            logo: exp.companyLogo || null,
            info: {
              company: exp.company,
              position: exp.position,
              projectDescription: exp.description,
              rolesAndResponsibilities: exp.description
                ? exp.description.split( '\n' ).filter( ( line ) => line.trim() !== '' )
                : [],
              technologies: exp.techStack || [],
              link: exp.companyWebsite || null
            }
          } ) );

          setExperiences( transformedExperiences );
        } else {
          setExperiences( [] );
        }
      } catch ( err ) {
        console.error( 'Failed to fetch experiences:', err );
        setError( 'Failed to load experiences' );
        setExperiences( [] );
      } finally {
        setLoading( false );
      }
    };

    fetchExperiences();

    const handleFocus = () => {
      fetchExperiences();
    };

    window.addEventListener( 'focus', handleFocus );

    return () => {
      window.removeEventListener( 'focus', handleFocus );
    };
  }, [] );

  if ( loading ) {
    return (
      <div className="flex flex-col gap-[30px] text-center xl:text-left">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">My experience</h3>
        <p className="max-w-[600px] text-gray-700 dark:text-white/60 mx-auto xl:mx-0">
          Frontend Developer skilled in ReactJS and NextJS, API integration, and performance optimization.
        </p>
        <div className="flex items-center justify-center py-12">
          <Loader type="ClipLoader" color="#00ff99" size={ 40 } />
        </div>
      </div>
    );
  }

  if ( error ) {
    return (
      <div className="flex flex-col gap-[30px] text-center xl:text-left">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">My experience</h3>
        <EmptyState message={ error } />
      </div>
    );
  }

  if ( !experiences || experiences.length === 0 ) {
    return (
      <div className="flex flex-col gap-[30px] text-center xl:text-left">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">My experience</h3>
        <p className="max-w-[600px] text-gray-700 dark:text-white/60 mx-auto xl:mx-0">
          Frontend Developer skilled in ReactJS and NextJS, API integration, and performance optimization.
        </p>
        <EmptyState message="No work experience available yet." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold text-gray-900 dark:text-white">My experience</h3>
      <p className="max-w-[600px] text-gray-700 dark:text-white/60 mx-auto xl:mx-0">
        Frontend Developer skilled in ReactJS and NextJS, API integration, and performance optimization.
      </p>
      <ScrollArea className="h-[400px]">
        { experiences.map( ( item, index ) => (
          <Timeline
            key={ item.id || `experience-${index}` }
            title={ item.company }
            index={ index }
            type="work"
            startDate={ item.startDate }
            endDate={ item.endDate }
            isCurrent={ item.isCurrent }
            location={ item.location }
            description={ item.position }
            techStack={ item.techStack }
            link={ item.link }
            info={ item.info }
            logo={ item.logo }
          />
        ) ) }
      </ScrollArea>
    </div>
  );
}

export default Experience;