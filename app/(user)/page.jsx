'use client';
import Loader from '@/components/Loader';
import Photo from '@/components/Photo';
import Social from '@/components/Social';
import Stats from '@/components/Stats';
import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { CV_CONSTANTS, CV_MESSAGES } from '@/constants/cv-messages';
import { TOAST_STATUS } from '@/constants/toast';
import { trackCvDownload } from '@/lib/analytics';
import { getCleanCvFileName, validateCvPath } from '@/lib/cv-utils';
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

  const downloadCvFile = async ( cvPath ) => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout( () => controller.abort(), CV_CONSTANTS.DOWNLOAD_TIMEOUT_MS );

      const res = await fetch( cvPath, {
        cache: 'no-store',
        signal: controller.signal
      } );

      clearTimeout( timeoutId );

      if ( !res.ok ) {
        throw new Error( `Failed to fetch CV file: ${res.status} ${res.statusText}` );
      }

      const blob = await res.blob();
      const cleanFileName = getCleanCvFileName( cvPath );

      const link = document.createElement( 'a' );
      link.href = URL.createObjectURL( blob );
      link.download = cleanFileName;
      document.body.appendChild( link );
      link.click();

      // Cleanup after a delay to ensure download starts
      setTimeout( () => {
        document.body.removeChild( link );
        URL.revokeObjectURL( link.href );
      }, CV_CONSTANTS.DOWNLOAD_DELAY_MS );
    } catch ( error ) {
      if ( error.name === 'AbortError' ) {
        throw new Error( CV_MESSAGES.DOWNLOAD_TIMEOUT );
      }
      throw error;
    }
  };

  const handleClick = async () => {
    try {
      await trackCvDownload();
      await new Promise( resolve => setTimeout( resolve, CV_CONSTANTS.TRACKING_DELAY_MS ) );
    } catch ( error ) {
      console.error( 'Failed to track CV download:', error );
    }

    const cvPath = profileData?.cvPath;
    const validation = validateCvPath( cvPath );

    if ( !validation.valid ) {
      Toast( {
        title: validation.error,
        type: TOAST_STATUS.error
      } );
      return;
    }

    try {
      await downloadCvFile( cvPath );
      Toast( {
        title: CV_MESSAGES.DOWNLOAD_SUCCESS,
        type: TOAST_STATUS.success
      } );
    } catch ( error ) {
      console.error( 'Failed to download CV:', error );
      Toast( {
        title: error.message || CV_MESSAGES.DOWNLOAD_FAILED,
        type: TOAST_STATUS.error
      } );
    }
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
