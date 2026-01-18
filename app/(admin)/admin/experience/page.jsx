'use client';

import FormWrapper from '@/components/FormWrapper';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { ExperienceForm } from './components/ExperienceForm';
import { ExperienceView } from './components/ExperienceView';
import { useExperienceForm } from './hooks/useExperienceForm';
import { useExperiences } from './hooks/useExperiences';

export default function ExperiencePage() {
  const [isModalOpen, setIsModalOpen] = useState( false );
  const [viewingId, setViewingId] = useState( null );
  const [isEditMode, setIsEditMode] = useState( false );
  const [deletingId, setDeletingId] = useState( null );
  const [isGeneratingAI, setIsGeneratingAI] = useState( false );
  const { experiences, loading, fetchExperiences, deleteExperience } = useExperiences();

  const {
    form,
    loading: formLoading,
    control,
    watch,
    setValue,
    setError: formSetError,
    isSubmitting,
    onSubmit,
    handleCancel,
    refetchExperience
  } = useExperienceForm( viewingId );

  const currentExperience = experiences.find( ( exp ) => exp.id === viewingId );

  const handleCreate = () => {
    setViewingId( null );
    setIsEditMode( true );
    setIsModalOpen( true );
    form.reset( {
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      location: '',
      companyLogoType: 'link',
      companyLogo: '',
      companyWebsite: '',
      techStack: []
    } );
  };

  const handleView = ( id ) => {
    setViewingId( id );
    setIsEditMode( false );
    setIsModalOpen( true );
  };

  const handleEdit = async () => {
    if ( isEditMode ) {
      // If already in edit mode, validate and save if valid
      const isValid = await form.trigger();
      if ( isValid ) {
        const formData = form.getValues();
        await handleSave( formData );
      }
    } else {
      // Switch to edit mode and fetch latest data
      if ( viewingId && refetchExperience ) {
        await refetchExperience();
      }
      setIsEditMode( true );
    }
  };

  const handleDelete = async ( id ) => {
    if ( !confirm( 'Are you sure you want to delete this experience?' ) ) {
      return;
    }

    setDeletingId( id );
    const success = await deleteExperience( id );
    setDeletingId( null );
    if ( success ) {
      await fetchExperiences( false );
    }
  };

  const handleSave = async ( data ) => {
    try {
      await onSubmit( data );
      await fetchExperiences( false );

      if ( viewingId ) {
        setIsEditMode( false );
      } else {
        setIsModalOpen( false );
        setViewingId( null );
        setIsEditMode( false );
      }
    } catch ( error ) {
      console.error( 'Failed to save experience:', error );
    }
  };

  const handleCancelClick = () => {
    setIsGeneratingAI( false );
    if ( viewingId ) {
      handleCancel();
      setIsEditMode( false );
    } else {
      handleCancel();
      setIsModalOpen( false );
      setViewingId( null );
      setIsEditMode( false );
    }
  };

  const handleClose = () => {
    if ( isGeneratingAI ) {
      return; // Prevent closing when generating
    }
    setIsModalOpen( false );
    setViewingId( null );
    setIsEditMode( false );
    setIsGeneratingAI( false );
    handleCancel();
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
      <div className="h-full w-full max-w-[2000px] mx-auto bg-white dark:bg-secondary rounded-xl md:rounded-2xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white p-4 sm:p-5 md:p-6 flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Experiences</h2>
          <Button
            type="button"
            onClick={ handleCreate }
            className="flex items-center gap-2"
          >
            <FaPlus/>
            Add Experience
          </Button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          { experiences.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
              <p>No experiences found. Click &quot;Add Experience&quot; to create one.</p>
            </div>
          ) : (
            <div className="space-y-4">
              { experiences.map( ( experience ) => (
                <div
                  key={ experience.id }
                  className="border border-gray-300 dark:border-white/20 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={ () => handleView( experience.id ) }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{ experience.company }</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{ experience.position }</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                        { new Date( experience.startDate ).toLocaleDateString() } - { experience.isCurrent ? 'Present' : new Date( experience.endDate ).toLocaleDateString() }
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">{ experience.location }</p>
                      { experience.techStack && experience.techStack.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          { experience.techStack.map( ( tech, index ) => (
                            <span
                              key={ index }
                              className="px-2 py-1 bg-accent-light/10 dark:bg-accent/10 text-accent-light dark:text-accent rounded text-xs"
                            >
                              { tech }
                            </span>
                          ) ) }
                        </div>
                      ) }
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="default"
                        onClick={ ( e ) => {
                          e.stopPropagation();
                          handleDelete( experience.id );
                        } }
                        disabled={ deletingId === experience.id }
                        className="p-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                      >
                        <FaTrash/>
                      </Button>
                    </div>
                  </div>
                </div>
              ) ) }
            </div>
          ) }
        </div>

        <Dialog open={ isModalOpen } onOpenChange={ handleClose }>
          <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            { isGeneratingAI && (
              <div className="fixed inset-0 z-[100] bg-black/60 dark:bg-black/80 backdrop-blur-[2px] flex items-center justify-center">
                <div className="bg-white dark:bg-secondary rounded-xl p-6 flex flex-col items-center gap-4 shadow-xl">
                  <Loader type="ClipLoader" color="#00ff99" size={ 50 } />
                  <p className="text-gray-700 dark:text-gray-300 font-medium text-base">Generating description with AI...</p>
                </div>
              </div>
            ) }
            <DialogHeader className="flex-shrink-0">
              <DialogTitle>
                { viewingId ? ( isEditMode ? 'Edit Experience' : 'View Experience' ) : 'Create Experience' }
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-5">
              { formLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader type="ClipLoader" color="#00ff99" size={ 40 } />
                </div>
              ) : isEditMode ? (
                <FormWrapper
                  form={ form }
                  onSubmit={ handleSave }
                  isLoading={ isSubmitting }
                  className="!p-0 !bg-transparent !rounded-none"
                  formId="experience-form"
                >
                  <ExperienceForm
                    control={ control }
                    watch={ watch }
                    setValue={ setValue }
                    setError={ formSetError }
                    disabled={ isGeneratingAI }
                    isSubmitting={ isSubmitting }
                    onGeneratingChange={ setIsGeneratingAI }
                  />
                </FormWrapper>
              ) : (
                <ExperienceView experience={ currentExperience } />
              ) }
            </div>
            { !formLoading && (
              <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-gray-300 dark:border-white/20 flex-shrink-0">
                { isEditMode ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={ handleCancelClick }
                      disabled={ isSubmitting || isGeneratingAI }
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      form="experience-form"
                      disabled={ isSubmitting || isGeneratingAI }
                    >
                      { isSubmitting ? 'Saving...' : 'Save' }
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={ handleClose }
                    >
                      <FaTimes className="mr-2"/>
                      Close
                    </Button>
                    { viewingId && (
                      <Button
                        type="button"
                        onClick={ handleEdit }
                      >
                        <FaEdit className="mr-2"/>
                        Edit
                      </Button>
                    ) }
                  </>
                ) }
              </div>
            ) }
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

