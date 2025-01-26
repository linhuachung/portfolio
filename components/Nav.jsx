"use client"

import Link from "next/link";
import {usePathname} from "next/navigation";
import {LINKS} from "@/constants/route";

function Nav() {
    const pathName = usePathname();
    return (
        <nav className="flex gap-8">
            {LINKS.map(({name, path}) => {
                return <Link href={path} key={path}
                             className={`${path === pathName && "text-accent border-b-2 border-accent"} capitalize font-medium hover:text-accent transition-all`}>
                    {name}
                </Link>
            })}
        </nav>
    )
}

export default Nav