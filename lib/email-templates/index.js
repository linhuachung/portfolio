import { escapeHtml } from '@/lib/email-utils';
import { readFileSync } from 'fs';
import { join } from 'path';

// Embedded templates (fallback if file system fails, e.g., on Vercel)
const HTML_TEMPLATE_EMBEDDED = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>New Contact Form Submission</title>
    <!--[if mso]>
    <style type="text/css">
      body, table, td {font-family: Arial, sans-serif !important;}
    </style>
    <![endif]-->
    <style>
      body, table, td, p {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
      }
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        border: 0;
        outline: none;
        text-decoration: none;
      }
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        background-color: #f3f4f6;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
        line-height: 1.6;
        color: #1f2937;
      }
      .email-wrapper {
        width: 100%;
        background-color: #f3f4f6;
        padding: 30px 20px;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .email-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 30px 30px 25px;
        text-align: center;
      }
      .email-header h1 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        color: #ffffff;
        letter-spacing: -0.3px;
      }
      .email-header p {
        margin: 8px 0 0 0;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
      }
      .email-content {
        padding: 30px;
        background-color: #ffffff;
      }
      .info-row {
        padding: 12px 0;
        border-bottom: 1px solid #e5e7eb;
      }
      .info-row:last-child {
        border-bottom: none;
      }
      .info-label {
        display: inline-block;
        width: 140px;
        font-size: 13px;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        vertical-align: top;
      }
      .info-value {
        display: inline-block;
        width: calc(100% - 150px);
        font-size: 15px;
        color: #1f2937;
        font-weight: 500;
        vertical-align: top;
      }
      .info-value a {
        color: #667eea;
        text-decoration: none;
      }
      .message-section {
        margin-top: 8px;
        padding-top: 16px;
        border-top: 2px solid #e5e7eb;
      }
      .message-label {
        font-size: 13px;
        font-weight: 600;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }
      .message-content {
        font-size: 15px;
        color: #374151;
        line-height: 1.7;
        padding: 16px;
        background-color: #f9fafb;
        border-radius: 6px;
        border-left: 3px solid #667eea;
        white-space: pre-wrap;
        margin: 0;
      }
      .email-footer {
        background-color: #f9fafb;
        padding: 20px 30px;
        text-align: center;
        border-top: 1px solid #e5e7eb;
      }
      .email-footer p {
        margin: 0;
        font-size: 12px;
        color: #9ca3af;
        line-height: 1.5;
      }
      @media only screen and (max-width: 600px) {
        .email-wrapper { padding: 20px 10px; }
        .email-header { padding: 25px 20px 20px; }
        .email-header h1 { font-size: 20px; }
        .email-content { padding: 25px 20px; }
        .info-label { display: block; width: 100%; margin-bottom: 4px; }
        .info-value { display: block; width: 100%; }
        .email-footer { padding: 18px 20px; }
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-container">
        <div class="email-header">
          <h1>New Contact Form Submission</h1>
          <p>You have received a new message</p>
        </div>
        <div class="email-content">
          <div class="info-row">
            <span class="info-label">Full Name</span>
            <span class="info-value">{{FIRSTNAME}} {{LASTNAME}}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Email</span>
            <span class="info-value"><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></span>
          </div>
          {{#PHONE}}
          <div class="info-row">
            <span class="info-label">Phone</span>
            <span class="info-value">{{PHONE}}</span>
          </div>
          {{/PHONE}}
          <div class="info-row">
            <span class="info-label">Service</span>
            <span class="info-value">{{SERVICE}}</span>
          </div>
          <div class="message-section">
            <div class="message-label">Message</div>
            <div class="message-content">{{MESSAGE}}</div>
          </div>
        </div>
        <div class="email-footer">
          <p>This email was sent from your portfolio contact form.</p>
          {{#REPLY_URL}}
          <div style="margin-top: 20px;">
            <a href="{{REPLY_URL}}" style="display: inline-block; padding: 12px 24px; background-color: #667eea; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Reply to {{FIRSTNAME}}</a>
          </div>
          {{/REPLY_URL}}
        </div>
      </div>
    </div>
  </body>
</html>`;

const TEXT_TEMPLATE_EMBEDDED = `New Contact Form Submission

Name: {{FIRSTNAME}} {{LASTNAME}}
Email: {{EMAIL}}
{{#PHONE}}
Phone: {{PHONE}}
{{/PHONE}}
Service: {{SERVICE}}

Message:
{{MESSAGE}}

---
This email was sent from your portfolio contact form.
`;

// Cache templates to avoid reading from disk on every request
let htmlTemplateCache = null;
let textTemplateCache = null;

/**
 * Load template file with caching and fallback to embedded template
 * @param {string} filename - Template filename
 * @param {string} cacheKey - Cache key ('html' or 'text')
 * @param {string} embeddedTemplate - Embedded template as fallback
 * @returns {string} Template content
 */
function loadTemplate( filename, cacheKey, embeddedTemplate ) {
  // Return cached template if available
  if ( cacheKey === 'html' && htmlTemplateCache ) {
    return htmlTemplateCache;
  }
  if ( cacheKey === 'text' && textTemplateCache ) {
    return textTemplateCache;
  }

  // Try to load from file system first (for local development)
  try {
    const templatesDir = join( process.cwd(), 'lib', 'email-templates' );
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
    // If file system fails (e.g., on Vercel), use embedded template
    // eslint-disable-next-line no-console
    console.warn( `Failed to load ${filename} from file system, using embedded template:`, error.message );

    // Cache the embedded template
    if ( cacheKey === 'html' ) {
      htmlTemplateCache = embeddedTemplate;
    } else if ( cacheKey === 'text' ) {
      textTemplateCache = embeddedTemplate;
    }

    return embeddedTemplate;
  }
}

/**
 * Load HTML email template
 * @returns {string} HTML template content
 */
export function loadContactFormHtmlTemplate() {
  return loadTemplate( 'contact-form.html', 'html', HTML_TEMPLATE_EMBEDDED );
}

/**
 * Load text email template
 * @returns {string} Text template content
 */
export function loadContactFormTextTemplate() {
  return loadTemplate( 'contact-form-text.txt', 'text', TEXT_TEMPLATE_EMBEDDED );
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

