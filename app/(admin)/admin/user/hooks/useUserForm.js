import Toast from '@/components/Toast';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import { mergeSocialLinks } from '@/lib/social-links-utils';
import { validationEditProfileSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEFAULT_FORM_VALUES } from '../constants';
import { cloneProfileData } from '../profile-data';

export function useUserForm() {
  const [loading, setLoading] = useState( true );
  const [originalData, setOriginalData] = useState( null );
  const [loadError, setLoadError] = useState( '' );

  const form = useForm( {
    resolver: yupResolver( validationEditProfileSchema ),
    mode: 'onChange',
    reValidateMode: 'onChange'
  } );

  const {
    setValue,
    setError,
    clearErrors,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = form;

  useEffect( () => {
    const fetchUserData = async () => {
      try {
        setLoading( true );
        setLoadError( '' );
        const response = await axiosInstance.get( ADMIN_ENDPOINT.USER );

        if ( response && response.status === 200 && response.data ) {
          const userData = response.data;

          const formData = {
            email: userData.email || '',
            name: userData.name || '',
            avatar: userData.avatar || '',
            bio: userData.bio || '',
            phone: userData.phone || '',
            title: userData.title || DEFAULT_FORM_VALUES.title,
            greeting: userData.greeting || DEFAULT_FORM_VALUES.greeting,
            bioParagraph: userData.bioParagraph || '',
            cvPath: userData.cvPath || '',
            addressCountry: userData.addressCountry || '',
            addressCity: userData.addressCity || '',
            address: userData.address || '',
            socialLinks: mergeSocialLinks( userData.socialLinks )
          };

          setOriginalData( cloneProfileData( formData ) );
          reset( cloneProfileData( formData ) );
        }
      } catch ( error ) {
        if ( error.response?.status === 401 || error.response?.data?.status === 401 ) {
          if ( typeof window !== 'undefined' ) {
            window.location.href = '/admin/login';
            return;
          }
        }

        Toast( {
          title: error.response?.data?.message || 'Failed to load user data',
          type: TOAST_STATUS.error
        } );
        setLoadError( 'The database profile is temporarily unavailable. Public pages are still using their local content fallback.' );
      } finally {
        setLoading( false );
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const onSubmit = async ( data ) => {
    try {
      const response = await axiosInstance.put( ADMIN_ENDPOINT.USER, data );

      if ( response && response.status === 200 ) {
        Toast( {
          title: 'Profile updated successfully!',
          type: TOAST_STATUS.success
        } );

        setOriginalData( cloneProfileData( data ) );
        reset( cloneProfileData( data ) );
        if ( typeof window !== 'undefined' ) {
          window.dispatchEvent( new CustomEvent( 'portfolio:profile-updated', { detail: { avatar: data.avatar || '' } } ) );
        }
        return true;
      } else {
        Toast( {
          title: 'Unexpected response from server',
          type: TOAST_STATUS.error
        } );
      }
    } catch ( error ) {
      Toast( {
        title: error.response?.data?.message || 'Failed to update profile',
        type: TOAST_STATUS.error
      } );
      return false;
    }
  };

  const handleCancel = () => {
    if ( originalData ) {
      reset( cloneProfileData( originalData ) );
      clearErrors();
    }
  };

  return {
    form,
    loading,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    errors,
    isSubmitting,
    onSubmit,
    originalData,
    loadError,
    handleCancel
  };
}

