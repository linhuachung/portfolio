import {Button} from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {useState} from "react";

export function DialogDocument({file, title}) {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <p className="hover:cursor-pointer text-white/60 hover:text-accent transition-all duration-300">
                    {title}
                </p>
            </DialogTrigger>
            <DialogContent className="max-w-[375px] sm:max-w-[600px] bg-primary rounded-md">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="mt-5">
                    <iframe
                        src={`${file}#toolbar=0`}
                        className="h-[400px] w-full sm:min-h-[760px] border-none"
                    />
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