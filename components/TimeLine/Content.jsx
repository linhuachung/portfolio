import React from "react";
import { motion } from "framer-motion";

function Content( { color, title, index, description, techStack, type, location, link, ...props } ) {
  return (
    <motion.div
      className="border border-white/10 rounded-xl px-8 py-4 bg-secondary w-full text-center sm:w-96"
      whileHover={ { scale: 1.07, boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.2)", zIndex: 50 } }
      transition={ { duration: 0.4, ease: "easeInOut" } }
      { ...props }
    >
      <motion.div
        className="text-xl text-accent font-medium mb-1"
        initial={ { opacity: 0 } }
        whileInView={ { opacity: 1 } }
        transition={ { duration: 1, delay: index * 0.2 } }
        viewport={ { once: false } }
        { ...props }
      >
        { link ? (
          <a
            href={ link }
            target="_blank"
            className="hover:text-accent/60 transition-all duration-300"
          >
            { title }
          </a>
        ) : title }
      </motion.div>
      <div className="text-white/60 mb-4 sm:mb-5 sm:text-xs">
        { location }
      </div>
      <div className="mb-4 ">
        <span className="border-b border-accent/60 p-1">{ description }</span>
      </div>
      { techStack && (
        <div className="flex flex-wrap justify-center">
          { techStack.map( ( tech ) => (
            <motion.span
              key={ tech }
              className="bg-gray-900 rounded-xl px-2.5 py-1 text-xs m-1 hover:bg-primary"
              whileHover={ { scale: 1.2, cursor: "pointer", color: "#00ff99" } }
              transition={ { duration: 0.4 } }
              { ...props }
            >
              { tech }
            </motion.span>
          ) ) }
        </div>
      ) }
    </motion.div>
  );
}

export default Content;