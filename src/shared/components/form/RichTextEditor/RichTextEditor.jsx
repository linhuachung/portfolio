'use client';

import { FormField, FormItem } from '../FormPrimitives';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export function RichTextEditor( {
  name,
  control,
  placeholder,
  onBlur,
  showWordCount = false,
  minLength,
  maxLength,
  disabled = false
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const { onChange, onBlur: fieldOnBlur, value, ref } = field;
        const error = fieldState?.error;

        const plainText = value ? value.replace( /<[^>]*>/g, '' ).trim() : '';
        const wordCount = plainText ? plainText.split( /\s+/ ).length : 0;
        const charCount = plainText.length;

        return (
          <FormItem>
            <TextField
              id={ name }
              value={ plainText }
              onChange={ event => onChange( event.target.value ) }
              onBlur={ event => {
                fieldOnBlur?.( event );
                onBlur?.( event );
              } }
              disabled={ disabled }
              inputRef={ ref }
              multiline
              label={ placeholder }
              required={ !!( minLength || maxLength ) }
              error={ !!error }
              helperText={ error?.message }
              minRows={ 8 }
              maxRows={ 14 }
              slotProps={ { htmlInput: { maxLength } } }
              fullWidth
              sx={ { fontFamily: 'var(--font-jetbrainsMono)', '& textarea': { resize: 'vertical' } } }
            />
            { showWordCount && (
              <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: .5, color: 'text.secondary', fontSize: '.75rem' } }>
                <Typography component="span">
                  { wordCount } { wordCount === 1 ? 'word' : 'words' }
                </Typography>
                <Typography component="span" color={ charCount < ( minLength || 0 ) || charCount > ( maxLength || Infinity ) ? 'error.main' : 'inherit' }>
                  { charCount }/{ maxLength ?? '∞' } characters
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

