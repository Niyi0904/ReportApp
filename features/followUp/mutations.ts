import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFollowUp, deleteFollowUp, updateFollowUp } from "./api";
import { FollowUp } from "./types";

export function useAddFollowUp(userId: string) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: addFollowUp,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["follow-up", userId],
        exact: false
      })
    }
  });
}

export function useUpdateSoul(userId: string) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: updateFollowUp,
    onSuccess: () => {
      client.invalidateQueries({ 
        queryKey: ["follow-up", userId], 
        exact: false
      });
    },
  });
}

export function useDeleteFollowUp() {
  return useMutation({
    mutationFn: deleteFollowUp,
  });
}

