import { InputField } from '@/components/InputField';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { COUNTRIES, getCitiesByCountry } from '@/constants/address-data';
import { FORM_STYLES, getInputBorderStyles } from '@/constants/form-styles';
import { validateCityForCountry } from '@/lib/address-utils';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

export function AddressField( { control, setValue, disabled = false, className } ) {
  const country = useWatch( { control, name: 'addressCountry' } );
  const city = useWatch( { control, name: 'addressCity' } );

  // Reset and validate city when country changes
  useEffect( () => {
    if ( country && city ) {
      const validation = validateCityForCountry( city, country );
      if ( !validation.valid ) {
        setValue( 'addressCity', '', { shouldValidate: false } );
      }
    } else if ( country && !city ) {
      // Reset city when country changes
      setValue( 'addressCity', '', { shouldValidate: false } );
    }
  }, [country, city, setValue] );

  const availableCities = country ? getCitiesByCountry( country ) : [];

  return (
    <div className={ `${className} space-y-4` }>
      <div className="space-y-4">
        { /* Row 1: Country and City */ }
        <div className="grid grid-cols-2 gap-4">
          { /* Country Select */ }
          <FormField
            control={ control }
            name="addressCountry"
            render={ ( { field, fieldState } ) => {
              const error = fieldState?.error;
              const showError = !!error;
              const value = field.value || '';

              return (
                <FormItem className="space-y-1.5 w-full">
                  <FormLabel
                    htmlFor="addressCountry"
                    className={ `text-sm text-gray-600 dark:text-gray-400 ${
                      showError ? 'text-red-500 dark:text-red-400' : ''
                    }` }
                  >
                    Country
                  </FormLabel>
                  <Select
                    value={ value }
                    onValueChange={ ( newValue ) => {
                      field.onChange( newValue );
                      // Reset city when country changes
                      setValue( 'addressCity', '', { shouldValidate: false } );
                    } }
                    disabled={ disabled }
                  >
                    <FormControl>
                      <SelectTrigger
                        className={ `w-full pt-3 pb-2.5 bg-transparent border-2 text-sm placeholder:text-xs overflow-hidden min-w-0 ${getInputBorderStyles( showError, true )} ${disabled ? FORM_STYLES.disabled : ''}` }
                      >
                        <SelectValue placeholder="Select country" className="truncate whitespace-nowrap overflow-hidden min-w-0" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      { COUNTRIES.map( ( { value, label } ) => (
                        <SelectItem key={ value } value={ value }>
                          { label }
                        </SelectItem>
                      ) ) }
                    </SelectContent>
                  </Select>
                  <FormMessage className="ml-1" />
                </FormItem>
              );
            } }
          />

          { /* City Select */ }
          <FormField
            control={ control }
            name="addressCity"
            render={ ( { field, fieldState } ) => {
              const error = fieldState?.error;
              const showError = !!error;
              const value = field.value || '';
              const hasCountry = !!country;

              return (
                <FormItem className="space-y-1.5 w-full">
                  <FormLabel
                    htmlFor="addressCity"
                    className={ `text-sm text-gray-600 dark:text-gray-400 ${
                      showError ? 'text-red-500 dark:text-red-400' : ''
                    }` }
                  >
                    City
                  </FormLabel>
                  <Select
                    value={ value }
                    onValueChange={ field.onChange }
                    disabled={ disabled || !hasCountry }
                  >
                    <FormControl>
                      <SelectTrigger
                        className={ `w-full pt-3 pb-2.5 bg-transparent border-2 text-sm placeholder:text-xs overflow-hidden min-w-0 ${getInputBorderStyles( showError, true )} ${disabled || !hasCountry ? FORM_STYLES.disabled : ''}` }
                      >
                        <SelectValue placeholder={ hasCountry ? 'Select city' : 'Select country first' } className="truncate whitespace-nowrap overflow-hidden min-w-0" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      { availableCities.map( ( { value, label } ) => (
                        <SelectItem key={ value } value={ value }>
                          { label }
                        </SelectItem>
                      ) ) }
                    </SelectContent>
                  </Select>
                  <FormMessage className="ml-1" />
                </FormItem>
              );
            } }
          />
        </div>

        { /* Row 2: Address (Full Width) */ }
        <InputField
          className="mb-0"
          control={ control }
          placeholder="Enter address"
          name="address"
          disabled={ disabled }
        />
      </div>
    </div>
  );
}

