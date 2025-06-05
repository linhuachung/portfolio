import React from "react";
import { experience } from "@/app/(user)/resume/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import Timeline from "@/components/TimeLine/TimeLine";

function Experience() {
  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold">{ experience.title }</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{ experience.description }</p>
      <ScrollArea className="h-[400px]">
        { experience.workExperiences.map( ( item, index ) => (
          <Timeline
            key={ item.id || item.company }
            title={ item.company }
            index={ index }
            type={ "work" }
            startDate={ item.startDate }
            endDate={ item.endDate }
            isCurrent={ item.isCurrent }
            location={ item.location }
            description={ item.position }
            techStack={ item.techStack }
            link={ item.link }
            info={ item }
          />
        ) ) }
      </ScrollArea>
    </div>
  );
}

export default Experience;