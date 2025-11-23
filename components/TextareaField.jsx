import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
            className={ `absolute left-3 transition-all text-gray-500 ${
              isFocused
                ? 'z-10 bg-secondary text-white/60 -top-2 text-xs px-2 before:content-[\'\'] before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-secondary before:rounded-sm'
                : 'top-3 text-sm'
            } ${errors[name] ? 'text-red-500' : ''}` }
          >
            { placeholder }
          </FormLabel>
          <FormControl>
            <Textarea
              id={ name }
              className={ `w-full pt-2 pb-2 bg-transparent h-[200px] ${errors[name] ? 'border-red-500 focus-visible:accent-red-500 focus-visible:ring-0' : 'focus-visible:ring-accent focus-visible:ring-offset-0'}` }
              placeholder=""
              onFocus={ () => setIsFocused( true ) }
              onBlur={ ( e ) => {
                setIsFocused( e.target.value !== '' );
                onBlur && onBlur( e );
              } }
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