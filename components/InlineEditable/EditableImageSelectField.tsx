import { useState, useEffect } from "react";

interface Option {
  value: string;
  label: string;
  imageUrl?: string;
}

interface EditableImageSelectFieldProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
}

export function EditableImageSelectField({
  value,
  options,
  onChange,
  className = "",
}: EditableImageSelectFieldProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const selectedOption = options.find((opt) => opt.value === localValue);

  const handleSelect = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selected Value Display */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg focus:ring-2 focus:ring-myshed-primary focus:border-transparent transition-colors bg-white flex items-center justify-between"
      >
        <div className="flex items-center space-x-2">
          {selectedOption?.imageUrl && (
            <img
              src={selectedOption.imageUrl}
              alt={selectedOption.label}
              className="w-6 h-6 object-cover rounded"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <span className="text-sm truncate">{selectedOption?.label || "Select..."}</span>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <>
          {/* Backdrop to close dropdown */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown Menu */}
          <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                  option.value === localValue ? "bg-myshed-primary bg-opacity-10" : ""
                }`}
              >
                {option.imageUrl && (
                  <img
                    src={option.imageUrl}
                    alt={option.label}
                    className="w-8 h-8 object-cover rounded border border-gray-200 flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect fill='%23f3f4f6' width='32' height='32'/%3E%3C/svg%3E";
                    }}
                  />
                )}
                <span className="text-sm truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
