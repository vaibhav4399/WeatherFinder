import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { dataContext } from '../Layout/Layout';

import weatherIcon from '../../assets/weather_icon.webp?react'
import temperatureIcon from '../../assets/temperature_icon.webp?react'


import './Home.css';

library.add(faMagnifyingGlass, faArrowRight);

function Home() {

    const {cityName, setCityName} = useContext(dataContext);

    const openweathermap_api = import.meta.env.VITE_OPENWEATHERMAP_API;

    const openweather_URL = import.meta.env.VITE_OPENWEATHERMAP_URL;

    const [output, setOutput] = useState(false);
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState();
    const [isCelsius, setIsCelsius] = useState(true);
    let navigate = useNavigate();

    const handleCityName = (e) => {
        setCityName(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();

        const params = {
            q: cityName,
            units: "metric",
            appid: openweathermap_api
        }
        
        const querystring = new URLSearchParams(params).toString();

        const URL = `${openweather_URL}?${querystring}`

        fetch(URL)
            .then((response) => response.json())
            .then(data => {
                if(data["cod"] !== 200) throw new Error(data["message"]);

                setWeather(data["weather"][0]["main"]);
                setTemperature(data["main"]["temp"]);
                setIsCelsius(true);
                setOutput(true);
            })
            .catch(error => toast.error(`${error.message} for ${cityName}`))

    }

    const handleNavigate = () => {
        let path = '/result'
        navigate(path);
    }

    const handleTempFormat = () => {
        if(isCelsius){
            setTemperature(parseFloat((temperature*9/5)+32,2).toFixed(2));
            setIsCelsius(false);
        }
        else{
            setTemperature(parseFloat((temperature-32)*5/9,2).toFixed(2));
            setIsCelsius(true);
        }
    }

    return (
        <>
            <div className='home'>
                <h1 className='head-title'>Weather Finder</h1>
                <form onSubmit={submitHandler}>
                    <div className="input-field">
                        <input placeholder='Enter City Name' value={cityName} onChange={handleCityName} required />
                    </div>
                    <div className='search-btn'>
                        <button type="submit" aria-label="location search" className='btn'>
                            <FontAwesomeIcon className='text-white' icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </form>
                <AnimatePresence>
                    {output &&
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }} // Exit animation when the component is unmounted
                        transition={{
                            delay: 0.5, // Delay before the animation starts
                            y: { type: 'spring', stiffness: 300, damping: 30 },
                            duration: 0.5, // Duration of the opacity transition
                        }}
                        className={`result-col ${output ? "" : "hidden"}`}>
                        <div className='mini-card'>
                            <div className="w-w40">
                                <img className='object-contain' alt="weather" src={weatherIcon} width="100px" height="100px" />
                            </div>
                            <div className='w-w60 text-center text-3xl'>
                                <p>{weather}</p>
                            </div>
                        </div>
                        <div className='mini-card'>
                            <div className='w-w40'>
                                <img className="object-contain" alt="temperature" src={temperatureIcon} width="80px" height="80px"/>
                            </div>
                            <div className='w-w60 flex justify-around text-3xl'>
                                <p className=''>{temperature} {isCelsius ? "°C" : "°F"}</p> 
                                <div className="switch-out">
                                    <div className="switch-in">
                                        <input onClick={handleTempFormat}  id="switch-1" type="checkbox"
                                            className="switch-input peer" />
                                        <label htmlFor="switch-1"
                                            className="before:content[''] switch-label">
                                            <div className="switch-mask"
                                                data-ripple-dark="true"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  className="result-btn">
                            <motion.button onClick={handleNavigate}
                            whileHover={{
                                scale: 1.1
                            }}
                            className="btn">
                                Show More <FontAwesomeIcon className='ml-3 text-xl' icon={faArrowRight} /> 
                            </motion.button>
                        </div>
                    </motion.div>
                    }
                </AnimatePresence>
            </div>
        </>
    );
}

export default Home;