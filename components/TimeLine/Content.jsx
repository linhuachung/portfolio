import { DialogDocument } from '@/components/DialogDocument';
import { DialogProject } from '@/components/DialogProject';
import { extractTechName, getTechKey } from '@/lib/experience-utils';
import { motion } from 'framer-motion';

// Constants
const ANIMATION_DELAY_MULTIPLIER = 0.2;
const HOVER_ANIMATION = {
  scale: 1.07,
  boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.2)',
  zIndex: 50
};

// Animation configurations
const TITLE_ANIMATION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 },
  viewport: { once: false }
};

const CARD_ANIMATION = {
  transition: { duration: 0.4, ease: 'easeInOut' }
};

// Tech Stack Badge Component
function TechBadge( { tech } ) {
  const techName = extractTechName( tech );

  return (
    <span
      className="bg-gray-200 dark:bg-primary rounded-xl my-1 px-3.5 py-1 text-sm m-1 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-primary/60 hover:text-accent-light dark:hover:text-accent cursor-pointer transition-all duration-300 shadow-lg drop-shadow-lg hover:shadow-xl hover:drop-shadow-2xl"
    >
      { techName }
    </span>
  );
}

// Company Title Component
function CompanyTitle( { title, link } ) {
  const displayTitle = title || 'Untitled';

  if ( link && link.trim() !== '' ) {
    return (
      <a
        href={ link }
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-accent-light/60 dark:hover:text-accent/60 transition-all duration-300"
      >
        { displayTitle }
      </a>
    );
  }

  return <span>{ displayTitle }</span>;
}

function Content( {
  color: _color,
  title,
  index,
  description,
  techStack,
  type,
  location,
  link,
  startDate,
  endDate,
  info,
  ...props
} ) {
  // Computed values
  const hasLocation = location && location.trim() !== '';
  const hasDescription = description || info;
  const hasTechStack = techStack && Array.isArray( techStack ) && techStack.length > 0;
  const isWorkType = type === 'work';
  const animationDelay = index * ANIMATION_DELAY_MULTIPLIER;

  return (
    <motion.div
      className="border border-gray-300 dark:border-white/10 rounded-xl px-8 py-4 bg-[#f0f0f0] dark:bg-secondary w-full text-center sm:w-96"
      whileHover={ HOVER_ANIMATION }
      { ...CARD_ANIMATION }
      { ...props }
    >
      { /* Company Title */ }
      <motion.div
        className="text-xl text-accent-light dark:text-accent font-medium mb-1"
        initial={ TITLE_ANIMATION.initial }
        whileInView={ TITLE_ANIMATION.animate }
        transition={ { ...TITLE_ANIMATION.transition, delay: animationDelay } }
        viewport={ TITLE_ANIMATION.viewport }
      >
        <CompanyTitle title={ title } link={ link } />
      </motion.div>

      { /* Location */ }
      { hasLocation && (
        <div className="text-gray-600 dark:text-white/60 mb-4 sm:mb-5 sm:text-xs">
          { location }
        </div>
      ) }

      { /* Description/Info Dialog */ }
      { hasDescription && (
        <div className="mb-4">
          { isWorkType ? (
            <DialogProject
              content={ info }
              title={ description || 'Position' }
              styledTitle="md:max-w-[448px] text-gray-900 dark:text-white text-lg"
              contentStyled="sm:max-w-[760px]"
            />
          ) : (
            info && Array.isArray( info ) && info.map( ( item, itemIndex ) => {
              const itemKey = item?.name || item?.id || `item-${itemIndex}`;
              return (
                <DialogDocument
                  key={ itemKey }
                  content={ { startDate, endDate, ...item } }
                  title={ item.name || 'Document' }
                  styledTitle="text-gray-900 dark:text-white text-lg width-fit text-left w-72"
                  contentStyled="sm:max-w-[760px]"
                />
              );
            } )
          ) }
        </div>
      ) }

      { /* Tech Stack */ }
      { hasTechStack && (
        <div className="flex flex-wrap justify-center">
          { techStack.map( ( tech, techIndex ) => (
            <TechBadge key={ getTechKey( tech, techIndex ) } tech={ tech } techIndex={ techIndex } />
          ) ) }
        </div>
      ) }
    </motion.div>
  );
}

export default Content;