'use client';

import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FILE_UPLOAD } from '@/constants/file-upload';
import { getCleanCvFileName } from '@/lib/cv-utils';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import { useEffect, useRef, useState } from 'react';
import { FiFile, FiUpload, FiX } from 'react-icons/fi';

function FileUpload( {
  name,
  control,
  className,
  watch,
  setValue,
  setError,
  accept = FILE_UPLOAD.CV.ACCEPT_EXTENSION,
  maxSizeMB = FILE_UPLOAD.CV.MAX_SIZE_MB,
  disabled = false
} ) {
  const filePath = watch( name );
  const [uploading, setUploading] = useState( false );
  const [fileName, setFileName] = useState( null );
  const fileInputRef = useRef( null );

  // Extract original filename from filePath when component mounts or filePath changes
  useEffect( () => {
    if ( filePath && !fileName ) {
      const extractedFileName = getCleanCvFileName( filePath );
      setFileName( extractedFileName );
    }
  }, [filePath, fileName] );

  const handleFileChange = async ( e ) => {
    const file = e.target.files[0];
    if ( !file ) {
      return;
    }

    // Validate file type
    if ( accept && !file.name.toLowerCase().endsWith( accept.replace( '.', '' ) ) ) {
      setError( name, { type: 'manual', message: `Only ${accept} files are allowed` } );
      return;
    }

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if ( file.size > maxSizeBytes ) {
      setError( name, { type: 'manual', message: `File size must be less than ${maxSizeMB}MB` } );
      return;
    }

    try {
      setUploading( true );
      setFileName( file.name );

      // Upload file
      const formData = new FormData();
      formData.append( 'file', file );
      formData.append( 'type', 'cv' ); // Specify it's a CV file

      const response = await axiosInstance.post( '/api/admin/upload/cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      } );

      if ( response && response.status === 200 && response.data ) {
        const filePath = response.data.path || response.data;
        const originalFileName = response.data.originalFileName || file.name;
        setValue( name, filePath );
        // Store original filename for display (without prefix)
        setFileName( originalFileName );
        Toast( {
          title: 'File uploaded successfully!',
          type: TOAST_STATUS.success
        } );
      }
    } catch ( error ) {
      console.error( 'File upload error:', error );
      setError( name, {
        type: 'manual',
        message: error.response?.data?.message || 'Failed to upload file'
      } );
      Toast( {
        title: error.response?.data?.message || 'Failed to upload file',
        type: TOAST_STATUS.error
      } );
      setFileName( null );
    } finally {
      setUploading( false );
      if ( fileInputRef.current ) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setValue( name, '' );
    setFileName( null );
    if ( fileInputRef.current ) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <FormField control={ control } name={ name } render={ () => (
      <FormItem className={ `${className} space-y-2 w-full` }>
        <FormLabel className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
          CV File
        </FormLabel>
        <div className="flex flex-col gap-3">
          { filePath && (
            <div className="flex items-center justify-between p-3 bg-secondary-light dark:bg-secondary rounded-lg border border-gray-300 dark:border-white/20">
              <div className="flex items-center gap-2">
                <FiFile className="text-gray-600 dark:text-gray-400" size={ 20 } />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[300px]">
                  { fileName || getCleanCvFileName( filePath ) }
                </span>
              </div>
              { !disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={ handleRemove }
                  disabled={ uploading }
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <FiX size={ 18 } />
                </Button>
              ) }
            </div>
          ) }

          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept={ accept }
              className="hidden"
              id={ name }
              onChange={ handleFileChange }
              ref={ fileInputRef }
              disabled={ uploading || disabled }
            />
            <Button
              type="button"
              onClick={ () => !disabled && fileInputRef.current?.click() }
              disabled={ uploading || disabled }
              className={ `flex items-center gap-2 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}` }
            >
              <FiUpload size={ 18 } />
              { uploading ? 'Uploading...' : filePath ? 'Replace File' : 'Upload CV' }
            </Button>
            { filePath && (
              <a
                href={ filePath }
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent-light dark:text-accent hover:underline"
              >
                View Current File
              </a>
            ) }
          </div>
        </div>
        <FormMessage className="ml-1"/>
      </FormItem>
    ) }/>
  );
}

export default FileUpload;

