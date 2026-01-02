"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Props {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
}

export function MonthNavigator({ currentMonth, onPrev, onNext }: Props) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={onPrev}>
        <ChevronLeft size={18} />
      </Button>

      <h2 className="min-w-[160px] text-center text-lg font-semibold">
        {format(currentMonth, "MMMM yyyy")}
      </h2>

      <Button variant="outline" size="icon" onClick={onNext}>
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}
