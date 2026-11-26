export function cloneProfileData( profile = {} ) {
  return {
    ...profile,
    socialLinks: Array.isArray( profile.socialLinks )
      ? profile.socialLinks.map( link => ( { ...link } ) )
      : []
  };
}
