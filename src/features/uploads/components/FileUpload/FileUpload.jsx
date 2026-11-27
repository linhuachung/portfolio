'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Toast from '@/shared/components/Toast';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/form/FormPrimitives';
import Input from '@mui/material/InputBase';
import { FILE_UPLOAD } from '../../constants/file-upload';
import { getCleanCvFileName } from '../../utils/cv-utils';
import { TOAST_STATUS } from '@/shared/constants/toast';
import axiosInstance from '@/shared/api/http-client';
import { useEffect, useRef, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

function FileUpload( {
  name,
  control,
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
    <FormField
      control={ control }
      name={ name }
      render={ () => (
        <FormItem>
          <FormLabel sx={ { mb: 1, fontSize: '.875rem', fontWeight: 650 } }>
            CV File
          </FormLabel>
          <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
            { filePath && (
              <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, p: 1.5, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.default' } }>
                <Box sx={ { display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, color: 'text.secondary' } }>
                  <InsertDriveFileOutlinedIcon sx={ { fontSize: 20 } } />
                  <Typography component="span" sx={ { maxWidth: 300, overflow: 'hidden', color: 'text.secondary', fontSize: '.875rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }>
                    { fileName || getCleanCvFileName( filePath ) }
                  </Typography>
                </Box>
                { !disabled && (
                  <Button
                    type="button"
                    variant="text"
                    size="small"
                    onClick={ handleRemove }
                    disabled={ uploading }
                    color="error"
                    aria-label="Remove CV file"
                  >
                    <CloseIcon sx={ { fontSize: 18 } } />
                  </Button>
                ) }
              </Box>
            ) }

            <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' } }>
              <Input
                type="file"
                accept={ accept }
                sx={ { display: 'none' } }
                id={ name }
                onChange={ handleFileChange }
                inputRef={ fileInputRef }
                disabled={ uploading || disabled }
              />
              <Button
                type="button"
                onClick={ () => !disabled && fileInputRef.current?.click() }
                disabled={ uploading || disabled }
                startIcon={ <FileUploadOutlinedIcon sx={ { fontSize: 18 } } /> }
              >
                { uploading ? 'Uploading...' : filePath ? 'Replace File' : 'Upload CV' }
              </Button>
              { filePath && (
                <MuiLink
                  href={ filePath }
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={ { color: 'primary.main', fontSize: '.875rem' } }
                >
                  View Current File
                </MuiLink>
              ) }
            </Box>
          </Box>
          <FormMessage/>
        </FormItem>
      ) }
    />
  );
}

export default FileUpload;

