'use client';

function ResumeSectionHeader( { title, description, className = '' } ) {
  return (
    <div className={ `flex flex-col gap-[30px] text-center xl:text-left ${className}` }>
      <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{ title }</h3>
      { description && (
        <p className="max-w-[600px] text-gray-700 dark:text-white/60 mx-auto xl:mx-0">
          { description }
        </p>
      ) }
    </div>
  );
}

export default ResumeSectionHeader;
