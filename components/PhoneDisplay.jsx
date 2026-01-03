'use client';

import { formatPhoneForDisplayWithCountry, generateTelLink, parsePhoneNumber } from '@/lib/phone-utils';
import { FaPhoneAlt } from 'react-icons/fa';

export function PhoneDisplay( { phone, className = '', showIcon = true, iconClassName = '' } ) {
  if ( !phone ) {
    return null;
  }

  const { phoneNumber } = parsePhoneNumber( phone );

  if ( !phoneNumber || !phoneNumber.trim() ) {
    return null;
  }

  const displayPhone = formatPhoneForDisplayWithCountry( phone );
  const telLink = generateTelLink( phone );

  return (
    <div className={ `flex items-center gap-6 ${className}` }>
      { showIcon && (
        <div
          className={ `w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#f0f0f0] dark:bg-secondary text-accent-light dark:text-accent rounded-md flex items-center justify-center ${iconClassName}` }
        >
          <div className="text-[28px]">
            <FaPhoneAlt/>
          </div>
        </div>
      ) }
      <div className="flex-1">
        <p className="text-gray-600 dark:text-white/60">Phone</p>
        <a
          href={ telLink }
          className="text-lg text-gray-900 dark:text-white hover:text-accent-light dark:hover:text-accent transition-all duration-300"
        >
          { displayPhone }
        </a>
      </div>
    </div>
  );
}

