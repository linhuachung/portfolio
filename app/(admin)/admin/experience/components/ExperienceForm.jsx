'use client';

import { CompanyLogoField } from '@/components/CompanyLogoField';
import { DateField } from '@/components/DateField';
import { InputField } from '@/components/InputField';
import { MultiSelectField } from '@/components/MultiSelectField';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TECH_STACK_OPTIONS } from '@/constants/tech-stack';

export function ExperienceForm( { control, watch, setValue, setError, disabled = false, isSubmitting = false, onGeneratingChange = null } ) {
  const isCurrent = watch( 'isCurrent' );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="company"
          control={ control }
          placeholder="Company"
          disabled={ disabled }
          isSubmitting={ isSubmitting }
          required
        />
        <InputField
          name="position"
          control={ control }
          placeholder="Position"
          disabled={ disabled }
          isSubmitting={ isSubmitting }
          required
        />
      </div>

      <RichTextEditor
        name="description"
        control={ control }
        placeholder="Description"
        disabled={ disabled }
        showWordCount
        minLength={ 10 }
        maxLength={ 5000 }
        enableAIGenerate={ true }
        generateData={ {
          company: watch( 'company' ),
          position: watch( 'position' ),
          location: watch( 'location' ),
          techStack: watch( 'techStack' ) || [],
          startDate: watch( 'startDate' ),
          endDate: watch( 'endDate' ),
          isCurrent: watch( 'isCurrent' )
        } }
        onGeneratingChange={ onGeneratingChange }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DateField
          name="startDate"
          control={ control }
          placeholder="Start Date"
          disabled={ disabled }
          isSubmitting={ isSubmitting }
          required
        />
        <DateField
          name="endDate"
          control={ control }
          placeholder="End Date"
          disabled={ disabled || isCurrent }
          isSubmitting={ isSubmitting }
          required={ !isCurrent }
        />
      </div>

      <FormField
        control={ control }
        name="isCurrent"
        render={ ( { field } ) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={ field.value || false }
                onCheckedChange={ ( checked ) => {
                  field.onChange( checked );
                  if ( checked ) {
                    setValue( 'endDate', '', { shouldValidate: false } );
                  }
                } }
                disabled={ disabled }
              />
            </FormControl>
            <FormLabel className="text-sm font-normal cursor-pointer">
              Current Position
            </FormLabel>
            <FormMessage/>
          </FormItem>
        ) }
      />

      <InputField
        name="location"
        control={ control }
        placeholder="Location"
        disabled={ disabled }
        isSubmitting={ isSubmitting }
        required
      />

      <CompanyLogoField
        control={ control }
        watch={ watch }
        setValue={ setValue }
        setError={ setError }
        disabled={ disabled }
        isSubmitting={ isSubmitting }
      />

      <InputField
        name="companyWebsite"
        control={ control }
        placeholder="Company Website URL"
        type="url"
        disabled={ disabled }
        isSubmitting={ isSubmitting }
      />

      <MultiSelectField
        name="techStack"
        control={ control }
        placeholder="Tech Stack"
        disabled={ disabled }
        options={ TECH_STACK_OPTIONS }
      />
    </div>
  );
}

