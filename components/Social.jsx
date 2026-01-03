import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedinIn, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  website: FaGlobe
};

function Social( { socialLinks = [], containerStyles, iconStyles } ) {
  // If no socialLinks provided, use default
  const defaultSocials = [
    { type: 'github', url: 'https://github.com/linhuachung' },
    { type: 'linkedin', url: 'https://www.linkedin.com/in/lin-hua-chung-200158179/' },
    { type: 'facebook', url: '' }
  ];

  const socials = socialLinks.length > 0
    ? socialLinks.filter( link => link.url && link.url.trim() !== '' )
    : defaultSocials;

  return (
    <div className={ containerStyles }>
      { socials.map( ( social, index ) => {
        const IconComponent = iconMap[social.type] || FaGlobe;
        if ( !social.url || social.url.trim() === '' ) {
          return null;
        }

        return (
          <Link
            key={ index }
            href={ social.url }
            className={ iconStyles }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconComponent/>
          </Link>
        );
      } ) }
    </div>
  );
}

export default Social;