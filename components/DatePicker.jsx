'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DatePicker( { date, onDateChange, disabled = false, className, placeholder = 'Pick a date' } ) {
  const [open, setOpen] = React.useState( false );

  return (
    <Popover open={ open } onOpenChange={ setOpen }>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={ disabled }
          className={ cn(
            'w-full justify-start text-left font-normal h-[48px] pt-4 pb-3 bg-secondary-light dark:bg-secondary border-2 border-gray-300 dark:border-white/20 rounded-xl hover:bg-secondary-light dark:hover:bg-secondary text-gray-900 dark:text-white',
            !date && 'text-gray-500 dark:text-gray-400',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          ) }
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-900 dark:text-white flex-shrink-0" />
          <span className="flex-1 text-left">
            { date ? format( date, 'PPP' ) : placeholder }
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={ date }
          onSelect={ ( selectedDate ) => {
            onDateChange( selectedDate );
            setOpen( false );
          } }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

