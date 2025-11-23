'use client';

import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa';
import FormContainer from '@/app/(user)/contact/components/FormContainer';
import MotionWrapper from '@/components/MotionWrapper';

const info = [
  {
    icon: <FaPhoneAlt/>,
    title: 'Phone',
    description: '(+84) 849966 277'
  },
  {
    icon: <FaEnvelope/>,
    title: 'Email',
    description: 'chunglh1304@gmail.com'
  },
  {
    icon: <FaMapMarkedAlt/>,
    title: 'Address',
    description: 'Ho Chi Minh City',
    link: 'https://maps.app.goo.gl/tLqFHdNkU8eeYoXx6'
  }
];

function Contact() {
  const renderFieldValueInfo = ( item ) => {
    switch ( item.title ) {
      case 'Phone':
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-secondary text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-white/60">{ item.title }</p>
              <a className="text-lg hover:text-accent transition-all duration-300"
                href={ `tel:${item.description}` }>
                { item.description }
              </a>
            </div>
          </li>
        );
      case 'Email':
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-secondary text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-white/60">{ item.title }</p>
              <a href={ `mailto:${item.description}` }
                className="text-lg hover:text-accent transition-all duration-300">
                { item.description }
              </a>
            </div>
          </li>
        );
      case 'Address':
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-secondary text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-white/60">{ item.title }</p>
              <a href={ item.link } target="_blank"
                className="text-lg hover:text-accent transition-all duration-300">
                { item.description }
              </a>
            </div>
          </li>
        );
      default:
        return (
          <li className="flex items-center gap-6" key={ item.title }>
            <div
              className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-secondary text-accent rounded-md flex items-center justify-center">
              <div className="text-[28px]">{ item.icon }</div>
            </div>
            <div className="flex-1">
              <p className="text-white/60">{ item.title }</p>
              <p className="text-lg">{ item.description }</p>
            </div>
          </li>
        );
    }
  };
  return (
    <MotionWrapper
      className="py-6"
    >
      <div className="container mxauto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xlw-[54%] order-2 xl:order-none">
            <FormContainer/>
          </div>
          <div
            className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              { info.map( ( item ) => renderFieldValueInfo( item ) ) }
            </ul>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}

export default Contact;