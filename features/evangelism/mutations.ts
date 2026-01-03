import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEvangelism, updateSoul } from "./api";

export function useAddEvangelism(userId: string) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: addEvangelism,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["evangelism", userId],
        exact: false
      })
    }
  });
}

export function useUpdateSoul(userId: string) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateSoul,
    onSuccess: () => {
      client.invalidateQueries({ 
        queryKey: ["evangelism", userId], 
        exact: false
      });
    },
  });
}

