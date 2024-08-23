import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './Header.css';

library.add(faBars);

function Header() {

    const [isMobile, setIsMobile] = useState(false);

    const openweathermap_api = import.meta.env.VITE_OPENWEATHERMAP_API;

    const openweather_URL = "https://api.openweathermap.org/data/2.5/weather"

    const successLocation = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`${latitude} --> ${longitude}`);

        const params = {
            lat: latitude,
            lon: longitude,
            appid: openweathermap_api
        }

        const querystring = new URLSearchParams(params).toString();

        const URL = `${openweather_URL}?${querystring}`

        fetch(URL)
        .then
    }

    const errorLocation = () => {
        console.log("Unable to retrive the date")
    }

    const handleLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
        }
    }


    return (
        <>
            <header className='flex w-full h-24 sm:h-28 fixed pt-5'>
                <div className='sm:w-w20 w-full mx-4 flex justify-center'>
                  <img className='h-full' src={'/weatherfinder-transparent.webp'} />  
                </div>
                <nav>

                </nav>
                <div>

                </div>
                <button onClick={handleLocation} className='text-white'>
                    Click ME!
                </button>
            </header>
        </>
    );
}


export default Header;
