import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

export function DialogDocument({styledTitle, file, title, content}) {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <p
                    className={
                        cn(
                            "hover:cursor-pointer text-white/60 hover:text-accent transition-all duration-300",
                            styledTitle
                        )}
                >
                    {title}
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-[375px] sm:max-w-[600px] bg-primary rounded-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="mt-5">
                    {file && (
                        <iframe
                            src={`${file}#toolbar=0`}
                            className="h-[400px] w-full sm:min-h-[760px] border-none"
                        />
                    )}
                    {content && (
                        <iframe
                            src={`${file}#toolbar=0`}
                            className="h-[400px] w-full sm:min-h-[760px] border-none"
                        />
                    )}
                    {!content && !file && (
                        <div>No content here</div>
                    )}
                </div>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)} variant="outline">
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}