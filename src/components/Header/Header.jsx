import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { dataContext } from '../Layout/Layout';

import './Header.css';

library.add(faBars);

function Header() {

    const {longitude, latitude, setLongitude, setLatitude, setCityName} = useContext(dataContext);



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
            <header className='flex sm:w-full h-20 sm:h-28 pt-5 justify-between max-sm:flex-col'>
                <div className='md:w-w20 sm:mx-4 flex justify-center max-sm:basis-full max-sm:h-24'>
                  <img className='h-full' src={'/weatherfinder-transparent.webp'} />  
                </div>
                <div className="flex justify-center items-center max-sm:mt-8">
                    <motion.button onClick={handleLocation}
                    whileTap={{
                        scale: 1.08
                    }} 
                    className='text-black font-semibold text-xl px-5 rounded-xl sm:mr-10 bg-blue-200'>
                        Locate Me!
                    </motion.button> 
                </div>
            </header>
        </>
    );
}


export default Header;
