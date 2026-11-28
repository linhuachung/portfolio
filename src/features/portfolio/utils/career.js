// Career data for the résumé timeline. Roles show date ranges only: computed durations
// differ between counting conventions (LinkedIn counts the end month), so the page never
// prints them. Months are still used, inclusively, to size each role on the track.
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Short codes for the markets a project served, in the order the stats read them.
const MARKET_CODES = {
  Australia: 'AU',
  'United States and Canada': 'US/CA',
  Japan: 'JP',
  Vietnam: 'VN'
};

/** 'YYYY-MM' → months since year 0. */
export const toMonthIndex = value => {
  const [year, month] = value.split( '-' ).map( Number );
  return year * 12 + month - 1;
};

const dateToMonthIndex = date => date.getFullYear() * 12 + date.getMonth();

export const formatMonth = index => `${MONTH_LABELS[index % 12]} ${Math.floor( index / 12 )}`;

/** 'Feb 2023–Feb 2024' → '2023–2024'; 'Mar 2025–Present' → '2025–Now'; 'Mar 2024–Nov 2024' → '2024'. */
export const yearRange = period => {
  const [from, to] = period.split( '–' ).map( part => part.trim() );
  const start = from.slice( -4 );
  if ( !to || /present/i.test( to ) ) {return `${start}–Now`;}
  const end = to.slice( -4 );
  return start === end ? start : `${start}–${end}`;
};

/** Roles (from buildCareerTimeline) whose stack or projects list `skill`. */
export const skillRoles = ( skill, roles, projects ) => roles.filter( role => role.stack.includes( skill )
  || projects.some( project => project.experienceSlug === role.slug && project.technologies.includes( skill ) ) );

/**
 * Places each role on one career track. `share` is the role's fraction of the
 * whole career, used as its width on the timeline.
 */
export function buildCareerTimeline( experiences, projects, now = new Date() ) {
  const current = dateToMonthIndex( now );
  const roles = experiences.map( experience => {
    const startIndex = toMonthIndex( experience.start );
    const endIndex = experience.end ? toMonthIndex( experience.end ) : current;
    const roleProjects = projects.filter( project => project.experienceSlug === experience.slug );
    const startLabel = formatMonth( startIndex );
    const endLabel = experience.end ? formatMonth( endIndex ) : 'Present';
    return {
      ...experience,
      months: endIndex - startIndex + 1,
      isCurrent: !experience.end,
      startLabel,
      endLabel,
      years: yearRange( `${startLabel}–${endLabel}` ),
      projectCount: roleProjects.length,
      projectTitles: roleProjects.map( project => project.title ),
      markets: [...new Set( roleProjects.map( project => project.market ) )],
      domains: [...new Set( roleProjects.map( project => project.domain ) )]
    };
  } );

  const firstMonth = Math.min( ...roles.map( role => toMonthIndex( role.start ) ) );
  const trackMonths = roles.reduce( ( sum, role ) => sum + role.months, 0 );
  const markets = new Set( projects.map( project => project.market ) );

  return {
    roles: roles.map( role => ( { ...role, share: role.months / trackMonths } ) ),
    totalYears: Math.floor( ( current - firstMonth ) / 12 ),
    startLabel: formatMonth( firstMonth ),
    companyCount: roles.length,
    projectCount: projects.length,
    marketCount: markets.size,
    marketCodes: Object.keys( MARKET_CODES ).filter( market => markets.has( market ) ).map( market => MARKET_CODES[market] )
  };
}
