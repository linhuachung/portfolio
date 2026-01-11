'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import CreatableSelect from 'react-select/creatable';
import { useInputFocus } from '@/lib/hooks';
import * as React from 'react';

export function MultiSelectField( {
  name,
  control,
  placeholder,
  disabled = false,
  className,
  options = [],
  isSubmitting = false,
  required = false,
  labelFocusClass = '',
  ...props
} ) {
  const { setIsFocused } = useInputFocus( name, isSubmitting );

  const selectOptions = React.useMemo( () => {
    return options.map( ( option ) => ( {
      value: option,
      label: option
    } ) );
  }, [options] );

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const error = fieldState?.error;
        const showError = !!error;
        const isRequired = required || fieldState?.error?.type === 'required';

        const fieldValue = Array.isArray( field.value ) ? field.value : [];
        const selectedValues = fieldValue.map( ( value ) => {
          const existingOption = selectOptions.find( ( opt ) => opt.value === value );
          if ( existingOption ) {
            return existingOption;
          }
          return { value, label: value };
        } );

        const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains( 'dark' );
        const accentColor = isDark ? '#00ff99' : '#008844';
        const accentColor60 = isDark ? 'rgba(0, 255, 153, 0.6)' : 'rgba(0, 136, 68, 0.6)';
        const accentColorHover = isDark ? 'rgba(0, 255, 153, 0.2)' : 'rgba(0, 136, 68, 0.2)';
        const bgColor = isDark ? '#1c1c22' : '#f5f5f5';
        const textColor = isDark ? '#ffffff' : '#1c1c22';
        const borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgb(156 163 175)';

        const customStyles = {
          control: ( base, state ) => ( {
            ...base,
            minHeight: '48px',
            height: 'auto',
            backgroundColor: bgColor,
            borderColor: showError
              ? 'rgb(220 38 38)'
              : state.isFocused
                ? accentColor
                : borderColor,
            borderWidth: '2px',
            borderRadius: '12px',
            boxShadow: state.isFocused && !showError
              ? `0 0 0 1px ${accentColor}`
              : showError
                ? '0 0 0 1px rgb(220 38 38)'
                : 'none',
            '&:hover': {
              borderColor: showError ? 'rgb(220 38 38)' : accentColor
            },
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            overflowX: 'hidden',
            overflowY: 'hidden',
            maxWidth: '100%'
          } ),
          valueContainer: ( base ) => ( {
            ...base,
            padding: '4px 12px',
            minHeight: '48px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            overflowX: 'hidden',
            overflowY: 'auto',
            maxWidth: '100%'
          } ),
          multiValue: ( base ) => ( {
            ...base,
            backgroundColor: accentColor60,
            borderRadius: '6px',
            margin: '2px',
            maxWidth: '100%',
            overflow: 'hidden'
          } ),
          multiValueLabel: ( base ) => ( {
            ...base,
            color: 'white',
            padding: '4px 8px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px'
          } ),
          multiValueRemove: ( base ) => ( {
            ...base,
            color: 'white',
            borderRadius: '0 6px 6px 0',
            padding: '0 6px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              color: 'white'
            }
          } ),
          placeholder: ( base ) => ( {
            ...base,
            color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgb(107 114 128)',
            fontSize: '16px'
          } ),
          input: ( base ) => ( {
            ...base,
            color: textColor,
            fontSize: '16px',
            margin: '0',
            padding: '0'
          } ),
          menu: ( base ) => ( {
            ...base,
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '12px',
            zIndex: 9999,
            marginTop: '4px',
            overflowX: 'hidden',
            overflowY: 'hidden',
            maxWidth: '100%'
          } ),
          menuList: ( base ) => ( {
            ...base,
            padding: '4px',
            maxHeight: '300px',
            overflowX: 'hidden',
            overflowY: 'auto'
          } ),
          option: ( base, state ) => ( {
            ...base,
            backgroundColor: state.isSelected
              ? accentColor
              : state.isFocused
                ? accentColorHover
                : 'transparent',
            color: state.isSelected ? 'white' : textColor,
            cursor: 'pointer',
            borderRadius: '6px',
            margin: '2px',
            padding: '8px 12px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            '&:active': {
              backgroundColor: accentColor,
              color: 'white'
            }
          } ),
          indicatorsContainer: ( base ) => ( {
            ...base,
            cursor: disabled ? 'not-allowed' : 'pointer'
          } ),
          clearIndicator: ( base ) => ( {
            ...base,
            color: textColor,
            '&:hover': {
              color: accentColor
            }
          } ),
          dropdownIndicator: ( base ) => ( {
            ...base,
            color: textColor,
            '&:hover': {
              color: accentColor
            }
          } )
        };

        return (
          <FormItem className={ `${className} space-y-1 relative w-full` }>
            <FormLabel
              htmlFor={ name }
              className={ `text-sm font-medium text-gray-600 dark:text-white/80 ${labelFocusClass} ${showError ? 'text-red-600 dark:text-red-400' : ''}` }
            >
              { placeholder }
              { isRequired && <span className="text-red-600 dark:text-red-400 ml-1">*</span> }
            </FormLabel>
            <FormControl>
              <div
                onFocus={ () => setIsFocused( true ) }
                onBlur={ () => setIsFocused( false ) }
                className="relative"
              >
                <CreatableSelect
                  isMulti
                  name={ name }
                  options={ selectOptions }
                  value={ selectedValues }
                  onChange={ ( selectedOptions ) => {
                    const values = selectedOptions ? selectedOptions.map( ( option ) => option.value ) : [];
                    field.onChange( values );
                  } }
                  onBlur={ field.onBlur }
                  placeholder={ placeholder || 'Select or type to add...' }
                  isDisabled={ disabled }
                  isClearable={ false }
                  isSearchable={ true }
                  filterOption={ ( option, inputValue ) => {
                    if ( !inputValue ) {return true;}
                    const searchValue = inputValue.toLowerCase();
                    return option.label.toLowerCase().includes( searchValue ) ||
                           option.value.toLowerCase().includes( searchValue );
                  } }
                  styles={ customStyles }
                  classNamePrefix="react-select"
                  formatCreateLabel={ ( inputValue ) => `Add "${inputValue}"` }
                  noOptionsMessage={ ( { inputValue } ) =>
                    inputValue ? `No options found for "${inputValue}". Press Enter to add it.` : 'No options available'
                  }
                  { ...props }
                />
              </div>
            </FormControl>
            <FormMessage className="ml-1 mt-1" />
          </FormItem>
        );
      } }
    />
  );
}
