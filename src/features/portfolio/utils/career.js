// Tenure maths for the resume timeline. Months are counted inclusively, so a
// role from Sep 2021 to Jan 2022 is five months, as a résumé reader counts it.
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM' → months since year 0. */
export const toMonthIndex = value => {
  const [year, month] = value.split( '-' ).map( Number );
  return year * 12 + month - 1;
};

const dateToMonthIndex = date => date.getFullYear() * 12 + date.getMonth();

export const formatMonth = index => `${MONTH_LABELS[index % 12]} ${Math.floor( index / 12 )}`;

/** 17 → '1 yr 5 mos'; 5 → '5 mos'; 24 → '2 yrs'. */
export const formatDuration = months => {
  const years = Math.floor( months / 12 );
  const rest = months % 12;
  const parts = [];
  if ( years ) {parts.push( `${years} ${years === 1 ? 'yr' : 'yrs'}` );}
  if ( rest || !years ) {parts.push( `${rest} ${rest === 1 ? 'mo' : 'mos'}` );}
  return parts.join( ' ' );
};

/** 25 → '2y 1m'; 5 → '5m' — for the narrow horizontal track. */
export const formatShortDuration = months => {
  const years = Math.floor( months / 12 );
  const rest = months % 12;
  return [years && `${years}y`, ( rest || !years ) && `${rest}m`].filter( Boolean ).join( ' ' );
};

/** 'Feb 2023–Feb 2024' → '2023–24'; 'Mar 2025–Present' → '2025–Now'; 'Oct 2021–Jan 2022' → '2021–22'. */
export const shortYears = period => {
  const [from, to] = period.split( '–' ).map( part => part.trim() );
  const start = from.slice( -4 );
  if ( !to || /present/i.test( to ) ) {return `${start}–Now`;}
  const end = to.slice( -4 );
  return start === end ? start : `${start}–${end.slice( 2 )}`;
};

/**
 * Roles (from buildCareerTimeline) whose stack or projects list `skill`, plus the months
 * spent in those roles. It measures time in roles that used the skill, not a proficiency score.
 */
export const skillUsage = ( skill, roles, projects ) => {
  const used = roles.filter( role => role.stack.includes( skill )
    || projects.some( project => project.experienceSlug === role.slug && project.technologies.includes( skill ) ) );
  return { roles: used, months: used.reduce( ( sum, role ) => sum + role.months, 0 ) };
};

/** 59 → '4+ yrs'; 13 → '1+ yr'; 5 → '5 mos'. Floors, so it never overstates. */
export const formatYearsUsed = months => {
  if ( months < 12 ) {return `${months} ${months === 1 ? 'mo' : 'mos'}`;}
  const years = Math.floor( months / 12 );
  return `${years}+ ${years === 1 ? 'yr' : 'yrs'}`;
};

/**
 * Places each role on one career track. `share` is the role's fraction of the
 * whole career, used as its width on the timeline.
 */
export function buildCareerTimeline( experiences, projects, now = new Date() ) {
  const current = dateToMonthIndex( now );
  const roles = experiences.map( experience => {
    const startIndex = toMonthIndex( experience.start );
    const endIndex = experience.end ? toMonthIndex( experience.end ) : current;
    const months = endIndex - startIndex + 1;
    const roleProjects = projects.filter( project => project.experienceSlug === experience.slug );
    return {
      ...experience,
      months,
      duration: formatDuration( months ),
      shortDuration: formatShortDuration( months ),
      isCurrent: !experience.end,
      startLabel: formatMonth( startIndex ),
      endLabel: experience.end ? formatMonth( endIndex ) : 'Present',
      projectCount: roleProjects.length,
      projectTitles: roleProjects.map( project => project.title ),
      markets: [...new Set( roleProjects.map( project => project.market ) )],
      domains: [...new Set( roleProjects.map( project => project.domain ) )]
    };
  } );

  const firstMonth = Math.min( ...roles.map( role => toMonthIndex( role.start ) ) );
  const totalMonths = current - firstMonth + 1;
  const trackMonths = roles.reduce( ( sum, role ) => sum + role.months, 0 );

  return {
    roles: roles.map( role => ( { ...role, share: role.months / trackMonths } ) ),
    totalMonths,
    totalDuration: formatDuration( totalMonths ),
    totalYears: Math.floor( totalMonths / 12 ),
    startLabel: formatMonth( firstMonth ),
    companyCount: roles.length,
    projectCount: projects.length,
    marketCount: new Set( projects.map( project => project.market ) ).size
  };
}
