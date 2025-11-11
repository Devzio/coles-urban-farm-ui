import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HerbGrid from './components/HerbGrid';
import QuantitySelector from './components/QuantitySelector';
import ConfirmPickup from './components/ConfirmPickup';
import { QuantitiesProvider } from './context/QuantitiesContext';

function App() {
  return (
    <BrowserRouter>
      <QuantitiesProvider>
        <div className="App min-h-screen bg-gray-100">
          {/* header removed: logo is shown inside the grid page */}

          <main>
            <Routes>
              <Route path="/" element={<HerbGrid />} />
              <Route path="/herb/:id" element={<QuantitySelector />} />
              <Route path="/confirm" element={<ConfirmPickup />} />
            </Routes>
          </main>
        </div>
      </QuantitiesProvider>
    </BrowserRouter>
  );
}

export default App;
