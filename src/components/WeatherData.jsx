import React, { useState } from 'react'
import useFetchWeather from '../customHooks/useFetchWeather';

import LocationPicker from '../components/LocationPicker';
import WeatherForecast from '../components/WeatherForecast';

import WeatherIcon from '../components/WeatherIcon';

import LoadingIcon from '../components/LoadingCircle';

const WeatherData = () => {
    const [location, setLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);


    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
    useFetchWeather(location, setWeatherData, apiKey);

    function Weather({weatherData}){
        const tempReadOut = weatherData?.main.temp;
        const tempMain = (Math.round(tempReadOut * 10) / 10).toFixed(1).replace(".", ",");

        let isLoaded = false;
        if (weatherData) {
            isLoaded = true;
        }



        return (
            <>
                <div className="w-full mb-24">
                    <div className="flex flex-col items-center">
                        <div className="text-white">
                            { isLoaded ? 
                                <WeatherIcon
                                    name={weatherData?.weather[0].icon}
                                    width="200"
                                />
                            :
                                <LoadingIcon width="200"/>
                            }
                        </div>
                        <div className="text-xl text-white">
                            {weatherData?.weather[0].description}
                        </div>
                        <div className="text-center text-6xl font-semibold text-white">
                            {tempMain}<span className="text-4xl align-top pl-2">°C</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8 place-items-center max-w-screen-md p-x-16 mx-auto">
                <div className="text-white w-full flex flex-col items-center">
                        <WeatherIcon
                            name="wind_value"
                            width="50"
                        />
                        <div>Wind</div>
                        { isLoaded ? 
                            <div>
                                {weatherData?.wind.speed}<span className="pl-2">m/s</span>
                            </div>
                        :
                            <div>
                                --<span className="pl-2">m/s</span>
                            </div>
                        }
                    </div>
                    <div className="text-white w-full flex flex-col items-center">
                        <WeatherIcon
                            name="humidity_value"
                            width="50"
                        />
                        <div>Humidity</div>
                        { isLoaded ?
                            <div>
                                {weatherData?.main.humidity}<span className="pl-2">%</span>
                            </div>
                        :
                            <div>
                                --<span className="pl-2">%</span>
                            </div>
                        }
                    </div>
                    <div className="text-white w-full flex flex-col items-center">
                        <WeatherIcon
                            name="sight_value"
                            width="50"
                        />
                        <div>Visibility</div>
                        { isLoaded ?
                            <div>
                                {weatherData?.visibility / 1000}<span className="pl-2">km</span>
                            </div>
                        :
                            <div>
                                --<span className="pl-2">km</span>
                            </div>
                        }
                    </div>


                </div>

            </>
        )
    }

    return (
        <div>
            <LocationPicker locationSetter={(location) => setLocation(location)} />

            <Weather weatherData={weatherData} />

            <WeatherForecast location={location} />
        </div>
    )
}

export default WeatherData;