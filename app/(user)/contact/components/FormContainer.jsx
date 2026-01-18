'use client';

import FormWrapper from '@/components/FormWrapper';
import { InputField } from '@/components/InputField';
import { PhoneField } from '@/components/PhoneField';
import { SelectField } from '@/components/SelectField';
import { TextareaField } from '@/components/TextareaField';
import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { CONTACT_SERVICES } from '@/constants/contact';
import { TOAST_STATUS } from '@/constants/toast';
import { submitContactForm } from '@/lib/api/contact';
import { formatPhoneForDisplay } from '@/lib/phone-utils';
import { validationContactSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { mapServiceValueToTranslationKey } from '@/lib/i18n-utils';

function FormContainer() {
  const t = useTranslations( 'contact.form' );
  const tServices = useTranslations( 'contact.services' );
  const form = useForm( {
    resolver: yupResolver( validationContactSchema ),
    mode: 'onChange'
  } );

  const {
    formState: { isSubmitting },
    reset,
    control
  } = form;

  const onSubmit = async ( data ) => {
    try {
      const formattedData = {
        ...data,
        phone: formatPhoneForDisplay( data.phone )
      };

      await submitContactForm( formattedData );
      reset( {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      } );
    } catch ( error ) {
      Toast( {
        title: t( 'failedToSend' ),
        type: TOAST_STATUS.error
      } );
    }
  };

  return (
    <>
      <FormWrapper
        form={ form }
        className="flex flex-col gap-6 px-10 py-8 bg-[#f5f5f5] dark:bg-secondary rounded-xl"
        onSubmit={ onSubmit }
        isLoading={ isSubmitting }
      >
        <h3 className="text-4xl text-accent-light dark:text-accent">{ t( 'title' ) }</h3>
        <p className="text-gray-700 dark:text-white/60 mt-5 mb-5">
          { t( 'description' ) }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField
            name="firstname"
            placeholder={ t( 'firstname' ) }
            control={ control }
            required={ true }
            isSubmitting={ isSubmitting }
          />
          <InputField
            name="lastname"
            placeholder={ t( 'lastname' ) }
            control={ control }
            required={ true }
            isSubmitting={ isSubmitting }
          />
          <InputField
            name="email"
            placeholder={ t( 'email' ) }
            control={ control }
            required={ true }
            isSubmitting={ isSubmitting }
          />
          <PhoneField
            name="phone"
            placeholder={ t( 'phone' ) }
            control={ control }
            isSubmitting={ isSubmitting }
          />
        </div>
        <div className="my-5">
          <SelectField
            name="service"
            options={ CONTACT_SERVICES.map( service => ( {
              ...service,
              label: tServices( mapServiceValueToTranslationKey( service.value ) )
            } ) ) }
            placeholder={ t( 'selectService' ) }
            labelFocus={ t( 'service' ) }
            control={ control }
            isSubmitting={ isSubmitting }
          />
        </div>
        <div className="mb-6">
          <TextareaField
            name="message"
            placeholder={ t( 'message' ) }
            control={ control }
            isSubmitting={ isSubmitting }
          />
        </div>
        <Button size="md" type="submit" className="max-w-40" disabled={ isSubmitting }>
          { isSubmitting ? t( 'sending' ) : t( 'sendMessage' ) }
        </Button>
      </FormWrapper>
    </>
  );
}

export default FormContainer;