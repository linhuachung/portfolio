'use client';
import Loader from '@/components/Loader';
import Photo from '@/components/Photo';
import Social from '@/components/Social';
import Stats from '@/components/Stats';
import { Button } from '@/components/ui/button';
import { removeFileNamePrefix } from '@/constants/file-upload';
import { trackCvDownload } from '@/lib/analytics';
import { useEffect, useState } from 'react';
import { FiDownload } from 'react-icons/fi';

function Home() {
  const [profileData, setProfileData] = useState( null );
  const [loading, setLoading] = useState( true );

  const fetchProfile = async () => {
    try {
      const response = await fetch( '/api/user/profile', {
        cache: 'no-store' // Ensure fresh data
      } );
      const result = await response.json();

      if ( result && result.status === 200 && result.data ) {
        setProfileData( result.data );
      } else {
        setProfileData( null );
      }
    } catch ( error ) {
      console.error( 'Failed to fetch profile:', error );
      setProfileData( null );
    } finally {
      setLoading( false );
    }
  };

  useEffect( () => {
    fetchProfile();

    // Refresh data when window gains focus (user comes back to tab)
    const handleFocus = () => {
      fetchProfile();
    };

    window.addEventListener( 'focus', handleFocus );

    return () => {
      window.removeEventListener( 'focus', handleFocus );
    };
  }, [] );

  const handleClick = async () => {
    try {
      await trackCvDownload();
      await new Promise( resolve => setTimeout( resolve, 100 ) );
    } catch ( error ) {
      console.error( 'Failed to track CV download:', error );
    }

    // Use CV path from database (uploaded CV)
    const cvPath = profileData?.cvPath;
    if ( !cvPath ) {
      console.error( 'CV path not available' );
      return;
    }

    // Extract filename and remove CV_timestamp_ prefix if exists
    const fileName = cvPath.split( '/' ).pop() || 'CV.pdf';
    const cleanFileName = removeFileNamePrefix( fileName, 'CV' ) || 'CV.pdf';

    const link = document.createElement( 'a' );
    link.href = cvPath;
    link.download = cleanFileName;
    document.body.appendChild( link );
    link.click();
    document.body.removeChild( link );
  };

  if ( loading ) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <Loader type="ClipLoader" color="#00ff99" size={ 50 } />
      </div>
    );
  }

  if ( !profileData ) {
    return (
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">No profile data available</p>
        </div>
      </div>
    );
  }

  const displayName = profileData.name;
  const title = profileData.title;
  const greeting = profileData.greeting;
  const bioParagraph = profileData.bioParagraph || '';
  const socialLinks = profileData.socialLinks || [];

  return (
    <section className="h-full">
      <div className="container mx-auto h-full">
        <div
          className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">{ title }</span>
            <h1 className="h1">
              { greeting } <br/> <span className="text-accent-light dark:text-accent">{ displayName }</span>
            </h1>
            <div
              className="mb-9 text-gray-700 dark:text-white/80 prose prose-sm dark:prose-invert max-w-[500px]"
              dangerouslySetInnerHTML={ { __html: bioParagraph } }
            />
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
                  socialLinks={ socialLinks }
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent-light dark:border-accent rounded-full flex justify-center items-center text-accent-light dark:text-accent text-base hover:bg-accent-light dark:hover:bg-accent hover:text-white dark:hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo avatar={ profileData?.avatar }/>
          </div>
        </div>
      </div>
      <Stats stats={ profileData?.stats }/>
    </section>
  );
}

export default Home;
