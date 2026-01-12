import Content from '@/components/TimeLine/Content';
import Time from '@/components/TimeLine/Time';
import { motion } from 'framer-motion';

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
  if ( !title && !description ) {
    console.warn( 'Timeline component: Missing required props (title or description)' );
    return null;
  }

  const color = 'bg-accent-light dark:bg-accent';

  return (
    <motion.div
      className="flex flex-col sm:flex-row m-4 mb-8 relative px-5 sm:justify-center xl:justify-start"
      initial={ { opacity: 0, y: 50, scale: 0.9 } }
      whileInView={ { opacity: 1, y: 0, scale: 1 } }
      transition={ { duration: 0.6, delay: index * 0.2, ease: 'easeOut' } }
      viewport={ { once: false, amount: 0.2 } }
    >
      <Time
        startDate={ startDate }
        endDate={ endDate }
        isCurrent={ isCurrent }
        type={ type }
        color={ color }
        logo={ logo }
        link={ link }
        { ...props }
      />
      <Content
        title={ title }
        color={ color }
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