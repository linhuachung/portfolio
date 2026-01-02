'use client';

import FormWrapper from '@/components/FormWrapper';
import { InputField } from '@/components/InputField';
import { PhoneField } from '@/components/PhoneField';
import { SelectField } from '@/components/SelectField';
import { TextareaField } from '@/components/TextareaField';
import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import { TOAST_STATUS } from '@/constants/toast';
import { EmailSubmit } from '@/lib/email';
import { formatPhoneForDisplay } from '@/lib/phone-utils';
import { validationContactSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

function FormContainer() {
  const form = useForm( {
    resolver: yupResolver( validationContactSchema ),
    mode: 'onChange'
  } );

  const {
    formState: { isSubmitting },
    reset,
    control
  } = form;

  const services = [
    { value: 'fe', label: 'Frontend Development' },
    { value: 'be', label: 'Backend Development' },
    { value: 'fs', label: 'Fullstack Development' }
  ];

  const onSubmit = async ( data ) => {
    try {
      const formattedData = {
        ...data,
        phone: formatPhoneForDisplay( data.phone )
      };

      await EmailSubmit( formattedData );
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
        title: 'Failed to send the message. Please try again.',
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
        <h3 className="text-4xl text-accent-light dark:text-accent">Let&apos;s work together</h3>
        <p className="text-gray-700 dark:text-white/60 mt-5 mb-5">
          Excited to collaborate on impactful projects, I bring expertise in
          ReactJS, NextJS, and modern frontend development. Let’s connect to
          create seamless and engaging digital experiences together!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <InputField
            name="firstname"
            placeholder="Firstname"
            control={ control }
            isSubmitting={ isSubmitting }
          />
          <InputField
            name="lastname"
            placeholder="Lastname"
            control={ control }
            isSubmitting={ isSubmitting }
          />
          <InputField
            name="email"
            placeholder="Email"
            control={ control }
            isSubmitting={ isSubmitting }
          />
          <PhoneField
            name="phone"
            placeholder="Phone number"
            control={ control }
            isSubmitting={ isSubmitting }
            required={ true }
          />
        </div>
        <div className="my-5">
          <SelectField
            name="service"
            options={ services }
            placeholder="Select a service"
            labelFocus="Service"
            control={ control }
            isSubmitting={ isSubmitting }
          />
        </div>
        <div className="mb-6">
          <TextareaField
            name="message"
            placeholder="Type your message here"
            control={ control }
            isSubmitting={ isSubmitting }
          />
        </div>
        <Button size="md" type="submit" className="max-w-40" disabled={ isSubmitting }>
          { isSubmitting ? 'Sending...' : 'Send message' }
        </Button>
      </FormWrapper>
    </>
  );
}

export default FormContainer;