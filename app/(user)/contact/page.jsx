'use client';

import FormContainer from '@/app/(user)/contact/components/FormContainer';
import MotionWrapper from '@/components/MotionWrapper';
import { PhoneDisplay } from '@/components/PhoneDisplay';
import { formatAddress } from '@/lib/address-utils';
import { FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';

function Contact() {
  const [contactInfo, setContactInfo] = useState( {
    phone: '',
    email: '',
    address: ''
  } );

  useEffect( () => {
    const fetchContactInfo = async () => {
      try {
        const response = await fetch( '/api/user/profile?includeContact=true', {
          cache: 'no-store'
        } );
        const result = await response.json();

        if ( result && result.status === 200 && result.data ) {
          const userData = result.data;
          const addressData = {
            address: userData.address,
            addressCity: userData.addressCity,
            addressCountry: userData.addressCountry
          };
          const formattedAddress = formatAddress( addressData );

          setContactInfo( {
            phone: userData.phone || '',
            email: userData.email || '',
            address: formattedAddress
          } );
        }
      } catch ( error ) {
        console.error( 'Failed to fetch contact info:', error );
      }
    };

    fetchContactInfo();
  }, [] );

  const info = [
    {
      icon: <FaEnvelope/>,
      title: 'Email',
      description: contactInfo.email || 'chunglh1304@gmail.com',
      link: contactInfo.email ? `mailto:${contactInfo.email}` : 'mailto:chunglh1304@gmail.com'
    },
    {
      icon: <FaMapMarkedAlt/>,
      title: 'Address',
      description: contactInfo.address || 'Ho Chi Minh City',
      link: 'https://maps.app.goo.gl/tLqFHdNkU8eeYoXx6'
    }
  ];
  const renderFieldValueInfo = ( item ) => {
    switch ( item.title ) {
      case 'Email':
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#f0f0f0] dark:bg-secondary text-accent-light dark:text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-white/60">{ item.title }</p>
              <a href={ `mailto:${item.description}` }
                className="text-lg text-gray-900 dark:text-white hover:text-accent transition-all duration-300">
                { item.description }
              </a>
            </div>
          </li>
        );
      case 'Address':
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#f0f0f0] dark:bg-secondary text-accent-light dark:text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-white/60">{ item.title }</p>
              <a href={ item.link } target="_blank"
                className="text-lg text-gray-900 dark:text-white hover:text-accent transition-all duration-300">
                { item.description }
              </a>
            </div>
          </li>
        );
      default:
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#f0f0f0] dark:bg-secondary text-accent-light dark:text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-white/60">{ item.title }</p>
              <p className="text-lg text-gray-900 dark:text-white">{ item.description }</p>
            </div>
          </li>
        );
    }
  };
  return (
    <MotionWrapper
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <FormContainer/>
          </div>
          <div
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              { contactInfo.phone && (
                <li>
                  <PhoneDisplay phone={ contactInfo.phone } />
                </li>
              ) }
              { info.map( ( item ) => renderFieldValueInfo( item ) ) }
            </ul>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}

export default Contact;