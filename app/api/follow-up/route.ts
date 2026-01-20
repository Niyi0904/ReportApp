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

    
    // 2️⃣ FollowUps
    disciples.forEach((disciple: DiscipleInput) => {
      const followUpRef = adminDb.collection("follow-up").doc();

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
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    const userId = decoded.uid;

    const { followUpId } = await req.json();

    if (!followUpId) {
      return new Response("Follow-up ID required", { status: 400 });
    }

    const followUpRef = adminDb.collection("follow-up").doc(followUpId);
    const snap = await followUpRef.get();

    if (!snap.exists) {
      return new Response("Follow-up not found", { status: 404 });
    }

    // 🔒 Ownership check (VERY important)
    if (snap.data()?.userId !== userId) {
      return new Response("Forbidden", { status: 403 });
    }

    await followUpRef.delete();

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}

