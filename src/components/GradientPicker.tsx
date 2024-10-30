import React from 'react';

interface GradientPickerProps {
  value: string;
  onChange: (gradient: string) => void;
}

export function GradientPicker({ value, onChange }: GradientPickerProps) {
  const gradients = [
    'bg-gradient-to-r from-rose-400 to-orange-300',
    'bg-gradient-to-r from-violet-500 to-fuchsia-500',
    'bg-gradient-to-r from-cyan-500 to-blue-500',
    'bg-gradient-to-r from-emerald-500 to-teal-500',
    'bg-gradient-to-r from-pink-500 to-purple-500',
    'bg-gradient-to-r from-yellow-400 to-orange-500',
    'bg-gradient-to-r from-green-400 to-cyan-500',
    'bg-gradient-to-r from-indigo-500 to-blue-500'
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {gradients.map((gradient) => (
        <button
          key={gradient}
          className={`
            h-12 rounded-lg transition-all duration-200
            ${gradient}
            ${value === gradient ? 'ring-2 ring-offset-2 ring-indigo-500' : 'hover:opacity-80'}
          `}
          onClick={() => onChange(gradient)}
        />
      ))}
    </div>
  );
}