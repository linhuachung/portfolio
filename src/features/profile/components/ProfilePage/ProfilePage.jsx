'use client';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import FormWrapper from '@/shared/components/form/FormWrapper';
import BasicInfoSection from '../BasicInfoSection';
import HomepageContentSection from '../HomepageContentSection';
import SocialLinksSection from '../SocialLinksSection';
import ProfileReadOnlyView from '../ProfileReadOnlyView';
import { useUserForm } from '../../hooks/useUserForm';
import {
  SourceNotice,
  StudioDescription,
  StudioEyebrow,
  StudioHeader,
  StudioPage,
  StudioTitle
} from '@/features/admin-shell/styles/ContentStudio.styles';
import { ProfileActionBar, ProfileFormGrid, ProfileSection, ProfileStack } from '../../styles/Profile.styles';
import { useState } from 'react';

function ProfileLoading() {
  return (
    <StudioPage aria-busy="true" aria-label="Loading operational profile">
      <Box sx={ { display: 'grid', gap: 1 } }>
        <Skeleton width={ 130 } height={ 18 } />
        <Skeleton width="min(480px, 85%)" height={ 54 } />
        <Skeleton width="min(620px, 100%)" height={ 24 } />
      </Box>
      <ProfileFormGrid>
        <Skeleton variant="rounded" height={ 620 } />
        <ProfileStack>
          <Skeleton variant="rounded" height={ 360 } />
          <Skeleton variant="rounded" height={ 260 } />
        </ProfileStack>
      </ProfileFormGrid>
    </StudioPage>
  );
}

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
    loadError,
    originalData,
    onSubmit,
    handleCancel
  } = useUserForm();

  const socialLinks = watch( 'socialLinks' ) || [];
  const isDirty = form.formState.isDirty;

  const handleCancelClick = () => {
    handleCancel();
    setIsEditMode( false );
  };

  const handleSave = async data => {
    const saved = await onSubmit( data );
    if ( saved ) {setIsEditMode( false );}
  };

  if ( loading ) {return <ProfileLoading />;}

  return (
    <StudioPage>
      <StudioHeader>
        <Box>
          <StudioEyebrow component="p">Settings · Operational Identity</StudioEyebrow>
          <StudioTitle component="h1">Operational Profile</StudioTitle>
          <StudioDescription component="p">Manage admin contact details, shared files, profile photo, and compatibility content stored in MongoDB.</StudioDescription>
        </Box>
        { !isEditMode && (
          <Button type="button" variant="contained" startIcon={ <EditOutlinedIcon /> } onClick={ () => setIsEditMode( true ) } disabled={ !!loadError }>
            { loadError ? 'Database Unavailable' : 'Edit Profile' }
          </Button>
        ) }
      </StudioHeader>

      <SourceNotice>
        <PersonOutlineOutlinedIcon aria-hidden="true" />
        <Box>
          <Typography component="p">Database-backed operational profile</Typography>
          <Typography component="p">Changes here do not publish the versioned public portfolio content. Public pages continue to use the verified local source.</Typography>
        </Box>
      </SourceNotice>

      { loadError && <Alert severity="warning" variant="outlined">{ loadError }</Alert> }

      { isEditMode ? (
        <FormWrapper form={ form } onSubmit={ handleSave } isLoading={ isSubmitting } plain>
          <ProfileFormGrid>
            <ProfileSection>
              <BasicInfoSection
                control={ control }
                watch={ watch }
                setValue={ setValue }
                setError={ setError }
                clearErrors={ clearErrors }
                disabled={ isSubmitting }
                isSubmitting={ isSubmitting }
              />
            </ProfileSection>

            <ProfileStack>
              <ProfileSection>
                <HomepageContentSection
                  control={ control }
                  watch={ watch }
                  setValue={ setValue }
                  setError={ setError }
                  disabled={ isSubmitting }
                />
              </ProfileSection>
              <ProfileSection>
                <SocialLinksSection
                  control={ control }
                  socialLinks={ socialLinks }
                  isSubmitting={ isSubmitting }
                  setValue={ setValue }
                  watch={ watch }
                  clearErrors={ clearErrors }
                  disabled={ isSubmitting }
                />
              </ProfileSection>
            </ProfileStack>
          </ProfileFormGrid>
        </FormWrapper>
      ) : (
        <ProfileReadOnlyView profile={ originalData || {} } />
      ) }

      { isEditMode && (
        <ProfileActionBar role="status" aria-live="polite">
          <Box>
            <Chip size="small" color={ isDirty ? 'warning' : 'default' } variant="outlined" label={ isDirty ? 'Unsaved changes' : 'No changes yet' } />
            <Typography component="p" sx={ { mt: .75, color: 'text.secondary', fontSize: '.72rem' } }>Uploaded assets are applied to the profile after Save Profile succeeds.</Typography>
          </Box>
          <Box>
            <Button type="button" variant="outlined" color="inherit" onClick={ handleCancelClick } disabled={ isSubmitting }>Cancel</Button>
            <Button type="button" variant="contained" startIcon={ <SaveOutlinedIcon /> } onClick={ form.handleSubmit( handleSave ) } disabled={ isSubmitting }>
              { isSubmitting ? 'Saving…' : 'Save Profile' }
            </Button>
          </Box>
        </ProfileActionBar>
      ) }
    </StudioPage>
  );
}
