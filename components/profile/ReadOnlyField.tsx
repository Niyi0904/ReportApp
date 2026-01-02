export const ReadOnlyField = ({ label, value }: {label: string, value: string}) => (
  <div className="border-b py-3">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);
