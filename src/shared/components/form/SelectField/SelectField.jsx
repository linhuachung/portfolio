import { FormField, FormItem } from '../FormPrimitives';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export function SelectField( {
  isSubmitting,
  name,
  control,
  options,
  labelFocus,
  placeholder,
  disabled = false,
  onValueChange
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const error = fieldState?.error;
        const value = field.value || '';
        const displayLabel = value && labelFocus ? labelFocus : placeholder;

        const handleValueChange = ( event ) => {
          const newValue = event.target.value;
          field.onChange( newValue );
          if ( onValueChange ) {
            onValueChange( newValue );
          }
        };

        return (
          <FormItem>
            <TextField
              select
              id={ name }
              name={ field.name }
              value={ value }
              onChange={ handleValueChange }
              onBlur={ field.onBlur }
              disabled={ disabled || isSubmitting }
              label={ displayLabel }
              error={ !!error }
              helperText={ error?.message }
              fullWidth
            >
              { options.map( ( { value: optionValue, label } ) => (
                <MenuItem key={ optionValue } value={ optionValue }>{ label }</MenuItem>
              ) ) }
            </TextField>
          </FormItem>
        );
      } }
    />
  );
}
