"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Frontend Development",
    description: "Building responsive, high-performance web applications using ReactJS, NextJS, and modern JavaScript. Specializing in component-based architecture, state management with Redux, and seamless API integration for optimal user experiences.",
    href: "/work"
  },
  {
    num: "02",
    title: "UI/UX Implementation",
    description: "Translating design mockups into pixel-perfect, accessible interfaces using HTML5, CSS3, and Tailwind CSS. Focus on responsive design, cross-browser compatibility, and modern CSS techniques for engaging user interfaces.",
    href: "/work"
  },
  {
    num: "03",
    title: "Performance Optimization",
    description: "Optimizing web applications for speed and efficiency through code splitting, lazy loading, and modern bundling techniques. Implementing best practices for Core Web Vitals and ensuring smooth user interactions.",
    href: "/work"
  },
  {
    num: "04",
    title: "Full-Stack Integration",
    description: "Developing complete web solutions with NodeJS backend integration, RESTful API development, and database management. Ensuring seamless communication between frontend and backend systems.",
    href: "/work"
  }
];

function Services() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={ { opacity: 0 } }
          animate={ {
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.4,
              ease: "easeIn"
            }
          } }
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          { services.map( ( service, index ) => {
            return (
              <div key={ index } className="flex-1 flex flex-col justify-center gap-6 group">
                <div className="w-full flex justify-between items-center">
                  <div
                    className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500"
                  >
                    { service.num }
                  </div>
                  <Link
                    href={ service.href }
                    className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
                  >
                    <BsArrowDownRight className="text-primary text-3xl"/>
                  </Link>
                </div>
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">{ service.title }</h2>
                <p className="text-white/60">{ service.description }</p>
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          } ) }
        </motion.div>
      </div>
    </section>
  );
}

export default Services;