import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
    const res = NextResponse.redirect(new URL("/auth/sign-in", req.url));

    // ✅ cookie delete allowed here
    res.cookies.set("session", "", { maxAge: 0 });

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};