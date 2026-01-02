export default function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "orange" | "blue" | "emerald" | "purple";
}) {
  const colorMap = {
    orange: "bg-orange-100 text-orange-600",
    blue: "bg-blue-100 text-blue-600",
    emerald: "bg-emerald-100 text-emerald-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="rounded-xl bg-background border p-6 flex items-center gap-4">
      <div
        className={`h-10 w-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}