'use client';

import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ServiceControl } from './ServiceField.styles';
import { CONTACT_SERVICES } from '../../constants/services';

export default function ServiceField( { value, error, onChange, fieldRef } ) {
  return (
    <ServiceControl fullWidth error={ !!error }>
      <InputLabel id="service-label">Conversation topic</InputLabel>
      <Select
        labelId="service-label"
        id="service"
        inputRef={ fieldRef }
        name="service"
        label="Conversation topic"
        value={ value }
        onChange={ onChange }
        inputProps={ { autoComplete: 'off', 'aria-describedby': error ? 'service-error' : undefined } }
      >
        { CONTACT_SERVICES.map( ( { value: optionValue, label } ) => <MenuItem value={ optionValue } key={ optionValue }>{ label }</MenuItem> ) }
      </Select>
      { error && <FormHelperText id="service-error" role="alert">{ error }</FormHelperText> }
    </ServiceControl>
  );
}
