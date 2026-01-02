import { useMutation } from "@tanstack/react-query";
import { onboardUser } from "./api";

export function useOnboardUser() {
  return useMutation({
    mutationFn: onboardUser,
  });
}
