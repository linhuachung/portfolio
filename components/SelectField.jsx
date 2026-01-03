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
              className={ `absolute left-4 transition-all duration-200 pointer-events-none text-gray-500 dark:text-gray-400 ${
                isFocused
                  ? 'z-10 -top-1 text-xs px-2 text-gray-600 dark:text-white/80 bg-secondary-light dark:bg-secondary'
                  : 'top-[17.5px] text-sm'
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
                  className={ `w-full pt-2 pb-2 bg-secondary-light dark:bg-secondary border-2 ${getInputBorderStyles( showError, true )} ${disabled ? FORM_STYLES.disabled : ''}` }
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