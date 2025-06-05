import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DialogDocument( { styledTitle, contentStyled, file, title, content } ) {
  const [open, setOpen] = useState( false );
  const handleOpenChange = ( isOpen ) => {
    setOpen( isOpen );
  };
  return (
    <Dialog open={ open } onOpenChange={ handleOpenChange }>
      <DialogTrigger asChild>
        <div className="flex items-baseline gap-3 justify-center">
          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
          <p
            className={
              cn(
                "hover:cursor-pointer text-white/60 hover:text-accent transition-all duration-300",
                styledTitle
              ) }
          >
            { title }

          </p>
        </div>

      </DialogTrigger>
      <DialogContent className={
        cn(
          "max-w-[375px] sm:max-w-[600px] bg-primary rounded-2xl",
          contentStyled
        )
      } aria-describedby={ undefined }>
        <DialogHeader>
          <DialogTitle className="px-3 sm:px-0">{ title }</DialogTitle>
          { content && (
            <p
              className="text-white/60 text-base">{ content.startDate } - { content.isCurrent ? "Present" : content.endDate }</p>
          ) }
        </DialogHeader>
        <div className="mt-5">
          { content?.file && (
            <iframe
              src={ `${content.file}?embedded=true#toolbar=0` }
              className="h-[400px] w-full sm:min-h-[760px] border-none"
            />
          ) }
          { !content?.file && (
            <div>No certificate found!!</div>
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