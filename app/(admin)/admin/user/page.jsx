'use client';

import FormWrapper from '@/components/FormWrapper';
import ImageUpload from '@/components/ImageUpload';
import { InputField } from '@/components/InputField';
import { SelectionInputField } from '@/components/SelectionInputField';
import { TextareaField } from '@/components/TextareaField';
import { Button } from '@/components/ui/button';
import { validationEditProfileSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export default function EditProfile() {

  const form = useForm( {
    resolver: yupResolver( validationEditProfileSchema ),
    mode: 'onChange',
    defaultValues: {
      media: {
        type: 'gitHub',
        value: 'https://www.test.com'
      }
    }
  } );

  const {
    register,
    handleSubmit: _handleSubmit,
    setError,
    setValue,
    control,
    watch,
    reset: _reset,
    formState: { errors, isSubmitting }
  } = form;

  const onSubmit = async ( _data ) => {
  };

  return (
    <div className="max-w-sm w-full mx-auto p-6 bg-secondary rounded-2xl border border-white/20
                text-white sm:max-w-3xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
      <FormWrapper form={ form } onSubmit={ onSubmit } isLoading={ isSubmitting }>
        <ImageUpload
          watch={ watch }
          className="mb-4"
          control={ control }
          name="avatar"
          setValue={ setValue }
          width={ 200 }
          height={ 200 }
          setError={ setError }
        />
        <InputField
          className="mb-4"
          control={ control }
          placeholder="Email"
          name="email"
          register={ register }
          errors={ errors }
        />
        <InputField
          className="mb-4"
          control={ control }
          placeholder="Name"
          name="name"
          register={ register }
          errors={ errors }
        />
        <TextareaField
          className="mb-4"
          control={ control }
          placeholder="Bio"
          name="bio"
          register={ register }
          errors={ errors }
        />
        <SelectionInputField
          className="mb-4"
          control={ control }
          placeholderInput="Media"
          name="media"
          register={ register }
          placeholderSelect="Service"
          errors={ errors }
          options={ [
            { value: 'fb', label: 'Facebook' },
            { value: 'gitHub', label: 'Git Hub' },
            { value: 'linkedin', label: 'Linkedin' }
          ] }
          isSubmitting={ isSubmitting }
        />
        <Button type="submit"
          className="w-full"
          disabled={ isSubmitting }>
          { isSubmitting ? 'Saving...' : 'Save Changes' }
        </Button>
      </FormWrapper>
    </div>
  );
}
