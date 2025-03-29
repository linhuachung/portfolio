import React from "react";
import { education } from "@/app/(user)/resume/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import Timeline from "@/components/TimeLine/TimeLine";

function Education() {

  return (
    <div className="flex flex-col gap-[30px] text-center xl:text-left">
      <h3 className="text-4xl font-bold">{ education.title }</h3>
      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{ education.description }</p>
      <ScrollArea className="h-[400px]">
        { education.educationExperiences.map( ( item, index ) => {
          return (
            <Timeline
              key={ item.id || item.school }
              title={ item.school }
              index={ index }
              type={ "school" }
              startdate={ item.startdate }
              enddate={ item.enddate }
              isCurrent={ item.isCurrent }
              location={ item.location }
              info={ item.degree }
            />
          );
        } ) }
      </ScrollArea>
    </div>
  );
}

export default Education;