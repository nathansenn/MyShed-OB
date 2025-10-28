import { useEffect, useRef, useState } from "react";

export function useAutoSave<T>(
  data: T,
  onSave: (data: T) => Promise<void>,
  delay: number = 1000
) {
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const initialRender = useRef(true);

  useEffect(() => {
    // Skip auto-save on initial render
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(async () => {
      setSaving(true);
      try {
        await onSave(data);
        setLastSaved(new Date());
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setSaving(false);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, onSave]);

  return { saving, lastSaved };
}
