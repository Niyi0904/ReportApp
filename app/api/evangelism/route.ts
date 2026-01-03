// app/api/auth/verify-session/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebase/admin";


export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true)
    const userId = decoded.uid;

    const { evangelismDate, souls } = await req.json();

    if (!souls?.length) {
      return new Response("No souls provided", { status: 400 });
    }

    const date = new Date(evangelismDate);
    const monthKey = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const batch = adminDb.batch();

    // 1️⃣ Evangelism document
    const evangelismRef = adminDb.collection("evangelism").doc();

    batch.set(evangelismRef, {
      userId,
      evangelismDate: date,
      monthKey,
      totalSouls: souls.length,
      createdAt: new Date()
    });

    // 2️⃣ Souls
    souls.forEach((soul: any) => {
      // Subcollection soul
      const evangelismSoulRef =
        evangelismRef.collection("souls").doc();

      // Global soul
      const globalSoulRef =
        adminDb.collection("souls").doc();

      const soulData = {
        userId,
        evangelismId: evangelismRef.id,
        evangelismDate: date,
        monthKey,

        name: soul.name,
        phone: soul.phone || null,
        address: soul.address || null,
        gender: soul.gender || "male",
        status: soul.status || null,
        notes: soul.notes || null,

        createdAt: new Date()
      };

      batch.set(evangelismSoulRef, {
        name: soul.name,
        phone: soul.phone || null,
        address: soul.address || null,
        status: soul.status || null,
        gender: soul.gender || "male",
        notes: soul.notes || null,
        createdAt: new Date()
      });

      batch.set(globalSoulRef, soulData);
    });

    await batch.commit();

    return Response.json({
      success: true,
      evangelismId: evangelismRef.id
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
