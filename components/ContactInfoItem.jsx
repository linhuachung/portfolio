'use client';

function ContactInfoItem( { icon, title, description, link } ) {
  const iconContainerClass = 'w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#f0f0f0] dark:bg-secondary text-accent-light dark:text-accent rounded-md flex items-center justify-center';
  const textClass = 'text-lg text-gray-900 dark:text-white hover:text-accent transition-all duration-300';
  const titleClass = 'text-gray-600 dark:text-white/60';

  if ( title === 'Email' && link ) {
    return (
      <li className="flex items-center gap-6">
        <div className={ iconContainerClass }>
          <div className="text-[28px]">{ icon }</div>
        </div>
        <div className="flex-1">
          <p className={ titleClass }>{ title }</p>
          <a href={ `mailto:${description}` } className={ textClass }>
            { description }
          </a>
        </div>
      </li>
    );
  }

  if ( title === 'Address' && link ) {
    return (
      <li className="flex items-center gap-6">
        <div className={ iconContainerClass }>
          <div className="text-[28px]">{ icon }</div>
        </div>
        <div className="flex-1">
          <p className={ titleClass }>{ title }</p>
          <a href={ link } target="_blank" rel="noopener noreferrer" className={ textClass }>
            { description }
          </a>
        </div>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-6">
      <div className={ iconContainerClass }>
        <div className="text-[28px]">{ icon }</div>
      </div>
      <div className="flex-1">
        <p className={ titleClass }>{ title }</p>
        <p className={ textClass }>{ description }</p>
      </div>
    </li>
  );
}

export default ContactInfoItem;
