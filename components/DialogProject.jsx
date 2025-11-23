import ProjectInfo from '@/app/(user)/work/components/ProjectInfo';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function DialogProject( { styledTitle, contentStyled, title, content } ) {
  const [open, setOpen] = useState( false );
  const handleOpenChange = ( isOpen ) => {
    setOpen( isOpen );
  };
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
          { title }
        </p>
      </DialogTrigger>
      <DialogContent className={
        cn(
          'max-w-[375px] sm:max-w-[1024px] bg-[#f5f5f5] dark:bg-primary rounded-2xl overflow-auto md:max-h-[70vh] max-h-[50vh]',
          contentStyled
        )
      }>
        <DialogHeader>
          <DialogTitle className="px-3 sm:px-0 text-gray-900 dark:text-white">{ title }</DialogTitle>
          { content && (
            <p
              className="text-gray-600 dark:text-white/60 text-base">{ content.startDate } - { content.isCurrent ? 'Present' : content.endDate }</p>
          ) }
        </DialogHeader>
        <div className="mt-5">
          { content && (
            <ProjectInfo info={ content }/>
          ) }
          { !content && (
            <div>No content found!!</div>
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