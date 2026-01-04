/**
 * Contact form constants
 */

export const CONTACT_SERVICES = [
  { value: 'fe', label: 'Frontend Development' },
  { value: 'be', label: 'Backend Development' },
  { value: 'fs', label: 'Fullstack Development' }
];

/**
 * Service labels map derived from CONTACT_SERVICES
 * Used for quick lookup by service code
 */
export const SERVICE_LABELS = CONTACT_SERVICES.reduce( ( acc, service ) => {
  acc[service.value] = service.label;
  return acc;
}, {} );

