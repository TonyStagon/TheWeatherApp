import React, { useState } from 'react';

const SettingsPage = () => {
    const [theme, setTheme] = useState('light');
    const [units, setUnits] = useState('metric');

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return ( <
        div >
        <
        h2 > Settings < /h2> <
        label >
        Select Theme:
        <
        select value = { theme }
        onChange = {
            (e) => handleThemeChange(e.target.value) } >
        <
        option value = "light" > Light < /option> <
        option value = "dark" > Dark < /option> <
        /select> <
        /label> <
        label >
        Select Units:
        <
        select value = { units }
        onChange = {
            (e) => setUnits(e.target.value) } >
        <
        option value = "metric" > Celsius < /option> <
        option value = "imperial" > Fahrenheit < /option> <
        /select> <
        /label> <
        /div>
    );
};

export default SettingsPage;