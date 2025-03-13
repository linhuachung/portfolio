import {NextResponse} from "next/server";

export function middleware(req) {
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname; // Lấy đường dẫn hiện tại

    console.log("token: ", token);
    console.log("url: ", url);

    // Nếu truy cập `/admin/login`, không chặn
    if (url.startsWith("/admin/login")) {
        return NextResponse.next();
    }

    // Nếu không có token, chặn lại và chuyển hướng về trang chủ
    if (!token) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next(); // Cho phép truy cập nếu đã đăng nhập
}

// Middleware chỉ áp dụng cho các route trong `/admin/`, bỏ qua `/admin/login`
export const config = {
    matcher: ["/admin/:path*"],
};
