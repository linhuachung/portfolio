'use client';

import { useEffect, useState } from 'react';

// One request per page load, shared by the header and the identity blocks.
let avatarRequest = null;

const loadAvatar = () => {
  avatarRequest ??= fetch( '/api/user/profile', { headers: { Accept: 'application/json' } } )
    .then( response => ( response.ok ? response.json() : null ) )
    .then( payload => payload?.data?.avatar || '' )
    .catch( () => {
      avatarRequest = null;
      return '';
    } );
  return avatarRequest;
};

/** The owner's avatar URL uploaded in admin, or '' until it loads or when there is none. */
export default function useProfileAvatar() {
  const [avatar, setAvatar] = useState( '' );

  useEffect( () => {
    let active = true;
    loadAvatar().then( url => { if ( active ) {setAvatar( url );} } );
    return () => {active = false;};
  }, [] );

  return avatar;
}
