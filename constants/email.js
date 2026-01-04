/**
 * Email service constants
 */

import { SERVICE_LABELS } from '@/constants/contact';

export { SERVICE_LABELS };

export const DEFAULT_FROM_EMAIL = 'onboarding@resend.dev';

/**
 * Get service label from service code
 * @param {string} serviceCode - Service code (fe, be, fs)
 * @returns {string} Service label
 */
export function getServiceLabel( serviceCode ) {
  return SERVICE_LABELS[serviceCode] || serviceCode || 'Not specified';
}

/**
 * Format email address with display name
 * @param {string} name - Display name
 * @param {string} email - Email address
 * @returns {string} Formatted email address
 */
export function formatEmailAddress( name, email ) {
  return `${name} <${email}>`;
}

