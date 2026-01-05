import { escapeHtml } from '@/lib/email-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

const templatesDir = join( process.cwd(), 'lib', 'email-templates' );

// Cache templates to avoid reading from disk on every request
let htmlTemplateCache = null;
let textTemplateCache = null;

/**
 * Load template file with caching
 * @param {string} filename - Template filename
 * @param {string} cacheKey - Cache key ('html' or 'text')
 * @returns {string} Template content
 */
function loadTemplate( filename, cacheKey ) {
  // Return cached template if available
  if ( cacheKey === 'html' && htmlTemplateCache ) {
    return htmlTemplateCache;
  }
  if ( cacheKey === 'text' && textTemplateCache ) {
    return textTemplateCache;
  }

  try {
    const templatePath = join( templatesDir, filename );
    const content = readFileSync( templatePath, 'utf-8' );

    // Cache the template
    if ( cacheKey === 'html' ) {
      htmlTemplateCache = content;
    } else if ( cacheKey === 'text' ) {
      textTemplateCache = content;
    }

    return content;
  } catch ( error ) {
    console.error( `Failed to load ${filename} template:`, error );
    throw new Error( `Failed to load email template: ${filename}` );
  }
}

/**
 * Load HTML email template
 * @returns {string} HTML template content
 */
export function loadContactFormHtmlTemplate() {
  return loadTemplate( 'contact-form.html', 'html' );
}

/**
 * Load text email template
 * @returns {string} Text template content
 */
export function loadContactFormTextTemplate() {
  return loadTemplate( 'contact-form-text.txt', 'text' );
}

/**
 * Process conditional blocks in template ({{#KEY}}...{{/KEY}})
 * @param {string} template - Template string
 * @param {Object} data - Data object
 * @returns {string} Template with conditional blocks processed
 */
function processConditionalBlocks( template, data ) {
  return template.replace( /{{#(\w+)}}([\s\S]*?){{\/\1}}/g, ( match, key, content ) => {
    const value = data[key];
    return value && String( value ).trim() ? content : '';
  } );
}

/**
 * Replace template variables with actual data
 * @param {string} template - Template string with placeholders
 * @param {Object} data - Data object to replace placeholders
 * @param {boolean} escape - Whether to escape HTML (default: false, for HTML templates that already have safe content)
 * @returns {string} Rendered template
 */
export function renderTemplate( template, data, escape = false ) {
  let rendered = template;

  // Handle conditional blocks first ({{#KEY}}...{{/KEY}})
  rendered = processConditionalBlocks( rendered, data );

  // Replace simple placeholders
  Object.keys( data ).forEach( key => {
    const placeholder = `{{${key}}}`;
    let value = data[key] || '';

    // For HTML templates, MESSAGE is already HTML-escaped in resend.js
    // For other fields, escape if needed
    if ( escape && key !== 'MESSAGE' ) {
      value = escapeHtml( value );
    }

    rendered = rendered.replace( new RegExp( placeholder.replace( /[.*+?^${}()|[\]\\]/g, '\\$&' ), 'g' ), value );
  } );

  return rendered;
}

