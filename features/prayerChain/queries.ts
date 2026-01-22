// features/prayerChain/queries.ts
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase/firestore";
import { collection, query, where, getDocs, collectionGroup } from "firebase/firestore";
import { PrayerParticipation } from "./types";

// Fetch all prayer days in a month to show the list
export const useGetPrayerChainByMonth = (monthKey: string) => {
  return useQuery<PrayerParticipation[]>({
    queryKey: ["prayer-chain", monthKey],
    queryFn: async () => {
      const q = query(collection(db, "prayer-chain"), where("monthKey", "==", monthKey));
      const snap = await getDocs(q);
      return snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as PrayerParticipation[];
    },
    enabled: !!monthKey,
    staleTime: Infinity
  });
};

// Point 7: Fetch all participation for a specific user across the collection group
export const useGetMyParticipation = (userId: string) => {
  return useQuery<PrayerParticipation[]>({
    queryKey: ["my-participation", userId],
    queryFn: async () => {
      if (!userId) return [];
      
      // Use dot notation to query the nested field
      const q = query(
        collectionGroup(db, "participants"), 
        where("uid", "==", userId.trim())
      );
      
      const snap = await getDocs(q);
      
      return snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as PrayerParticipation[];
    },
    enabled: !!userId,
    staleTime: Infinity
  });
};