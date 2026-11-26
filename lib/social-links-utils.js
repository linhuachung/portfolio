import { DEFAULT_SOCIAL_LINKS } from '../app/(admin)/admin/user/constants.js';

/**
 * Merge social links with default links
 * @param {Array} existingLinks - Existing social links from database
 * @param {Array} defaultLinks - Default social links template
 * @returns {Array} - Merged social links
 */
export function mergeSocialLinks( existingLinks = [], defaultLinks = DEFAULT_SOCIAL_LINKS ) {
  const defaultTypes = new Set( defaultLinks.map( link => link.type ) );
  const mergedDefaults = defaultLinks.map( ( defaultLink ) => {
    const existingLink = existingLinks.find( link => link.type === defaultLink.type );
    return existingLink ? { ...existingLink } : { ...defaultLink };
  } );
  const additionalLinks = existingLinks
    .filter( link => link?.type && !defaultTypes.has( link.type ) )
    .map( link => ( { ...link } ) );

  return [...mergedDefaults, ...additionalLinks];
}

/**
 * Prepare social links for database insertion
 * @param {Array} socialLinks - Social links array
 * @param {string} userId - User ID
 * @returns {Array} - Prepared social links data
 */
export function prepareSocialLinksForDB( socialLinks, userId ) {
  if ( !socialLinks || !Array.isArray( socialLinks ) ) {
    return [];
  }

  return socialLinks
    .filter( link => link && link.url && link.url.trim() !== '' )
    .map( ( link, index ) => ( {
      userId,
      type: link.type,
      url: link.url.trim(),
      order: link.order !== undefined ? link.order : index
    } ) );
}

