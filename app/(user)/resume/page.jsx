'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Experience from '@/app/(user)/resume/Tabs/experience';
import Education from '@/app/(user)/resume/Tabs/education';
import Skills from '@/app/(user)/resume/Tabs/skills';
import About from '@/app/(user)/resume/Tabs/about';
import MotionWrapper from '@/components/MotionWrapper';

function Resume() {


  return (
    <MotionWrapper
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>
          <div className="min-h-[700px] w-full">
            <TabsContent value="experience" className="w-full">
              <Experience/>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <Education/>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <Skills/>
            </TabsContent>
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <About/>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MotionWrapper>
  );
}

export default Resume;