import * as Yup from "yup";

export const validationContactSchema = Yup.object().shape( {
  firstname: Yup.string()
    .required( "Firstname is required" )
    .matches( /^[a-zA-Z\s]+$/, "Please enter a valid firstname (letters only)" ),
  lastname: Yup.string()
    .required( "Lastname is required" )
    .matches( /^[a-zA-Z\s]+$/, "Please enter a valid lastname (letters only)" ),
  email: Yup.string().email( "Invalid email address" ).required( "Email is required" ),
  phone: Yup.string()
    .required( "Phone number is required" )
    .matches( /^[0-9]+$/, "Phone number must be numeric" ),
  service: Yup.string().required( "Please select a service" ),
  message: Yup.string().min( 10, "Message must be at least 10 characters" ).required( "Message is required" )
} );

export const validationAdminLoginSchema = Yup.object().shape( {
  username: Yup.string()
    .required( "username is required" ),
  password: Yup.string()
    .required( "password is required" )
} );

export const validationEditProfileSchema = Yup.object().shape( {
  email: Yup.string().email( "Invalid email" ).required( "Email is required" ),
  name: Yup.string().required( "Name is required" ),
  bio: Yup.string()
} );