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
    <div className="h-full w-full p-2 sm:p-4 md:p-6 overflow-hidden">
      <div className="h-full w-full max-w-[2000px] mx-auto bg-secondary rounded-xl md:rounded-2xl border border-white/20 text-white p-4 sm:p-5 md:p-6 flex flex-col relative overflow-hidden">
        <div className="flex items-center mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Edit Homepage Content</h2>
        </div>
        <FormWrapper form={ form } onSubmit={ handleSave } isLoading={ isSubmitting } className="flex-1 min-h-0 overflow-hidden !p-0 !bg-transparent !rounded-none overflow-y-auto">
          <div className="h-full overflow-y-auto overflow-x-hidden grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-[1fr_1.2fr_0.8fr] gap-4 sm:gap-4 md:gap-5 items-start custom-scrollbar pr-2">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <BasicInfoSection
                control={ control }
                watch={ watch }
                setValue={ setValue }
                setError={ setError }
                clearErrors={ clearErrors }
                disabled={ !isEditMode }
              />
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <HomepageContentSection
                control={ control }
                watch={ watch }
                setValue={ setValue }
                setError={ setError }
                disabled={ !isEditMode }
              />
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
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
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-2 mt-4 pt-4 border-t border-white/20 flex-shrink-0">
          { !isEditMode ? (
            <Button
              type="button"
              onClick={ handleEdit }
              className="w-full sm:w-auto"
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
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={ form.handleSubmit( handleSave ) }
                disabled={ isSubmitting }
                className="w-full sm:w-auto"
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
