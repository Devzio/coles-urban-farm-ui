import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuantities } from '../context/QuantitiesContext';
import herbs from '../data/herbs';
import LeafIcon from './LeafIcon';

export default function QuantitySelector() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quantities, setQuantity, resetAll } = useQuantities();
  const [qty, setQty] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [openPanel, setOpenPanel] = useState(null); // 'recipes' | 'info' | 'storage' | null
  const herb = herbs.find((h) => h.id === id) || null;

  function getHerbInfo(key) {
    // return general info for common herbs; fallback to a generic template
    const map = {
      basil: {
        scientific: 'Ocimum basilicum',
        origin: 'Native to tropical regions from central Africa to Southeast Asia',
        flavor: 'Sweet, peppery and slightly clove-like',
        uses: 'Pesto, salads, tomato dishes, fresh finishing herb',
        tips: [
          'Prefers warm, sunny locations and well-drained soil.',
          'Pinch flower heads to encourage bushy growth and delay bolting.',
          'Harvest from the top regularly; leaves are best used fresh.'
        ]
      },
      parsley: {
        scientific: 'Petroselinum crispum',
        origin: 'Mediterranean region',
        flavor: 'Fresh, slightly peppery and grassy',
        uses: 'Garnishes, tabbouleh, sauces and flavoring stocks',
        tips: [
          'Likes rich soil and consistent moisture.',
          'Cut outer stems to let the center keep growing (cut-and-come-again).',
          'Flat-leaf (continental) is more flavorful for cooking.'
        ]
      },
      coriander: {
        scientific: 'Coriandrum sativum (cilantro for leaves)',
        origin: 'Native to regions spanning Southern Europe to Western Asia',
        flavor: 'Citrusy, bright; seeds have warm, spicy notes',
        uses: 'Salsas, curries, Asian and Latin American dishes',
        tips: [
          'Prefers cooler weather; bolts quickly in heat.',
          'Sow successionally for continuous harvest.',
          'Use leaves fresh; seeds (coriander) are used dried.'
        ]
      },
      mint: {
        scientific: 'Mentha spp.',
        origin: 'Temperate regions of Europe and Asia',
        flavor: 'Cool, sweet and very aromatic',
        uses: 'Teas, cocktails, salads, desserts and savory dishes',
        tips: [
          'Grows vigorously; best kept in containers to avoid spreading.',
          'Likes moist, partly shaded spots.',
          'Harvest leaves regularly to prevent woody growth.'
        ]
      },
      rosemary: {
        scientific: 'Salvia rosmarinus',
        origin: 'Mediterranean region',
        flavor: 'Pine-like, resinous and savory',
        uses: 'Roasts, potatoes, breads, marinades',
        tips: [
          'Prefers full sun and very well-drained soil.',
          'Drought-tolerant once established; prune to shape after flowering.',
          'Use sparingly — strong flavour.'
        ]
      },
      thyme: {
        scientific: 'Thymus vulgaris',
        origin: 'Mediterranean region',
        flavor: 'Earthy, slightly minty and floral',
        uses: 'Soups, stews, marinades, roasted vegetables',
        tips: [
          'Thrives in sunny, well-drained spots.',
          'Prune back after flowering to maintain shape.',
          'Pairs well with citrus and garlic.'
        ]
      },
      watercress: {
        scientific: 'Nasturtium officinale',
        origin: 'Europe and Asia',
        flavor: 'Peppery and peppery green',
        uses: 'Salads, sandwiches, soups and garnishes',
        tips: [
          'Prefers very moist or aquatic conditions.',
          'Harvest outer leaves; avoid flowering stems for best flavour.',
          'Grows quickly in cool weather.'
        ]
      },
      continentalparsley: {
        scientific: 'Petroselinum crispum (flat-leaf)',
        origin: 'Mediterranean region',
        flavor: 'Fresh and robust — great for cooking',
        uses: 'Soups, sauces, garnishes, tabbouleh',
        tips: [
          'Treat like parsley (cut-and-come-again).',
          'Ensure good moisture and partial sun for best texture.'
        ]
      },
      thaibasil: {
        scientific: 'Ocimum basilicum var. thyrsiflora',
        origin: 'Southeast Asia',
        flavor: 'Anise-like, spicy with clove notes',
        uses: 'Thai curries, stir-fries, salads and garnishes',
        tips: [
          'Warm temperatures and plenty of light encourage flavour.',
          'Use fresh leaves to preserve aromatic notes.'
        ]
      }
    };

    return map[key] || {
      scientific: '—',
      origin: 'Various',
      flavor: 'Herbaceous',
      uses: 'Culinary and fresh finishing',
      tips: ['Grow in good compost, water regularly and harvest often.']
    };
  }

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
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => {
                // clear any picked quantities when returning to menu
                resetAll();
                navigate(-1);
              }}
              className="text-sm text-red-600 hover:underline"
            >
              ← Back
            </button>
            <div className="text-lg font-semibold">
              {herb ? herb.name : (id ? id.charAt(0).toUpperCase() + id.slice(1) : 'Herb')}
            </div>
            <div />
          </div>

          {/* Herb image / fallback icon */}
          <div className="flex items-center justify-center mb-6">
            {herb && herb.image && !imgError ? (
              <img
                src={herb.image}
                alt={herb.name}
                className="w-32 h-32 object-cover rounded-full shadow-md"
                onError={() => setImgError(true)}
              />
            ) : (
              <LeafIcon className="w-32 h-32" />
            )}
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
                // user confirmed — we don't persist picks, reset everything and show confirmation
                resetAll();
                navigate('/confirm');
              }}
              className="px-6 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700"
            >
              Confirm
            </button>
          </div>


        </div>

        {/* Right-side panel of horizontal buttons */}
        <div className="w-full md:w-1/2 flex-shrink-0 relative">
          <div className="flex flex-col gap-3">
            <div>
              <button
                onClick={() => setOpenPanel(openPanel === 'recipes' ? null : 'recipes')}
                aria-expanded={openPanel === 'recipes'}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 bg-white border hover:bg-red-50 hover:border-red-400 transition ${openPanel === 'recipes' ? 'rounded-t-md border-b-0 ring-2 ring-red-400' : 'rounded-md'}`}
              >
                <svg className={`w-5 h-5 flex-shrink-0 ${openPanel === 'recipes' ? 'text-red-600' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M3 3v6a6 6 0 006 6h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 3v6a6 6 0 01-6 6h0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='font-semibold text-xl'>Recommended Recipes</span>
              </button>

              {/* accordion content unfolds from below the button */}
              <div className={`mt-0 bg-white rounded-b-md shadow p-4 transition-all duration-300 ease-in-out overflow-hidden text-left border ${openPanel === 'recipes' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  <li>• Herb butter with parsley & chives</li>
                  <li>• Lemon thyme chicken skewers</li>
                  <li>• Mint & cucumber salad</li>
                </ul>
              </div>
            </div>

            <div>
              <button
                onClick={() => setOpenPanel(openPanel === 'info' ? null : 'info')}
                aria-expanded={openPanel === 'info'}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 bg-white border hover:bg-red-50 hover:border-red-400 transition ${openPanel === 'info' ? 'rounded-t-md border-b-0 ring-2 ring-red-400' : 'rounded-md'}`}
              >
                <svg className={`w-5 h-5 flex-shrink-0 ${openPanel === 'info' ? 'text-red-600' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 8v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 12h1v4h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='font-semibold text-xl'>Herb Information</span>
              </button>

              <div className={`mt-0 bg-white rounded-b-md shadow p-4 transition-all duration-300 ease-in-out overflow-hidden text-left border ${openPanel === 'info' ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {(() => {
                  const info = getHerbInfo(id);
                  return (
                    <div>
                      <p className="text-sm text-gray-700"><strong>Scientific name:</strong> {info.scientific}</p>
                      <p className="text-sm text-gray-700 mt-1"><strong>Origin:</strong> {info.origin}</p>
                      <p className="text-sm text-gray-700 mt-1"><strong>Flavor profile:</strong> {info.flavor}</p>
                      <p className="text-sm text-gray-700 mt-1"><strong>Common uses:</strong> {info.uses}</p>

                      <div className="text-sm text-gray-700 mt-3">
                        <strong>Growing & harvesting tips:</strong>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {info.tips.map((t, i) => (
                            <li key={i}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div>
              <button
                onClick={() => setOpenPanel(openPanel === 'storage' ? null : 'storage')}
                aria-expanded={openPanel === 'storage'}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 bg-white border hover:bg-red-50 hover:border-red-400 transition ${openPanel === 'storage' ? 'rounded-t-md border-b-0 ring-2 ring-red-400' : 'rounded-md'}`}
              >
                <svg className={`w-5 h-5 flex-shrink-0 ${openPanel === 'storage' ? 'text-red-600' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="3" y="7" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 7V5a3 3 0 013-3h4a3 3 0 013 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='font-semibold text-xl'>Recommended Storage</span>
              </button>

              <div className={`mt-0 bg-white rounded-b-md shadow p-4 transition-all duration-300 ease-in-out overflow-hidden text-left border ${openPanel === 'storage' ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                <ul className="text-sm text-gray-700 space-y-1 text-left">
                  <li>• Store in damp paper towel inside a sealed bag</li>
                  <li>• Freeze chopped herbs in oil cubes</li>
                  <li>• Revive wilted herbs with cold water soak</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}