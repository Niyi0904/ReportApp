// features/profile/queries.ts
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () =>
  useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch("/api/users/me");

      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await res.json();
      console.log("USER PROFILE:", data);
      return data;
    },
  });

