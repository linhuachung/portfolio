'use client';

import { validateContactPayload } from '../../utils/contact-validation';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleOutlineRounded from '@mui/icons-material/CheckCircleOutlineRounded';
import ReplayRounded from '@mui/icons-material/ReplayRounded';
import SendRounded from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useRef, useState } from 'react';
import { BodyCopy, Kicker } from '@/features/portfolio/styles/PublicLayout.styles';
import { Confirmation, ContactForm, FieldGrid, FormActions, FormHeader, FormStep, FormStepper, FormTitle, MessageField, PrivacyNote, ReviewChips, StepCount, SubmitAlert, VisuallyHiddenLegend } from './ContactForm.styles';
import { CONTACT_SERVICE_VALUES, SERVICE_LABELS } from '../../constants/services';
import ContactField from '../ContactField';
import ServiceField from '../ServiceField';

const initialData = { name: '', email: '', service: '', message: '' };
const stepLabels = ['Contact details', 'Message'];

export default function FormContainer() {
  const [step, setStep] = useState( 1 );
  const [data, setData] = useState( initialData );
  const [errors, setErrors] = useState( {} );
  const [status, setStatus] = useState( 'idle' );
  const [submitError, setSubmitError] = useState( '' );
  const [pendingFocus, setPendingFocus] = useState( null );
  const fields = useRef( {} );
  const reduceMotion = useMediaQuery( '(prefers-reduced-motion: reduce)', { noSsr: true } );

  // Links such as "Discuss a role" open the form with a topic chosen (`/contact?topic=role`).
  useEffect( () => {
    const topic = new URLSearchParams( window.location.search ).get( 'topic' );
    if ( CONTACT_SERVICE_VALUES.includes( topic ) ) {
      setData( current => ( current.service ? current : { ...current, service: topic } ) );
    }
  }, [] );

  useEffect( () => {
    if ( !pendingFocus ) {return undefined;}
    const frame = requestAnimationFrame( () => {
      fields.current[pendingFocus]?.focus();
      setPendingFocus( null );
    } );
    return () => cancelAnimationFrame( frame );
  }, [pendingFocus, step] );

  const updateField = event => {
    const { name, value } = event.target;
    setData( current => ( { ...current, [name]: value } ) );
    setErrors( current => ( { ...current, [name]: undefined } ) );
    setSubmitError( '' );
    if ( status === 'error' ) {setStatus( 'idle' );}
  };

  const focusFirstError = nextErrors => {
    const first = ['name', 'email', 'service', 'message'].find( field => nextErrors[field] );
    if ( first ) {setPendingFocus( first );}
  };

  const continueToMessage = () => {
    const result = validateContactPayload( data );
    const firstStepErrors = Object.fromEntries( Object.entries( result.errors ).filter( ( [key] ) => key !== 'message' ) );
    if ( Object.keys( firstStepErrors ).length ) {
      setErrors( firstStepErrors );
      focusFirstError( firstStepErrors );
      return;
    }
    setSubmitError( '' );
    setStep( 2 );
    setPendingFocus( 'message' );
  };

  const goBack = () => {
    setStep( 1 );
    setSubmitError( '' );
    if ( status === 'error' ) {setStatus( 'idle' );}
  };

  const resetForm = () => {
    setData( initialData );
    setErrors( {} );
    setSubmitError( '' );
    setStep( 1 );
    setStatus( 'idle' );
  };

  const submit = async event => {
    event.preventDefault();
    const result = validateContactPayload( data );
    if ( !result.valid ) {
      setErrors( result.errors );
      if ( result.errors.name || result.errors.email || result.errors.service ) {setStep( 1 );}
      setSubmitError( '' );
      focusFirstError( result.errors );
      return;
    }

    setStatus( 'submitting' );
    setSubmitError( '' );
    try {
      const response = await fetch( '/api/user/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( result.data )
      } );
      const responseData = await response.json().catch( () => ( {} ) );
      if ( !response.ok ) {
        if ( Array.isArray( responseData.errors ) ) {
          const apiErrors = Object.fromEntries( responseData.errors.map( error => [error.field, error.message] ) );
          setErrors( apiErrors );
          if ( apiErrors.name || apiErrors.email || apiErrors.service ) {setStep( 1 );}
          setStatus( 'idle' );
          setSubmitError( '' );
          focusFirstError( apiErrors );
          return;
        }
        const message = response.status === 429
          ? 'Too many messages were sent. Try again later or use the direct email link.'
          : 'Message could not be sent. Try again or use the direct email link.';
        throw new Error( message );
      }
      setStatus( 'success' );
    } catch ( error ) {
      setStatus( 'error' );
      setSubmitError( error instanceof Error ? error.message : 'Message could not be sent. Try again or use the direct email link.' );
    }
  };

  if ( status === 'success' ) {
    return (
      <Confirmation elevation={ 0 } role="status" $reduceMotion={ reduceMotion } data-testid="contact-form-panel">
        <CheckCircleOutlineRounded aria-hidden="true" />
        <Kicker component="p">Message received</Kicker>
        <FormTitle component="h2">
          Thank you,
          { ' ' }
          { data.name }
          .
        </FormTitle>
        <BodyCopy component="p">Your note is in. I will review the context and reply by email.</BodyCopy>
        <Button type="button" variant="outlined" startIcon={ <ReplayRounded /> } onClick={ resetForm }>Send another</Button>
      </Confirmation>
    );
  }

  return (
    <ContactForm component="form" elevation={ 0 } onSubmit={ submit } noValidate data-testid="contact-form-panel">
      <FormHeader>
        <Box>
          <Kicker component="p">Start a conversation</Kicker>
          <FormTitle component="h2">
            { step === 1 ? 'Start with the essentials.' : 'Add the context that matters.' }
          </FormTitle>
        </Box>
        <StepCount size="small" label={ `Step ${step} of 2` } />
      </FormHeader>

      <FormStepper activeStep={ step - 1 } aria-label="Contact form progress">
        { stepLabels.map( label => <Step key={ label }><StepLabel>{ label }</StepLabel></Step> ) }
      </FormStepper>

      { submitError && <SubmitAlert severity="error" variant="outlined">{ submitError }</SubmitAlert> }

      { step === 1 ? (
        <FormStep component="fieldset" $reduceMotion={ reduceMotion } data-testid="contact-form-step">
          <VisuallyHiddenLegend component="legend">Contact details</VisuallyHiddenLegend>
          <FieldGrid>
            <ContactField label="Full Name" name="name" value={ data.name } error={ errors.name } onChange={ updateField } fieldRef={ node => { fields.current.name = node; } } autoComplete="name" />
            <ContactField label="Email" name="email" type="email" value={ data.email } error={ errors.email } onChange={ updateField } fieldRef={ node => { fields.current.email = node; } } autoComplete="email" />
            <ServiceField value={ data.service } error={ errors.service } onChange={ updateField } fieldRef={ node => { fields.current.service = node; } } />
          </FieldGrid>
          <FormActions $single>
            <PrivacyNote component="p">No phone number required.</PrivacyNote>
            <Button type="button" variant="contained" endIcon={ <ArrowForwardRounded /> } onClick={ continueToMessage }>Continue to Message</Button>
          </FormActions>
        </FormStep>
      ) : (
        <FormStep component="fieldset" $reduceMotion={ reduceMotion } data-testid="contact-form-step">
          <VisuallyHiddenLegend component="legend">Message and review</VisuallyHiddenLegend>
          <MessageField
            id="message"
            inputRef={ node => { fields.current.message = node; } }
            name="message"
            label="Message"
            multiline
            minRows={ 3 }
            value={ data.message }
            onChange={ updateField }
            autoComplete="off"
            error={ !!errors.message }
            helperText={ errors.message }
            fullWidth
            slotProps={ { htmlInput: { maxLength: 3000, 'aria-describedby': errors.message ? 'message-helper-text' : undefined } } }
          />
          <ReviewChips direction="row" spacing={ 1 } useFlexGap>
            <Chip size="small" label={ data.name } />
            <Chip size="small" label={ SERVICE_LABELS[data.service] } />
          </ReviewChips>
          <FormActions>
            <Button type="button" variant="text" startIcon={ <ArrowBackRounded /> } onClick={ goBack }>Back</Button>
            <Button type="submit" variant="contained" endIcon={ status === 'submitting' ? <CircularProgress size={ 16 } color="inherit" /> : <SendRounded /> } disabled={ status === 'submitting' }>
              { status === 'submitting' ? 'Sending...' : 'Send Message' }
            </Button>
          </FormActions>
        </FormStep>
      ) }
    </ContactForm>
  );
}
