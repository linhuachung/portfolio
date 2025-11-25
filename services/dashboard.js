import axiosInstance from "@/lib/axios";
import { ADMIN_ENDPOINT } from "@/constants/endpoint";
import STATUS_CODES from "@/constants/status";
import Toast from "@/components/Toast";
import { TOAST_STATUS } from "@/constants/toast";

export const getDashboardData = async ( period = "month" ) => {
  try {
    const response = await axiosInstance.get( `${ADMIN_ENDPOINT.DASHBOARD}?period=${period}` );
    
    if ( response && response.status === STATUS_CODES.SUCCESS ) {
      if ( response.data ) {
        return {
          success: true,
          data: response.data,
          message: response.message || "Dashboard data retrieved successfully"
        };
      }
    }

    return {
      success: false,
      data: null,
      message: response?.message || "Failed to retrieve dashboard data"
    };
  } catch ( error ) {
    const errorMessage = error.response?.data?.message ||
                        error.response?.message ||
                        error.message ||
                        "Failed to fetch dashboard data";

    if ( typeof window !== "undefined" ) {
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

export const getDashboardStats = async ( period = "month" ) => {
  try {
    const result = await getDashboardData( period );
    
    if ( result.success && result.data ) {
      return {
        success: true,
        stats: result.data.stats,
        message: result.message
      };
    }

    return {
      success: false,
      stats: null,
      message: result.message
    };
  } catch ( error ) {
    const errorMessage = error.message || "Failed to fetch dashboard stats";
    
    if ( typeof window !== "undefined" ) {
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
    }

    return {
      success: false,
      stats: null,
      message: errorMessage
    };
  }
};

export const getDashboardCharts = async ( period = "month" ) => {
  try {
    const result = await getDashboardData( period );
    
    if ( result.success && result.data ) {
      return {
        success: true,
        charts: result.data.charts,
        message: result.message
      };
    }

    return {
      success: false,
      charts: null,
      message: result.message
  };
  } catch ( error ) {
    const errorMessage = error.message || "Failed to fetch dashboard charts";

    if ( typeof window !== "undefined" ) {
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
    }

    return {
      success: false,
      charts: null,
      message: errorMessage
    };
  }
};

export const getRecentContacts = async () => {
  try {
    const result = await getDashboardData( "month" );
    
    if ( result.success && result.data ) {
      return {
        success: true,
        contacts: result.data.recentContacts || [],
        message: result.message
      };
    }

    return {
      success: false,
      contacts: [],
      message: result.message
    };
  } catch ( error ) {
    const errorMessage = error.message || "Failed to fetch recent contacts";

    if ( typeof window !== "undefined" ) {
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
    }

    return {
      success: false,
      contacts: [],
      message: errorMessage
    };
  }
};

