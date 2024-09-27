import React from 'react';

const WeatherDetails = ({ forecast, units }) => {
  return (
    <div className="weather-details">
      {forecast.map((item, index) => (
        <div key={index}>
          <p>{item.time}: {units === 'C' ? item.temp_c : item.temp_f}°</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
