// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/prayer-chain", "/evangelism", "/follow-up", "/members", "/settings", "/profile"];

export default function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // If it's a protected route and there is NO session cookie, redirect
  if (isProtected && !session) {
    const loginUrl = new URL("/login", req.url);
    // Optional: add a redirect parameter to return here after login
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/prayer-chain/:path*", 
    "/evangelism/:path*", 
    "/follow-up/:path*", 
    "/members/:path*", 
    "/settings/:path*", 
    "/profile/:path*"
  ],
};