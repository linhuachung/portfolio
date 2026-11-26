import Box from '@mui/material/Box';
import { InputField } from '@/components/InputField';
import { SelectField } from '@/components/SelectField';
import { COUNTRIES, getCitiesByCountry } from '@/constants/address-data';
import { validateCityForCountry } from '@/lib/address-utils';
import { useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';

export function AddressField( { control, setValue, setError, clearErrors, disabled = false, isSubmitting = false } ) {
  const country = useWatch( { control, name: 'addressCountry' } );
  const city = useWatch( { control, name: 'addressCity' } );
  const previousCountryRef = useRef( country );

  useEffect( () => {
    const countryChanged = previousCountryRef.current !== country;
    previousCountryRef.current = country;

    // Reset city when country is cleared
    if ( !country ) {
      if ( city ) {
        setValue( 'addressCity', '', { shouldValidate: false } );
        if ( clearErrors ) {
          clearErrors( 'addressCity' );
        }
      }
      return;
    }

    // Reset city when country changes
    if ( countryChanged && city ) {
      setValue( 'addressCity', '', { shouldValidate: false } );
      if ( clearErrors ) {
        clearErrors( 'addressCity' );
      }
      return;
    }

    // Validate city belongs to country
    if ( country && city ) {
      const validation = validateCityForCountry( city, country );
      if ( !validation.valid ) {
        setValue( 'addressCity', '', { shouldValidate: false } );
        if ( setError ) {
          setError( 'addressCity', {
            type: 'manual',
            message: validation.error || 'City must belong to the selected country'
          } );
        }
      } else if ( clearErrors ) {
        clearErrors( 'addressCity' );
      }
    }
  }, [country, city, setValue, setError, clearErrors] );

  const availableCities = country ? getCitiesByCountry( country ) : [];

  const handleCountryChange = () => {
    // Immediate reset when country changes (useEffect will also handle this, but this ensures immediate UI update)
    setValue( 'addressCity', '', { shouldValidate: false } );
    if ( clearErrors ) {
      clearErrors( 'addressCity' );
    }
  };

  return (
    <Box sx={ { display: 'grid', gap: 2 } }>
      <Box sx={ { display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 } }>
        <SelectField
          name="addressCountry"
          options={ COUNTRIES }
          placeholder="Select country"
          labelFocus="Country"
          control={ control }
          isSubmitting={ isSubmitting }
          disabled={ disabled }
          onValueChange={ handleCountryChange }
        />

        <SelectField
          name="addressCity"
          options={ availableCities }
          placeholder={ country ? 'Select city' : 'Select country first' }
          labelFocus="City"
          control={ control }
          isSubmitting={ isSubmitting }
          disabled={ disabled || !country }
        />
      </Box>

      <InputField
        control={ control }
        placeholder="Enter address"
        name="address"
        disabled={ disabled }
        isSubmitting={ isSubmitting }
      />
    </Box>
  );
}

