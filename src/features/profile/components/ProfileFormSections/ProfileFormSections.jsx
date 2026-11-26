import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AddressField } from '@/shared/components/form/AddressField';
import FileUpload from '@/features/uploads/components/FileUpload';
import ImageUpload from '@/features/uploads/components/ImageUpload';
import { InputField } from '@/shared/components/form/InputField';
import { PhoneField } from '@/shared/components/form/PhoneField';
import { RichTextEditor } from '@/shared/components/form/RichTextEditor';
import { SelectionInputField } from '@/shared/components/form/SelectionInputField';
import { TextareaField } from '@/shared/components/form/TextareaField';
import { BIO_PARAGRAPH_CONFIG, SOCIAL_LINK_OPTIONS } from '../../constants/profile-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { AdminRow, FormSection, SectionHeading } from '@/features/admin-shell/styles/Admin.styles';

export function BasicInfoSection( { control, watch, setValue, setError, clearErrors, disabled = false, isSubmitting = false } ) {
  return (
    <FormSection>
      <SectionHeading component="h2">Basic Information</SectionHeading>

      <ImageUpload
        watch={ watch }
        control={ control }
        name="avatar"
        setValue={ setValue }
        width={ 120 }
        height={ 120 }
        setError={ setError }
        clearErrors={ clearErrors }
        disabled={ disabled }
      />

      <InputField
        control={ control }
        placeholder="Email"
        name="email"
        required={ true }
        disabled={ disabled }
      />

      <InputField
        control={ control }
        placeholder="Name"
        name="name"
        required={ true }
        disabled={ disabled }
      />

      <PhoneField
        control={ control }
        placeholder="Phone"
        name="phone"
        disabled={ disabled }
      />

      <TextareaField
        control={ control }
        placeholder="Bio (Short description)"
        name="bio"
        rows={ 3 }
        disabled={ disabled }
      />

      <AddressField
        control={ control }
        setValue={ setValue }
        setError={ setError }
        clearErrors={ clearErrors }
        disabled={ disabled }
        isSubmitting={ isSubmitting }
      />
    </FormSection>
  );
}

export function HomepageContentSection( { control, watch, setValue, setError, disabled = false } ) {
  return (
    <FormSection>
      <SectionHeading component="h2">Database Profile Copy</SectionHeading>
      <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.76rem', lineHeight: 1.45 } }>Maintained for operational compatibility. Public pages continue to use the verified local content source.</Typography>

      <InputField
        control={ control }
        placeholder="Title (e.g., Frontend Developer)"
        name="title"
        disabled={ disabled }
      />

      <InputField
        control={ control }
        placeholder="Greeting (e.g., Hello I'm)"
        name="greeting"
        disabled={ disabled }
      />

      <RichTextEditor
        control={ control }
        placeholder="Bio Paragraph (for homepage - you can use formatting and line breaks)"
        name="bioParagraph"
        showWordCount={ true }
        minLength={ BIO_PARAGRAPH_CONFIG.minLength }
        maxLength={ BIO_PARAGRAPH_CONFIG.maxLength }
        disabled={ disabled }
      />

      <FileUpload
        control={ control }
        name="cvPath"
        watch={ watch }
        setValue={ setValue }
        setError={ setError }
        accept=".pdf"
        maxSizeMB={ 10 }
        disabled={ disabled }
      />
    </FormSection>
  );
}

