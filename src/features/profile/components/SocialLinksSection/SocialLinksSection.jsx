import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SelectionInputField } from '@/shared/components/form/SelectionInputField';
import { SOCIAL_LINK_OPTIONS } from '../../constants/profile-form';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import IconButton from '@mui/material/IconButton';
import { AdminRow, FormSection } from '@/features/admin-shell/styles/Admin.styles';

export default function SocialLinksSection( { control, socialLinks, isSubmitting, setValue, watch, clearErrors, disabled = false } ) {
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
