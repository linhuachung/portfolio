'use client';

export function ExperienceView( { experience } ) {
  if ( !experience ) {
    return null;
  }

  const formatDate = ( dateString ) => {
    if ( !dateString ) {
      return '';
    }
    return new Date( dateString ).toLocaleDateString( 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    } );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Company</h3>
          <p className="text-base text-gray-900 dark:text-white">{ experience.company || '-' }</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Position</h3>
          <p className="text-base text-gray-900 dark:text-white">{ experience.position || '-' }</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Description</h3>
        <p className="text-base text-gray-900 dark:text-white whitespace-pre-wrap">{ experience.description || '-' }</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Start Date</h3>
          <p className="text-base text-gray-900 dark:text-white">{ formatDate( experience.startDate ) || '-' }</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">End Date</h3>
          <p className="text-base text-gray-900 dark:text-white">
            { experience.isCurrent ? 'Present' : ( formatDate( experience.endDate ) || '-' ) }
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Current Position</h3>
        <p className="text-base text-gray-900 dark:text-white">{ experience.isCurrent ? 'Yes' : 'No' }</p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Location</h3>
        <p className="text-base text-gray-900 dark:text-white">{ experience.location || '-' }</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Company Logo</h3>
          { experience.companyLogo ? (
            <a
              href={ experience.companyLogo }
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-accent-light dark:text-accent hover:underline break-words break-all"
            >
              { experience.companyLogo }
            </a>
          ) : (
            <p className="text-base text-gray-500 dark:text-gray-400">-</p>
          ) }
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Company Website</h3>
          { experience.companyWebsite ? (
            <a
              href={ experience.companyWebsite }
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-accent-light dark:text-accent hover:underline break-words break-all"
            >
              { experience.companyWebsite }
            </a>
          ) : (
            <p className="text-base text-gray-500 dark:text-gray-400">-</p>
          ) }
        </div>
      </div>

      { experience.techStack && experience.techStack.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            { experience.techStack.map( ( tech, index ) => (
              <span
                key={ index }
                className="px-3 py-1 bg-accent-light/10 dark:bg-accent/10 text-accent-light dark:text-accent rounded-md text-sm"
              >
                { tech }
              </span>
            ) ) }
          </div>
        </div>
      ) }
    </div>
  );
}

