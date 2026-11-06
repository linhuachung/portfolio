'use client';
import { useState } from 'react';

import { DialogProject } from '@/components/DialogProject';
import MotionWrapper from '@/components/MotionWrapper';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import WorkSliderBtns from '@/components/WorkSliderBtns';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { BsArrowUpRight, BsGithub } from 'react-icons/bs';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { projects } from './data';


function Page() {
  const [project, setProject] = useState( projects[0] );
  const t = useTranslations( 'work' );

  const handleSlideChange = ( swiper ) => {
    const currentIndex = swiper.activeIndex;
    setProject( projects[currentIndex] );
  };

  return (
    <MotionWrapper
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div
            className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div
                className="text-8xl leading-none font-extrabold text-transparent text-outline">{ project.num }</div>
              <h2
                className="text-[42px] font-bold leading-none text-gray-900 dark:text-white group-hover:text-accent-light dark:group-hover:text-accent transition-all duration-500 capitalize">
                <DialogProject
                  styledTitle="text-gray-900 dark:text-white"
                  contentSyled="md:max-w-[1024px]"
                  title={ project.title }
                  content={ project.info }
                />
              </h2>
              <p className="text-gray-700 dark:text-white/60">{ project.description }</p>
              <ul className="flex gap-4 flex-wrap">
                { project.stack.map( ( item, index ) => {
                  return (
                    <li className="text-xl text-accent-light dark:text-accent" key={ index }>
                      { item.name }
                      { index !== project.stack.length - 1 && ',' }
                    </li>
                  );
                } ) }
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                <Link href={ project.live } target="_blank">
                  <TooltipProvider delayDuration={ 100 }>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full bg-[#f0f0f0] dark:bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight
                          className="text-gray-900 dark:text-white text-3xl group-hover:text-accent-light dark:group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ t( 'liveProject' ) }</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={ project.github }>
                  <TooltipProvider delayDuration={ 100 }>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full bg-[#f0f0f0] dark:bg-white/5 flex justify-center items-center group">
                        <BsGithub
                          className="text-gray-900 dark:text-white text-3xl group-hover:text-accent-light dark:group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{ t( 'githubRepo' ) }</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="w-full xl:w-[50%] ">
            <Swiper
              spaceBetween={ 30 }
              slidesPerView={ 1 }
              className="xl:h-[520px] mb-12"
              onSlideChange={ handleSlideChange }
            >
              { projects.map( ( project, index ) => {
                return (
                  <SwiperSlide key={ index } className="w-full">
                    <div
                      className="h-[460px] relative group flex justify-center items-center bg-transparent">
                      <div
                        className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image src={ project.image } fill
                          className="object-contain" alt=""/>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              } ) }
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent-light dark:bg-accent hover:bg-accent-lightHover dark:hover:bg-accent-hover text-white dark:text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}

export default Page;