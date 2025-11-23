import React from 'react';
import { motion } from 'framer-motion';

function MotionWrapper( { children, className, ...props } ) {
  return (
    <motion.section
      initial={ { opacity: 0 } }
      animate={ {
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: 'easeIn'
        }
      } }
      className={ className }
      { ...props }
    >
      { children }
    </motion.section>
  );
}

export default MotionWrapper;