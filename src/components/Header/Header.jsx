import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { dataContext } from '../Layout/Layout';

import './Header.css';

library.add(faBars);

function Header() {

    const {longitude, latitude, setLongitude, setLatitude, setCityName} = useContext(dataContext);

    const [isMobile, setIsMobile] = useState(false);

    const openweathermap_api = import.meta.env.VITE_OPENWEATHERMAP_API;

    const openweather_URL = import.meta.env.VITE_OPENWEATHERMAP_URL;


    const successLocation = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        
    }

    const errorLocation = () => {
        toast.error("Unable to retrive Location");
    }

    const handleLocation = () => {
        console.log(longitude, latitude);
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(successLocation, errorLocation)
        }
    }

    useEffect(() => {
        const params = {
            lat: latitude,
            lon: longitude,
            appid: openweathermap_api
        }

        const querystring = new URLSearchParams(params).toString();

        const URL = `${openweather_URL}?${querystring}`

        fetch(URL)
            .then((response) => response.json() )
            .then(data => {
                setCityName(data["name"])
            })

    }, [longitude, latitude])


    return (
        <>
            <header className='flex w-full h-24 sm:h-28 fixed top-0 left-0 z-10 pt-5'>
                <div className='md:w-w20 w-full mx-4 flex justify-center'>
                  <img className='h-full' src={'/weatherfinder-transparent.webp'} />  
                </div>
                <button onClick={handleLocation} className='text-white'>
                    Click ME!
                </button>
            </header>
        </>
    );
}


export default Header;
