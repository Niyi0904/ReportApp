// app/api/auth/verify-session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json({ user: null });
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    const authUser = await adminAuth.getUser(decodedClaims.uid);

    // Fetch profile from Firestore
    const profileDoc = await adminDb.collection("users").doc(decodedClaims.uid).get();
    const profile = profileDoc.data();


    return NextResponse.json({
      user: {
        uid: authUser.uid,
        email: authUser.email || "",
        displayName: profile?.displayName || authUser.displayName || "",
        photoURL: profile?.photoUrl || authUser.photoURL || "",
        status: profile?.status || "member"
      },
    });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}