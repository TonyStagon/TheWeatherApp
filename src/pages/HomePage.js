import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import LocationList from '../components/LocationList';
import './styles.css'; // Importing the new CSS file

const HomePage = () => {
  const [liveWeather, setLiveWeather] = useState(null);
  const [searchedWeather, setSearchedWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [savedLocations, setSavedLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [units, setUnits] = useState('C');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchLiveWeather = async (latitude, longitude) => {
    try {
      const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=4&aqi=no&alerts=no`);
      const locationRes = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${latitude},${longitude}`);
      setLiveWeather({
        location: locationRes.data[0]?.name || "Unknown Location",
        temp: res.data.current.temp_c,
        humidity: res.data.current.humidity,
        windSpeed: res.data.current.wind_kph,
        icon: res.data.current.condition.icon
      });
      setHourlyForecast(res.data.forecast.forecastday[0].hour.slice(0, 4));
      setDailyForecast(res.data.forecast.forecastday);
    } catch (error) {
      console.error("Error fetching live weather:", error);
    }
  };

  const fetchSearchedWeather = async (location) => {
    try {
      const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`);
      setSearchedWeather({
        location,
        temp: res.data.current.temp_c,
        humidity: res.data.current.humidity,
        windSpeed: res.data.current.wind_kph,
        icon: res.data.current.condition.icon
      });
      setHourlyForecast(res.data.forecast.forecastday[0].hour.slice(0, 4));
      setDailyForecast(res.data.forecast.forecastday);
    } catch (error) {
      console.error("Error fetching searched weather:", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchLiveWeather(latitude, longitude);
      }, (error) => {
        console.error("Error getting geolocation:", error);
      });
    }
    const storedLocations = JSON.parse(localStorage.getItem('locations'));
    if (storedLocations) setSavedLocations(storedLocations);

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply the theme class to the body element
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  const handleSearchInput = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchLocation) {
      fetchSearchedWeather(searchLocation);
      setSearchLocation('');
    }
  };

  const convertTemperature = (tempInC) => {
    return units === 'C' ? tempInC : (tempInC * 9/5) + 32;
  };

  const toggleUnits = () => {
    setUnits(prevUnits => (prevUnits === 'C' ? 'F' : 'C'));
  };

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        {/* Theme toggle button */}
        <div style={{ marginRight: '10px' }}>
          <button onClick={toggleTheme}>
            Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
          </button>
        </div>

        {/* Search form centered */}
        <form onSubmit={handleSearchSubmit} style={{ flexGrow: 1, textAlign: 'center' }}>
          <input 
            type="text"
            placeholder="Search for location"
            value={searchLocation}
            onChange={handleSearchInput}
            style={{ width: '80%', padding: '10px', marginRight: '10px' }}
          />
          <button type="submit" style={{ padding: '10px' }}>Search</button>
        </form>

        {/* Unit toggle button */}
        <div style={{ marginLeft: '10px' }}>
          <button onClick={toggleUnits}>
            Switch to {units === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      </div>

      {/* Live weather display */}
      {liveWeather && (
        <div style={{ textAlign: 'center' }}>
          <h2>Live Location: {liveWeather.location}</h2>
          <WeatherCard
            location={liveWeather.location}
            weather={{
              temp: convertTemperature(liveWeather.temp),
              humidity: liveWeather.humidity,
              windSpeed: liveWeather.windSpeed,
              icon: liveWeather.icon
            }}
          />
          
        </div>
      )}

      {/* Searched weather display */}
      {searchedWeather && (
        <div style={{ textAlign: 'center' }}>
          <h2>Searched Location: {searchedWeather.location}</h2>
          <WeatherCard
            location={searchedWeather.location}
            weather={{
              temp: convertTemperature(searchedWeather.temp),
              humidity: searchedWeather.humidity,
              windSpeed: searchedWeather.windSpeed,
              icon: searchedWeather.icon
            }}
          />
          {/* Hourly forecast */}
          <h3>Hourly Forecast</h3>
          <div className="forecast-container">
            {hourlyForecast.map((hour, index) => (
              <div key={index} className="forecast-item">
                <img src={hour.condition.icon} alt={hour.condition.text} />
                <p>{hour.time.split(' ')[1]}</p>
                <p>Temp: {convertTemperature(hour.temp_c)}°{units}</p>
              </div>
            ))}
          </div>
          {/* Daily forecast */}
          <h3>Daily Forecast</h3>
          <div className="forecast-container">
            {dailyForecast.slice(0, 4).map((day, index) => (
              <div key={index} className="forecast-item">
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <p>{day.date}</p>
                <p>Day: {convertTemperature(day.day.avgtemp_c)}°{units}</p>
                <p>Night: {convertTemperature(day.day.mintemp_c)}°{units}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;
