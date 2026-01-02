export const SettingsSection = ({ title, children, danger }: {title: string, children: any, danger?: boolean}) => (
  <section
    className={`rounded-xl border p-5 space-y-4 ${
      danger ? "border-red-300 bg-red-50" : ""
    }`}
  >
    <h3 className="font-semibold text-lg">{title}</h3>
    {children}
  </section>
);
