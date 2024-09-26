import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import LocationList from '../components/LocationList';

const HomePage = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [savedLocations, setSavedLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const fetchWeather = async(location) => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=Pretoria&appid=2c1b2e44e19312e2ea6376b626e66c36`
        );
        setCurrentWeather({
            temp: res.data.main.temp,
            humidity: res.data.main.humidity,
            windSpeed: res.data.wind.speed,
        });
        setSelectedLocation(location);
        saveLocation(location);
    };

    const saveLocation = (location) => {
        if (!savedLocations.includes(location)) {
            setSavedLocations([...savedLocations, location]);
            localStorage.setItem('locations', JSON.stringify([...savedLocations, location]));
        }
    };

    useEffect(() => {
        const storedLocations = JSON.parse(localStorage.getItem('locations'));
        if (storedLocations) setSavedLocations(storedLocations);
    }, []);

    return ( <
        div >
        <
        SearchBar onSearch = { fetchWeather }
        /> {
        currentWeather && < WeatherCard location = { selectedLocation }
        weather = { currentWeather }
        />} <
        LocationList locations = { savedLocations }
        onSelectLocation = { fetchWeather }
        /> < /
        div >
    );
};

export default HomePage;