import WeatherIcon from '../components/WeatherIcon';
import { formatTemp, getTime } from '../utils/dateFormatHelper';


function ForecastCard ({ listItem, timezone }) {

    const tempReadOut = formatTemp(listItem?.main.temp);
    const tempFeelReadOut = formatTemp(listItem?.main.feels_like);

    return (
        <div className="relative min-h-[9rem] h-full flex flex-col p-2 pb-3 items-center border rounded-md bg-[#c0c7e1]">
            <div className="absolute top-0 left-1 m-l m-t text-sm font-semibold text-slate-600">
                {getTime(listItem?.dt, timezone)}
            </div>
            <div className="pt-3 font-semibold text-slate-800">
                {tempReadOut}°C
            </div>
            <div className="font-semibold text-xs text-slate-600">
                {tempFeelReadOut}°C
            </div>
            <WeatherIcon 
                className="drop-shadow-md"
                name={listItem?.weather[0].icon} 
                width='60' 
                />
            <div className="py-1 pt-2 font-semibold text-sm break-words text-slate-600 max-w-[6rem] sm:max-w-none text-center">
                {listItem?.weather[0].description}
            </div>
        </div>
    )
}

export default ForecastCard;