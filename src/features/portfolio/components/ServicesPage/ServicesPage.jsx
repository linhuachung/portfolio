'use client';

import { Suspense } from 'react';
import { ServicesScreen } from '../../styles/Services.styles';
import ServicesContent from '../ServicesContent';

export default function ServicesPage() {
  return <Suspense fallback={ <ServicesScreen/> }><ServicesContent/></Suspense>;
}
