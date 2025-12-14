'use client';

import { useEffect, useState } from 'react';

interface NumericFieldProps {
  label?: string;
  value: number;
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  inputMode?: 'numeric' | 'decimal';
  onChange: (value: number) => void;
}

export default function NumericField({
  label,
  value,
  defaultValue,
  min,
  max,
  step,
  inputMode = 'numeric',
  onChange,
}: NumericFieldProps) {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInputValue(value.toString());
    setInvalid(false);
  }, [value]);

  const validate = (val: string) => {
    if (val.trim() === '') {
      setInvalid(false);
      return;
    }
    const num = Number(val);
    if (!Number.isFinite(num)) {
      setInvalid(true);
      return;
    }
    if (min !== undefined && num < min) {
      setInvalid(true);
      return;
    }
    if (max !== undefined && num > max) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    onChange(num);
  };

  return (
    <div>
      {label && <label className="block text-xs text-gray-400 mb-1">{label}</label>}
      <input
        type="number"
        inputMode={inputMode}
        min={min}
        max={max}
        step={step}
        className={`w-full rounded-lg bg-av-blue/30 border px-3 py-2 text-white transition-[border,box-shadow] focus:outline-none ${
          invalid
            ? 'border-red-500/70 focus:border-red-400 focus:shadow-[0_0_0_2px_rgba(248,113,113,0.35)]'
            : 'border-av-purple/30 focus:border-av-purple focus:shadow-[0_0_0_2px_rgba(139,92,246,0.35)]'
        }`}
        value={inputValue}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          validate(val);
        }}
        onBlur={() => {
          if (inputValue.trim() === '') {
            setInputValue(defaultValue.toString());
            setInvalid(false);
            onChange(defaultValue);
          } else {
            validate(inputValue);
          }
        }}
      />
      {invalid && <p className="text-xs text-red-400 mt-1">Please enter a valid number.</p>}
    </div>
  );
}
