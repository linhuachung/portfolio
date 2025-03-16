import * as React from "react"

import {cn} from "@/lib/utils"

const Textarea = React.forwardRef(({className, ...props}, ref) => {
    return (
        (<textarea
            className={cn(
                "flex min-h-[80px] w-full rounded-xl border border-white/20 bg-[#27272c] px-4 py-5 text-base placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 focus:border-accent",
                className
            )}
            ref={ref}
            {...props} />)
    );
})
Textarea.displayName = "Textarea"

export {Textarea}
