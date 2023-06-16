import { useState, useEffect } from "react";
import useFetchLocaction from "../customHooks/useFetchLocaction";
import OutsideClickHandler from '../wrapper/OutsideClickHandler';

const LocationPicker = ({locationSetter}) => {
    const [currentSearchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isSearchMode, setSearchMode] = useState(true);
    const [locationData, setlocationData] = useState([]);

    
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;    
    useFetchLocaction(currentSearchTerm, setlocationData, apiKey, 1500);

    function handleLocationClick(event, location) {
        event.preventDefault();
        setSelectedLocation(location);
        locationSetter(location);
        setSearchMode(false);
    }
    
    function handleLocationKeyPress(event, location) {
        event.preventDefault();
        if (event.key === "Enter") {
            setSelectedLocation(location);
            locationSetter(location);
            setSearchMode(false);
        }

    }

    return (
        <>
            <div className="searchbarWrapper flex flex-col items-center">
                <OutsideClickHandler handler={() => setSearchMode(false)}>
                    <div className="relative max-w-96 py-4">
                        <form onSubmit={e => e.preventDefault()}>   
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only dark:text-white">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                </div>
                                <input 
                                    value={currentSearchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    onClick={() => setSearchMode(true)}
                                    id="default-search" 
                                    type="search" 
                                    className={`
                                        ${isSearchMode == false && currentSearchTerm != '' ? 'opacity-0' : 'opacity-100'}
                                        block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                    `}
                                    placeholder="Where?" 
                                    required 
                                />
                                <div
                                    id="default-search" 
                                    type="search" 
                                    className={`
                                        ${isSearchMode == false && currentSearchTerm != '' ? 'opacity-100' : 'opacity-0'}
                                        pointer-events-none block absolute top-0 w-full p-4 pl-10 text-sm text-white border-2 border-white rounded-full bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                                    `}

                                    required 
                                >
                                    {selectedLocation.name} , {selectedLocation.country}
                                </div>


                                <button onSubmit={(e) => e.preventDefault()} type="submit" className="hidden text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Search
                                </button>
                            </div>
                        </form>
                        <div className={`${locationData.length > 0 && isSearchMode == true ? 'opacity-100' : 'opacity-0'} absolute w-full px-6 py-2 transition-opacity text-lg bg-gray-50 block rounded-3xl rounded-t-xl shadow-md border border-gray-400`}>
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