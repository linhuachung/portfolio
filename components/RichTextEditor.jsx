'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FORM_STYLES, getInputBorderStyles } from '@/constants/form-styles';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic( () => import( 'react-quill' ), { ssr: false } );

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ]
};

const QUILL_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'list',
  'bullet',
  'link'
];

export function RichTextEditor( {
  name,
  control,
  placeholder,
  onBlur,
  className,
  showWordCount = false,
  minLength,
  maxLength,
  disabled = false
} ) {
  return (
    <FormField
      control={ control }
      name={ name }
      render={ ( { field, fieldState } ) => {
        const { onChange, onBlur: fieldOnBlur, value } = field;
        const error = fieldState?.error;
        const showError = !!error;

        const plainText = value ? value.replace( /<[^>]*>/g, '' ).trim() : '';
        const wordCount = plainText ? plainText.split( /\s+/ ).length : 0;
        const charCount = plainText.length;

        const handleChange = ( content ) => {
          const plainText = content.replace( /<[^>]*>/g, '' );

          if ( maxLength && plainText.length > maxLength ) {
            return;
          }

          onChange( content );
        };

        return (
          <FormItem className={ `${className} space-y-2 w-full` }>
            <FormLabel
              htmlFor={ name }
              className={ `block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200 ${showError ? 'text-red-500 dark:text-red-400' : ''}` }
            >
              { placeholder }
              { ( minLength || maxLength ) && <span className="text-red-500 dark:text-red-400 ml-1">*</span> }
            </FormLabel>
            <FormControl>
              { disabled ? (
                <div
                  className={ `w-full pt-4 pb-4 px-4 bg-secondary-light dark:bg-secondary border-2 rounded-xl min-h-[200px] max-h-[400px] overflow-y-auto text-base text-gray-900 dark:text-white ${getInputBorderStyles( showError )} ${disabled ? FORM_STYLES.disabled : ''}` }
                  style={ { fontFamily: 'var(--font-jetbrainsMono)' } }
                  dangerouslySetInnerHTML={ { __html: value || '' } }
                />
              ) : (
                <div className={ `rich-text-editor-wrapper border-2 rounded-xl ${getInputBorderStyles( showError )}` }>
                  <ReactQuill
                    theme="snow"
                    value={ value || '' }
                    onChange={ handleChange }
                    onBlur={ ( e ) => {
                      fieldOnBlur && fieldOnBlur( e );
                      onBlur && onBlur( e );
                    } }
                    modules={ QUILL_MODULES }
                    formats={ QUILL_FORMATS }
                    placeholder=""
                    style={ {
                      minHeight: '200px',
                      backgroundColor: 'transparent'
                    } }
                  />
                </div>
              ) }
            </FormControl>
            { showWordCount && (
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500 dark:text-gray-400 px-1">
                <span>
                  { wordCount } { wordCount === 1 ? 'word' : 'words' }
                </span>
                <span className={ `${charCount < ( minLength || 0 ) || charCount > ( maxLength || Infinity ) ? 'text-red-500' : ''}` }>
                  { charCount }/{ maxLength ?? '∞' } characters
                  { minLength && ` (min: ${minLength})` }
                </span>
              </div>
            ) }
            <FormMessage className="ml-1"/>
          </FormItem>
        );
      } }
    />
  );
}

