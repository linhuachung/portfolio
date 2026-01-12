import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatDateRangeForTimeline } from '@/lib/experience-utils';

function Time( {
  color,
  startDate,
  endDate,
  isCurrent,
  type: _type,
  logo,
  link,
  ...props
} ) {
  const dateRange = formatDateRangeForTimeline( startDate, endDate, isCurrent );
  const hasLogo = logo && logo.trim() !== '';
  const hasLink = link && link.trim() !== '';

  return (
    <div className="block items-start w-56 pt-0.5 relative sm:flex">
      <motion.div
        className="w-4/5 text-left text-accent-light dark:text-accent text-sm self-center mb-3 sm:mb-0"
        transition={ { duration: 1.2, ease: 'easeInOut' } }
        viewport={ { once: false } }
        { ...props }
      >
        { dateRange || 'Date not available' }
      </motion.div>
      <motion.div
        className={ `${color} hidden sm:block w-px h-full translate-x-5 translate-y-10 opacity-30` }
        initial={ { height: 0 } }
        whileInView={ { height: '106%' } }
        transition={ { duration: 1.2, ease: 'easeInOut' } }
        viewport={ { once: false } }
        { ...props }
      ></motion.div>
      { hasLogo && (
        hasLink ? (
          <motion.a
            href={ link }
            alt="company logo"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block p-0 z-20 bg-transparent hover:opacity-80 transition-opacity"
            transition={ { duration: 0.3 } }
            { ...props }
          >
            <Image
              src={ logo }
              alt="company logo"
              width={ 40 }
              height={ 40 }
              className="w-10 h-10 object-contain"
              style={ { width: '40px', height: '40px' } }
              onError={ ( e ) => {
                e.target.style.display = 'none';
              } }
            />
          </motion.a>
        ) : (
          <motion.div
            className="hidden sm:block p-0 z-20 bg-transparent"
            transition={ { duration: 0.3 } }
            { ...props }
          >
            <Image
              src={ logo }
              alt="company logo"
              width={ 40 }
              height={ 40 }
              className="w-10 h-10 object-contain"
              style={ { width: '40px', height: '40px' } }
              onError={ ( e ) => {
                e.target.style.display = 'none';
              } }
            />
          </motion.div>
        )
      ) }
      <motion.div
        className={ `${color} hidden sm:block h-px w-2 translate-y-5 opacity-30` }
        initial={ { width: 0 } }
        whileInView={ { width: '20%' } }
        transition={ { duration: 1.2, ease: 'easeInOut' } }
        viewport={ { once: false } }
        { ...props }
      ></motion.div>
    </div>
  );
}

export default Time;