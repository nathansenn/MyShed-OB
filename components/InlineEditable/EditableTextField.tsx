import { useState, useEffect } from "react";

interface EditableTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function EditableTextField({
  value,
  onChange,
  placeholder = "",
  className = "",
}: EditableTextFieldProps) {
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
    <input
      type="text"
      value={localValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent transition-colors ${className}`}
    />
  );
}
