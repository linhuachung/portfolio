import React from "react";
import { education } from "@/app/(user)/resume/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogDocument } from "@/components/DialogDocument";

function Education() {
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
  );
}

export default Education;