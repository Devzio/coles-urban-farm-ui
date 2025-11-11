import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuantities } from '../context/QuantitiesContext';

export default function ConfirmPickup() {
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const { resetAll } = useQuantities();

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
            {/* Inline styles here for the SVG animation */}
            <style>{`
              .plant-wrap svg { display: block; }
              .plant-wrap .leaf { transform-box: fill-box; transform-origin: center; animation: grow 1.6s ease-in-out infinite alternate; }
              .plant-wrap .leaf.left { animation-delay: 0s; }
              .plant-wrap .leaf.right { animation-delay: 0.35s; }
              .plant-wrap .stem { transform-box: fill-box; transform-origin: center; animation: stem-sway 2.4s ease-in-out infinite; }
              .plant-wrap .picker { transform-box: fill-box; transform-origin: center; animation: picker 1.8s ease-in-out infinite; }
              @keyframes grow { from { transform: scale(0.74); opacity: 0.7; } to { transform: scale(1); opacity: 1; } }
              @keyframes stem-sway { 0% { transform: rotate(-2deg);} 50% { transform: rotate(2deg);} 100% { transform: rotate(-2deg);} }
              @keyframes picker { 0% { transform: translateY(-10px) rotate(-6deg); opacity: 0.9 } 45% { transform: translateY(8px) rotate(-6deg); opacity: 1 } 100% { transform: translateY(-10px) rotate(-6deg); opacity: 0.9 } }
            `}</style>

            <div className="plant-wrap">
              <svg width="120" height="120" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                {/* picker / hand (simple stylized circle handle) */}
                <g className="picker" fill="#065F46" opacity="0.95">
                  <circle cx="46" cy="10" r="3.2" />
                  <rect x="44" y="12" width="4" height="18" rx="1" transform="rotate(-20 46 21)" />
                </g>

                {/* pot */}
                <g className="pot" transform="translate(12,36)">
                  <rect x="0" y="14" width="40" height="8" rx="2" fill="#7C2D12" />
                  <rect x="6" y="6" width="28" height="10" rx="1.5" fill="#A94F2B" />
                </g>

                {/* stem and leaves */}
                <g transform="translate(0,0)">
                  <path className="stem" d="M34 38 C34 30 34 24 32 20" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" fill="none" />

                  <path className="leaf left" d="M30 24 C22 20 18 18 16 22 C14 26 18 30 24 30 C28 30 30 28 30 24 Z" fill="#10B981" stroke="#059669" strokeWidth="0.6" />
                  <path className="leaf right" d="M34 24 C42 20 46 18 48 22 C50 26 46 30 40 30 C36 30 34 28 34 24 Z" fill="#059669" stroke="#047857" strokeWidth="0.6" />
                </g>
              </svg>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <button
              onClick={() => {
                // ensure quantities are cleared when returning to the menu
                resetAll();
                navigate('/');
              }}
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
