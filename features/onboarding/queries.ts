import { useQuery } from "@tanstack/react-query";

export function useWorkersInTraining() {
  return useQuery({
    queryKey: ["workers-in-training"],
    queryFn: async () => {
      const res = await fetch("/api/users?status=worker-in-training");
      return res.json();
    },
  });
}
