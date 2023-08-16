import { useState, useEffect } from "react";
import useFetchLocaction from "../customHooks/useFetchLocaction";
import useFetchCityByCoord from "../customHooks/useFetchCityByCoord";
import OutsideClickHandler from '../wrapper/OutsideClickHandler';
import SvgIcon from '../components/SvgIcon';



function LocationPicker ({locationSetter}) {
    const [currentSearchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isSearchMode, setSearchMode] = useState(true);
    const [locationData, setlocationData] = useState([]);
    const [deviceCoord, setDeviceCoord] = useState({lat: '', lon: ''});    
    
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;    
    useFetchLocaction(currentSearchTerm, setlocationData, apiKey, 800);

    useFetchCityByCoord(deviceCoord, setSearchTerm, apiKey);

    
    
    function DeviceLocationFinderButton() {
        if (!("geolocation" in navigator)) return;
    
        function getLocation() {
            navigator.geolocation.getCurrentPosition((position) => {
                setDeviceCoord({ lat: position.coords.latitude, lon: position.coords.longitude });
                setSearchMode(true);
            });
        }
    
        return <button onClick={getLocation} className={`rounded-full absolute ${!isSearchMode && currentSearchTerm !== '' && selectedLocation && 'text-white'}`}>
            <SvgIcon 
                iconName="location_pin"
                svgProp={{
                    width: 25,
                    height: 25
                }}
            />
        </button>
    }

    function updateLocation(location) {
        setSelectedLocation(location);
        locationSetter(location);
        setSearchMode(false);
    }

    function handleLocationClick(event, location) {
        event.preventDefault();
        updateLocation(location);
    }
    
    function handleLocationKeyPress(event, location) {
        if (event.key === "Enter") {
            event.preventDefault();
            updateLocation(location);
        }
    }

    return (
        <>
            <div className="searchbarWrapper relative w-full">
                <OutsideClickHandler handler={() => setSearchMode(false)}>
                    <div className="relative max-w-xs mx-auto py-4">
                        <form onSubmit={e => e.preventDefault()}>   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-white">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                                    <DeviceLocationFinderButton />
                                </div>
                                <input 
                                    autoFocus
                                    value={currentSearchTerm }
                                    onChange={e => setSearchTerm(e.target.value)}
                                    onClick={() => setSearchMode(true)}
                                    id="default-search" 
                                    type="search" 
                                    className={`
                                        ${ !isSearchMode && currentSearchTerm !== '' && selectedLocation ? 'opacity-0' : 'opacity-100'}
                                        block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                    `}
                                    placeholder="Where?" 
                                    required 
                                />
                                <div
                                    id="default-search" 
                                    type="search" 
                                    className={`
                                        ${ !isSearchMode && currentSearchTerm !== '' && selectedLocation ? 'opacity-100' : 'opacity-0'}
                                        pointer-events-none block absolute top-0 w-full p-4 pl-10 text-sm text-white border-2 border-white rounded-full bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                    `}

                                    required 
                                >
                                    {selectedLocation.name}, {selectedLocation.country}
                                </div>


                                <button onSubmit={(e) => e.preventDefault()} type="submit" className="hidden text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Search
                                </button>
                            </div>
                        </form>
                        <div className={`${locationData.length > 0 && isSearchMode == true ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute w-full px-6 py-2 transition-opacity text-lg bg-gray-50 block rounded-3xl rounded-t-xl shadow-md border border-gray-400`}>
                            {locationData.length > 0 && (
                            <ul>
                                {locationData.map((location, index) => (
                                <li
                                    key={index}
                                    onClick={(e) => handleLocationClick(e, location)}
                                    onKeyDown={(e) => handleLocationKeyPress(e, location)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {location.name}, {location.country}
                                </li>
                                ))}
                            </ul>
                            )}
                        </div>
                    </div>
                </OutsideClickHandler>
            </div>
        </>
    )
}

export default LocationPicker;