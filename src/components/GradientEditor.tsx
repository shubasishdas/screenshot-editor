import React from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';

const gradients = [
  'bg-gradient-to-r from-rose-400 to-orange-300',
  'bg-gradient-to-r from-violet-400 to-fuchsia-300',
  'bg-gradient-to-r from-cyan-400 to-blue-300',
  'bg-gradient-to-r from-emerald-400 to-teal-300',
  'bg-gradient-to-r from-pink-400 to-purple-300',
  'bg-gradient-to-r from-yellow-400 to-green-300',
  'bg-gradient-to-r from-blue-400 to-indigo-300',
];

interface GradientEditorProps {
  isOpen: boolean;
  onClose: () => void;
  gradient: string;
  onGradientChange: (gradient: string) => void;
}

export function GradientEditor({
  isOpen,
  onClose,
  gradient,
  onGradientChange,
}: GradientEditorProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Choose Gradient</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {gradients.map((g) => (
            <button
              key={g}
              className={`h-24 rounded-lg transition-transform ${g} ${
                gradient === g ? 'ring-2 ring-blue-500 scale-95' : 'hover:scale-95'
              }`}
              onClick={() => onGradientChange(g)}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>Done</Button>
        </div>
      </div>
    </div>
  );
}