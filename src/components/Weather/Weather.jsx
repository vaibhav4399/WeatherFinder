import { useEffect, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS_PATH } from '../../config/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';


import { dataContext } from '../Layout/Layout';

import { data } from './data';

import './Weather.css';

library.add(faArrowLeft, faArrowRight);


function Weather() {

    const { cityName } = useContext(dataContext);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [direction, setDirection] = useState(0);

    const openweathermap_api = import.meta.env.VITE_OPENWEATHERMAP_API;

    const openweather_URL = import.meta.env.VITE_OPENWEATHERMAP_URL;


    const handleNext = () => {
        console.log(currentIndex);
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }

    const handlePrev = () => {
        console.log(currentIndex)
        setDirection(-1);
        setCurrentIndex((prevIndex) =>  prevIndex === 0 ? data.length - 1 : prevIndex - 1)
    }

    const dragHandler = (dragInfo) => {
        const dragDistance = dragInfo.offset.x;
        const swipeThreshold = 10;
        console.log(dragInfo)
        if(dragDistance > swipeThreshold){
            
            setDirection(-1);
            setCurrentIndex((prevIndex) => prevIndex === 0 ? data.length - 1 : prevIndex - 1)
        }
        else if(dragDistance < -swipeThreshold){
            setDirection(1);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }
    }


    const variants = {
        enter: () => ({
            x: direction === 1 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: () => ({
            zIndex: 0,
            x: direction === 1 ? -300 : 300 ,
            opacity: 0,
        }),
    };


    useEffect(() => {

        const params = {
            q: cityName,
            units: "metric",
            appid: openweathermap_api
        }

        const querystring = new URLSearchParams(params).toString();

        const URL = `${openweather_URL}?${querystring}`

        fetch(URL)
            .then((response) => response.json())
            .then(dataAPI => {
                data[0]["value"] = dataAPI["weather"][0]["main"];
                data[1]["value"] = dataAPI["main"]["temp"].toString() + "°C";
                data[2]["value"] = dataAPI["main"]["humidity"];
                data[3]["value"] = dataAPI["wind"]["speed"].toString() + "m/s";
                data[4]["value"] = new Date(dataAPI["sys"]["sunrise"] * 1000).toLocaleString();
                data[5]["value"] = new Date(dataAPI["sys"]["sunset"] * 1000).toLocaleString();
                setLoading(true);
            });

        return () => {
            console.log('Component unmounted.');
        };

    },[])

    return (
        <>{
            loading && 
           <div className='flex justify-center items-center w-w80 lg:w-w40'>
            <FontAwesomeIcon onClick={handlePrev} icon={faArrowLeft} className='text-white hidden md:block text-4xl' />
            <div className='w-w80 mx-auto flex justify-center'>
                    <AnimatePresence custom={currentIndex} initial={false} mode='wait'>
                        <motion.div
                            key={currentIndex}
                            custom={currentIndex}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { duration: 0.2, ease: 'linear' }, // Smooth linear transition
                                opacity: { duration: 0.2, ease: 'easeInOut' }, // Easing for fade effect
                            }}
                            whileHover={{
                                scale: 1.05
                            }}
                             drag="x"
                            dragConstraints={{left:0, right:0}}
                            dragElastic={1}
                            onDragEnd={(_, dragInfo) => dragHandler(dragInfo)}
                            className="w-full h-full flex justify-center"
                        >
                            <Card {...data[currentIndex]} />
                        </motion.div>
                    </AnimatePresence>
            </div>
            <FontAwesomeIcon onClick={handleNext} icon={faArrowRight} className='text-white hidden md:block text-4xl' />
           </div>
        }
        </>
    );
}

export default Weather;