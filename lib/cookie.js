"use server";

import { cookies } from "next/headers";

export const setCookie = ( pattern, data, path ) => {
  cookies().set( pattern, data, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: path
  } );
};

export const getCookie = ( pattern ) => {
  return cookies().get( pattern );
};