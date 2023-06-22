import React, { useState } from 'react'
import useFetchWeatherForecast from '../customHooks/useFetchWeatherForecast';
import { motion } from 'framer-motion';

import WeatherIcon from '../components/WeatherIcon';

const WeatherForecast = ({location}) => {
    const [forecastData, setForecastData] = useState(null);

    
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
    useFetchWeatherForecast(location, setForecastData, apiKey);


    const animationContainer = {
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
        hidden: { opacity: 0, y: 10 },
    };
    const animationCard = {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 },
    }


    function getLocalDate(timestamp) {
        const currentTime = new Date(timestamp * 1000);
        const timezoneOffset = currentTime.getTimezoneOffset() * 60 * 1000 + forecastData?.city.timezone * 1000;
        const adjustedTime = new Date(currentTime.getTime() + timezoneOffset);
        return adjustedTime;
    }

    function formatTemp(num) {
        return (Math.round(num * 10) / 10).toFixed(1).replace(".", ",");
    }

    function getDate(timestamp) {
        const dateTime = getLocalDate(timestamp);
        const options = { weekday: 'long'};

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
        <div className="w-full flex flex-auto flex-wrap">
            {
            forecastData &&
            Object.entries(forecastData?.list.reduce(
                (acc, listItem, index) => {

                    const weekDay =  getDate(listItem?.dt);
                    const dayForecast = acc[weekDay] || []; 

                    const tempReadOut = formatTemp(listItem?.main.temp);
                    const tempFeelReadOut = formatTemp(listItem?.main.feels_like);


                    dayForecast.push(
                        <motion.div className="px-1 pb-2" key={index}
                            variants={animationCard}
                        >
                            <div className="relative min-h-[9rem] h-full flex flex-col p-2 pb-4 items-center border rounded-md bg-white">
                                <div className="absolute top-0 left-1 m-l m-t text-sm font-semibold text-slate-400">
                                    {getTime(listItem?.dt)}
                                </div>
                                <div className="pt-2 font-semibold text-slate-600">
                                    {tempReadOut}°C
                                </div>
                                <div className="font-semibold text-xs text-slate-600">
                                    {tempFeelReadOut}°C
                                </div>
                                <WeatherIcon name={listItem?.weather[0].icon} width='60' />
                                <div className="py-1 pt-2 font-semibold text-sm break-words text-slate-600 max-w-[6rem] sm:max-w-none text-center">
                                    {listItem?.weather[0].description}
                                </div>
                            </div>
                        </motion.div>
                    );

                    return {
                        ...acc, 
                        [weekDay]: dayForecast
                    }
                },{}
            )).map(([key, value], i) => {

                return i < 3 && (
                    <motion.div className="w-full mb-4" key={i}
                        initial={'hidden'}
                        whileInView={'visible'}
                        viewport={{ once: true }}
                        variants={animationContainer}

                    >
                        <div className="text-white font-semibold pb-2">{key}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8">
                            {value}
                        </div>
                    </motion.div>
                )
            })
            }
        </div>
    )
}

export default WeatherForecast;