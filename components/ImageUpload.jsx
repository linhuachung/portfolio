import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FILE_UPLOAD } from '@/constants/file-upload';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

function ImageUpload( { name, control, className, watch, setValue, width, height, setError, disabled = false } ) {
  const avatarUrl = watch( name );
  const defaultAvatar = '/assets/avatarDefault.png';
  const [preview, setPreview] = useState( avatarUrl || defaultAvatar );
  const [uploading, setUploading] = useState( false );
  const fileInputRef = useRef( null );

  // Update preview when avatarUrl changes
  useEffect( () => {
    if ( avatarUrl ) {
      setPreview( avatarUrl );
    } else {
      setPreview( defaultAvatar );
    }
  }, [avatarUrl, defaultAvatar] );

  const handleAvatarChange = async ( e ) => {
    const file = e.target.files[0];
    if ( !file ) {
      return;
    }

    // Validate file type
    if ( !FILE_UPLOAD.IMAGE.ACCEPTED_TYPES.includes( file.type ) ) {
      setError( name, { type: 'manual', message: 'Only PNG, JPEG, JPG images are allowed' } );
      return;
    }

    // Validate file size
    if ( file.size > FILE_UPLOAD.IMAGE.MAX_SIZE_BYTES ) {
      setError( name, { type: 'manual', message: `File size must be less than ${FILE_UPLOAD.IMAGE.MAX_SIZE_MB}MB` } );
      return;
    }

    // Show preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview( reader.result );
    };
    reader.readAsDataURL( file );

    // Upload to S3
    try {
      setUploading( true );

      const formData = new FormData();
      formData.append( 'file', file );
      formData.append( 'type', 'avatar' );

      const response = await axiosInstance.post( '/api/admin/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
        timeout: 60000
      } );

      if ( response?.status === 200 && response.data ) {
        const result = response.data;
        const imagePath = result.data?.path || result.path;

        if ( !imagePath || typeof imagePath !== 'string' ) {
          throw new Error( 'Invalid response format from server' );
        }

        setValue( name, imagePath );
        setPreview( imagePath );
        Toast( {
          title: 'Image uploaded successfully!',
          type: TOAST_STATUS.success
        } );
      } else {
        throw new Error( 'Invalid response from server' );
      }
    } catch ( error ) {
      let errorMessage = 'Failed to upload image';
      if ( error.response?.data?.message ) {
        errorMessage = error.response.data.message;
      } else if ( error.response?.data?.error ) {
        errorMessage = error.response.data.error;
      } else if ( error.request ) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if ( error.message ) {
        errorMessage = error.message;
      }

      setError( name, {
        type: 'manual',
        message: errorMessage
      } );
      Toast( {
        title: errorMessage,
        type: TOAST_STATUS.error
      } );
      // Reset preview to previous value or default
      setPreview( avatarUrl || defaultAvatar );
    } finally {
      setUploading( false );
      if ( fileInputRef.current ) {
        fileInputRef.current.value = '';
      }
    }
  };


  const handleRemove = () => {
    if ( disabled ) {
      return;
    }
    setPreview( defaultAvatar );
    setValue( name, '' );

    if ( fileInputRef.current ) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <FormField control={ control } name={ name } render={ () => (
      <FormItem className={ `${className} space-y-0 relative w-full` }>
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <Image
              src={ preview || defaultAvatar }
              alt="Avatar preview"
              width={ width || 120 }
              height={ height || 120 }
              className="rounded-full object-cover border-2 border-white/20"
              style={ { objectFit: 'cover', aspectRatio: '1/1', width: `${width || 120}px`, height: `${height || 120}px` } }
              unoptimized={ true }
              onError={ () => {
                setPreview( defaultAvatar );
              } }
            />
            { preview !== defaultAvatar && !disabled && (
              <Button
                onClick={ handleRemove }
                className="absolute inset-0 flex items-center justify-center w-full h-full
           bg-primary bg-opacity-0 text-white text-sm px-3 py-1 rounded-full
           transition-all duration-300 opacity-0 group-hover:opacity-100
           group-hover:bg-primary/60 hover:bg-opacity-1"
              >
                Remove
              </Button>
            ) }
          </div>
          <Input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            id={ name }
            onChange={ handleAvatarChange }
            ref={ fileInputRef }
            disabled={ uploading || disabled }
          />
          <Button
            type="button"
            onClick={ () => !disabled && !uploading && fileInputRef.current?.click() }
            disabled={ uploading || disabled }
            className={ ( disabled || uploading ) ? 'opacity-60 cursor-not-allowed' : '' }
          >
            { uploading ? 'Uploading...' : 'Upload Image' }
          </Button>
        </div>
        <FormMessage className="text-center pt-5"/>
      </FormItem>
    ) }/>
  );
}

export default ImageUpload;
