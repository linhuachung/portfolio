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
import ProjectInfo from "@/app/work/components/ProjectInfo";

export function DialogDocument({styledTitle, contentSyled, file, title, content}) {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (isOpen) => {
        setOpen(isOpen);
    };
    console.log(content)
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
            <DialogContent className={
                cn(
                    "max-w-[375px] sm:max-w-[600px] bg-primary rounded-md",
                    contentSyled
                )
            }>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {content && (
                        <p className="text-white/60 text-base">{content.duration}</p>
                    )}
                </DialogHeader>
                <div className="mt-5">
                    {file && (
                        <iframe
                            src={`${file}#toolbar=0`}
                            className="h-[400px] l`w-full sm:min-h-[760px] border-none"
                        />
                    )}
                    {content && (
                        <ProjectInfo info={content}/>
                    )}
                    {!content && !file && (
                        <div>No content found!!</div>
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