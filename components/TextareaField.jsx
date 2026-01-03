import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FORM_STYLES, getInputBorderStyles } from '@/constants/form-styles';
import { useInputFocus } from '@/lib/hooks';

export function TextareaField( {
  name,
  control,
  placeholder,
  onBlur,
  isSubmitting,
  className,
  showWordCount = false,
  minLength,
  maxLength,
  rows,
  disabled = false,
  ...props
} ) {
  const { isFocused, setIsFocused } = useInputFocus( name, isSubmitting );

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const { onChange, onBlur: fieldOnBlur, name: fieldName, value, ref } = field;
        const error = fieldState?.error;
        const showError = !!error;

        const text = value || '';
        const wordCount = text.trim() ? text.trim().split( /\s+/ ).length : 0;
        const charCount = text.length;

        return (
          <FormItem className={ `${className} space-y-1 relative w-full` }>
            <FormLabel
              htmlFor={ name }
              className={ `absolute left-4 transition-all duration-200 pointer-events-none ${
                isFocused || value
                  ? 'z-10 -top-2.5 text-xs px-2 text-gray-600 dark:text-white/80 bg-[#f5f5f5] dark:bg-secondary'
                  : 'top-4 text-sm text-gray-500 dark:text-gray-400'
              } ${showError ? 'text-red-500 dark:text-red-400' : ''}` }
            >
              { placeholder }
            </FormLabel>
            <FormControl>
              <Textarea
                id={ name }
                disabled={ disabled }
                rows={ rows || 5 }
                className={ `w-full pt-4 pb-3 bg-secondary-light dark:bg-secondary border-2 ${
                  rows ? '' : 'h-[200px]'
                } ${getInputBorderStyles( showError )} ${disabled ? FORM_STYLES.disabled : ''}` }
                placeholder=""
                onFocus={ () => !disabled && setIsFocused( true ) }
                onBlur={ ( e ) => {
                  setIsFocused( e.target.value !== '' );
                  fieldOnBlur && fieldOnBlur( e );
                  onBlur && onBlur( e );
                } }
                onChange={ ( e ) => {
                  if ( !disabled ) {
                    onChange( e );
                  }
                } }
                value={ value || '' }
                name={ fieldName }
                ref={ ref }
                maxLength={ maxLength }
                { ...props }
              />
            </FormControl>
            { showWordCount && (
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400 px-1">
                <span>
                  { wordCount } { wordCount === 1 ? 'word' : 'words' }
                </span>
                <span className={ `${charCount < ( minLength || 0 ) || charCount > ( maxLength || Infinity ) ? 'text-red-500' : ''}` }>
                  { charCount }/{ maxLength || '∞' } characters
                  { minLength && ` (min: ${minLength})` }
                </span>
              </div>
            ) }
            <FormMessage className="ml-1"/>
          </FormItem>
        );
      } }
    />
  );
}