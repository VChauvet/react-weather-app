import './App.css'

import React, { useState } from 'react'
import useFetchWeather from './customHooks/useFetchWeather';

import LocationPicker from './components/LocationPicker';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherForecast from './components/WeatherForecast';

function App() {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);


  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
  useFetchWeather(location, setWeatherData, apiKey);

  return (
      <div className="w-full px-2 max-w-screen-lg  h-screen mx-auto">
          <LocationPicker locationSetter={(location) => setLocation(location)} />

          <WeatherDisplay weatherData={weatherData} />

          <WeatherForecast location={location} />

      </div>
  )
}

export default App