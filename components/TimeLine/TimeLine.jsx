import Content from '@/components/TimeLine/Content';
import Time from '@/components/TimeLine/Time';
import { motion } from 'framer-motion';

// Constants
const ACCENT_COLOR = 'bg-accent-light dark:bg-accent';
const ANIMATION_DELAY_MULTIPLIER = 0.2;

// Animation configuration
const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, ease: 'easeOut' },
  viewport: { once: false, amount: 0.2 }
};

function Timeline( {
  index = 0,
  type = 'work',
  startDate,
  endDate,
  isCurrent = false,
  title,
  location,
  description,
  techStack,
  link,
  logo,
  info,
  ...props
} ) {
  // Validation
  if ( !title && !description ) {
    if ( process.env.NODE_ENV === 'development' ) {
      console.warn( '[Timeline] Missing required props: title or description' );
    }
    return null;
  }

  // Calculate animation delay
  const animationDelay = index * ANIMATION_DELAY_MULTIPLIER;

  return (
    <motion.div
      className="flex flex-col sm:flex-row m-4 mb-8 relative px-5 sm:justify-center xl:justify-start"
      initial={ ANIMATION_CONFIG.initial }
      whileInView={ ANIMATION_CONFIG.animate }
      transition={ { ...ANIMATION_CONFIG.transition, delay: animationDelay } }
      viewport={ ANIMATION_CONFIG.viewport }
    >
      <Time
        startDate={ startDate }
        endDate={ endDate }
        isCurrent={ isCurrent }
        type={ type }
        color={ ACCENT_COLOR }
        logo={ logo }
        link={ link }
        { ...props }
      />
      <Content
        title={ title }
        color={ ACCENT_COLOR }
        location={ location }
        description={ description }
        techStack={ techStack }
        link={ link }
        type={ type }
        startDate={ startDate }
        endDate={ endDate }
        info={ info }
        index={ index }
        { ...props }
      />
    </motion.div>
  );
}

export default Timeline;