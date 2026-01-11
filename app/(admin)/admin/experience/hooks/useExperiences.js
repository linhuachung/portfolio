import Toast from '@/components/Toast';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function useExperiences() {
  const [experiences, setExperiences] = useState( [] );
  const [loading, setLoading] = useState( true );
  const [refreshing, setRefreshing] = useState( false );

  const fetchExperiences = async ( showLoading = true ) => {
    try {
      if ( showLoading ) {
        setLoading( true );
      } else {
        setRefreshing( true );
      }

      const response = await axiosInstance.get( ADMIN_ENDPOINT.EXPERIENCE );

      if ( response && response.status === 200 && response.data ) {
        setExperiences( response.data || [] );
      } else {
        setExperiences( [] );
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
        title: error.response?.data?.message || 'Failed to load experiences',
        type: TOAST_STATUS.error
      } );
      setExperiences( [] );
    } finally {
      setLoading( false );
      setRefreshing( false );
    }
  };

  useEffect( () => {
    fetchExperiences();
  }, [] );

  const deleteExperience = async ( id ) => {
    try {
      const response = await axiosInstance.delete( `${ADMIN_ENDPOINT.EXPERIENCE}/${id}` );

      if ( response && response.status === 200 ) {
        Toast( {
          title: 'Experience deleted successfully!',
          type: TOAST_STATUS.success
        } );
        await fetchExperiences( false );
        return true;
      } else {
        Toast( {
          title: 'Unexpected response from server',
          type: TOAST_STATUS.error
        } );
        return false;
      }
    } catch ( error ) {
      Toast( {
        title: error.response?.data?.message || 'Failed to delete experience',
        type: TOAST_STATUS.error
      } );
      return false;
    }
  };

  return {
    experiences,
    loading,
    refreshing,
    fetchExperiences,
    deleteExperience
  };
}

