import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConfirmPickup() {
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-black p-6">
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center gap-6">
        <svg
          className={`w-36 h-36 ${done ? 'text-green-600' : 'text-gray-400'}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill={done ? 'currentColor' : 'none'} opacity={done ? 0.12 : 0.2} />
          <path
            d="M7 13l3 3 7-7"
            stroke={done ? '#059669' : '#9CA3AF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <div className="text-center">
          <h2 className="text-2xl font-semibold">{done ? 'Your herbs are ready!' : 'Your herbs are being picked'}</h2>
          <p className="text-sm text-gray-500 mt-2">{done ? 'Collect them in the collection area.' : 'We are preparing your selection — please wait.'}</p>
        </div>

        {!done ? (
          <div className="flex items-center gap-2 mt-4">
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse" />
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-75" />
            <div className="w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-150" />
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
