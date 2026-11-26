'use client';

import TextField from '@mui/material/TextField';

export default function ContactField( { label, name, type = 'text', value, error, onChange, fieldRef, autoComplete } ) {
  return (
    <TextField
      id={ name }
      inputRef={ fieldRef }
      type={ type }
      name={ name }
      label={ label }
      value={ value }
      onChange={ onChange }
      autoComplete={ autoComplete }
      error={ !!error }
      helperText={ error }
      fullWidth
      slotProps={ { htmlInput: { spellCheck: type === 'email' ? false : undefined, 'aria-describedby': error ? `${name}-helper-text` : undefined } } }
    />
  );
}
