import Toast from "@/components/Toast";
import { TOAST_STATUS } from "@/constants/toast";
import axiosInstance from "@/lib/axios";

const methods = {
  get: ( url ) => axiosInstance.get( url ),
  post: ( url, data ) => axiosInstance.post( url, data ),
  put: ( url, data ) => axiosInstance.put( url, data ),
  delete: ( url, data ) => axiosInstance.delete( url, { data } ),
  postFile: ( url, file ) => {
    const formData = new FormData();
    formData.append( "file", file );
    return axiosInstance.post( url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
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
  textSuccess = ""
} ) => {
  onRequest( textSuccess );

  try {
    const response = await methods[method](
      url,
      method === "delete" || method === "postFile" ? data : data
    );
    onSuccess( response );
    response.message && Toast( {
      title: response.message,
      type: TOAST_STATUS.success
    } );

    return response;
  } catch ( error ) {
    const dataError = error.message;
    if ( error.code === "ERR_BAD_REQUEST" ) {
      Toast( {
        title: dataError,
        type: TOAST_STATUS.error
      } );
      throw new Error( "Network error" );
    }
    if ( error.code === "ERROR_NETWORK" ) {
      Toast( {
        title: "Network error",
        type: TOAST_STATUS.error
      } );
      throw new Error( "Network error" );
    }
    if ( dataError.error[0].code === "401" ) {
      localStorage.clear();
      window.location.href = "/login";
    }
    onFailed( dataError );
    Toast( {
      title: "ListMessageError[dataError.error[0].code] || dataError.error[0].code",
      type: TOAST_STATUS.error
    } );
    throw new Error( dataError.message || "Unknown error occurred" );
  } finally {
    onFinally();
  }
};

export { callApi };
