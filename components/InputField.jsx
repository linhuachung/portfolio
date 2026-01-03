import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FORM_STYLES, getInputBorderStyles } from '@/constants/form-styles';
import { useInputFocus } from '@/lib/hooks';

export function InputField( {
  name,
  control,
  placeholder,
  onBlur,
  type,
  isSubmitting,
  className,
  onChange,
  required = false,
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

        return (
          <FormItem className={ `${className} space-y-1 relative w-full` }>
            <FormLabel
              htmlFor={ name }
              className={ `absolute left-4 transition-all duration-200 pointer-events-none ${
                isFocused || field.value
                  ? 'z-10 -top-1 text-xs px-2 text-gray-600 dark:text-white/80 bg-secondary-light dark:bg-secondary'
                  : 'top-[17.5px] text-sm text-gray-500 dark:text-gray-400'
              } ${showError ? 'text-red-500 dark:text-red-400' : ''}` }
            >
              { placeholder }
              { isRequired && <span className="text-red-500 dark:text-red-400 ml-1">*</span> }
            </FormLabel>
            <FormControl>
              <Input
                id={ name }
                type={ type || 'text' }
                placeholder=""
                disabled={ disabled }
                className={ `input-autofill w-full pt-4 pb-3 bg-secondary-light dark:bg-secondary border-2 ${getInputBorderStyles( showError )} ${disabled ? FORM_STYLES.disabled : ''}` }
                onFocus={ () => !disabled && setIsFocused( true ) }
                onBlur={ ( e ) => {
                  setIsFocused( e.target.value !== '' );
                  onBlur && onBlur( e );
                } }
                onChange={ ( e ) => {
                  if ( !disabled ) {
                    field.onChange( e );
                    onChange && onChange( e );
                  }
                } }
                value={ field.value || '' }
                { ...props }
              />
            </FormControl>
            <FormMessage className="ml-1 mt-1" />
          </FormItem>
        );
      } }
    />
  );
}