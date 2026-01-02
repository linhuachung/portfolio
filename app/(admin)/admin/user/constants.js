/**
 * Default form values and configurations for admin user edit page
 */
export const DEFAULT_FORM_VALUES = {
  title: 'Frontend Developer',
  greeting: 'Hello I\'m',
  stats: {
    years: 4,
    projects: 8,
    technologies: 4,
    commits: 500
  }
};

export const DEFAULT_SOCIAL_LINKS = [
  { type: 'github', url: '', order: 0 }
];

export const SOCIAL_LINK_OPTIONS = [
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'website', label: 'Website' }
];

export const BIO_PARAGRAPH_CONFIG = {
  minLength: 50,
  maxLength: 1000
};

