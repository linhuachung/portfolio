import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useInputFocus } from "@/lib/hooks";

export function InputField( { name, control, register, errors, placeholder, onBlur, type, isSubmitting, ...props } ) {
  const { isFocused, setIsFocused } = useInputFocus( name, isSubmitting );

  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field } ) => (
        <FormItem className="relative w-full">
          <FormLabel
            htmlFor={ name }
            className={ `absolute left-3 transition-all text-gray-500 ${
              isFocused
                ? "z-10 bg-secondary text-white/60 -top-0.5 text-xs px-2 before:content-[''] before:absolute before:-z-10 before:left-0 before:right-0 before:top-0 before:bottom-0 before:bg-secondary before:rounded-sm"
                : "top-5 text-sm"
            } ${errors[name] ? "text-red-500" : ""}` }
          >
            { placeholder }
          </FormLabel>
          <FormControl>
            <Input
              id={ name }
              type={ type || "text" }
              placeholder=""
              className={ `input-autofill w-full pt-2 pb-2 bg-transparent border ${
                errors[name] ? "border-red-500" : "focus:border-accent"
              }` }
              onFocus={ () => setIsFocused( true ) }
              onBlur={ ( e ) => {
                setIsFocused( e.target.value !== "" );
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