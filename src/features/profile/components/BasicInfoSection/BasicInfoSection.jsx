import { AddressField } from '@/shared/components/form/AddressField';
import ImageUpload from '@/features/uploads/components/ImageUpload';
import { InputField } from '@/shared/components/form/InputField';
import { PhoneField } from '@/shared/components/form/PhoneField';
import { TextareaField } from '@/shared/components/form/TextareaField';
import { FormSection, SectionHeading } from '@/features/admin-shell/styles/Admin.styles';

export default function BasicInfoSection( { control, watch, setValue, setError, clearErrors, disabled = false, isSubmitting = false } ) {
  return (
    <FormSection>
      <SectionHeading component="h2">Basic Information</SectionHeading>

      <ImageUpload
        watch={ watch }
        control={ control }
        name="avatar"
        setValue={ setValue }
        width={ 120 }
        height={ 120 }
        setError={ setError }
        clearErrors={ clearErrors }
        disabled={ disabled }
      />

      <InputField
        control={ control }
        placeholder="Email"
        name="email"
        required={ true }
        disabled={ disabled }
      />

      <InputField
        control={ control }
        placeholder="Name"
        name="name"
        required={ true }
        disabled={ disabled }
      />

      <PhoneField
        control={ control }
        placeholder="Phone"
        name="phone"
        disabled={ disabled }
      />

      <TextareaField
        control={ control }
        placeholder="Bio (Short description)"
        name="bio"
        rows={ 3 }
        disabled={ disabled }
      />

      <AddressField
        control={ control }
        setValue={ setValue }
        setError={ setError }
        clearErrors={ clearErrors }
        disabled={ disabled }
        isSubmitting={ isSubmitting }
      />
    </FormSection>
  );
}
