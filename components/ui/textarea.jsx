import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef( ( { className, ...props }, ref ) => {
  return (
    ( <textarea
      className={ cn(
        'flex min-h-[80px] w-full rounded-xl bg-[#f5f5f5] dark:bg-secondary px-4 py-5 text-base text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-light dark:focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-600 dark:disabled:text-gray-400',
        className
      ) }
      ref={ ref }
      { ...props } /> )
  );
} );
Textarea.displayName = 'Textarea';

export { Textarea };

