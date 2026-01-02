import { Check, X } from "lucide-react";

interface Props {
  present: number;
  absent: number;
  excused: number;
  rate: number;
}

export function AttendanceStats({
  present,
  absent,
  excused,
  rate,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Present"
        value={`${present} days`}
        color="success"
        icon={<Check size={18} />}
      />
      <StatCard
        label="Absent"
        value={`${absent} days`}
        color="destructive"
        icon={<X size={18} />}
      />
      <StatCard
        label="Excused"
        value={`${excused} days`}
        color="warning"
      />
      <StatCard
        label="Attendance Rate"
        value={`${rate}%`}
        color="primary"
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: "success" | "destructive" | "warning" | "primary";
  icon?: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 bg-${color}/10`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-sm text-muted-foreground">
          {label}
        </span>
      </div>
      <p className={`text-2xl font-bold text-${color}`}>
        {value}
      </p>
    </div>
  );
}
