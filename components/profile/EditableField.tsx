"use client";

import { useState } from "react";
import { useUpdateProfileField } from "@/features/profile/mutations";
import { EditableFieldProps } from "@/types";

export const EditableField = ({
  label,
  value,
  field,
  type = "text",
  options = [],
}: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const mutation = useUpdateProfileField();

  const save = () => {
    mutation.mutate(
      { field, value: newValue },
      {
        onSuccess: () => setEditing(false),
      }
    );
  };

  return (
    <div className="flex justify-between items-center border-b py-3">
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>

        {editing ? (
          type === "select" ? (
            <select
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-1 border rounded px-2 py-1 w-full"
            >
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-1 border rounded px-2 py-1 w-full"
            />
          )
        ) : (
          <p className="font-medium">{value || "—"}</p>
        )}
      </div>

      <div className="ml-4">
        {editing ? (
          <button onClick={save} className="text-sm text-green-600">
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};
