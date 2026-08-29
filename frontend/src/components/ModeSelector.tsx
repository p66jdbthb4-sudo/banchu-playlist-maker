import React from 'react';
import { useAppContext } from '../context/AppContext';
import { MODES, MODE_LABELS } from '../utils/constants';

export const ModeSelector: React.FC = () => {
  const { mode, setMode } = useAppContext();

  return (
    <div className="bg-white p-4 shadow mb-4">
      <h2 className="text-lg font-semibold mb-4">モード選択</h2>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(MODES).map(([key, value]) => (
          <button
            key={value}
            onClick={() => setMode(value as any)}
            className={`p-4 rounded-lg font-semibold transition-all ${
              mode === value
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {MODE_LABELS[value]}
          </button>
        ))}
      </div>
    </div>
  );
};
