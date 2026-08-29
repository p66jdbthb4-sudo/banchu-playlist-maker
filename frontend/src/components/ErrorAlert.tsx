import React from 'react';
import { useAppContext } from '../context/AppContext';

export const ErrorAlert: React.FC = () => {
  const { error, setError } = useAppContext();

  if (!error) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 bg-red-100 border-l-4 border-red-500 p-4 rounded shadow-lg z-50">
      <div className="flex justify-between items-start">
        <p className="text-red-700 font-semibold">❌ エラー: {error}</p>
        <button
          onClick={() => setError(null)}
          className="text-red-700 hover:text-red-900 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
