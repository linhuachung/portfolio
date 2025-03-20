import React from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileNav";

function Header( { isAdmin = false, title, links } ) {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={ isAdmin ? "/admin" : "/" }>
          <h1 className="text-4xl font-semibold">
            { !isAdmin ? "Chung" : title }
            <span className="text-accent">.</span></h1>
        </Link>
        <div className="hidden xl:flex items-center gap-8">
          <Nav
            links={ links }
          />
          { !isAdmin && (
            <Link href="/contact">
              <Button>Hire me</Button>
            </Link>
          ) }
        </div>

        <div className="xl:hidden">
          <MobileNav
            links={ links }
            isAdmin={ isAdmin }
            title={ title }
          />
        </div>
      </div>
    </header>
  );
}

export default Header;