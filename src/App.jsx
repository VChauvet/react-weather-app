import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

import useFetchWeather from './customHooks/useFetchWeather';

import LocationPicker from './sections/LocationPicker';
import WeatherDisplay from './sections/WeatherDisplay';
import WeatherForecast from './sections/WeatherForecast';

import DynamicBackground from './components/DynamicBackground';

function App() {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const [animationState, setAnimationState] = useState(false);

    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
    useFetchWeather(location, setWeatherData, apiKey);

    useEffect(()=>{
        if (location !== null) setAnimationState(true);
    }, [location]);


    
    const pageReveal = {
        visible: (height = 200) => ({
            clipPath: `circle(${height}% at 50vw -4vh)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            }
        }),
        hidden: {
            clipPath: "circle(0% at 50vw -4vh)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };
    
    return (
        <div className="relative">
        
            <motion.div className="absolute z-20 w-full h-screen top-0 left-0 right-0 bottom-0 bg-blue-950 overflow-hidden"
                initial="visible"
                animate={animationState ? "hidden" : "visible"}
                variants={pageReveal}
            />

            <div className="container z-50 max-w-md mx-auto w-full">
                <motion.div
                    className="z-10 relative w-full"
                    layout
                    style={{ transform: animationState ? "translate(0)" : "translate(0, 42vh) scale(1)" }}
                >
                    <LocationPicker locationSetter={(location) => setLocation(location)} />
                </motion.div>
            </div>

            
            <DynamicBackground weatherData={weatherData}>
                <div className="container z-10">
                    <WeatherDisplay weatherData={weatherData} />
                </div>
            </DynamicBackground>



            
            <div className="container">
                <WeatherForecast location={location} />
            </div>
            
        
        </div>
        )
    }
    
    export default App