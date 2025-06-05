import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Time( {
  color,
  startDate,
  endDate,
  isCurrent,
  type,
  logo,
  link,
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
      <motion.a
        href={ link }
        alt="icon"
        target="_blank"
        className={ `${color} hidden sm:block p-0 rounded-lg z-20 bg-transparent` }
        transition={ { duration: 0.3 } }
        { ...props }
      >
        <Image src={ logo } alt="logo" width={ 40 } height={ 40 } className=" w-12"/>
      </motion.a>
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