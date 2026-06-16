'use client';

import { InputField } from '@/components/InputField';
import ImageUpload from '@/components/ImageUpload';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FORM_STYLES } from '@/constants/form-styles';
import * as React from 'react';

export function CompanyLogoField( {
  control,
  watch,
  setValue,
  setError,
  disabled = false,
  isSubmitting = false
} ) {
  const logoType = watch( 'companyLogoType' ) || 'link';

  return (
    <div className="space-y-4">
      <FormField
        control={ control }
        name="companyLogoType"
        render={ ( { field } ) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-sm font-medium text-gray-600 dark:text-white/80">
              Company Logo Type
            </FormLabel>
            <FormControl>
              <RadioGroup
                value={ field.value || 'link' }
                onValueChange={ field.onChange }
                disabled={ disabled }
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="link" id="link" />
                  <Label htmlFor="link" className={ `text-sm text-gray-700 dark:text-white/80 cursor-pointer ${disabled ? FORM_STYLES.disabled : ''}` }>
                    Link
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload" className={ `text-sm text-gray-700 dark:text-white/80 cursor-pointer ${disabled ? FORM_STYLES.disabled : ''}` }>
                    Upload
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        ) }
      />

      { logoType === 'link' ? (
        <InputField
          name="companyLogo"
          control={ control }
          placeholder="Company Logo URL"
          type="url"
          disabled={ disabled }
          isSubmitting={ isSubmitting }
        />
      ) : (
        <FormField
          control={ control }
          name="companyLogo"
          render={ () => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-medium text-gray-600 dark:text-white/80">
                Company Logo
              </FormLabel>
              <FormControl>
                <ImageUpload
                  name="companyLogo"
                  control={ control }
                  watch={ watch }
                  setValue={ setValue }
                  setError={ setError }
                  disabled={ disabled }
                  uploadType="company-logo"
                  width={ 200 }
                  height={ 200 }
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />
      ) }
    </div>
  );
}
