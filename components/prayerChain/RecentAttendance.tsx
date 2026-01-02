import { Check, X } from "lucide-react";
import { format } from "date-fns";

interface Props {
  attendance: any[];
}

export function RecentAttendance({ attendance }: Props) {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">
        Recent Attendance
      </h3>

      <div className="space-y-2">
        {attendance.slice(0, 7).map((record) => (
          <div
            key={record.id}
            className="flex items-center justify-between rounded-lg bg-muted/30 p-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  record.status === "present"
                    ? "bg-success/20 text-success"
                    : record.status === "absent"
                    ? "bg-destructive/20 text-destructive"
                    : "bg-warning/20 text-warning"
                }`}
              >
                {record.status === "present" ? (
                  <Check size={16} />
                ) : (
                  <X size={16} />
                )}
              </div>

              <div>
                <p className="font-medium">
                  {format(new Date(record.date), "EEEE, MMM d")}
                </p>
                {record.notes && (
                  <p className="text-sm text-muted-foreground">
                    {record.notes}
                  </p>
                )}
              </div>
            </div>

            <span className="capitalize text-sm font-medium">
              {record.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
