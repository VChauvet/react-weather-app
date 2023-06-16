import React, { useState } from 'react'
import useFetchWeatherForecast from '../customHooks/useFetchWeatherForecast';

import WeatherIcon from '../components/WeatherIcon';

const WeatherForecast = ({location}) => {
    const [forecastData, setForecastData] = useState(null);

    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
    useFetchWeatherForecast(location, setForecastData, apiKey);


    function getLocalDate(timestamp) {
        const currentTime = new Date(timestamp * 1000);
        const timezoneOffset = currentTime.getTimezoneOffset() * 60 * 1000 + forecastData?.city.timezone * 1000;
        const adjustedTime = new Date(currentTime.getTime() + timezoneOffset);
        return adjustedTime;
    }

    function getDate(timestamp) {
        const dateTime = getLocalDate(timestamp);
        const options = { weekday: 'short'};

        const currentDay = getLocalDate(Date.now() /1000).getDay();
        if (dateTime.getDay() == currentDay) {
            return 'Today';
        }
        
        return dateTime.toLocaleString('en-GB', options);
    }

    function getTime(timestamp) {
        const dateTime = getLocalDate(timestamp);
        return dateTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
    


    return (
        <div className="w-full flex flex-wrap">
            {forecastData?.list.map(
                (listItem, index) => (
                    <div className="px-1 pb-2 grow">
                        <div className="relative min-h-[9rem] flex flex-col p-2 pb-4 items-center border rounded-md bg-white" key={index}>
                            <div className="absolute top-0 left-1 m-l m-t text-sm font-semibold text-slate-400">
                                {getDate(listItem?.dt)}
                            </div>
                            <div className="py-1 pt-2 font-semibold text-slate-600">
                                {getTime(listItem?.dt)}
                            </div>
                            <WeatherIcon name={listItem?.weather[0].icon} width='60' />
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default WeatherForecast;