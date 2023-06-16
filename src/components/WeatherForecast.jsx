import React, { useState } from 'react'
import useFetchWeatherForecast from '../customHooks/useFetchWeatherForecast';

import WeatherIcon from '../components/WeatherIcon';

const WeatherForecast = ({location}) => {
    const [forecastData, setForecastData] = useState(null);

    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
    useFetchWeatherForecast(location, setForecastData, apiKey);



    function getDate(dateString) {
        const dateTime = new Date(dateString);

        var options = { weekday: 'short'};

        return dateTime.toLocaleDateString("en-GB", options);
    }

    function getTime(dateString) {
        const dateTime = new Date(dateString);
        return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    


    return (
        <div className="w-full flex flex-wrap">
            {forecastData?.list.map(
                (listItem, index) => (
                    <div className="w-1/3 border rounded-md bg-white" key={index}>
                        {getDate(listItem?.dt_txt)}
                        <WeatherIcon name={listItem?.weather[0].icon} width='60' />
                    </div>
                )
            )}



        </div>
    )
}

export default WeatherForecast;