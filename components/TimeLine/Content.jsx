import { DialogDocument } from '@/components/DialogDocument';
import { DialogProject } from '@/components/DialogProject';
import { motion } from 'framer-motion';

function Content( { color: _color, title, index, description, techStack, type, location, link, startDate, endDate, info, ...props } ) {
  return (
    <motion.div
      className="border border-gray-300 dark:border-white/10 rounded-xl px-8 py-4 bg-[#f0f0f0] dark:bg-secondary w-full text-center sm:w-96"
      whileHover={ { scale: 1.07, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.2)', zIndex: 50 } }
      transition={ { duration: 0.4, ease: 'easeInOut' } }
      { ...props }
    >
      <motion.div
        className="text-xl text-accent-light dark:text-accent font-medium mb-1"
        initial={ { opacity: 0 } }
        whileInView={ { opacity: 1 } }
        transition={ { duration: 1, delay: index * 0.2 } }
        viewport={ { once: false } }
      >
        { link && link.trim() !== '' ? (
          <a
            href={ link }
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-light/60 dark:hover:text-accent/60 transition-all duration-300"
          >
            { title || 'Untitled' }
          </a>
        ) : (
          <span>{ title || 'Untitled' }</span>
        ) }
      </motion.div>
      { location && location.trim() !== '' && (
        <div className="text-gray-600 dark:text-white/60 mb-4 sm:mb-5 sm:text-xs">
          { location }
        </div>
      ) }
      { ( description || info ) && (
        <div className="mb-4">
          { type === 'work' ? (
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
      { techStack && Array.isArray( techStack ) && techStack.length > 0 && (
        <div className="flex flex-wrap justify-center">
          { techStack.map( ( tech, techIndex ) => {
            const techName = typeof tech === 'string' ? tech : ( tech?.name || tech?.techStack?.name || String( tech ) );
            const techKey = tech?.id || tech?.techStack?.id || `${techName}-${techIndex}`;

            return (
              <span
                key={ techKey }
                className="bg-gray-200 dark:bg-primary rounded-xl my-1 px-3.5 py-1 text-sm m-1 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-primary/60 hover:text-accent-light dark:hover:text-accent cursor-pointer transition-all duration-300 shadow-lg drop-shadow-lg hover:shadow-xl hover:drop-shadow-2xl"
              >
                { techName }
              </span>
            );
          } ) }
        </div>
      ) }
    </motion.div>
  );
}

export default Content;