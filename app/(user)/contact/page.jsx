'use client';

import FormContainer from '@/app/(user)/contact/components/FormContainer';
import MotionWrapper from '@/components/MotionWrapper';
import { PhoneDisplay } from '@/components/PhoneDisplay';
import ContactInfoItem from '@/components/ContactInfoItem';
import { fetchContactInfo, formatContactInfoForDisplay } from '@/lib/contact-utils';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

function Contact() {
  const t = useTranslations( 'contact.info' );
  const [contactInfo, setContactInfo] = useState( {
    phone: '',
    email: '',
    address: ''
  } );

  useEffect( () => {
    const loadContactInfo = async () => {
      const info = await fetchContactInfo( true );
      setContactInfo( info );
    };

    loadContactInfo();
  }, [] );

  const formattedContactInfo = formatContactInfoForDisplay( contactInfo );

  const info = [
    {
      icon: <FaEnvelope/>,
      title: t( 'email' ),
      description: formattedContactInfo.email,
      link: formattedContactInfo.emailLink
    },
    {
      icon: <FaMapMarkedAlt/>,
      title: t( 'address' ),
      description: formattedContactInfo.address,
      link: formattedContactInfo.addressLink
    }
  ].filter( item => item.description );
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
              { info.map( ( item ) => (
                <ContactInfoItem
                  key={ item.title }
                  icon={ item.icon }
                  title={ item.title }
                  description={ item.description }
                  link={ item.link }
                />
              ) ) }
            </ul>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}

export default Contact;