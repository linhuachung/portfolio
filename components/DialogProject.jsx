import ProjectInfo from '@/app/[locale]/(user)/work/components/ProjectInfo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { formatDateRangeForTimeline } from '@/lib/experience-utils';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DialogProject( { styledTitle, contentStyled, title, content } ) {
  const [open, setOpen] = useState( false );
  const handleOpenChange = ( isOpen ) => {
    setOpen( isOpen );
  };

  const dateRange = content
    ? formatDateRangeForTimeline( content.startDate, content.endDate, content.isCurrent )
    : '';

  return (
    <Dialog open={ open } onOpenChange={ handleOpenChange }>
      <DialogTrigger asChild>
        <p
          className={
            cn(
              'hover:cursor-pointer text-gray-700 dark:text-white/60 hover:text-accent-light dark:hover:text-accent transition-all duration-300',
              styledTitle
            ) }
        >
          { title || 'Position' }
        </p>
      </DialogTrigger>
      <DialogContent className={
        cn(
          'max-w-[375px] sm:max-w-[1024px] bg-[#f5f5f5] dark:bg-primary rounded-2xl overflow-auto md:max-h-[70vh] max-h-[50vh]',
          contentStyled
        )
      }>
        <DialogHeader>
          <DialogTitle className="px-3 sm:px-0 text-gray-900 dark:text-white">{ title || 'Position' }</DialogTitle>
          { dateRange && (
            <p className="text-gray-600 dark:text-white/60 text-base">{ dateRange }</p>
          ) }
        </DialogHeader>
        <div className="mt-5">
          { content ? (
            <ProjectInfo info={ content }/>
          ) : (
            <div className="text-gray-600 dark:text-white/60">No content available</div>
          ) }
        </div>
        <DialogFooter>
          <Button onClick={ () => setOpen( false ) } variant="outline">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}