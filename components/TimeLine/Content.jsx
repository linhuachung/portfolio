import React from "react";
import { motion } from "framer-motion";
import { DialogDocument } from "@/components/DialogDocument";
import { DialogProject } from "@/components/DialogProject";

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
      <div className="mb-4">
        { type === "work" ? (
          <DialogProject
            content={ props.info }
            title={ description }
            styledTitle="md:max-w-[448px] text-white text-lg"
            contentStyled="sm:max-w-[760px]"
          />
        ) : (
          props.info.map( ( item ) => {
            return (
              <DialogDocument
                key={ item.name }
                content={ { startdate: props.startdate, enddate: props.enddate, ...item } }
                title={ item.name }
                styledTitle="text-white text-lg width-fit text-left w-72"
                contentStyled="sm:max-w-[760px]"
              />
            );
          } )
        ) }
      </div>
      { techStack && (
        <div className="flex flex-wrap justify-center">
          { techStack.map( ( tech ) => (
            <span
              key={ tech }
              className="bg-primary rounded-xl my-1 px-3.5 py-1 text-sm m-1 hover:bg-primary/60 hover:text-accent cursor-pointer transition-all duration-300 shadow-lg drop-shadow-lg hover:shadow-xl hover:drop-shadow-2xl"
            >
              { tech }
            </span>
          ) ) }
        </div>
      ) }
    </motion.div>
  );
}

export default Content;