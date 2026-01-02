export const ActionButton = ({ label, description, onClick, danger, disabled }: { label: string, description: string, onClick:() => void, danger?: boolean, disabled?: boolean }) => (
  <div className="flex justify-between items-center border-b py-3">
    <div>
      <p className={`font-medium ${danger ? "text-red-600" : ""}`}>
        {label}
      </p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>

    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 disabled:cursor-not-allowed disabled:bg-secondary-bg/60 rounded text-sm ${
        danger
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-secondary-bg text-white hover:bg-secondary-bg/90"
      }`}
    >
      {label}
    </button>
  </div>
);
