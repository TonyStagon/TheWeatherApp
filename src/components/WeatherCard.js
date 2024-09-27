import React from 'react';

const WeatherCard = ({ location, weather }) => {
  return (
    <div className="weather-card">
      <h4>{location}</h4>
      <img src={weather.icon} alt="Weather icon" />
      <p>Temperature: {weather.temp}°</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>Wind Speed: {weather.windSpeed} kph</p>
    </div>
  );
};

export default WeatherCard;
