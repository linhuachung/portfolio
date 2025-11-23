import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useInputFocus } from '@/lib/hooks';

export function TextareaField( {
  name,
  control,
  errors,
  placeholder,
  onBlur,
  isSubmitting,
  className,
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
                ? 'z-10 -top-2.5 text-xs px-2 text-gray-600 dark:text-white/80 bg-[#f5f5f5] dark:bg-secondary'
                : 'top-4 text-sm text-gray-500 dark:text-gray-400'
            } ${errors[name] ? 'text-red-500 dark:text-red-400' : ''}` }
          >
            { placeholder }
          </FormLabel>
          <FormControl>
            <Textarea
              id={ name }
              className={ `w-full pt-4 pb-3 bg-transparent h-[200px] ${errors[name] ? 'border-red-500 focus-visible:ring-red-500 focus-visible:ring-0' : 'focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-offset-0'}` }
              placeholder=""
              onFocus={ () => setIsFocused( true ) }
              onBlur={ ( e ) => {
                setIsFocused( e.target.value !== '' );
                onBlur && onBlur( e );
              } }
              value={ field.value || '' }
              { ...field }
              { ...props }
            />
          </FormControl>
          <FormMessage className="ml-1"/>
        </FormItem>
      ) }
    />
  );
}