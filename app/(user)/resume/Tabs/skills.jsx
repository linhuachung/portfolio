'use client';
import { skills } from '@/app/(user)/resume/data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslations } from 'next-intl';

function Skills() {
  const t = useTranslations( 'resume.skills' );

  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[30px] text-center xl:text-left ">
        <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{ t( 'title' ) }</h3>
        <p className="max-w-[600px] text-gray-700 dark:text-white/60 mx-auto xl:mx-0">{ t( 'description' ) }</p>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
        { skills.skillList.map( ( item, index ) => {
          return (
            <li key={ index }>
              <TooltipProvider delayDuration={ 100 }>
                <Tooltip>
                  <TooltipTrigger
                    className="w-full h-[150px] bg-[#f0f0f0] dark:bg-[#232329] rounded-xl flex justify-center items-center group">
                    <div
                      className="text-6xl group-hover:text-accent-light dark:group-hover:text-accent transition-all duration-300">{ item.icon }</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="capitalize">{ item.name }</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        } ) }
      </ul>
    </div>
  );
}

export default Skills;