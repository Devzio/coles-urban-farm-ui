import React from 'react';
import { useNavigate } from 'react-router-dom';
import herbs from '../data/herbs';
import LeafIcon from './LeafIcon';

export default function HerbGrid() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-800 to-black p-6">
      <div className="w-full max-w-[min(95vw,760px)]">
        {/* Coles logo placed above the grid */}
        <div className="flex items-center justify-center mb-6">
          <img src="/coles-logo.png" alt="Coles" className="h-12 sm:h-14" />
          <h1 className="text-white ms-6 text-[3.5rem]">Urban Farm</h1>
        </div>

        <main className="mx-auto w-full max-w-[min(95vw,700px)] bg-gray-200 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="w-full aspect-square grid grid-cols-3 gap-6">
            {herbs.map((h, idx) => (
              <div key={h.id} className="">
                <button
                  aria-label={`Select ${h.name}`}
                  onClick={() => navigate(`/herb/${h.id}`)}
                  className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-white/90 hover:bg-white focus:bg-white transform-gpu hover:-translate-y-0.5 hover:scale-[1.015] transition-all shadow-md hover:shadow-xl border border-white/40 hover:border-red-600 hover:ring-2 hover:ring-red-500  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500 focus-visible:ring-opacity-20"
                >
                  <div className="w-3/4 h-3/4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {h.image ? (
                      <img
                        src={h.image}
                        alt={h.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <LeafIcon rotate={(idx % 3) * 8} />
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-800">{h.name}</span>
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
