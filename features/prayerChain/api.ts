// features/prayerChain/services.ts
import { db } from "@/lib/firebase/firestore";
import { doc, setDoc, collection, addDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { format } from "date-fns";

export const recordPrayerParticipation = async (userId: string, userData: any, formData: { from: string, to: string, date: Date }) => {
  const dateKey = format(formData.date, "yyyy-MM-dd"); // e.g., 2026-01-22
  const monthKey = format(formData.date, "yyyy-MM");   // e.g., 2026-01
  
  // Calculate duration
  const start = new Date(`2000-01-01T${formData.from}:00`);
  const end = new Date(`2000-01-01T${formData.to}:00`);
  let duration = (end.getTime() - start.getTime()) / (1000 * 60);
  if (duration < 0) duration += 24 * 60; // Handle overnight prayer sessions

  const dayRef = doc(db, "prayer-chain", dateKey);
  const daySnap = await getDoc(dayRef);

  // 1. Point 1: Create the day doc if it doesn't exist (Just-in-Time)
  if (!daySnap.exists()) {
    await setDoc(dayRef, {
      date: formData.date,
      dateKey,
      monthKey,
      dayLabel: `Day ${format(formData.date, "d")}`,
      createdAt: serverTimestamp()
    });
  }

  // 2. Point 2 & 3: Add to participants sub-collection
  const participantRef = doc(db, "prayer-chain", dateKey, "participants", userId);
  return await setDoc(participantRef, {
    uid: userId,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    discipledBy: userData.discipledBy || "Admin",
    from: formData.from,
    to: formData.to,
    duration,
    status: "present",
    date: formData.date, // Store for easy user-level querying
    monthKey,
    createdAt: serverTimestamp()
  });
};