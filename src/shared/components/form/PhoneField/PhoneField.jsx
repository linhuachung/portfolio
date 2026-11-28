import Box from '@mui/material/Box';
import { FormField, FormItem } from '../FormPrimitives';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/shared/constants/country-codes';
import { formatPhoneForStorage, parsePhoneNumber, sanitizePhoneInput } from '@/shared/utils/phone';

export function PhoneField( {
  name,
  control,
  placeholder = 'Phone number',
  onBlur,
  isSubmitting,
  required = false,
  defaultCountryCode = DEFAULT_COUNTRY_CODE,
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

        const { countryCode, phoneNumber } = parsePhoneNumber( field.value || '', defaultCountryCode );

        const handleCountryCodeChange = ( value ) => {
          const newValue = formatPhoneForStorage( value, phoneNumber );
          field.onChange( newValue );
        };

        const handlePhoneNumberChange = ( e ) => {
          const value = e.target.value;
          const sanitized = sanitizePhoneInput( value );
          const newValue = formatPhoneForStorage( countryCode, sanitized );
          field.onChange( newValue );
        };

        const handleBlur = ( e ) => {
          field.onBlur();
          onBlur && onBlur( e );
        };

        const displayValue = phoneNumber || '';

        return (
          <FormItem>
            <Box sx={ { display: 'grid', gridTemplateColumns: '110px minmax(0, 1fr)', alignItems: 'start' } }>
              <TextField
                select
                value={ countryCode }
                onChange={ event => handleCountryCodeChange( event.target.value ) }
                disabled={ disabled || isSubmitting }
                label="Code"
                error={ !!error }
                sx={ { '& .MuiOutlinedInput-root': { borderTopRightRadius: 0, borderBottomRightRadius: 0 } } }
              >
                { COUNTRY_CODES.map( ( { value, label } ) => (
                  <MenuItem key={ value } value={ value }>{ label }</MenuItem>
                ) ) }
              </TextField>
              <TextField
                id={ name }
                inputRef={ field.ref }
                type="tel"
                name={ field.name }
                label={ placeholder }
                required={ isRequired }
                disabled={ disabled || isSubmitting }
                error={ !!error }
                helperText={ error?.message }
                onBlur={ handleBlur }
                onChange={ handlePhoneNumberChange }
                value={ displayValue }
                fullWidth
                sx={ { '& .MuiOutlinedInput-root': { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } } }
                { ...props }
              />
            </Box>
          </FormItem>
        );
      } }
    />
  );
}

