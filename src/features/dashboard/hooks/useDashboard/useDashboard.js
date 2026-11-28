'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { getDashboardData } from '../../api/dashboard-api';
import Toast from '@/shared/components/Toast';
import { TOAST_STATUS } from '@/shared/constants/toast';

const AUTO_REFRESH_INTERVAL = 30000;

export function useDashboard( initialPeriod = 'month' ) {
  const [loading, setLoading] = useState( true );
  const [refreshing, setRefreshing] = useState( false );
  const [period, setPeriod] = useState( initialPeriod );
  const [dashboardData, setDashboardData] = useState( null );
  const [error, setError] = useState( '' );
  const intervalRef = useRef( null );
  const requestSequenceRef = useRef( 0 );

  const fetchDashboardData = useCallback( async ( showLoading = true ) => {
    const requestSequence = ++requestSequenceRef.current;
    try {
      if ( showLoading ) {
        setLoading( true );
      } else {
        setRefreshing( true );
      }

      const result = await getDashboardData( period );
      if ( requestSequence !== requestSequenceRef.current ) {return;}

      if ( result.success && result.data ) {
        setDashboardData( result.data );
        setError( '' );
      } else {
        setError( result.message || 'Failed to load dashboard data' );
        Toast( {
          title: result.message || 'Failed to load dashboard data',
          type: TOAST_STATUS.error
        } );
      }
    } catch ( error ) {
      if ( requestSequence !== requestSequenceRef.current ) {return;}
      setError( 'An error occurred while loading dashboard data' );
      Toast( {
        title: 'An error occurred while loading dashboard data',
        type: TOAST_STATUS.error
      } );
    } finally {
      if ( requestSequence === requestSequenceRef.current ) {
        setLoading( false );
        setRefreshing( false );
      }
    }
  }, [period] );

  const handleRefresh = () => {
    fetchDashboardData( false );
  };

  const handlePeriodChange = ( newPeriod ) => {
    setPeriod( newPeriod );
  };

  useEffect( () => {
    fetchDashboardData( true );

    intervalRef.current = setInterval( () => {
      fetchDashboardData( false );
    }, AUTO_REFRESH_INTERVAL );

    return () => {
      if ( intervalRef.current ) {
        clearInterval( intervalRef.current );
      }
    };
  }, [period, fetchDashboardData] );

  return {
    loading,
    refreshing,
    period,
    dashboardData,
    error,
    handleRefresh,
    handlePeriodChange
  };
}

