import { useState, useEffect } from "react";

interface EditableNumberFieldProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  placeholder?: string;
  className?: string;
}

export function EditableNumberField({
  value,
  onChange,
  min,
  max,
  step = 0.01,
  prefix = "",
  placeholder = "0.00",
  className = "",
}: EditableNumberFieldProps) {
  const [localValue, setLocalValue] = useState((value ?? 0).toString());

  useEffect(() => {
    setLocalValue((value ?? 0).toString());
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      onChange(numValue);
    } else if (newValue === "") {
      onChange(0);
    }
  };

  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={localValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={`px-3 py-2 ${prefix ? "pl-8" : ""} border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent transition-colors ${className}`}
      />
    </div>
  );
}
