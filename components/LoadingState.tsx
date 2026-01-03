// components/ui/LoadingState.tsx
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <Loader2 className="animate-spin text-secondary-bg w-12 h-12" />
      <p className="text-lg font-medium text-muted-foreground">{message}</p>
    </div>
  );
};
