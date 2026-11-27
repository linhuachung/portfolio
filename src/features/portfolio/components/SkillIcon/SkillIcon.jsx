'use client';

import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import { brandIcons } from './brand-icons';

const icons = {
  ...brandIcons,
  'Responsive UI': DevicesOutlinedIcon,
  Accessibility: AccessibilityNewOutlinedIcon,
  'REST APIs': HubOutlinedIcon
};

/** Decorative MUI icon for a skill name; renders nothing for an unknown skill. */
export default function SkillIcon( { name, ...props } ) {
  const Icon = icons[name];
  return Icon ? <Icon aria-hidden="true" focusable="false" fontSize="inherit" { ...props }/> : null;
}
