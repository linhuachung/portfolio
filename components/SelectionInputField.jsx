import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SelectionInputField( {
  name,
  control,
  errors,
  type,
  className,
  onBlur,
  options,
  placeholderSelect,
  placeholderInput,
  ...props
} ) {

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field } ) => (
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
                  className={ `w-full pt-2 pb-2 bg-transparent rounded-l-xl rounded-r-none ${
                    errors[name] ? 'border-red-500' : 'focus:border-accent'
                  }` }
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
            <FormMessage className="ml-1"/>
          </FormItem>

          <FormItem className="space-y-0 w-full mt-0">
            <FormControl>
              <Input
                id={ name }
                type={ type || 'text' }
                placeholder={ placeholderInput }
                className={ `rounded-l-none input-autofill w-full pt-2 pb-2 bg-transparent border ${
                  errors[name] ? 'border-red-500' : 'focus:border-accent'
                }` }
                onBlur={ ( event ) => {
                  onBlur && onBlur( event );
                } }
                onChange={ ( event ) => {
                  field.onChange( { ...field.value, value: event.target.value } );
                } }
                value={ field.value?.value || '' }
                { ...props }
              />
            </FormControl>
          </FormItem>
        </FormItem>
      ) }
    />
  );
}
