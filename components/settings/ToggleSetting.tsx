"use client";

import { useState } from "react";

export const ToggleSetting = ({ label, description }: {label: string, description: string}) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex justify-between items-center border-b py-3">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-12 h-6 rounded-full transition ${
          enabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`block w-5 h-5 bg-white rounded-full transform transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};
