"use client";

import { useForm } from "@tanstack/react-form";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { recordPrayerParticipation } from "@/features/prayerChain/api";
import { toast } from "sonner";
import { format } from "date-fns";
import { Clock, Calendar, Loader2 } from "lucide-react";
import { useGetUserInfo } from "@/features/users/queries";
import { useRecordPrayerMutation } from "@/features/prayerChain/mutations";

interface Props {
  date: Date;
  onSuccess: () => void;
}

export function PrayerRecordForm({ date, onSuccess }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: fullUserProfile, isLoading: loadingProfile } = useGetUserInfo(user?.uid);

  const recordMutation = useRecordPrayerMutation(user?.uid!);

  const form = useForm({
    defaultValues: {
      from: "06:00",
      to: "07:00",
    },
    onSubmit: async ({ value }) => {
      if (!fullUserProfile) {
        toast.error("User profile not found. Please try again.");
        return;
      }

      try {
        await recordMutation.mutateAsync({
          userProfile: fullUserProfile,
          data: { ...value, date },
        });
        
        toast.success("Prayer recorded successfully!");
        onSuccess();
      } catch (error) {
        toast.error("Failed to record prayer.");
        console.error(error);
      }
    },
  });

  if (loadingProfile) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 pt-4"
    >
      {/* Date Display */}
      <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100 mb-4">
        <Calendar className="text-[#634832]" size={20} />
        <div>
          <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">Selected Date</p>
          <p className="text-sm font-bold text-stone-800">{format(date, "PPPP")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* From Field */}
        <form.Field
          name="from"
          children={(field) => (
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">From</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                <Input
                  type="time"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-9 h-11 bg-white border-stone-200 rounded-xl focus:ring-[#634832]"
                />
              </div>
            </div>
          )}
        />

        {/* To Field */}
        <form.Field
          name="to"
          children={(field) => (
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-stone-500">To</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                <Input
                  type="time"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="pl-9 h-11 bg-white border-stone-200 rounded-xl focus:ring-[#634832]"
                />
              </div>
            </div>
          )}
        />
      </div>

      <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
        <p className="text-xs text-amber-700 leading-relaxed font-medium">
          Duration is automatically calculated. Please ensure your start and end times are correct.
        </p>
      </div>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="w-full bg-[#634832] hover:bg-[#4d3827] h-12 rounded-2xl font-bold shadow-lg shadow-stone-200 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Recording...
              </>
            ) : (
              "Save Prayer Record"
            )}
          </Button>
        )}
      />
    </form>
  );
}