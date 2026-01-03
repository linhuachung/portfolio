import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from '@/constants/country-codes';
import { FORM_STYLES, getInputBorderStyles } from '@/constants/form-styles';
import { useInputFocus } from '@/lib/hooks';
import { formatPhoneForStorage, parsePhoneNumber, sanitizePhoneInput } from '@/lib/phone-utils';

export function PhoneField( {
  name,
  control,
  placeholder = 'Phone number',
  onBlur,
  isSubmitting,
  className,
  required = false,
  defaultCountryCode = DEFAULT_COUNTRY_CODE,
  disabled = false,
  ...props
} ) {
  const { isFocused, setIsFocused } = useInputFocus( name, isSubmitting );

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const error = fieldState?.error;
        const showError = !!error;
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
          setIsFocused( phoneNumber !== '' );
          onBlur && onBlur( e );
        };

        const displayValue = phoneNumber || '';

        return (
          <FormItem className={ `${className} space-y-1 relative w-full` }>
            <div className="flex items-center gap-0 relative">
              <FormItem className="space-y-0 w-auto">
                <Select
                  value={ countryCode }
                  onValueChange={ handleCountryCodeChange }
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={ disabled }
                      className={ `w-[90px] pt-4 pb-3 px-2 pl-6 bg-secondary-light dark:bg-secondary rounded-r-none border-2 border-r-0 ${getInputBorderStyles( showError, true )} ${disabled ? FORM_STYLES.disabled : ''}` }
                    >
                      <SelectValue className="whitespace-nowrap !block !truncate min-w-0">
                        { countryCode }
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { COUNTRY_CODES.map( ( { value, label } ) => (
                      <SelectItem key={ value } value={ value }>
                        { label }
                      </SelectItem>
                    ) ) }
                  </SelectContent>
                </Select>
              </FormItem>

              <FormItem className="space-y-0 flex-1 relative">
                <FormLabel
                  htmlFor={ name }
                  className={ `absolute left-4 transition-all duration-200 pointer-events-none ${
                    isFocused || displayValue
                      ? 'z-10 -top-2.5 text-xs px-2 text-gray-600 dark:text-white/80 bg-secondary-light dark:bg-secondary'
                      : 'top-3.5 text-sm text-gray-500 dark:text-gray-400'
                  } ${showError ? 'text-red-500 dark:text-red-400' : ''}` }
                >
                  { placeholder }
                  { isRequired && <span className="text-red-500 dark:text-red-400 ml-1">*</span> }
                </FormLabel>
                <FormControl>
                  <Input
                    id={ name }
                    type="tel"
                    placeholder=""
                    disabled={ disabled }
                    className={ `rounded-l-none input-autofill w-full pt-4 pb-3 bg-secondary-light dark:bg-secondary border-2 ${getInputBorderStyles( showError )} ${disabled ? FORM_STYLES.disabled : ''}` }
                    onFocus={ () => !disabled && setIsFocused( true ) }
                    onBlur={ handleBlur }
                    onChange={ handlePhoneNumberChange }
                    value={ displayValue }
                    { ...props }
                  />
                </FormControl>
              </FormItem>
            </div>
            <FormMessage className="ml-1 mt-1" />
          </FormItem>
        );
      } }
    />
  );
}

