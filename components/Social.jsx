import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub/>, path: 'https://github.com/linhuachung' },
  { icon: <FaLinkedinIn/>, path: 'https://www.linkedin.com/in/lin-hua-chung-200158179/' },
  { icon: <FaFacebook/>, path: '' }
];

function Social( { containerStyles, iconStyles } ) {
  return (
    <div className={ containerStyles }>
      { socials.map( ( social, index ) => {
        return (
          <Link
            key={ index }
            href={ social.path }
            className={ iconStyles }
            target="_blank"
          >
            { social.icon }
          </Link>
        );
      } ) }
    </div>
  );
}

export default Social;