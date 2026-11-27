import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { profile } from '@/content/public-content';
import { SocialButton, SocialList } from './SocialLinks.styles';

const links = [
  { label: 'LinkedIn', href: profile.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'GitHub', href: profile.github, Icon: GitHubIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: EmailOutlinedIcon }
];

/**
 * LinkedIn, GitHub and email, each with its icon.
 * `variant`: "buttons" (outlined), "text" (inline links) or "icons" (icon-only, labelled for screen readers).
 * `exclude`: labels to leave out, e.g. ['Email'] where the address is already shown.
 */
export default function SocialLinks( { variant = 'buttons', exclude = [] } ) {
  return (
    <SocialList component="nav" aria-label="Professional links" data-variant={ variant }>
      { links.filter( link => !exclude.includes( link.label ) ).map( ( { label, href, Icon, external } ) => (
        <SocialButton
          key={ label }
          href={ href }
          aria-label={ variant === 'icons' ? label : undefined }
          { ...( external && { target: '_blank', rel: 'noreferrer' } ) }
        >
          <Icon aria-hidden="true" fontSize="inherit"/>
          { variant !== 'icons' && label }
          { variant === 'text' && external && <Box component="span" aria-hidden="true">↗</Box> }
        </SocialButton>
      ) ) }
    </SocialList>
  );
}
