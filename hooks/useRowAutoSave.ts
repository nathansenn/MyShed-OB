import { useState, useCallback, useRef } from "react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface UseRowAutoSaveOptions<T> {
  onSave: (rowId: string, field: keyof T, value: any) => Promise<void>;
  debounceMs?: number;
}

export function useRowAutoSave<T>({ onSave, debounceMs = 500 }: UseRowAutoSaveOptions<T>) {
  const [saveStatuses, setSaveStatuses] = useState<Record<string, SaveStatus>>({});
  const timeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});
  const savedTimeoutsRef = useRef<Record<string, NodeJS.Timeout>>({});

  const saveField = useCallback(
    async (rowId: string, field: keyof T, value: any) => {
      // Clear existing timeout for this row
      if (timeoutsRef.current[rowId]) {
        clearTimeout(timeoutsRef.current[rowId]);
      }

      // Clear "saved" status timeout if it exists
      if (savedTimeoutsRef.current[rowId]) {
        clearTimeout(savedTimeoutsRef.current[rowId]);
      }

      // Set debounced save
      timeoutsRef.current[rowId] = setTimeout(async () => {
        setSaveStatuses((prev) => ({ ...prev, [rowId]: "saving" }));

        try {
          await onSave(rowId, field, value);
          
          setSaveStatuses((prev) => ({ ...prev, [rowId]: "saved" }));

          // Clear "saved" status after 2 seconds
          savedTimeoutsRef.current[rowId] = setTimeout(() => {
            setSaveStatuses((prev) => ({ ...prev, [rowId]: "idle" }));
          }, 2000);
        } catch (error) {
          console.error("Auto-save failed:", error);
          setSaveStatuses((prev) => ({ ...prev, [rowId]: "error" }));

          // Clear error status after 3 seconds
          savedTimeoutsRef.current[rowId] = setTimeout(() => {
            setSaveStatuses((prev) => ({ ...prev, [rowId]: "idle" }));
          }, 3000);
        }
      }, debounceMs);
    },
    [onSave, debounceMs]
  );

  const getSaveStatus = useCallback(
    (rowId: string): SaveStatus => {
      return saveStatuses[rowId] || "idle";
    },
    [saveStatuses]
  );

  return {
    saveField,
    getSaveStatus,
    saveStatuses,
  };
}
