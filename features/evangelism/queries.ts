import { useQuery } from "@tanstack/react-query";
import { getEvangelismByMonth, getAllEvangelismsByUser } from "./api";

export function useEvangelism(userId: string, monthKey: string) {
  return useQuery({
    queryKey: ["evangelism", userId, monthKey],
    queryFn: () => getEvangelismByMonth(userId, monthKey),
    enabled: !!userId && !!monthKey,
    staleTime: Infinity
  });
}


export function useGetAllEvangelismsByUser(userId: string) {
  return useQuery({
    queryKey: ["evangelism", userId],
    queryFn: () => getAllEvangelismsByUser(userId, ),
    enabled: !!userId,
    staleTime: Infinity
  });
}
