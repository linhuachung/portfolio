import Toast from '@/components/Toast';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';

const methods = {
  get: ( url ) => axiosInstance.get( url ),
  post: ( url, data ) => axiosInstance.post( url, data ),
  put: ( url, data ) => axiosInstance.put( url, data ),
  delete: ( url, data ) => axiosInstance.delete( url, { data } ),
  postFile: ( url, file ) => {
    const formData = new FormData();
    formData.append( 'file', file );
    return axiosInstance.post( url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    } );
  }
};

const callApi = async ( {
  method, data,
  url,
  onRequest = () => {
  },
  onSuccess = () => {
  },
  onFailed = () => {
  },
  onFinally = () => {
  },
  textSuccess = ''
} ) => {
  onRequest( textSuccess );

  try {
    const response = await methods[method](
      url,
      method === 'delete' || method === 'postFile' ? data : data
    );
    onSuccess( response );
    response.message && Toast( {
      title: response.message,
      type: TOAST_STATUS.success
    } );

    return response;
  } catch ( error ) {
    const errorResponse = error.response?.data || {};
    const errorMessage = errorResponse.message || error.message || 'An error occurred';
    const errorCode = error.code || errorResponse.status;

    // Handle specific error codes
    if ( errorCode === 'ERR_BAD_REQUEST' || errorResponse.status === 400 ) {
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
      onFailed( errorResponse );
      throw new Error( errorMessage );
    }

    if ( errorCode === 'ERR_NETWORK' || errorCode === 'ERROR_NETWORK' ) {
      Toast( {
        title: 'Network error. Please check your connection.',
        type: TOAST_STATUS.error
      } );
      onFailed( errorResponse );
      throw new Error( 'Network error' );
    }

    // Handle 401 Unauthorized
    if ( errorResponse.status === 401 || ( errorResponse.error && Array.isArray( errorResponse.error ) && errorResponse.error[0]?.code === '401' ) ) {
      if ( typeof window !== 'undefined' ) {
        localStorage.clear();
        window.location.href = '/admin/login';
      }
      onFailed( errorResponse );
      throw new Error( 'Unauthorized' );
    }

    // Generic error handling
    onFailed( errorResponse );
    Toast( {
      title: errorMessage,
      type: TOAST_STATUS.error
    } );
    throw new Error( errorMessage );
  } finally {
    onFinally();
  }
};

export { callApi };
