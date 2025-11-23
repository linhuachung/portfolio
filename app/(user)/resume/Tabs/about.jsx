import React from 'react';
import { about } from '@/app/(user)/resume/data';

function About() {
  const renderFieldValueAboutMe = ( item ) => {
    switch ( item.fieldName ) {
      case 'Email':
        return (
          <a
            href={ `mailto: ${item.fieldValue}` }
            className="text-lg hover:text-accent transition-all duration-300"
          >
            { item.fieldValue }
          </a>
        );
      case 'Phone':
        return (
          <a
            className="text-lg hover:text-accent transition-all duration-300"
            href={ `tel:${item.fieldValue}` }
          >
            { item.fieldValue }
          </a>
        );
      case 'Skype':
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

  return (
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
  );
}

export default About;