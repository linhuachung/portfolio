import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function SelectField( { isSubmitting, name, control, options, labelFocus, placeholder } ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const error = fieldState?.error;
        const showError = !!error;
        const value = field.value || '';
        const isFocused = !!value && !isSubmitting;

        return (
          <FormItem className="relative w-full">
            <FormLabel
              htmlFor={ name }
              className={ `absolute left-3 transition-all text-gray-500 dark:text-gray-400 ${
                isFocused
                  ? 'z-10 bg-white dark:bg-secondary text-gray-600 dark:text-white/60 -top-2 text-xs px-2 before:content-[\'\'] before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-white dark:before:bg-secondary before:rounded-sm'
                  : 'top-3 text-sm'
              } ${showError ? 'text-red-500 dark:text-red-400' : ''}` }
            >
              { !isFocused ? placeholder : labelFocus ? labelFocus : placeholder }
            </FormLabel>
            <Select
              value={ value }
              onValueChange={ ( newValue ) => {
                field.onChange( newValue );
              } }
            >
              <FormControl>
                <SelectTrigger
                  className={ `w-full pt-2 pb-2 bg-transparent border-2 ${
                    showError
                      ? '!border-red-500 focus-visible:!border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 data-[state=open]:!border-red-500'
                      : 'border-gray-300 dark:border-white/20 focus-visible:border-accent-light dark:focus-visible:border-accent focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-1 data-[state=open]:border-accent-light dark:data-[state=open]:border-accent'
                  }` }
                >
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
        );
      } }
    />
  );
}