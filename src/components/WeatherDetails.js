import React from 'react';

const WeatherDetails = ({ forecast }) => {
    return ( <
        div className = "weather-details" > {
            forecast.map((item, index) => ( <
                div key = { index } >
                <
                p > { item.time } < /p> <
                p > { item.temp }°
                C < /p> <
                /div>
            ))
        } <
        /div>
    );
};

export default WeatherDetails;