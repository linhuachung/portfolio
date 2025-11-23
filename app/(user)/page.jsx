'use client';
import Photo from '@/components/Photo';
import Social from '@/components/Social';
import Stats from '@/components/Stats';
import { Button } from '@/components/ui/button';
import { trackCvDownload } from '@/lib/analytics';
import { FiDownload } from 'react-icons/fi';

function Home() {
  const handleClick = async () => {
    try {
      await trackCvDownload();
      await new Promise( resolve => setTimeout( resolve, 100 ) );
    } catch ( error ) {
      console.error( 'Failed to track CV download:', error );
    }

    const link = document.createElement( 'a' );
    link.href = '/assets/resume/CV_Frontend_LinHuaChung.pdf';
    link.download = 'CV_FrontendDeveloper_Lin_Hua_Chung.pdf';
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
  };
  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div
          className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Frontend Developer</span>
            <h1 className="h1">
                            Hello I&apos;m <br/> <span className="text-accent-light dark:text-accent">Hua Chung</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-gray-700 dark:text-white/80">
                            A passionate Frontend Developer with 3+ years of experience crafting high-performance web applications for international markets.
              <br/><br/>
                            Specialized in ReactJS, NextJS, and modern JavaScript frameworks, I focus on building scalable, responsive applications with seamless API integration and optimal user experiences.
              <br/><br/>
                            Currently working at NAB Innovation Centre Vietnam, I bring expertise in component-based architecture, performance optimization, and cross-functional team collaboration to deliver innovative digital solutions.
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
                onClick={ handleClick }
              >
                <span>Download CV</span>
                <FiDownload className="text-xl"/>
              </Button>
              <div className="mb-8 xl:mb-0 ">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent-light dark:border-accent rounded-full flex justify-center items-center text-accent-light dark:text-accent text-base hover:bg-accent-light dark:hover:bg-accent hover:text-white dark:hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo/>
          </div>
        </div>
      </div>
      <Stats/>
    </section>
  );
}

export default Home;