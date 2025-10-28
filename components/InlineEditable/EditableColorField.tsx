import { useState, useEffect } from "react";

interface EditableColorFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function EditableColorField({
  value,
  onChange,
  className = "",
}: EditableColorFieldProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        type="color"
        value={localValue || "#000000"}
        onChange={handleChange}
        className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
      />
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="#000000"
        pattern="^#[0-9A-Fa-f]{6}$"
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent transition-colors w-28"
      />
    </div>
  );
}
