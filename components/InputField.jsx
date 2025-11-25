import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useInputFocus } from '@/lib/hooks';

export function InputField( {
  name,
  control,
  errors,
  placeholder,
  onBlur,
  type,
  isSubmitting,
  className,
  onChange,
  register: _register,
  ...props
} ) {
  const { isFocused, setIsFocused } = useInputFocus( name, isSubmitting );
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field } ) => (
        <FormItem className={ `${className} space-y-0 relative w-full` }>
          <FormLabel
            htmlFor={ name }
            className={ `absolute left-4 transition-all duration-200 pointer-events-none ${
              isFocused || field.value
                ? 'z-10 -top-2.5 text-xs px-2 text-gray-600 dark:text-white/80 bg-secondary-light dark:bg-secondary'
                : 'top-3.5 text-sm text-gray-500 dark:text-gray-400'
            } ${errors[name] ? 'text-red-500 dark:text-red-400' : ''}` }
          >
            { placeholder }
          </FormLabel>
          <FormControl>
            <Input
              id={ name }
              type={ type || 'text' }
              placeholder=""
              className={ `input-autofill w-full pt-4 pb-3 bg-secondary-light dark:bg-secondary border ${
                errors[name] ? 'border-red-500' : 'focus:border-accent-light dark:focus:border-accent'
              }` }

              onFocus={ () => setIsFocused( true ) }
              onBlur={ ( e ) => {
                setIsFocused( e.target.value !== '' );
                onBlur && onBlur( e );
              } }
              onChange={ ( e ) => {
                field.onChange( e );
                onChange && onChange( e );
              } }
              value={ field.value || '' }
              { ...props }
            />
          </FormControl>
        </FormItem>
      ) }
    />
  );
}