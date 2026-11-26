import { validateCityForCountry } from '@/lib/address-utils';
import * as Yup from 'yup';

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
