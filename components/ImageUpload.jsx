'use client';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Toast from '@/components/Toast';
import { FormField, FormItem, FormMessage } from '@/components/form/FormPrimitives';
import { FILE_UPLOAD } from '@/constants/file-upload';
import { TOAST_STATUS } from '@/constants/toast';
import axiosInstance from '@/lib/axios';
import { useEffect, useRef, useState } from 'react';

const PhotoEditor = styled( Box )( ( { theme } ) => ( {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  alignItems: 'center',
  gap: theme.spacing( 2 ),
  padding: theme.spacing( 2 ),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10,
  backgroundColor: alpha( theme.palette.background.default, .62 ),
  [theme.breakpoints.down( 'sm' )]: { gridTemplateColumns: '1fr', justifyItems: 'start' }
} ) );

const PhotoPreview = styled( Box )( ( { theme } ) => ( {
  position: 'relative',
  padding: theme.spacing( .5 ),
  border: `1px solid ${alpha( theme.palette.primary.main, .35 )}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.background.paper
} ) );

const AvatarPreview = styled( Avatar, { shouldForwardProp: property => property !== '$size' } )( ( { theme, $size } ) => ( {
  width: $size,
  height: $size,
  color: theme.palette.text.secondary,
  backgroundColor: alpha( theme.palette.primary.main, .1 ),
  fontSize: '1.75rem'
} ) );

const UploadProgress = styled( Box )( ( { theme } ) => ( {
  position: 'absolute',
  inset: theme.spacing( .5 ),
  display: 'grid',
  placeItems: 'center',
  borderRadius: '50%',
  color: theme.palette.primary.main,
  backgroundColor: alpha( theme.palette.background.paper, .78 )
} ) );

const PhotoContent = styled( Box )( ( { theme } ) => ( { minWidth: 0, display: 'grid', gap: theme.spacing( 1.25 ) } ) );
const PhotoActions = styled( Box )( ( { theme } ) => ( { display: 'flex', alignItems: 'center', gap: theme.spacing( 1 ), flexWrap: 'wrap' } ) );
const HiddenInput = styled( InputBase )( { display: 'none' } );

function ImageUpload( { name, control, watch, setValue, width = 96, setError, clearErrors, disabled = false } ) {
  const avatarUrl = watch( name );
  const [preview, setPreview] = useState( avatarUrl || '' );
  const [uploading, setUploading] = useState( false );
  const [status, setStatus] = useState( '' );
  const fileInputRef = useRef( null );

  useEffect( () => { setPreview( avatarUrl || '' ); }, [avatarUrl] );

  const resetInput = () => {
    if ( fileInputRef.current ) {fileInputRef.current.value = '';}
  };

  const handleAvatarChange = async event => {
    const file = event.target.files?.[0];
    if ( !file ) {return;}

    clearErrors?.( name );
    setStatus( '' );

    if ( !FILE_UPLOAD.IMAGE.ACCEPTED_TYPES.includes( file.type ) ) {
      setError( name, { type: 'manual', message: 'Choose a PNG or JPG image.' } );
      resetInput();
      return;
    }
    if ( file.size > FILE_UPLOAD.IMAGE.MAX_SIZE_BYTES ) {
      setError( name, { type: 'manual', message: `Choose an image smaller than ${FILE_UPLOAD.IMAGE.MAX_SIZE_MB} MB.` } );
      resetInput();
      return;
    }

    const previousPreview = avatarUrl || '';
    const reader = new FileReader();
    reader.onloadend = () => setPreview( String( reader.result || previousPreview ) );
    reader.readAsDataURL( file );

    try {
      setUploading( true );
      setStatus( 'Uploading profile photo…' );
      const formData = new FormData();
      formData.append( 'file', file );
      formData.append( 'type', 'avatar' );

      const response = await axiosInstance.post( '/api/admin/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        timeout: 60000
      } );
      const imagePath = response?.data?.path;
      if ( response?.status !== 200 || typeof imagePath !== 'string' || !imagePath ) {
        throw new Error( 'The upload service returned an invalid image path.' );
      }

      setValue( name, imagePath, { shouldDirty: true, shouldValidate: true } );
      setPreview( imagePath );
      clearErrors?.( name );
      setStatus( 'Profile photo uploaded. Save the profile to apply it.' );
      Toast( { title: 'Profile photo uploaded', type: TOAST_STATUS.success } );
    } catch ( error ) {
      const errorMessage = error.response?.data?.message
        || ( error.request ? 'The upload service is unavailable. Check the connection and try again.' : error.message )
        || 'Unable to upload the profile photo.';
      setPreview( previousPreview );
      setStatus( 'Profile photo upload failed.' );
      setError( name, { type: 'manual', message: errorMessage } );
      Toast( { title: errorMessage, type: TOAST_STATUS.error } );
    } finally {
      setUploading( false );
      resetInput();
    }
  };

  const handleRemove = () => {
    if ( disabled || uploading ) {return;}
    setPreview( '' );
    setValue( name, '', { shouldDirty: true, shouldValidate: true } );
    clearErrors?.( name );
    setStatus( 'Profile photo removed. Save the profile to apply it.' );
    resetInput();
  };

  return (
    <FormField control={ control } name={ name } render={ () => (
      <FormItem>
        <PhotoEditor>
          <PhotoPreview>
            <AvatarPreview src={ preview || undefined } alt={ preview ? 'Current profile photo' : 'No profile photo selected' } $size={ width } />
            { uploading && <UploadProgress><CircularProgress size={ 28 } aria-label="Uploading profile photo" /></UploadProgress> }
          </PhotoPreview>

          <PhotoContent>
            <Box>
              <Typography component="h3" sx={ { fontSize: '.9rem', fontWeight: 700 } }>Profile Photo</Typography>
              <Typography component="p" sx={ { mt: .35, color: 'text.secondary', fontSize: '.75rem', lineHeight: 1.45 } }>
                PNG or JPG, up to { FILE_UPLOAD.IMAGE.MAX_SIZE_MB } MB. Use a square image for the best result.
              </Typography>
            </Box>
            <HiddenInput
              type="file"
              accept={ FILE_UPLOAD.IMAGE.ACCEPTED_TYPES.join( ',' ) }
              id={ name }
              onChange={ handleAvatarChange }
              inputRef={ fileInputRef }
              disabled={ uploading || disabled }
              inputProps={ { 'aria-label': 'Choose profile photo' } }
            />
            <PhotoActions>
              <Button
                type="button"
                variant="outlined"
                startIcon={ uploading ? <CircularProgress size={ 16 } color="inherit" /> : <PhotoCameraOutlinedIcon /> }
                onClick={ () => fileInputRef.current?.click() }
                disabled={ uploading || disabled }
              >
                { uploading ? 'Uploading…' : preview ? 'Replace Photo' : 'Upload Photo' }
              </Button>
              { preview && (
                <Button type="button" color="error" startIcon={ <DeleteOutlineOutlinedIcon /> } onClick={ handleRemove } disabled={ uploading || disabled }>
                  Remove Photo
                </Button>
              ) }
            </PhotoActions>
            <Typography component="p" aria-live="polite" sx={ { minHeight: '1.1em', color: 'text.secondary', fontSize: '.7rem' } }>{ status }</Typography>
          </PhotoContent>
        </PhotoEditor>
        <FormMessage />
      </FormItem>
    ) } />
  );
}

export default ImageUpload;
