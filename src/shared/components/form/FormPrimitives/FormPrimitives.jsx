'use client';
/* eslint-disable react-refresh/only-export-components */
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import MuiFormLabel from '@mui/material/FormLabel';
import * as React from 'react';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';

const Form = FormProvider;
const FormFieldContext = React.createContext( {} );
const FormItemContext = React.createContext( {} );

const FormField = props => (
  <FormFieldContext.Provider value={ { name: props.name } }>
    <Controller { ...props } />
  </FormFieldContext.Provider>
);

const useFormField = () => {
  const fieldContext = React.useContext( FormFieldContext );
  const itemContext = React.useContext( FormItemContext );
  const { getFieldState, formState } = useFormContext();

  if ( !fieldContext.name ) {
    throw new Error( 'useFormField must be used within FormField' );
  }

  const fieldState = getFieldState( fieldContext.name, formState );
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};

const FormItem = React.forwardRef( ( props, ref ) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={ { id } }>
      <Box ref={ ref } sx={ { display: 'grid', gap: 1 } } { ...props } />
    </FormItemContext.Provider>
  );
} );
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef( ( props, ref ) => {
  const { error, formItemId } = useFormField();
  return (
    <MuiFormLabel
      ref={ ref }
      htmlFor={ formItemId }
      error={ !!error }
      { ...props }
    />
  );
} );
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef( ( { children, ...props }, ref ) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  const child = React.Children.only( children );

  return React.cloneElement( child, {
    ...props,
    ref,
    id: formItemId,
    'aria-describedby': error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId,
    'aria-invalid': !!error
  } );
} );
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef( ( props, ref ) => {
  const { formDescriptionId } = useFormField();
  return <FormHelperText ref={ ref } id={ formDescriptionId } { ...props }/>;
} );
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef( ( { children, ...props }, ref ) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String( error.message || '' ) : children;

  if ( !body ) {return null;}

  return (
    <FormHelperText ref={ ref } id={ formMessageId } error={ !!error } { ...props }>
      { body }
    </FormHelperText>
  );
} );
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
};
