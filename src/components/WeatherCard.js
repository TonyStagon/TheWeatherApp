import React from 'react';

const WeatherCard = ({ location, weather }) => {
    return ( <
        div className = "weather-card" >
        <
        h3 > { location } < /h3> <
        p > Temperature: { weather.temp }°
        C < /p> <
        p > Humidity: { weather.humidity } % < /p> <
        p > Wind Speed: { weather.windSpeed }
        km / h < /p> <
        /div>
    );
};

export default WeatherCard;