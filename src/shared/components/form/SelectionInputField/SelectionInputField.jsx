import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormField, FormItem } from '@/shared/components/form/FormPrimitives';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { getErrorMessage } from '@/shared/utils/form';

export function SelectionInputField( {
  name,
  control,
  type,
  onBlur,
  options,
  placeholderSelect,
  placeholderInput,
  disabled = false,
  ...props
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const fieldError = fieldState?.error;
        const typeError = getErrorMessage( fieldError, 'type' );
        const urlError = getErrorMessage( fieldError, 'url' );

        return (
          <Box sx={ { width: '100%', display: 'grid', gap: 1 } }>
            <FormItem sx={ { display: 'grid', gridTemplateColumns: 'minmax(120px, 1fr) minmax(0, 2fr)', gap: 0 } }>
              <TextField
                select
                value={ field.value?.type || '' }
                onChange={ ( event ) => {
                  field.onChange( { ...field.value, type: event.target.value } );
                } }
                disabled={ disabled }
                displayEmpty
                inputProps={ { 'aria-label': placeholderSelect } }
                label={ placeholderSelect }
                error={ !!typeError }
                sx={ { '& .MuiOutlinedInput-root': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } } }
              >
                <MenuItem value="" disabled>{ placeholderSelect }</MenuItem>
                { options.map( ( { value, label } ) => (
                  <MenuItem key={ value } value={ value }>{ label }</MenuItem>
                ) ) }
              </TextField>
              <TextField
                id={ `${name}-url` }
                inputRef={ field.ref }
                name={ `${name}.url` }
                type={ type || 'text' }
                placeholder={ placeholderInput }
                disabled={ disabled }
                error={ !!urlError }
                label={ placeholderInput }
                fullWidth
                sx={ { '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } } }
                onBlur={ ( event ) => {
                  onBlur && onBlur( event );
                } }
                onChange={ ( event ) => {
                  if ( !disabled ) {
                    field.onChange( { ...field.value, url: event.target.value } );
                  }
                } }
                value={ field.value?.url || '' }
                { ...props }
              />
            </FormItem>
            { ( typeError || urlError ) && (
              <Box sx={ { display: 'grid', gap: .5 } }>
                { typeError && (
                  <Typography component="p" sx={ { ml: 1, color: 'error.main', fontSize: '.8rem', fontWeight: 500 } }>
                    { typeError }
                  </Typography>
                ) }
                { urlError && (
                  <Typography component="p" sx={ { ml: 1, color: 'error.main', fontSize: '.8rem', fontWeight: 500 } }>
                    { urlError }
                  </Typography>
                ) }
              </Box>
            ) }
          </Box>
        );
      } }
    />
  );
}
