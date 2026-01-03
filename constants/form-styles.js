export const FORM_STYLES = {
  disabled: 'opacity-60 cursor-not-allowed text-gray-500 dark:text-gray-400',
  disabledReadonly: 'opacity-90 cursor-not-allowed',
  baseBorder: 'border-gray-300 dark:border-white/20',
  baseBg: 'bg-secondary-light dark:bg-secondary',
  errorBorder: '!border-red-500',
  errorFocus: 'focus-visible:!border-red-500 focus-visible:ring-red-500 focus-visible:ring-1',
  errorFocusSelect: 'focus-visible:!border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 data-[state=open]:!border-red-500',
  accentFocus: 'focus-visible:border-accent-light dark:focus-visible:border-accent focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-1',
  accentFocusSelect: 'focus-visible:border-accent-light dark:focus-visible:border-accent focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-1 data-[state=open]:border-accent-light dark:data-[state=open]:border-accent',
  accentFocusWithin: 'focus-within:border-accent-light dark:focus-within:border-accent focus-within:ring-accent-light dark:focus-within:ring-accent focus-within:ring-1',
  errorText: 'text-red-500 dark:text-red-400'
};

export const getInputErrorStyles = ( showError, isSelect = false ) => {
  if ( showError ) {
    return isSelect ? FORM_STYLES.errorFocusSelect : FORM_STYLES.errorFocus;
  }
  return isSelect ? FORM_STYLES.accentFocusSelect : FORM_STYLES.accentFocus;
};

export const getInputBorderStyles = ( showError, isSelect = false ) => {
  const base = FORM_STYLES.baseBorder;
  const error = FORM_STYLES.errorBorder;
  const focus = getInputErrorStyles( showError, isSelect );
  return `${showError ? error : base} ${focus}`;
};

