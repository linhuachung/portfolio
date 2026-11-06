'use client';

import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';

export function DateField( {
  name,
  control,
  placeholder,
  disabled = false,
  required = false,
  labelFocusClass = '',
  className,
  captionLayout = 'dropdown'
} ) {
  const [open, setOpen] = React.useState( false );

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const error = fieldState?.error;
        const showError = !!error;
        const isRequired = required || fieldState?.error?.type === 'required';

        // Parse date from field.value - use field.value directly, not a separate state
        let dateValue = undefined;
        if ( field.value ) {
          try {
            const date = new Date( field.value );
            if ( !isNaN( date.getTime() ) ) {
              dateValue = date;
            }
          } catch ( e ) {
            console.error( 'Invalid date value:', field.value, e );
          }
        }

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
              <Popover open={ open } onOpenChange={ setOpen }>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id={ name }
                    disabled={ disabled }
                    className={ `w-full justify-between font-normal h-[48px] pt-4 pb-3 bg-secondary-light dark:bg-secondary border-2 ${
                      showError ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-white/20'
                    } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} text-white dark:text-white` }
                  >
                    { dateValue ? dateValue.toLocaleDateString() : ( placeholder || 'Select date' ) }
                    <ChevronDownIcon className="text-white dark:text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-visible p-0" align="start">
                  <Calendar
                    mode="single"
                    defaultMonth={ dateValue || new Date() }
                    selected={ dateValue }
                    captionLayout={ captionLayout }
                    disabled={ disabled }
                    onSelect={ ( selectedDate ) => {
                      if ( selectedDate ) {
                        const dateString = selectedDate.toISOString().split( 'T' )[0];
                        field.onChange( dateString );
                        setOpen( false );
                      } else {
                        field.onChange( '' );
                      }
                    } }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage className="ml-1 mt-1" />
          </FormItem>
        );
      } }
    />
  );
}
