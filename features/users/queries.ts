// features/prayerChain/queries.ts
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase/firestore";

export const useGetUserInfo = (uid: string | undefined) => {
  return useQuery({
    queryKey: ["user-info", uid],
    queryFn: async () => {
      if (!uid) return null;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { uid: docSnap.id, ...docSnap.data() };
      }
      return null;
    },
    enabled: !!uid, // Only run if uid exists
  });
};