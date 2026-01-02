// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";
import { sendOnboardEmail } from "../../send-email/route";

async function getAuthUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    throw new Error("No session cookie found");
  }

  const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  return adminAuth.getUser(decoded.uid);
}

export async function POST(req: Request) {
    try {
        const user = await getAuthUser();

        if (!user.email) {
        return NextResponse.json(
            { error: "User has no email" },
            { status: 400 }
        );
        }
    
      const resetLink = await adminAuth.generatePasswordResetLink(user.email!);
    
        await sendOnboardEmail({
            email: user.email,
            firstName: user.displayName ?? "there",
            resetLink,
        });
    
      return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Failed to send reset email" },
            { status: 500 }
        );
    }
}
