import React, { createContext, useContext, useEffect, useState } from 'react';

const QuantitiesContext = createContext(null);

export function QuantitiesProvider({ children }) {
  const [quantities, setQuantities] = useState(() => {
    try {
      const raw = localStorage.getItem('herbQuantities');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('herbQuantities', JSON.stringify(quantities));
    } catch (e) { }
  }, [quantities]);

  function setQuantity(id, value) {
    setQuantities((q) => ({ ...q, [id]: value }));
  }

  function resetAll() {
    // reset stored quantities to an empty object (treated as zero elsewhere)
    setQuantities({});
  }

  return (
    <QuantitiesContext.Provider value={{ quantities, setQuantity, resetAll }}>
      {children}
    </QuantitiesContext.Provider>
  );
}

export function useQuantities() {
  const ctx = useContext(QuantitiesContext);
  if (!ctx) throw new Error('useQuantities must be used within QuantitiesProvider');
  return ctx;
}
