import React from "react";
import { motion } from "framer-motion";

function Time( {
  color,
  startDate,
  endDate,
  isCurrent,
  type,
  ...props
} ) {
  const schoolIcon = "/assets/school.svg";
  const workIcon = "/assets/work.svg";

  return (
    <div className=" block items-start w-56 pt-0.5 relative sm:flex">
      <motion.div
        className="w-4/5 text-left text-accent text-sm self-center mb-3 sm:mb-0"
        transition={ { duration: 1.2, ease: "easeInOut" } }
        viewport={ { once: false } }
        { ...props }
      >
        { startDate } - { isCurrent ? "Present" : endDate }
      </motion.div>
      <motion.div
        className={ `${color} hidden sm:block w-px h-full translate-x-5 translate-y-10 opacity-30` }
        initial={ { height: 0 } }
        whileInView={ { height: "106%" } }
        transition={ { duration: 1.2, ease: "easeInOut" } }
        viewport={ { once: false } }
        { ...props }
      ></motion.div>
      <motion.img
        src={ type === "school" ? schoolIcon : workIcon }
        alt="icon"
        className={ `${color} hidden sm:block w-10 p-1 rounded-lg z-20` }
        transition={ { duration: 0.3 } }
        { ...props }
      />
      <motion.div
        className={ `${color} hidden sm:block h-px w-2 translate-y-5 opacity-30` }
        initial={ { width: 0 } }
        whileInView={ { width: "20%" } }
        transition={ { duration: 1.2, ease: "easeInOut" } }
        viewport={ { once: false } }
        { ...props }
      ></motion.div>
    </div>
  );
}

export default Time;