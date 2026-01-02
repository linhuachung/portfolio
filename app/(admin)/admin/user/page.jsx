'use client';

import FormWrapper from '@/components/FormWrapper';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  BasicInfoSection,
  HomepageContentSection,
  SocialLinksSection,
  StatisticsSection
} from './components/FormSections';
import { useUserForm } from './hooks/useUserForm';

export default function EditProfile() {
  const [isEditMode, setIsEditMode] = useState( false );

  const {
    form,
    loading,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
    isSubmitting,
    onSubmit,
    handleCancel
  } = useUserForm();

  const socialLinks = watch( 'socialLinks' ) || [];

  const handleEdit = () => {
    setIsEditMode( true );
  };

  const handleCancelClick = () => {
    handleCancel();
    setIsEditMode( false );
  };

  const handleSave = async ( data ) => {
    await onSubmit( data );
    setIsEditMode( false );
  };

  if ( loading ) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader type="ClipLoader" color="#00ff99" size={ 50 } />
      </div>
    );
  }

  return (
    <div className="h-full w-full p-6 overflow-hidden">
      <div className="h-full w-full max-w-[2000px] mx-auto bg-secondary rounded-2xl border border-white/20 text-white p-6 flex flex-col relative">
        <div className="flex items-center mb-6 flex-shrink-0">
          <h2 className="text-3xl font-bold">Edit Homepage Content</h2>
        </div>
        <FormWrapper form={ form } onSubmit={ handleSave } isLoading={ isSubmitting }>
          <div className="flex-1 overflow-hidden grid grid-cols-3 gap-6 min-h-0">
            <div className="flex flex-col gap-6 overflow-y-auto pr-2 min-h-0">
              <BasicInfoSection
                control={ control }
                watch={ watch }
                setValue={ setValue }
                setError={ setError }
                disabled={ !isEditMode }
              />
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto px-2 min-h-0">
              <HomepageContentSection
                control={ control }
                watch={ watch }
                setValue={ setValue }
                setError={ setError }
                disabled={ !isEditMode }
              />
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto pl-2 min-h-0">
              <StatisticsSection
                control={ control }
                disabled={ !isEditMode }
              />

              <SocialLinksSection
                control={ control }
                socialLinks={ socialLinks }
                isSubmitting={ isSubmitting }
                setValue={ setValue }
                watch={ watch }
                clearErrors={ clearErrors }
                disabled={ !isEditMode }
              />
            </div>
          </div>
        </FormWrapper>
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-white/20 flex-shrink-0">
          { !isEditMode ? (
            <Button
              type="button"
              onClick={ handleEdit }
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={ handleCancelClick }
                disabled={ isSubmitting }
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={ form.handleSubmit( handleSave ) }
                disabled={ isSubmitting }
              >
                { isSubmitting ? 'Saving...' : 'Save' }
              </Button>
            </>
          ) }
        </div>
      </div>
    </div>
  );
}
