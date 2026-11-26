import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FormField, FormItem } from '@/shared/components/form/FormPrimitives';
import TextField from '@mui/material/TextField';

export function TextareaField( {
  name,
  control,
  placeholder,
  onBlur,
  isSubmitting,
  showWordCount = false,
  minLength,
  maxLength,
  rows,
  disabled = false,
  ...props
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const { onChange, onBlur: fieldOnBlur, value, ref } = field;
        const error = fieldState?.error;

        const text = value || '';
        const wordCount = text.trim() ? text.trim().split( /\s+/ ).length : 0;
        const charCount = text.length;

        return (
          <FormItem>
            <TextField
              id={ name }
              disabled={ disabled || isSubmitting }
              rows={ rows || 5 }
              label={ placeholder }
              error={ !!error }
              helperText={ error?.message }
              onBlur={ ( e ) => {
                fieldOnBlur && fieldOnBlur( e );
                onBlur && onBlur( e );
              } }
              onChange={ ( e ) => {
                if ( !disabled ) {
                  onChange( e );
                }
              } }
              value={ value || '' }
              inputRef={ ref }
              multiline
              fullWidth
              slotProps={ { htmlInput: { maxLength } } }
              { ...props }
            />
            { showWordCount && (
              <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: .5, color: 'text.secondary', fontSize: '.75rem' } }>
                <Typography component="span">
                  { wordCount } { wordCount === 1 ? 'word' : 'words' }
                </Typography>
                <Typography component="span" color={ charCount < ( minLength || 0 ) || charCount > ( maxLength || Infinity ) ? 'error.main' : 'inherit' }>
                  { charCount }/{ maxLength || '∞' } characters
                  { minLength && ` (min: ${minLength})` }
                </Typography>
              </Box>
            ) }
          </FormItem>
        );
      } }
    />
  );
}
