import { isValidPhoneNumber } from '@/lib/phone-utils';
import { validateCityForCountry } from '@/lib/address-utils';
import * as Yup from 'yup';

export const validationContactSchema = Yup.object().shape( {
  firstname: Yup.string()
    .required( 'Firstname is required' )
    .matches( /^[a-zA-Z\s]+$/, 'Please enter a valid firstname (letters only)' ),
  lastname: Yup.string()
    .required( 'Lastname is required' )
    .matches( /^[a-zA-Z\s]+$/, 'Please enter a valid lastname (letters only)' ),
  email: Yup.string().email( 'Invalid email address' ).required( 'Email is required' ),
  phone: Yup.string()
    .required( 'Phone number is required' )
    .test( 'phone-format', 'Please enter a valid phone number', isValidPhoneNumber ),
  service: Yup.string().required( 'Please select a service' ),
  message: Yup.string().min( 10, 'Message must be at least 10 characters' ).required( 'Message is required' )
} );

export const validationAdminLoginSchema = Yup.object().shape( {
  username: Yup.string()
    .required( 'username is required' ),
  password: Yup.string()
    .required( 'password is required' )
} );

export const validationEditProfileSchema = Yup.object().shape( {
  email: Yup.string().email( 'Invalid email' ).required( 'Email is required' ),
  name: Yup.string().required( 'Name is required' ),
  bio: Yup.string(),
  title: Yup.string(),
  greeting: Yup.string(),
  bioParagraph: Yup.string()
    .min( 50, 'Bio paragraph must be at least 50 characters' )
    .max( 1000, 'Bio paragraph must not exceed 1000 characters' ),
  addressCountry: Yup.string()
    .nullable()
    .transform( ( value ) => value || null ),
  addressCity: Yup.string()
    .nullable()
    .when( 'addressCountry', {
      is: ( country ) => country && country.trim() !== '',
      then: ( schema ) => schema.test(
        'city-in-country',
        'City must belong to the selected country',
        function( value ) {
          const { addressCountry } = this.parent;
          if ( !value || !addressCountry ) {return true;}

          const validation = validateCityForCountry( value, addressCountry );
          return validation.valid;
        }
      ),
      otherwise: ( schema ) => schema.nullable()
    } )
    .transform( ( value ) => value || null ),
  address: Yup.string()
    .max( 200, 'Address must not exceed 200 characters' )
    .nullable()
    .transform( ( value ) => value || null ),
  stats: Yup.object().shape( {
    years: Yup.number()
      .required( 'Years of experience is required' )
      .transform( ( value, originalValue ) => {
        // Convert empty string to NaN so required validation can catch it
        if ( originalValue === '' || originalValue === null || originalValue === undefined ) {
          return NaN;
        }
        const num = Number( originalValue );
        return isNaN( num ) ? NaN : num;
      } )
      .typeError( 'Years of experience must be a valid number' )
      .min( 0, 'Years of experience must be 0 or greater' )
      .integer( 'Years of experience must be a whole number' )
      .max( 100, 'Years of experience cannot exceed 100' ),
    projects: Yup.number()
      .required( 'Projects completed is required' )
      .transform( ( value, originalValue ) => {
        if ( originalValue === '' || originalValue === null || originalValue === undefined ) {
          return NaN;
        }
        const num = Number( originalValue );
        return isNaN( num ) ? NaN : num;
      } )
      .typeError( 'Projects completed must be a valid number' )
      .min( 0, 'Projects completed must be 0 or greater' )
      .integer( 'Projects completed must be a whole number' )
      .max( 10000, 'Projects completed cannot exceed 10000' ),
    technologies: Yup.number()
      .required( 'Technologies mastered is required' )
      .transform( ( value, originalValue ) => {
        if ( originalValue === '' || originalValue === null || originalValue === undefined ) {
          return NaN;
        }
        const num = Number( originalValue );
        return isNaN( num ) ? NaN : num;
      } )
      .typeError( 'Technologies mastered must be a valid number' )
      .min( 0, 'Technologies mastered must be 0 or greater' )
      .integer( 'Technologies mastered must be a whole number' )
      .max( 1000, 'Technologies mastered cannot exceed 1000' ),
    commits: Yup.number()
      .required( 'Code commits is required' )
      .transform( ( value, originalValue ) => {
        if ( originalValue === '' || originalValue === null || originalValue === undefined ) {
          return NaN;
        }
        const num = Number( originalValue );
        return isNaN( num ) ? NaN : num;
      } )
      .typeError( 'Code commits must be a valid number' )
      .min( 0, 'Code commits must be 0 or greater' )
      .integer( 'Code commits must be a whole number' )
      .max( 1000000, 'Code commits cannot exceed 1000000' )
  } ),
  cvPath: Yup.string(),
  socialLinks: Yup.array().of( Yup.object().shape( {
    type: Yup.string()
      .required( 'Please select a social platform' )
      .test( 'type-not-empty', 'Please select a social platform', ( value ) => {
        return value && value.trim() !== '';
      } ),
    url: Yup.string()
      .required( 'Please enter a URL' )
      .test( 'url-not-empty', 'Please enter a URL', ( value ) => {
        return value && value.trim() !== '';
      } )
      .test( 'url-format', 'Please enter a valid URL (e.g., https://example.com)', ( value ) => {
        if ( !value || value.trim() === '' ) {
          return true; // Let required handle empty
        }
        try {
          new URL( value.trim() );
          return true;
        } catch {
          return false;
        }
      } )
      .test( 'url-protocol', 'URL must start with http:// or https://', ( value ) => {
        if ( !value || value.trim() === '' ) {
          return true; // Let required handle empty
        }
        const trimmed = value.trim();
        return trimmed.startsWith( 'http://' ) || trimmed.startsWith( 'https://' );
      } )
  } ) )
} );