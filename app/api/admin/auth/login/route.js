import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/jwt";
import STATUS_CODES from "@/constants/status";
import { DataResponse } from "@/lib/data-response";

export async function POST( req ) {
  try {
    const { username, password } = await req.json();
    const user = await prismadb.admin.findUnique( {
      where: { username }
    } );

    if ( !user ) {
      return NextResponse.json( DataResponse( STATUS_CODES.NOT_FOUND, "User not found", null ), { status: STATUS_CODES.NOT_FOUND } );
    }

    const isMatch = await bcrypt.compare( password, user.password );

    if ( !isMatch ) {
      return NextResponse.json( DataResponse( STATUS_CODES.UNAUTHORIZED, "Invalid password", null ), { status: STATUS_CODES.UNAUTHORIZED } );
    }

    const token = generateToken( {
      id: user.id,
      username: user.username,
      role: user.role
    } );

    return NextResponse.json( DataResponse( STATUS_CODES.SUCCESS, "Login success", token ), { status: STATUS_CODES.SUCCESS } );

  } catch ( error ) {
    return NextResponse.json( DataResponse( STATUS_CODES.UNAUTHORIZED, " error.message", null ), { status: STATUS_CODES.SERVER_ERROR }, { status: STATUS_CODES.SERVER_ERROR } );
  }
}
