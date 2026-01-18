import { motion } from 'framer-motion';
import Image from 'next/image';
import { formatDateRangeForTimeline } from '@/lib/experience-utils';

// Constants
const LOGO_SIZE = 40;
const ANIMATION_DURATION = 1.2;
const ANIMATION_EASING = 'easeInOut';

// Animation configurations
const DATE_ANIMATION = {
  transition: { duration: ANIMATION_DURATION, ease: ANIMATION_EASING },
  viewport: { once: false }
};

const LINE_ANIMATION = {
  initial: { height: 0 },
  animate: { height: '106%' },
  transition: { duration: ANIMATION_DURATION, ease: ANIMATION_EASING },
  viewport: { once: false }
};

const CONNECTOR_ANIMATION = {
  initial: { width: 0 },
  animate: { width: '20%' },
  transition: { duration: ANIMATION_DURATION, ease: ANIMATION_EASING },
  viewport: { once: false }
};

const LOGO_ANIMATION = {
  transition: { duration: 0.3 }
};

// Company Logo Component - Extracted to avoid duplication
function CompanyLogo( { logo, link, ...props } ) {
  const logoImage = (
    <Image
      src={ logo }
      alt="company logo"
      width={ LOGO_SIZE }
      height={ LOGO_SIZE }
      className="w-10 h-10 object-contain"
      style={ { width: `${LOGO_SIZE}px`, height: `${LOGO_SIZE}px` } }
      onError={ ( e ) => {
        e.target.style.display = 'none';
      } }
    />
  );

  if ( link && link.trim() !== '' ) {
    return (
      <motion.a
        href={ link }
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:block p-0 z-20 bg-transparent hover:opacity-80 transition-opacity"
        { ...LOGO_ANIMATION }
        { ...props }
      >
        { logoImage }
      </motion.a>
    );
  }

  return (
    <motion.div
      className="hidden sm:block p-0 z-20 bg-transparent"
      { ...LOGO_ANIMATION }
      { ...props }
    >
      { logoImage }
    </motion.div>
  );
}

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

  return (
    <div className="block items-start w-56 pt-0.5 relative sm:flex">
      { /* Date Range */ }
      <motion.div
        className="w-4/5 text-left text-accent-light dark:text-accent text-sm self-center mb-3 sm:mb-0"
        { ...DATE_ANIMATION }
        { ...props }
      >
        { dateRange || 'Date not available' }
      </motion.div>

      { /* Vertical Line */ }
      <motion.div
        className={ `${color} hidden sm:block w-px h-full translate-x-5 translate-y-10 opacity-30` }
        initial={ LINE_ANIMATION.initial }
        whileInView={ LINE_ANIMATION.animate }
        transition={ LINE_ANIMATION.transition }
        viewport={ LINE_ANIMATION.viewport }
        { ...props }
      />

      { /* Company Logo */ }
      { hasLogo && <CompanyLogo logo={ logo } link={ link } { ...props } /> }

      { /* Horizontal Connector */ }
      <motion.div
        className={ `${color} hidden sm:block h-px w-2 translate-y-5 opacity-30` }
        initial={ CONNECTOR_ANIMATION.initial }
        whileInView={ CONNECTOR_ANIMATION.animate }
        transition={ CONNECTOR_ANIMATION.transition }
        viewport={ CONNECTOR_ANIMATION.viewport }
        { ...props }
      />
    </div>
  );
}

export default Time;