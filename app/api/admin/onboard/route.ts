// app/api/onboard-user/route.ts
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
// import { sendOnboardEmail } from "../../send-email/route"; // adjust path
import { sendOnboardEmail } from "@/components/sendemail";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, profile } = body;
    console.log(body);

    // 1️⃣ Create Firebase Auth user WITHOUT specifying a password
    const userRecord = await adminAuth.createUser({
      email,
      emailVerified: false,
      disabled: false,
    });

    // 2️⃣ Save profile in Firestore
    await adminDb.collection("users").doc(userRecord.uid).set({
      ...profile,
      status: "member",
      email,
      uid: userRecord.uid,
      createdAt: new Date(),
    });

    // 3️⃣ Generate a secure password reset link
    const resetLink = await adminAuth.generatePasswordResetLink(email);

    // 4️⃣ Send onboarding email with reset link
    await sendOnboardEmail({
      firstName: profile.firstName,
      email,
      resetLink,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created and onboarding email sent",
        user: {
          uid: userRecord.uid,
          email,
          firstName: profile.firstName,
          lastName: profile.lastName,
          status: "member",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
