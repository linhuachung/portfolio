"use client";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DialogDocument } from "@/components/DialogDocument";
import { about, skills, education, experience } from "./data";

function Resume() {

  const renderFieldValueAboutMe = ( item ) => {
    switch ( item.fieldName ) {
    case "Email":
      return (
        <a
          href={ `mailto: ${item.fieldValue}` }
          className="text-lg hover:text-accent transition-all duration-300"
        >
          { item.fieldValue }
        </a>
      );
    case "Phone":
      return (
        <a
          className="text-lg hover:text-accent transition-all duration-300"
          href={ `tel:${item.fieldValue}` }
        >
          { item.fieldValue }
        </a>
      );
    case "Skype":
      return (
        <a
          className="text-lg hover:text-accent transition-all duration-300"
          href={ `skype:${item.fieldValue}?call` }
        >
          { item.fieldValue }
        </a>
      );
    default:
      return <span className="text-lg">{ item.fieldValue }</span>;
    }
  };
  const renderFieldValueEducation = ( item ) => {
    switch ( item.degree ) {
    case "Cybersoft Academy":
      return (
        <li key={ item.degree }
          className="bg-[#232329] min-h-[184px] py-6 px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
          <span className="text-accent">{ item.duration }</span>
          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{ item.degree }</h3>
          { item.institution.map( x => {
            return (
              <div key={ x.name } className="flex items-baseline gap-3">
                <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                <DialogDocument file={ x.file } title={ x.name }/>
              </div>
            );
          } ) }

        </li>
      );
    case "Ho Chi Minh City Open University":
      return (
        <li key={ item.degree }
          className="bg-[#232329] min-h-[184px] py-6 px-8 rounded-xl flex flex-col justify-start items-center lg:items-start gap-1">
          <span className="text-accent">{ item.duration }</span>
          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">{ item.degree }</h3>
          <div className="flex items-center gap-3">
            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
            <DialogDocument file={ item.file } title={ item.institution }/>
          </div>
        </li>
      );
    default:
      return <span className="text-lg">{ item.fieldValue }</span>;
    }
  };

  return (
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
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>
          <div>
            <DialogDocument/>
          </div>
          <div className="min-h-[700px] w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{ experience.title }</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{ experience.description }</p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    { experience.items.map( ( item, index ) => {
                      return (
                        <li key={ index }
                          className="bg-[#232329] h-[184px] py-6 px-8 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                          <span
                            className="text-accent">{ item.duration }</span>
                          <a
                            href={ item.link }
                            target="_blank"
                            className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left hover:text-accent transition-all duration-300"
                          >
                            { item.company }
                          </a>
                          <div className="flex items-center gap-3">
                            <span
                              className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <DialogDocument
                              content={ item.info }
                              title={ item.position }
                              contentSyled="md:max-w-[768px]"
                            />
                          </div>
                        </li>
                      );
                    } ) }
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{ education.title }</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{ education.description }</p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    { education.items.map( ( item, index ) => {
                      return renderFieldValueEducation( item );
                    } ) }
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left ">
                  <h3 className="text-4xl font-bold">{ skills.title }</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{ skills.description }</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  { skills.skillList.map( ( item, index ) => {
                    return (
                      <li key={ index }>
                        <TooltipProvider delayDuration={ 100 }>
                          <Tooltip>
                            <TooltipTrigger
                              className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div
                                className="text-6xl group-hover:text-accent transition-all duration-300">{ item.icon }</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{ item.name }</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  } ) }
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{ about.title }</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{ about.description }</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  { about.info.map( ( item, index ) => {
                    return (
                      <li key={ index }
                        className="flex items-center justify-center xl:justify-start gap-4">
                        <span
                          className="text-white/60"
                        >
                          { item.fieldName }
                        </span>
                        { renderFieldValueAboutMe( item ) }
                      </li>
                    );
                  } ) }
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
}

export default Resume;