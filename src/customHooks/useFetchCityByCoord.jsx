import { useEffect } from 'react'

const useFetchWeather = (deviceCoord, setData, apiKey, delay = 0) => {

  const request = `https://api.openweathermap.org/geo/1.0/reverse?lat=${deviceCoord.lat}&lon=${deviceCoord.lon}&limit=3&appid=${apiKey}`;
  useEffect(
    () => {
        let queryTimer;
        function debounceFetch() {
            clearTimeout(queryTimer);

            queryTimer = setTimeout(() => {
                fetchLocation()
            }, delay)
        }

        deviceCoord.lat && deviceCoord.lon ? debounceFetch() : false;

        return () => {
            clearTimeout(queryTimer);
        };
    },
    [deviceCoord]
  );

  function fetchLocation() {
      fetch(request)
          .then(response => response.json())
          .then(data => {
              setData(data[0].name);
          })
          .catch(e => {
              console.log(e.message);
              setData(['Sorry, no results'])
          })
      ;
  }

}

export default useFetchWeather;