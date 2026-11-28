import Typography from '@mui/material/Typography';
import FileUpload from '@/features/uploads/components/FileUpload';
import { InputField } from '@/shared/components/form/InputField';
import { RichTextEditor } from '@/shared/components/form/RichTextEditor';
import { BIO_PARAGRAPH_CONFIG } from '../../constants/profile-form';
import { FormSection, SectionHeading } from '@/features/admin-shell/styles/Admin.styles';

export default function HomepageContentSection( { control, watch, setValue, setError, disabled = false } ) {
  return (
    <FormSection>
      <SectionHeading component="h2">Database Profile Copy</SectionHeading>
      <Typography component="p" sx={ { color: 'text.secondary', fontSize: '.76rem', lineHeight: 1.45 } }>Maintained for operational compatibility. Public pages continue to use the verified local content source.</Typography>

      <InputField
        control={ control }
        placeholder="Title (e.g., Frontend Developer)"
        name="title"
        disabled={ disabled }
      />

      <InputField
        control={ control }
        placeholder="Greeting (e.g., Hello I'm)"
        name="greeting"
        disabled={ disabled }
      />

      <RichTextEditor
        control={ control }
        placeholder="Bio Paragraph (for homepage - you can use formatting and line breaks)"
        name="bioParagraph"
        showWordCount={ true }
        minLength={ BIO_PARAGRAPH_CONFIG.minLength }
        maxLength={ BIO_PARAGRAPH_CONFIG.maxLength }
        disabled={ disabled }
      />

      <FileUpload
        control={ control }
        name="cvPath"
        watch={ watch }
        setValue={ setValue }
        setError={ setError }
        accept=".pdf"
        maxSizeMB={ 10 }
        disabled={ disabled }
      />
    </FormSection>
  );
}
