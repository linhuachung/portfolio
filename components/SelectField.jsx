import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export function SelectField( { isSubmitting, name, control, options, errors, labelFocus, placeholder } ) {
  const [isFocused, setIsFocused] = useState( false );
  const [selectedValue, setSelectedValue] = useState( '' );

  useEffect( () => {
    setIsFocused( !!selectedValue );
  }, [selectedValue] );

  useEffect( () => {
    isSubmitting && setSelectedValue( '' );
  }, [isSubmitting] );

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field } ) => (
        <FormItem className="relative w-full">
          <FormLabel
            htmlFor={ name }
            className={ `absolute left-3 transition-all text-gray-500 ${
              isFocused
                ? 'z-10 bg-secondary text-white/60 -top-2 text-xs px-2 before:content-[\'\'] before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-secondary before:rounded-sm'
                : 'top-3 text-sm'
            } ${errors[name] ? 'text-red-500' : ''}` }
          >
            { !isFocused ? placeholder : labelFocus ? labelFocus : placeholder }
          </FormLabel>
          <Select
            value={ selectedValue }
            onValueChange={ ( value ) => {
              field.onChange( value );
              setSelectedValue( value );
              setIsFocused( true );
            } }
          >
            <FormControl>
              <SelectTrigger
                className={ `w-full pt-2 pb-2 bg-transparent ${errors[name] || errors[name] && isFocused ? 'border-red-500' : 'focus:border-accent'}` }>
                <SelectValue/>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              { options.map( ( { value, label } ) => (
                <SelectItem key={ value } value={ value }>
                  { label }
                </SelectItem>
              ) ) }
            </SelectContent>
          </Select>
          <FormMessage className="ml-1"/>
        </FormItem>
      ) }
    />
  );
}