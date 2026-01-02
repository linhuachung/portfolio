import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getErrorMessage } from '@/lib/form-utils';

export function SelectionInputField( {
  name,
  control,
  type,
  className,
  onBlur,
  options,
  placeholderSelect,
  placeholderInput,
  disabled = false,
  ...props
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const fieldError = fieldState?.error;
        const typeError = getErrorMessage( fieldError, 'type' );
        const urlError = getErrorMessage( fieldError, 'url' );

        return (
          <div className="w-full space-y-1">
            <FormItem className={ `${className} space-y-0 flex items-center justify-center` }>
              <FormItem className="space-y-0 w-1/3">
                <Select
                  value={ field.value?.type || '' }
                  onValueChange={ ( value ) => {
                    field.onChange( { ...field.value, type: value } );
                  } }
                >
                  <FormControl>
                    <SelectTrigger
                      disabled={ disabled }
                      className={ `w-full pt-2 pb-2 bg-secondary-light dark:bg-secondary rounded-l-xl rounded-r-none border-2 ${
                        typeError ? '!border-red-500 focus-visible:!border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 data-[state=open]:!border-red-500' : 'border-gray-300 dark:border-white/20 focus-visible:border-accent-light dark:focus-visible:border-accent focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-1 data-[state=open]:border-accent-light dark:data-[state=open]:border-accent'
                      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}` }
                    >
                      <SelectValue placeholder={ placeholderSelect }/>
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
              </FormItem>

              <FormItem className="space-y-0 w-full mt-0">
                <FormControl>
                  <Input
                    id={ `${name}-url` }
                    type={ type || 'text' }
                    placeholder={ placeholderInput }
                    disabled={ disabled }
                    className={ `rounded-l-none input-autofill w-full pt-2 pb-2 bg-secondary-light dark:bg-secondary border-2 ${
                      urlError ? '!border-red-500 focus-visible:!border-red-500 focus-visible:ring-red-500 focus-visible:ring-1' : 'border-gray-300 dark:border-white/20 focus-visible:border-accent-light dark:focus-visible:border-accent focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-1'
                    } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}` }
                    onBlur={ ( event ) => {
                      onBlur && onBlur( event );
                    } }
                    onChange={ ( event ) => {
                      if ( !disabled ) {
                        field.onChange( { ...field.value, url: event.target.value } );
                      }
                    } }
                    value={ field.value?.url || '' }
                    { ...props }
                  />
                </FormControl>
              </FormItem>
            </FormItem>
            { ( typeError || urlError ) && (
              <div className="space-y-1">
                { typeError && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400 ml-1">
                    { typeError }
                  </p>
                ) }
                { urlError && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400 ml-1">
                    { urlError }
                  </p>
                ) }
              </div>
            ) }
          </div>
        );
      } }
    />
  );
}
