// features/profile/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateProfileFieldParams {
  field: string;
  value: any;
}

export const useUpdateProfileField = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ field, value }: UpdateProfileFieldParams) => {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value }),
      });
      if (!res.ok) {
        throw new Error("Failed to update profile field");
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};
