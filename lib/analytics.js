"use client";

const SESSION_KEY = "portfolio_session_id";
const LAST_VISIT_KEY = "portfolio_last_visit";

const getSessionId = () => {
  if ( typeof window === "undefined" ) return null;

  let sessionId = sessionStorage.getItem( SESSION_KEY );
  if ( !sessionId ) {
    sessionId = `session_${Date.now()}_${Math.random().toString( 36 ).substr( 2, 9 )}`;
    sessionStorage.setItem( SESSION_KEY, sessionId );
  }
  return sessionId;
};

const shouldTrackVisit = ( path ) => {
  if ( typeof window === "undefined" ) return false;

  const lastVisit = sessionStorage.getItem( LAST_VISIT_KEY );
  const currentPath = path || window.location.pathname;

  if ( lastVisit !== currentPath ) {
    sessionStorage.setItem( LAST_VISIT_KEY, currentPath );
    return true;
  }
  return false;
};

export const trackVisit = async ( path ) => {
  if ( typeof window === "undefined" ) return;

  if ( !shouldTrackVisit( path ) ) return;

  try {
    const trackingData = {
      path: path || window.location.pathname,
      userAgent: navigator.userAgent || null,
      referer: document.referrer || null,
      sessionId: getSessionId(),
      timestamp: new Date().toISOString()
    };

    if ( navigator.sendBeacon ) {
      const blob = new Blob( [JSON.stringify( trackingData )], {
        type: "application/json"
      } );
      navigator.sendBeacon( "/api/admin/analytics/visit", blob );
    } else {
      await fetch( "/api/admin/analytics/visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( trackingData ),
        keepalive: true
      } );
    }
  } catch ( error ) {
  }
};

export const trackCvDownload = async () => {
  if ( typeof window === "undefined" ) return;

  const trackingData = {
    userAgent: navigator.userAgent || null,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch( "/api/admin/analytics/cv-download", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify( trackingData ),
      keepalive: true
    } );

    if ( !response.ok ) {
      throw new Error( `HTTP error! status: ${response.status}` );
    }
  } catch ( error ) {
  }
};