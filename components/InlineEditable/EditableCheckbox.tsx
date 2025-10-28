import { useState, useEffect } from "react";

interface EditableCheckboxProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  className?: string;
}

export function EditableCheckbox({
  value,
  onChange,
  label = "",
  className = "",
}: EditableCheckboxProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setLocalValue(newValue);
    onChange(newValue);
  };

  return (
    <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={localValue}
        onChange={handleChange}
        className="w-4 h-4 text-myshed-primary border-gray-300 rounded focus:ring-myshed-primary focus:ring-2 transition-colors"
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}
