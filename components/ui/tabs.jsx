'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef( ( { className, ...props }, ref ) => (
  <TabsPrimitive.List
    ref={ ref }
    className={ cn(
      'inline-flex h-auto rounded-md p-1 text-primary',
      className
    ) }
    { ...props } />
) );
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef( ( { className, ...props }, ref ) => (
  <TabsPrimitive.Trigger
    ref={ ref }
    className={ cn(
      'inline-flex items-center w-full bg-[#f0f0f0] dark:bg-secondary justify-center whitespace-nowrap text-gray-700 dark:text-white rounded-xl p-3 text-base font-medium ring-offset-[#f5f5f5] dark:ring-offset-gray-900 transition-all disabled:pointer-events-none disabled:opacity-50 hover:bg-accent-light/10 dark:hover:bg-accent/10 data-[state=active]:bg-accent-light dark:data-[state=active]:bg-accent/70 data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:shadow-sm',
      className
    ) }
    { ...props } />
) );
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef( ( { className, ...props }, ref ) => (
  <TabsPrimitive.Content
    ref={ ref }
    className={ cn(
      'min-h-[480px] ring-offset-white dark:ring-offset-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:focus-visible:ring-gray-300 focus-visible:ring-offset-2',
      className
    ) }
    { ...props } />
) );
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };

