'use client';

import CountUp from 'react-countup';
import { useTranslations } from 'next-intl';

function Stats( { stats } ) {
  const t = useTranslations( 'stats' );

  const statsData = stats ? [
    {
      num: stats.years || 4,
      text: t( 'yearsOfExperience' ),
      isPlus: true
    },
    {
      num: stats.projects || 8,
      text: t( 'projectsCompleted' )
    },
    {
      num: stats.technologies || 4,
      text: t( 'technologiesMastered' ),
      isPlus: true
    },
    {
      num: stats.commits || 500,
      text: t( 'codeCommits' ),
      isPlus: true
    }
  ] : [
    {
      num: 4,
      text: t( 'yearsOfExperience' ),
      isPlus: true
    },
    {
      num: 8,
      text: t( 'projectsCompleted' )
    },
    {
      num: 4,
      text: t( 'technologiesMastered' ),
      isPlus: true
    },
    {
      num: 500,
      text: t( 'codeCommits' ),
      isPlus: true
    }
  ];

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          { statsData.map( ( item, i ) => {
            return (
              <div key={ i }
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start">
                <CountUp
                  end={ item.num }
                  duration={ 3.5 }
                  delay={ 2 }
                  className="text-4xl xl:text-6xl font-extrabold"
                  suffix={ item.isPlus && '+' }
                ></CountUp>
                <p
                  className={ `${item.text.length < 15 ? 'max-w-[100px]' : 'max-w-[150px]'} leading-snug text-gray-700 dark:text-white/80` }>{
                    item.text }
                </p>
              </div>
            );
          } ) }
        </div>
      </div>
    </section>
  );
}

export default Stats;
