// app/api/auth/session/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  const { idToken } = await req.json();

  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  const sessionCookie = await adminAuth.createSessionCookie(idToken, {
    expiresIn,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", sessionCookie, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: expiresIn / 1000,
    path: "/",
  });

  return NextResponse.json({ success: true });
}  
