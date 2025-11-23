import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";
import { DataResponse } from "@/lib/data-response";
import STATUS_CODES from "@/constants/status";

export async function POST( req ) {
  try {
    let body;
    const contentType = req.headers.get( "content-type" );
    
    if ( contentType?.includes( "application/json" ) ) {
      body = await req.json();
    } else {
      const blob = await req.blob();
      const text = await blob.text();
      body = JSON.parse( text );
    }

    const { path, userAgent, referer, sessionId } = body;

    const forwarded = req.headers.get( "x-forwarded-for" );
    const realIp = req.headers.get( "x-real-ip" );
    const ip = forwarded ? forwarded.split( "," )[0].trim() : realIp || null;

    let userId = null;
    const user = await prismadb.user.findFirst();
    if ( user ) {
      userId = user.id;
    }

    const visit = await prismadb.visit.create( {
      data: {
        userId,
        path: path || null,
        ip: ip || null,
        userAgent: userAgent || null,
        referer: referer || null,
        country: null,
        city: null
      }
    } );

    return NextResponse.json(
      DataResponse( STATUS_CODES.CREATED, "Visit recorded", visit ),
      { status: STATUS_CODES.CREATED }
    );

  } catch ( error ) {
    return NextResponse.json(
      DataResponse( STATUS_CODES.CREATED, "Visit recorded", null ),
      { status: STATUS_CODES.CREATED }
    );
  }
}

