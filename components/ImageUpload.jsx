import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

function ImageUpload( { name, control, className, watch, setValue, width, height, setError, disabled = false } ) {
  const avatarUrl = watch( name );
  const defaultAvatar = '/assets/avatarDefault.png';
  const [preview, setPreview] = useState( avatarUrl || defaultAvatar );
  const fileInputRef = useRef( null );

  const handleAvatarChange = ( e ) => {
    const file = e.target.files[0];
    if ( file ) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];

      if ( !allowedTypes.includes( file.type ) ) {
        setError( name, { type: 'manual', message: 'Invalid image type!!' } );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview( reader.result );
        setValue( name, reader.result );
      };
      reader.readAsDataURL( file );
    }
  };


  const handleRemove = () => {
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
              src={ preview }
              alt="Avatar preview"
              width={ width || 120 }
              height={ height || 120 }
              className={ `rounded-full object-cover border-2 border-white/20 w-[${width || 120}px] h-[${height || 120}px]` }
              style={ { objectFit: 'cover', aspectRatio: '1/1' } }
            />
            { preview !== defaultAvatar && (
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
            accept="image/*"
            className="hidden"
            id={ name }
            onChange={ handleAvatarChange }
            ref={ fileInputRef }
            disabled={ disabled }
          />
          <Button
            type="button"
            onClick={ () => !disabled && fileInputRef.current?.click() }
            disabled={ disabled }
            className={ disabled ? 'opacity-60 cursor-not-allowed' : '' }
          >
            Upload Image
          </Button>
        </div>
        <FormMessage className="text-center pt-5"/>
      </FormItem>
    ) }/>
  );
}

export default ImageUpload;
