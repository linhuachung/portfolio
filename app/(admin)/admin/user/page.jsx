"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import Image from "next/image";
import { InputField } from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import FormWrapper from "@/components/FormWrapper";

const validationSchema = Yup.object().shape( {
  email: Yup.string().email( "Invalid email" ).required( "Email is required" ),
  name: Yup.string().required( "Name is required" ),
  bio: Yup.string(),
  avatar: Yup.string().url( "Invalid URL" ).nullable()
} );

export default function EditProfile() {
  const router = useRouter();
  const [preview, setPreview] = useState( "" );

  const form = useForm( {
    resolver: yupResolver( validationSchema ),
    mode: "onChange"
  } );

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = form;

  const avatarUrl = watch( "avatar" );

  const handleAvatarChange = ( e ) => {
    const file = e.target.files[0];
    if ( file ) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview( reader.result );
      reader.readAsDataURL( file );
    }
  };

  const onSubmit = async ( data ) => {
    console.log( "Updated profile:", data );
    router.push( "/profile" );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <FormWrapper
        form={ form }
        onSubmit={ onSubmit }
        isLoading={ isSubmitting }
      >
        <div className="mb-4">
          <label className="block text-sm font-medium">Avatar</label>
          <div className="flex items-center gap-4 mt-2">
            <Image
              src={ preview || avatarUrl || "/default-avatar.png" }
              alt="Avatar preview"
              width={ 80 }
              height={ 80 }
              className="rounded-full object-cover"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={ handleAvatarChange }
            />
            <Button type="button" onClick={ () => document.getElementById( "avatar-upload" ).click() }>Upload</Button>
          </div>
          <input
            { ...register( "avatar" ) }
            type="text"
            placeholder="Or enter image URL"
            className="mt-2 w-full border p-2 rounded"
            onChange={ ( e ) => setPreview( e.target.value ) }
          />
          { errors.avatar && <p className="text-red-500 text-sm">{ errors.avatar.message }</p> }
        </div>
        <InputField
          formItemClassName="my-3"
          control={ control }
          placeholder="Email"
          name="email"
          register={ register }
          errors={ errors }
        />
        <InputField
          formItemClassName="my-3"
          control={ control }
          placeholder="Name"
          name="name" register={ register }
          errors={ errors }
        />
        <InputField
          formItemClassName="my-3"
          control={ control }
          placeholder="Bio"
          name="bio"
          register={ register }
          errors={ errors }
        />
        <Button type="submit" className="w-full mt-4" disabled={ isSubmitting }>
          { isSubmitting ? "Saving..." : "Save Changes" }
        </Button>
      </FormWrapper>
    </div>
  );
}