import React, { useState } from 'react';

const SettingsPage = ({ onUnitsChange }) => {
  const [theme, setTheme] = useState('light');
  const [units, setUnits] = useState('metric'); // Default to metric (Celsius)

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleUnitsChange = (e) => {
    const newUnits = e.target.value;
    setUnits(newUnits);
    onUnitsChange(newUnits); // Inform parent (App) of the change
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Select Theme:
        <select value={theme} onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <br />
      <label>
        Select Units:
        <select value={units} onChange={handleUnitsChange}>
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
      </label>
    </div>
  );
};

export default SettingsPage;
