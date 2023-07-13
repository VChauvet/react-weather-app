import WeatherIcon from '../components/WeatherIcon';
import LoadingIcon from '../components/LoadingCircle';

import { formatTemp, getTime } from '../utils/dateFormatHelper';



function WeatherDisplay({ weatherData }){
    function getCurrentLocalTime() {
        return (`Updated: ${getTime(weatherData.dt, weatherData.timezone)}`)
    }

    const tempMain = formatTemp(weatherData?.main.temp);
    const tempFeel = formatTemp(weatherData?.main.feels_like);

    let isLoaded = false;
    if (weatherData) {
        isLoaded = true;
    }

    return (
        <>
            <div className="relative w-full pb-12 drop-shadow-lg">
                <div className="absolute right-0 text-slate-200 text-lg">
                    {isLoaded && getCurrentLocalTime()}
                </div>
                <div className="relative flex flex-col items-center -z-10">
                    <div className="text-white">
                        { isLoaded ? 
                            <WeatherIcon
                                className="drop-shadow-md"
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
                    <div className="text-center text-2xl font-normal text-white">
                        feels {tempFeel}<span className="text-xl align-top pl-2">°C</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 place-items-center max-w-screen-md p-x-16 mb-12 mx-auto">
                <div className="text-white w-full flex flex-col items-center">
                    <WeatherIcon
                        name="wind_value"
                        width="50"
                    />
                    <div>Wind</div>
                    { isLoaded ? 
                        <div>
                            {Math.round(weatherData?.wind.speed * 3.6)}<span className="pl-2">km/h</span>
                        </div>
                    :
                        <div>
                            --<span className="pl-2">km/h</span>
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

export default WeatherDisplay;