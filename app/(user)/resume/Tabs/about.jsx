'use client';
import { about } from '@/app/(user)/resume/data';
import { mapFieldValueToTranslation } from '@/lib/i18n-utils';
import { useTranslations } from 'next-intl';

function About() {
  const t = useTranslations( 'resume.about' );
  const tFields = useTranslations( 'resume.about.fields' );
  const tValues = useTranslations( 'resume.about.fieldValues' );

  const renderFieldValueAboutMe = ( item ) => {
    const fieldName = item.fieldName;
    const fieldValue = item.fieldValue;
    const translatedValue = mapFieldValueToTranslation( fieldValue, tValues );

    switch ( fieldName ) {
      case 'Email':
        return (
          <a
            href={ `mailto: ${fieldValue}` }
            className="text-lg hover:text-accent-light dark:hover:text-accent transition-all duration-300"
          >
            { translatedValue }
          </a>
        );
      case 'Phone':
        return (
          <a
            className="text-lg hover:text-accent-light dark:hover:text-accent transition-all duration-300"
            href={ `tel:${fieldValue}` }
          >
            { translatedValue }
          </a>
        );
      case 'Skype':
        return (
          <a
            className="text-lg hover:text-accent-light dark:hover:text-accent transition-all duration-300"
            href={ `skype:${fieldValue}?call` }
          >
            { translatedValue }
          </a>
        );
      default:
        return <span className="text-lg">{ translatedValue }</span>;
    }
  };

  return (
    <div className="flex flex-col gap-[30px]">
      <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{ t( 'title' ) }</h3>
      <p className="max-w-[600px] text-gray-700 dark:text-white/60 mx-auto xl:mx-0">{ t( 'description' ) }</p>
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
        { about.info.map( ( item, index ) => {
          const fieldNameKey = item.fieldName.toLowerCase();
          const translatedFieldName = tFields( fieldNameKey ) || item.fieldName;

          return (
            <li key={ index }
              className="flex items-center justify-center xl:justify-start gap-4">
              <span
                className="text-gray-600 dark:text-white/60"
              >
                { translatedFieldName }:
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