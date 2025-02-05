import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
  disabled = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOptions = options.filter(option => value.includes(option.value));

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };
        
  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={`form-input min-h-[42px] flex items-center flex-wrap gap-2 cursor-pointer  pr-10 bg-secondary/40 border-black hover:bg-secondary hover:border-accent focus:bg-secondary focus:border-blue-500 border rounded-md"${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-500">{placeholder}</span>
        ) : (
          <>
            {selectedOptions.slice(0, 2).map(option => (
              <span
                key={option.value}
                className="bg-accent/10 text-accent px-2 py-1 rounded-md flex items-center gap-1 text-sm"
              >
                {option.label}
                <button
                  onClick={(e) => removeOption(option.value, e)}
                  className="hover:text-accent/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            {selectedOptions.length > 2 && (
              <span className="text-accent text-sm">
                +{selectedOptions.length - 2} more
              </span>
            )}
          </>
        )}
        <ChevronDown className={`h-4 w-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map(option => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 hover:bg-secondary/20 cursor-pointer"
              onClick={() => toggleOption(option.value)}
            >
              <div className="w-5 h-5 border border-gray-300 rounded mr-3 flex items-center justify-center">
                {value.includes(option.value) && (
                  <Check className="h-4 w-4 text-accent" />
                )}
              </div>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}