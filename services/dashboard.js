import axiosInstance from '@/lib/axios';
import { ADMIN_ENDPOINT } from '@/constants/endpoint';
import STATUS_CODES from '@/constants/status';
import Toast from '@/components/Toast';
import { TOAST_STATUS } from '@/constants/toast';

export const getDashboardData = async ( period = 'month' ) => {
  try {
    const response = await axiosInstance.get( `${ADMIN_ENDPOINT.DASHBOARD}?period=${period}` );

    if ( response && response.status === STATUS_CODES.SUCCESS ) {
      if ( response.data ) {
        return {
          success: true,
          data: response.data,
          message: response.message || 'Dashboard data retrieved successfully'
        };
      }
    }

    return {
      success: false,
      data: null,
      message: response?.message || 'Failed to retrieve dashboard data'
    };
  } catch ( error ) {
    const errorMessage = error.response?.data?.message ||
                        error.response?.message ||
                        error.message ||
                        'Failed to fetch dashboard data';

    if ( typeof window !== 'undefined' ) {
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
    }

    return {
      success: false,
      data: null,
      message: errorMessage
    };
  }
};
