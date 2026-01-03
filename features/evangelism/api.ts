import { doc, updateDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { EvangelismFormValues, Soul, UpdateSoulPayload } from "./types";
import { Evangelism } from "./types";

export async function addEvangelism(data: EvangelismFormValues) {

  const payload = {
    evangelismDate: data.evangelismDate,
    souls: data.souls
  };

  const res = await fetch("/api/evangelism", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}


export async function getEvangelismByMonth(
  userId: string,
  monthKey: string
): Promise<Evangelism[]> {
  try {
    // 1️⃣ Fetch ALL souls for this user + month
    const soulsQuery = query(
      collection(db, "souls"),
      where("userId", "==", userId),
      where("monthKey", "==", monthKey),
      orderBy("evangelismDate", "desc")
    );

    const soulsSnap = await getDocs(soulsQuery);

    // 2️⃣ Group souls by evangelismId
    const evangelismMap = new Map<string, Evangelism>();

    soulsSnap.docs.forEach((doc) => {
      const data = doc.data();

      const evangelismId = data.evangelismId;
      const evangelismDate = data.evangelismDate.toDate();

      const soul: Soul = {
        id: doc.id,
        name: data.name,
        phone: data.phone ?? null,
        address: data.address ?? null,
        gender: data.gender,
        status: data.status,
        notes: data.notes ?? null,
        createdAt: data.createdAt.toDate(),
      };

      if (!evangelismMap.has(evangelismId)) {
        evangelismMap.set(evangelismId, {
          id: evangelismId,
          evangelismDate,
          monthKey: data.monthKey,
          souls: [soul],
        });
      } else {
        evangelismMap.get(evangelismId)!.souls.push(soul);
      }
    });

    // 3️⃣ Convert map → array
    return Array.from(evangelismMap.values());
  } catch (error) {
    console.error("Error fetching evangelism data:", error);
    throw error;
  }
}


export async function updateSoul({
  soulId,
  data
}: {soulId:string, data:UpdateSoulPayload}) {
  const soulRef = doc(db, "souls", soulId);

  await updateDoc(soulRef, {
    ...data,
    updatedAt: new Date(),
  });
}



