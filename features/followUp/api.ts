import { doc, updateDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/firestore";
import { FollowUpFormValues, FollowUp, UpdateFollowUpPayload } from "./types";

export async function addFollowUp(data: FollowUpFormValues) {

  const payload = {
    followUpDate: data.followUpDate,
    disciples: data.disciples
  };

  const res = await fetch("/api/follow-up", {
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

export async function getAllFollowUpsByUser(
  userId: string,
): Promise<FollowUp[]> {
  try {
    // 1️⃣ Fetch ALL souls for this user + month
    const followUpsQuery = query(
      collection(db, "follow-up"),
      where("userId", "==", userId),
      orderBy("followUpDate", "desc")
    );

    const followUpsSnap = await getDocs(followUpsQuery);

    // 2️⃣ Group souls by evangelismId
    const followUpArray: FollowUp[] = [];

    followUpsSnap.docs.forEach((doc) => {
      const data = doc.data();


      followUpArray.push({
        id: doc.id,
        monthKey: data.monthKey,
        userId: data.userId,
        followUpDate: data.followUpDate,
        discipleName: data.discipleName,
        topic: data.topic,
        duration: data.duration,
        gender: data.gender,
        status: data.status,
        notes: data.notes,
        createdAt: data.createdAt
      });

    });

    console.log(followUpsSnap);
    // 3️⃣ Convert map → array
    return followUpArray;
  } catch (error) {
    console.error("Error fetching evangelism data:", error);
    throw error;
  }
}

export async function getFollowUpByMonth(
  userId: string,
  monthKey: string
): Promise<FollowUp[]> {
  try {
    // 1️⃣ Fetch ALL souls for this user + month
    const followUpsQuery = query(
      collection(db, "follow-up"),
      where("userId", "==", userId),
      where("monthKey", "==", monthKey),
      orderBy("followUpDate", "desc")
    );

    const followUpsSnap = await getDocs(followUpsQuery);

    // 2️⃣ Group souls by evangelismId
    const followUpArray: FollowUp[] = [];

    followUpsSnap.docs.forEach((doc) => {
      const data = doc.data();


      followUpArray.push({
        id: doc.id,
        monthKey: data.monthKey,
        userId: data.userId,
        followUpDate: data.followUpDate?.toDate(),
        discipleName: data.discipleName,
        topic: data.topic,
        duration: data.duration,
        gender: data.gender,
        status: data.status,
        notes: data.notes,
        createdAt: data.createdAt
      });

    });

    // 3️⃣ Convert map → array
    return followUpArray;
  } catch (error) {
    console.error("Error fetching evangelism data:", error);
    throw error;
  }
}

export async function updateFollowUp({
  followUpId,
  data
}: {followUpId:string, data:UpdateFollowUpPayload}) {
  const soulRef = doc(db, "follow-up", followUpId);

  await updateDoc(soulRef, {
    ...data,
    updatedAt: new Date(),
  });
}

export async function deleteFollowUp(followUpId: string) {
  const res = await fetch("/api/follow-up", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followUpId }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete follow-up");
  }

  return res.json();
}

