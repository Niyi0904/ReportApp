import { useQuery } from "@tanstack/react-query";
import { getFollowUpByMonth, getAllFollowUpsByUser } from "./api";

export function useFollowUp(userId: string, monthKey: string) {
  return useQuery({
    queryKey: ["follow-up", userId, monthKey],
    queryFn: () => getFollowUpByMonth(userId, monthKey),
    enabled: !!userId && !!monthKey,
    staleTime: Infinity
  });
}


export function useGetAllFollowUpByUser(userId: string) {
  return useQuery({
    queryKey: ["follow-up", userId],
    queryFn: () => getAllFollowUpsByUser(userId),
    enabled: !!userId,
    staleTime: Infinity
  });
}
