import { useEffect } from 'react'

const useFetchWeather = (query, setData, apiKey, delay = 0) => {

  const request = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;
  useEffect(
    () => {
        let queryTimer;
        function debounceFetch() {
            clearTimeout(queryTimer);

            queryTimer = setTimeout(() => {
                fetchLocation()
            }, delay)
        }

        query !== '' ? debounceFetch() : false;

        return () => {
            clearTimeout(queryTimer);
        };
    },
    [query]
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

export default useFetchWeather;