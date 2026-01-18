'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { formatDateRangeForTimeline } from '@/lib/experience-utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ProjectInfo from '@/app/(user)/work/components/ProjectInfo';

function HorizontalTimeline( { experiences = [] } ) {
  const [hoveredIndex, setHoveredIndex] = useState( null );
  const [selectedExperience, setSelectedExperience] = useState( null );
  const [cardPosition, setCardPosition] = useState( { top: 0, left: 0 } );
  const itemRefs = useRef( {} );

  // Calculate card position when hovered
  useEffect( () => {
    if ( hoveredIndex !== null && itemRefs.current[hoveredIndex] ) {
      const element = itemRefs.current[hoveredIndex];
      const rect = element.getBoundingClientRect();
      const cardWidth = 280; // w-[280px] on mobile, w-72 (288px) on desktop
      const cardHeight = 200; // Approximate height

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      let top = 0;
      let left = rect.left + rect.width / 2;

      // Position card below or above based on available space
      if ( spaceBelow >= cardHeight + 20 || spaceBelow > spaceAbove ) {
        // Show below
        top = rect.bottom + window.scrollY + 10;
      } else {
        // Show above
        top = rect.top + window.scrollY - cardHeight - 10;
      }

      // Ensure card doesn't go off screen horizontally
      const maxLeft = window.innerWidth - cardWidth - 10;
      const minLeft = 10;
      left = Math.max( minLeft, Math.min( maxLeft, left - cardWidth / 2 ) );

      setCardPosition( { top, left } );
    }
  }, [hoveredIndex] );

  if ( !experiences || experiences.length === 0 ) {
    return null;
  }

  return (
    <div className="w-full py-8 px-4 overflow-hidden">
      { /* Horizontal Timeline Line */ }
      <div className="relative w-full mb-20 overflow-visible">
        { /* Main Timeline Line */ }
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-light/30 via-accent-light dark:from-accent/30 dark:via-accent to-accent-light/30 dark:to-accent/30"></div>

        { /* Timeline Items */ }
        <div className="relative flex justify-between items-start gap-2 sm:gap-4 min-w-max">
          { experiences.map( ( exp, index ) => {
            const dateRange = formatDateRangeForTimeline( exp.startDate, exp.endDate, exp.isCurrent );
            const hasLogo = exp.logo && exp.logo.trim() !== '';
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={ exp.id || `exp-${index}` }
                ref={ ( el ) => {
                  if ( el ) {
                    itemRefs.current[index] = el;
                  }
                } }
                className="flex flex-col items-center relative min-w-[100px] sm:min-w-[120px] max-w-[150px] sm:max-w-[200px] flex-1"
                onMouseEnter={ () => setHoveredIndex( index ) }
                onMouseLeave={ () => setHoveredIndex( null ) }
              >
                { /* Timeline Node */ }
                <div className="relative z-10 mb-3 sm:mb-4">
                  <motion.div
                    className={ `w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white dark:border-gray-900 ${isHovered ? 'bg-accent-light dark:bg-accent scale-125 shadow-lg ring-2 ring-accent-light/50 dark:ring-accent/50' : 'bg-accent-light/70 dark:bg-accent/70'} transition-all duration-300` }
                    initial={ { scale: 0 } }
                    animate={ { scale: 1 } }
                    transition={ { delay: index * 0.1, duration: 0.3 } }
                  />
                </div>

                { /* Company Logo and Name */ }
                <div className="flex flex-col items-center gap-3 w-full relative">
                  { hasLogo && (
                    <motion.div
                      className="relative mb-2"
                      initial={ { opacity: 0, y: 20 } }
                      animate={ { opacity: 1, y: 0 } }
                      transition={ { delay: index * 0.1 + 0.2, duration: 0.3 } }
                    >
                      <Image
                        src={ exp.logo }
                        alt={ `${exp.company} logo` }
                        width={ 40 }
                        height={ 40 }
                        className="w-10 h-10 object-contain rounded"
                        style={ { width: '40px', height: '40px' } }
                        onError={ ( e ) => {
                          e.target.style.display = 'none';
                        } }
                      />
                    </motion.div>
                  ) }

                  { /* Company Name */ }
                  <motion.div
                    className="text-center w-full"
                    initial={ { opacity: 0, y: 20 } }
                    animate={ { opacity: 1, y: 0 } }
                    transition={ { delay: index * 0.1 + 0.3, duration: 0.3 } }
                  >
                    <h4 className={ `text-xs sm:text-sm font-semibold mb-1 line-clamp-2 transition-colors cursor-pointer ${isHovered ? 'text-accent-light dark:text-accent' : 'text-gray-900 dark:text-white'}` }>
                      { exp.company || 'Company' }
                    </h4>
                    <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">
                      { dateRange || 'Date not available' }
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          } ) }
        </div>
      </div>

      { /* Hover Card - Fixed Position (Outside timeline container) */ }
      <AnimatePresence>
        { hoveredIndex !== null && (
          <motion.div
            className="fixed w-[280px] sm:w-72 p-4 bg-white dark:bg-secondary border border-gray-200 dark:border-white/20 rounded-lg shadow-2xl z-[9999] pointer-events-auto"
            initial={ { opacity: 0, y: -10, scale: 0.95 } }
            animate={ { opacity: 1, y: 0, scale: 1 } }
            exit={ { opacity: 0, y: -10, scale: 0.95 } }
            transition={ { duration: 0.2 } }
            onMouseEnter={ () => setHoveredIndex( hoveredIndex ) }
            onMouseLeave={ () => setHoveredIndex( null ) }
            style={ {
              top: `${cardPosition.top}px`,
              left: `${cardPosition.left}px`,
              transform: 'translateX(-50%)'
            } }
          >
            { experiences[hoveredIndex] && (
              <div className="space-y-3">
                <div>
                  <h5 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                    { experiences[hoveredIndex].position || 'Position' }
                  </h5>
                  { experiences[hoveredIndex].location && (
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <span>📍</span>
                      <span>{ experiences[hoveredIndex].location }</span>
                    </p>
                  ) }
                </div>

                { experiences[hoveredIndex].description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    { experiences[hoveredIndex].description }
                  </p>
                ) }

                { experiences[hoveredIndex].techStack && experiences[hoveredIndex].techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    { experiences[hoveredIndex].techStack.slice( 0, 3 ).map( ( tech, techIndex ) => {
                      const techName = typeof tech === 'string' ? tech : ( tech?.name || tech?.techStack?.name || String( tech ) );
                      return (
                        <span
                          key={ `tech-${techIndex}` }
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-primary rounded text-gray-700 dark:text-gray-300"
                        >
                          { techName }
                        </span>
                      );
                    } ) }
                    { experiences[hoveredIndex].techStack.length > 3 && (
                      <span className="text-xs px-2 py-1 text-gray-500 dark:text-gray-400">
                        +{ experiences[hoveredIndex].techStack.length - 3 }
                      </span>
                    ) }
                  </div>
                ) }

                <Button
                  onClick={ () => setSelectedExperience( experiences[hoveredIndex] ) }
                  className="w-full bg-accent-light dark:bg-accent hover:bg-accent-light/80 dark:hover:bg-accent/80 text-white font-medium"
                  size="sm"
                >
                  View Detail
                </Button>
              </div>
            ) }
          </motion.div>
        ) }
      </AnimatePresence>

      { /* Detail Dialog */ }
      <Dialog open={ !!selectedExperience } onOpenChange={ ( open ) => {
        if ( !open ) {
          setSelectedExperience( null );
        }
      } }>
        <DialogContent className="max-w-[375px] sm:max-w-[1024px] bg-[#f5f5f5] dark:bg-primary rounded-2xl overflow-auto md:max-h-[70vh] max-h-[50vh]">
          { selectedExperience && (
            <>
              <DialogHeader>
                <DialogTitle className="px-3 sm:px-0 text-gray-900 dark:text-white">
                  { selectedExperience.position || 'Position Details' }
                </DialogTitle>
                <p className="text-gray-600 dark:text-white/60 text-base">
                  { formatDateRangeForTimeline( selectedExperience.startDate, selectedExperience.endDate, selectedExperience.isCurrent ) }
                </p>
              </DialogHeader>
              <div className="mt-5">
                <ProjectInfo info={ selectedExperience.info }/>
              </div>
              <DialogFooter>
                <Button onClick={ () => setSelectedExperience( null ) } variant="outline">
                  Close
                </Button>
              </DialogFooter>
            </>
          ) }
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HorizontalTimeline;
