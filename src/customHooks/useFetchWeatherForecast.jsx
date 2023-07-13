import { useEffect } from 'react'

const useFetchWeatherForecast = (location, setData, apiKey, delay = 0) => {

  const request = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.lat}&lon=${location?.lon}&units=metric&appid=${apiKey}`;

  useEffect(
    () => {
        location !== null ? fetchLocation() : false;
    },
    [location]
  );

  function fetchLocation() {
      fetch(request)
          .then(response => response.json())
          .then(data => {
              setData(data);
          })
          .catch(e => {
              console.log(e.message);
              setData(['Sorry, no results'])
          })
      ;
  }

}

export default useFetchWeatherForecast;