import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FORM_STYLES, getInputBorderStyles } from '@/constants/form-styles';

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
        const showError = !!error;
        const value = field.value || '';
        const isFocused = !!value && !isSubmitting;
        const displayLabel = isFocused && labelFocus ? labelFocus : placeholder;

        const handleValueChange = ( newValue ) => {
          field.onChange( newValue );
          if ( onValueChange ) {
            onValueChange( newValue );
          }
        };

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
              { displayLabel }
            </FormLabel>
            <Select
              value={ value }
              onValueChange={ handleValueChange }
              disabled={ disabled }
            >
              <FormControl>
                <SelectTrigger
                  className={ `w-full pt-2 pb-2 bg-transparent border-2 ${getInputBorderStyles( showError, true )} ${disabled ? FORM_STYLES.disabled : ''}` }
                >
                  <SelectValue/>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                { options.map( ( { value: optionValue, label } ) => (
                  <SelectItem key={ optionValue } value={ optionValue }>
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