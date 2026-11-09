'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ ref }
    className={ cn(
      'grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 dark:border-white/20 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent-light data-[state=checked]:text-white dark:ring-offset-slate-950 dark:focus-visible:ring-accent dark:data-[state=checked]:bg-accent dark:data-[state=checked]:text-primary',
      className
    ) }
    { ...props }>
    <CheckboxPrimitive.Indicator className={ cn('grid place-content-center text-current') }>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
