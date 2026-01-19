// app/api/auth/verify-session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { DiscipleInput } from "@/features/followUp/types";


export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true)
    const userId = decoded.uid;

    const { followUpDate, disciples } = await req.json();

    if (!disciples?.length) {
      return new Response("No souls provided", { status: 400 });
    }

    const date = new Date(followUpDate);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const batch = adminDb.batch();

    const followUpRef =
        adminDb.collection("follow-up").doc();

    // 2️⃣ FollowUps
    disciples.forEach((disciple: DiscipleInput) => {
      const followUpData = {
        userId,
        followUpDate: date,
        monthKey,
        discipleName: disciple.discipleName,
        topic: disciple.topic || null,
        duration: disciple.duration || null,
        gender: disciple.gender || "male",
        status: disciple.status || null,
        notes: disciple.notes || null,
        createdAt: new Date()
      };

      batch.set(followUpRef, followUpData);
    });

    await batch.commit();

    return Response.json({
      success: true,
      followUpId: followUpRef.id
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
