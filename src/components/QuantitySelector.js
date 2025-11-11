import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuantities } from '../context/QuantitiesContext';
import herbs from '../data/herbs';
import LeafIcon from './LeafIcon';

export default function QuantitySelector() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quantities, setQuantity } = useQuantities();
  const [qty, setQty] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (id && quantities[id] != null) setQty(quantities[id]);
  }, [id, quantities]);

  function inc() {
    setQty((q) => q + 1);
  }
  function dec() {
    setQty((q) => Math.max(0, q - 1));
  }

  function add(n) {
    setQty((q) => Math.max(0, q + n));
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-red-600 hover:underline"
          >
            ← Back
          </button>
          <div className="text-lg font-semibold">
            {(() => {
              const herb = herbs.find((h) => h.id === id);
              return herb ? herb.name : (id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Herb');
            })()}
          </div>
          <div />
        </div>

        {/* Herb image / fallback icon */}
        <div className="flex items-center justify-center mb-6">
          {(() => {
            const herb = herbs.find((h) => h.id === id);
            if (herb && herb.image && !imgError) {
              return (
                <img
                  src={herb.image}
                  alt={herb.name}
                  className="w-32 h-32 object-cover rounded-full shadow-md"
                  onError={() => setImgError(true)}
                />
              );
            }
            return <LeafIcon className="w-32 h-32" />;
          })()}
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={dec}
            disabled={qty === 0}
            aria-label="Decrease"
            className={
              'w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold transition-colors ' +
              (qty === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-red-100 text-red-700 hover:bg-red-200')
            }
          >
            –
          </button>

          <div className="flex flex-col items-center">
            <div className="text-6xl font-extrabold text-gray-800">{qty}</div>
            <div className="text-sm text-gray-500 mt-2">Selected stems</div>
          </div>

          <button
            onClick={inc}
            aria-label="Increase"
            className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold bg-green-600 text-white hover:bg-green-700"
          >
            +
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              // clear persisted quantity and UI
              if (id) {
                setQty(0);
                setQuantity(id, 0);
              }
            }}
            className="px-4 py-2 rounded-md bg-gray-50 border text-gray-700 font-medium hover:bg-gray-100"
          >
            Clear
          </button>

          <button
            onClick={() => add(2)}
            className="px-4 py-2 rounded-md bg-gray-100 border text-gray-700 font-medium hover:bg-gray-200"
          >
            +2
          </button>

          <button
            onClick={() => add(5)}
            className="px-4 py-2 rounded-md bg-gray-100 border text-gray-700 font-medium hover:bg-gray-200"
          >
            +5
          </button>
          <button
            onClick={() => add(10)}
            className="px-4 py-2 rounded-md bg-gray-100 border text-gray-700 font-medium hover:bg-gray-200"
          >
            +10
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            onClick={() => {
              if (id) setQuantity(id, qty);
              navigate('/confirm');
            }}
            className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
