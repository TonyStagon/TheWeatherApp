import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  const [units, setUnits] = useState('metric'); // Default to Celsius

  const handleUnitsChange = (newUnits) => {
    setUnits(newUnits);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage units={units} />} />
          <Route path="/settings" element={<SettingsPage onUnitsChange={handleUnitsChange} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
