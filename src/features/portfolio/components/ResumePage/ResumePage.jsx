'use client';

import { Suspense } from 'react';
import { ResumeScreen } from '../../styles/Resume.styles';
import ResumeContentView from '../ResumeContentView';

export default function ResumePage() {
  return <Suspense fallback={ <ResumeScreen/> }><ResumeContentView/></Suspense>;
}
