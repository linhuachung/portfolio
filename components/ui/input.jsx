import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef( ( { className, type, ...props }, ref ) => {
  return (
    ( <input
      type={ type }
      className={ cn(
        'flex h-[48px] rounded-xl border border-gray-300 dark:border-white/20 font-light bg-secondary-light dark:bg-primary px-4 py-5 text-base text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/60 outline-none',
        className
      ) }
      ref={ ref }
      { ...props } /> )
  );
} );
Input.displayName = 'Input';

export { Input };
