import {NextResponse} from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    if (url.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
