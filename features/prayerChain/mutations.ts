import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recordPrayerParticipation } from "./api";

export function useRecordPrayerMutation(userId: string) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: async (variables: { userProfile: any; data: any }) => {
      return await recordPrayerParticipation(userId, variables.userProfile, variables.data);
    },
    onSuccess: async () => {
      console.log("Invalidating for user:", userId);
      await client.invalidateQueries({
        queryKey: ["my-participation", userId],
        // Set exact to true if your query key matches exactly
        exact: true, 
      });
    }
  });
}


