'use client';

import MuiLink from '@mui/material/Link';
import { profile } from '@/content/public-content';
import { trackCvDownload } from '@/lib/analytics';

/**
 * Opens the public résumé and records the download for the admin audience overview.
 * `as` lets client pages pass a styled link; server pages use the default MUI link.
 */
export default function ResumeLink( { as: LinkComponent = MuiLink, children } ) {
  return (
    <LinkComponent href={ profile.resume } target="_blank" rel="noreferrer" onClick={ () => trackCvDownload() }>
      { children }
    </LinkComponent>
  );
}
