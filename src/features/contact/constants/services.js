/** Conversation topics offered by the public contact form. The value is what gets stored. */
export const CONTACT_SERVICES = [
  { value: 'role', label: 'Hiring or role opportunity' },
  { value: 'frontend', label: 'Product interface or workflow' },
  { value: 'ui', label: 'Design system or UI implementation' },
  { value: 'performance', label: 'Performance or accessibility review' },
  { value: 'fullstack', label: 'Full-stack or API collaboration' }
];

export const CONTACT_SERVICE_VALUES = CONTACT_SERVICES.map( service => service.value );

// Codes used by the previous form; kept so stored messages still show a label.
const LEGACY_SERVICE_LABELS = {
  fe: 'Frontend Development',
  be: 'Backend Development',
  fs: 'Fullstack Development'
};

/** Label for a stored service code, for emails and the admin inbox. */
export const SERVICE_LABELS = {
  ...LEGACY_SERVICE_LABELS,
  ...Object.fromEntries( CONTACT_SERVICES.map( service => [service.value, service.label] ) )
};
