'use client';

import MuiLink from '@mui/material/Link';
import { profile } from '@/content/public-content';
import { trackCvDownload } from '@/features/analytics/api/tracking';

/**
 * Opens the CV and records it for the admin audience overview (one counter for both forms).
 * `download` links the PDF uploaded in admin; otherwise the online view at /cv (Google Drive).
 * `as` lets client pages pass a styled link. Server pages wrap it with `styled( ResumeLink )`
 * instead, so remaining props (the generated class) are forwarded to the link.
 */
export default function ResumeLink( { as: LinkComponent = MuiLink, download = false, children, ...linkProps } ) {
  return (
    <LinkComponent
      { ...linkProps }
      href={ download ? profile.resumeDownload : profile.resume }
      target="_blank"
      rel="noreferrer"
      onClick={ () => trackCvDownload() }
    >
      { children }
    </LinkComponent>
  );
}
