import { FormField, FormItem } from '../FormPrimitives';
import TextField from '@mui/material/TextField';

export function InputField( {
  name,
  control,
  placeholder,
  onBlur,
  type,
  isSubmitting,
  onChange,
  required = false,
  disabled = false,
  ...props
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const error = fieldState?.error;
        const isRequired = required || fieldState?.error?.type === 'required';

        return (
          <FormItem>
            <TextField
              id={ name }
              inputRef={ field.ref }
              name={ field.name }
              type={ type || 'text' }
              label={ placeholder }
              disabled={ disabled || isSubmitting }
              required={ isRequired }
              error={ !!error }
              helperText={ error?.message }
              onBlur={ event => { field.onBlur(); onBlur?.( event ); } }
              onChange={ event => { field.onChange( event ); onChange?.( event ); } }
              value={ field.value ?? '' }
              fullWidth
              { ...props }
            />
          </FormItem>
        );
      } }
    />
  );
}
