import { useQuery } from "@tanstack/react-query";
import { getEvangelismByMonth } from "./api";

export function useEvangelism(userId: string, monthKey: string) {
  return useQuery({
    queryKey: ["evangelism", userId, monthKey],
    queryFn: () => getEvangelismByMonth(userId, monthKey),
    enabled: !!userId && !!monthKey,
    staleTime: Infinity
  });
}
