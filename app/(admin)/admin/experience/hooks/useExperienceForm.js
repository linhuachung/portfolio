import Toast from '@/components/Toast';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import { TOAST_STATUS } from '@/constants/toast';
import { formatExperienceForForm } from '@/lib/experience-utils';
import axiosInstance from '@/lib/axios';
import { validationExperienceSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export function useExperienceForm( experienceId = null ) {
  const [loading, setLoading] = useState( !!experienceId );
  const [originalData, setOriginalData] = useState( null );

  const form = useForm( {
    resolver: yupResolver( validationExperienceSchema ),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      companyLogoType: 'link',
      companyLogo: '',
      companyWebsite: '',
      techStack: []
    }
  } );

  const {
    setValue,
    setError,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = form;

  const isCurrent = watch( 'isCurrent' );

  useEffect( () => {
    if ( isCurrent ) {
      setValue( 'endDate', '', { shouldValidate: false } );
    }
  }, [isCurrent, setValue] );

  useEffect( () => {
    if ( !experienceId ) {
      setLoading( false );
      return;
    }

    const fetchExperience = async () => {
      try {
        setLoading( true );
        const response = await axiosInstance.get( `${ADMIN_ENDPOINT.EXPERIENCE}/${experienceId}` );

        if ( response && response.status === 200 && response.data ) {
          const experienceData = formatExperienceForForm( response.data );
          setOriginalData( experienceData );
          reset( experienceData );
        }
      } catch ( error ) {
        if ( error.response?.status === 401 || error.response?.data?.status === 401 ) {
          if ( typeof window !== 'undefined' ) {
            Cookies.remove( 'token' );
            Cookies.remove( 'refreshToken' );
            window.location.href = '/admin/login';
            return;
          }
        }

        Toast( {
          title: error.response?.data?.message || 'Failed to load experience',
          type: TOAST_STATUS.error
        } );
      } finally {
        setLoading( false );
      }
    };

    fetchExperience();
  }, [experienceId] );

  const onSubmit = async ( data ) => {
    try {
      let response;
      if ( experienceId ) {
        response = await axiosInstance.put( `${ADMIN_ENDPOINT.EXPERIENCE}/${experienceId}`, data );
      } else {
        response = await axiosInstance.post( ADMIN_ENDPOINT.EXPERIENCE, data );
      }

      if ( response && response.status === 200 ) {
        Toast( {
          title: experienceId ? 'Experience updated successfully!' : 'Experience created successfully!',
          type: TOAST_STATUS.success
        } );

        setOriginalData( data );
        return response.data;
      } else {
        Toast( {
          title: 'Unexpected response from server',
          type: TOAST_STATUS.error
        } );
      }
    } catch ( error ) {
      const errorMessage = error.response?.data?.message || ( experienceId ? 'Failed to update experience' : 'Failed to create experience' );
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
      throw error;
    }
  };

  const handleCancel = () => {
    if ( originalData ) {
      reset( originalData );
    } else {
      reset( {
        company: '',
        position: '',
        description: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        location: '',
        companyLogoType: 'link',
        companyLogo: '',
        companyWebsite: '',
        techStack: []
      } );
    }
  };

  const refetchExperience = async () => {
    if ( !experienceId ) {
      return;
    }

    try {
      setLoading( true );
      const response = await axiosInstance.get( `${ADMIN_ENDPOINT.EXPERIENCE}/${experienceId}` );

      if ( response && response.status === 200 && response.data ) {
        const experienceData = formatExperienceForForm( response.data );
        setOriginalData( experienceData );
        reset( experienceData );
        return experienceData;
      }
    } catch ( error ) {
      if ( error.response?.status === 401 || error.response?.data?.status === 401 ) {
        if ( typeof window !== 'undefined' ) {
          Cookies.remove( 'token' );
          Cookies.remove( 'refreshToken' );
          window.location.href = '/admin/login';
          return;
        }
      }

      Toast( {
        title: error.response?.data?.message || 'Failed to load experience',
        type: TOAST_STATUS.error
      } );
    } finally {
      setLoading( false );
    }
  };

  return {
    form,
    loading,
    control,
    watch,
    setValue,
    setError,
    errors,
    isSubmitting,
    onSubmit,
    originalData,
    handleCancel,
    refetchExperience
  };
}

