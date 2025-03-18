import * as Toast from "@radix-ui/react-toast";
import { Button } from "@/components/ui/button";

export function ToastSuccess( { open, setOpen } ) {
  return (
    <>
      <Toast.Root
        open={ open }
        onOpenChange={ setOpen }
        className="bg-primary border border-white/60 w-[600px] max-w-full rounded-xl shadow-lg p-6 text-center"
      >
        <Toast.Title className="text-4xl font-semibold text-accent mb-10">
                    Success!
        </Toast.Title>
        <Toast.Description className="mt-2 text-lg text-white/60 mb-10">
                    Your message has been sent successfully.
        </Toast.Description>
        <div className="mt-4">
          <Button size="default" onClick={ () => setOpen( false ) }>
                        Close
          </Button>
        </div>
      </Toast.Root>
      <Toast.Viewport
        className={ `fixed inset-0 flex items-center justify-center p-4 ${
          open && "bg-primary/95"
        }` }
      />
    </>
  );
}