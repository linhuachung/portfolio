import { AddressField } from '@/components/AddressField';
import FileUpload from '@/components/FileUpload';
import ImageUpload from '@/components/ImageUpload';
import { InputField } from '@/components/InputField';
import { PhoneField } from '@/components/PhoneField';
import { RichTextEditor } from '@/components/RichTextEditor';
import { SelectionInputField } from '@/components/SelectionInputField';
import { TextareaField } from '@/components/TextareaField';
import { BIO_PARAGRAPH_CONFIG, SOCIAL_LINK_OPTIONS } from '../constants';

export function BasicInfoSection( { control, watch, setValue, setError, clearErrors, disabled = false, isSubmitting = false } ) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b border-white/20 pb-2">Basic Information</h3>

      <ImageUpload
        watch={ watch }
        className="mb-4"
        control={ control }
        name="avatar"
        setValue={ setValue }
        width={ 120 }
        height={ 120 }
        setError={ setError }
        disabled={ disabled }
      />

      <InputField
        className="mb-4"
        control={ control }
        placeholder="Email"
        name="email"
        required={ true }
        disabled={ disabled }
      />

      <InputField
        className="mb-4"
        control={ control }
        placeholder="Name"
        name="name"
        required={ true }
        disabled={ disabled }
      />

      <PhoneField
        className="mb-4"
        control={ control }
        placeholder="Phone"
        name="phone"
        disabled={ disabled }
      />

      <TextareaField
        className="mb-4"
        control={ control }
        placeholder="Bio (Short description)"
        name="bio"
        rows={ 3 }
        disabled={ disabled }
      />

      <AddressField
        className="mb-4"
        control={ control }
        setValue={ setValue }
        setError={ setError }
        clearErrors={ clearErrors }
        disabled={ disabled }
        isSubmitting={ isSubmitting }
      />
    </div>
  );
}

export function HomepageContentSection( { control, watch, setValue, setError, disabled = false } ) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b border-white/20 pb-2">Homepage Content</h3>

      <InputField
        className="mb-4"
        control={ control }
        placeholder="Title (e.g., Frontend Developer)"
        name="title"
        disabled={ disabled }
      />

      <InputField
        className="mb-4"
        control={ control }
        placeholder="Greeting (e.g., Hello I'm)"
        name="greeting"
        disabled={ disabled }
      />

      <RichTextEditor
        className="mb-4"
        control={ control }
        placeholder="Bio Paragraph (for homepage - you can use formatting and line breaks)"
        name="bioParagraph"
        showWordCount={ true }
        minLength={ BIO_PARAGRAPH_CONFIG.minLength }
        maxLength={ BIO_PARAGRAPH_CONFIG.maxLength }
        disabled={ disabled }
      />

      <FileUpload
        className="mb-4"
        control={ control }
        name="cvPath"
        watch={ watch }
        setValue={ setValue }
        setError={ setError }
        accept=".pdf"
        maxSizeMB={ 10 }
        disabled={ disabled }
      />
    </div>
  );
}

export function StatisticsSection( { control, disabled = false } ) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 border-b border-white/20 pb-2 mt-0">Statistics</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <InputField
          className="mb-4"
          control={ control }
          placeholder="Years of Experience"
          name="stats.years"
          type="number"
          required={ true }
          disabled={ disabled }
        />

        <InputField
          className="mb-4"
          control={ control }
          placeholder="Projects Completed"
          name="stats.projects"
          type="number"
          required={ true }
          disabled={ disabled }
        />

        <InputField
          className="mb-4"
          control={ control }
          placeholder="Technologies Mastered"
          name="stats.technologies"
          type="number"
          required={ true }
          disabled={ disabled }
        />

        <InputField
          className="mb-4"
          control={ control }
          placeholder="Code Commits"
          name="stats.commits"
          type="number"
          required={ true }
          disabled={ disabled }
        />
      </div>
    </div>
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
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4 border-b border-white/20 pb-2">
        <h3 className="text-lg sm:text-xl font-semibold">Social Links</h3>
        <span className="text-red-500 dark:text-red-400 text-sm">*</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">Required fields</span>
      </div>

      { currentLinks.map( ( link, index ) => {
        const filteredOptions = getFilteredOptions( index );
        const currentType = link?.type || '';
        const displayType = SOCIAL_LINK_OPTIONS.find( opt => opt.value === currentType )?.label || currentType || 'social';
        const isLastRow = index === currentLinks.length - 1;
        const showAddButton = isLastRow && canAddNewLink();

        return (
          <div key={ index } className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
            <div className="flex-1 min-w-0">
              <SelectionInputField
                className="mb-0"
                control={ control }
                placeholderInput={ `Enter ${displayType} URL` }
                name={ `socialLinks.${index}` }
                placeholderSelect={ 'Select social platform' }
                options={ filteredOptions }
                disabled={ disabled }
              />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              { showAddButton && !disabled && (
                <button
                  type="button"
                  onClick={ handleAddMore }
                  className={ `px-3 py-2 rounded-lg transition-colors ${
                    canAddNewLink()
                      ? 'text-accent-light dark:text-accent hover:bg-accent-light/10 dark:hover:bg-accent/10'
                      : 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
                  }` }
                  disabled={ isSubmitting || !canAddNewLink() }
                  title={ canAddNewLink() ? 'Add more' : 'Please enter a valid URL (http:// or https://) to add more' }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) }
              { currentLinks.length > 1 && !disabled && (
                <button
                  type="button"
                  onClick={ () => handleRemove( index ) }
                  className="px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  disabled={ isSubmitting }
                  title="Remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              ) }
            </div>
          </div>
        );
      } ) }
    </div>
  );
}