export function SocialLinksSection( { control, socialLinks, isSubmitting, setValue, watch, clearErrors, disabled = false } ) {
  const currentLinks = watch( 'socialLinks' ) || socialLinks || [];

  const getSelectedTypes = ( currentIndex ) => {
    return currentLinks
      .map( ( link, index ) => index !== currentIndex ? ( link?.type || '' ) : null )
      .filter( Boolean );
  };

  const getFilteredOptions = ( currentIndex ) => {
    const selectedTypes = getSelectedTypes( currentIndex );
    return SOCIAL_LINK_OPTIONS.filter( option => !selectedTypes.includes( option.value ) );
  };

  const canAddMore = currentLinks.length < SOCIAL_LINK_OPTIONS.length;

  const isValidUrl = ( url ) => {
    if ( !url || !url.trim() ) {
      return false;
    }
    try {
      const urlObj = new URL( url );
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const canAddNewLink = () => {
    if ( !canAddMore ) {
      return false;
    }
    if ( currentLinks.length === 0 ) {
      return true;
    }

    const lastLink = currentLinks[currentLinks.length - 1];
    const lastUrl = lastLink?.url || '';
    return isValidUrl( lastUrl.trim() );
  };

  const handleAddMore = () => {
    if ( !canAddNewLink() ) {
      return;
    }

    const selectedTypes = currentLinks.map( link => link?.type ).filter( Boolean );
    const availableOptions = SOCIAL_LINK_OPTIONS.filter(
      option => !selectedTypes.includes( option.value )
    );

    if ( availableOptions.length > 0 ) {
      const newLink = {
        type: availableOptions[0].value,
        url: '',
        order: currentLinks.length
      };
      const updatedLinks = [...currentLinks, newLink];

      clearErrors( 'socialLinks' );

      setValue( 'socialLinks', updatedLinks, { shouldValidate: false } );
    }
  };

  const handleRemove = ( index ) => {
    const newLinks = currentLinks.filter( ( _, i ) => i !== index );
    const reorderedLinks = newLinks.map( ( link, i ) => ( { ...link, order: i } ) );

    clearErrors( 'socialLinks' );

    setValue( 'socialLinks', reorderedLinks, { shouldValidate: false } );
  };

  return (
    <FormSection>
      <AdminRow sx={ { flexWrap: 'wrap', pb: 1, borderBottom: 1, borderColor: 'divider' } }>
        <Typography component="h2" sx={ { fontSize: '1.15rem', fontWeight: 650 } }>Social Links</Typography>
        <Typography component="span" sx={ { color: 'error.main', fontSize: '.875rem' } }>*</Typography>
        <Typography component="span" sx={ { color: 'text.secondary', fontSize: '.75rem' } }>Required fields</Typography>
      </AdminRow>

      { currentLinks.map( ( link, index ) => {
        const filteredOptions = getFilteredOptions( index );
        const currentType = link?.type || '';
        const displayType = SOCIAL_LINK_OPTIONS.find( opt => opt.value === currentType )?.label || currentType || 'social';
        const isLastRow = index === currentLinks.length - 1;
        const showAddButton = isLastRow && canAddNewLink();

        return (
          <Box key={ index } sx={ { display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 1, mb: 2 } }>
            <Box sx={ { flex: 1, minWidth: 0 } }>
              <SelectionInputField
                control={ control }
                placeholderInput={ `Enter ${displayType} URL` }
                name={ `socialLinks.${index}` }
                placeholderSelect={ 'Select social platform' }
                options={ filteredOptions }
                disabled={ disabled }
              />
            </Box>
            <AdminRow sx={ { flexShrink: 0, gap: 1 } }>
              { showAddButton && !disabled && (
                <IconButton
                  type="button"
                  onClick={ handleAddMore }
                  color="primary"
                  disabled={ isSubmitting || !canAddNewLink() }
                  title={ canAddNewLink() ? 'Add more' : 'Please enter a valid URL (http:// or https://) to add more' }
                  aria-label="Add social link"
                >
                  <AddIcon fontSize="small"/>
                </IconButton>
              ) }
              { currentLinks.length > 1 && !disabled && (
                <IconButton
                  type="button"
                  onClick={ () => handleRemove( index ) }
                  color="error"
                  disabled={ isSubmitting }
                  title="Remove"
                  aria-label={ `Remove social link ${index + 1}` }
                >
                  <DeleteOutlineIcon fontSize="small"/>
                </IconButton>
              ) }
            </AdminRow>
          </Box>
        );
      } ) }
    </FormSection>
  );
}

