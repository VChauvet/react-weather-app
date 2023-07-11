import React, { useState } from 'react'
import useFetchWeatherForecast from '../customHooks/useFetchWeatherForecast';
import { motion } from 'framer-motion';

import ForecastCard from '../components/ForecastCard';
import { getDate } from '../utils/dateFormatHelper';

function WeatherForecast ({location}) {
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

    return (
        <div className="w-full flex flex-auto flex-wrap">
            {
            forecastData &&
            Object.entries(forecastData?.list.reduce(
                (acc, listItem, index) => {

                    const weekDay =  getDate(listItem?.dt, forecastData?.city.timezone);
                    const dayForecast = acc[weekDay] || []; 


                    dayForecast.push(
                        <motion.div className="px-1 pb-2" key={index}
                            variants={animationCard}
                        >
                            <ForecastCard listItem={listItem} timezone={forecastData?.city.timezone} />
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