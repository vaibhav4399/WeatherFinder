import { useState, useEffect, useContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { dataContext } from '../Layout/Layout';
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
                setWeather(data["weather"][0]["main"]);
                setTemperature(data["main"]["temp"]);
                setIsCelsius(true);
                setOutput(true);
            })

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
            <div className=' w-w80 lg:w-w50 p-2 sm:p-10 mx-auto mt-20 lg:mt-28  flex flex-col justify-start items-start bg-homeBackground bg-cover bg-no-repeat bg-center bg-origin-border min-h-fit'>
                <h1 className='text-4xl font-semibold text-black text-center mx-auto my-5'>Weather Finder</h1>
                <form onSubmit={submitHandler} className='w-full flex max-lg:flex-col items-center'>
                    <div className="w-w90 max-lg:mb-8">
                        <input className='w-full py-3 px-2' placeholder='Enter City Name' value={cityName} onChange={handleCityName} required />
                    </div>
                    <div className='w-w10  text-2xl flex justify-center items-center'>
                        <button type="submit" aria-label="location search" className=' w-full focus:outline-none'>
                            <FontAwesomeIcon className='text-white' icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </form>
                <div className={`w-full min-h-fit mt-28 grid gap-2 grid-cols-2 max-lg:grid-cols-1 ${output ? "" : "hidden"} `}>
                    <div className='h-[100px] border border-black bg-white flex justify-center items-center'>
                        <div className="w-w40">
                            <img className='object-contain' src="/weather_icon.webp" width="100px" height="100px" />
                        </div>
                        <div className='w-w60 text-center text-3xl'>
                            <p>{weather}</p>
                        </div>
                    </div>
                    <div className='h-[100px] border border-black bg-white flex justify-center items-center'>
                        <div className='w-w40'>
                            <img className="object-contain" src="/temperature_icon.webp" width="80px" height="80px"/>
                        </div>
                        <div className='w-w60 flex justify-around text-3xl'>
                            <p className=''>{temperature} {isCelsius ? "°C" : "°F"}</p>
                            <div className="inline-flex items-center">
                                <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                    <input onClick={handleTempFormat}  id="switch-1" type="checkbox"
                                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-300 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500" />
                                    <label htmlFor="switch-1"
                                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-gray-300 bg-yellow-500 shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500">
                                        <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                            data-ripple-dark="true"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid col-span-full bg-white py-3">
                        <button>Show More <FontAwesomeIcon className='ml-3' icon={faArrowRight} /> </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;