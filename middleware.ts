// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

const PROTECTED_ROUTES = ["/dashboard", "/prayer-chain", "/evangelism", "/members", "/settings", "/profile"];

export const runtime = 'nodejs';

export default async function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!session) {
    return redirectToLogin(req);
  }

  try {
    await adminAuth.verifySessionCookie(session, true);
    return NextResponse.next();
  } catch {
    return redirectToLogin(req);
  }
}

function redirectToLogin(req: NextRequest) {
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/prayer-chain/:path*", "/evangelism/:path*", "/members/:path*", "/settings/:path*", "/profile/:path*"],
};
