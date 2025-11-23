"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackVisit } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const previousPathname = useRef( pathname );

  useEffect( () => {
    if (
      pathname &&
      pathname !== previousPathname.current &&
      !pathname.startsWith( "/admin" )
    ) {
      const timer = setTimeout( () => {
        trackVisit( pathname );
      }, 100 );

      previousPathname.current = pathname;

      return () => clearTimeout( timer );
    }
  }, [pathname] );

  return null;
}

