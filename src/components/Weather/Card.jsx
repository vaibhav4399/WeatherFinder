import TemperatureIcon from '../../assets/icons/temperature_icon.svg?react';
import HumidityIcon from '../../assets/icons/humidity_icon.svg?react';
import SunriseIcon from '../../assets/icons/sunrise_icon.svg?react';
import SunsetIcon from '../../assets/icons/sunset_icon.svg?react';
import WindspeedIcon from '../../assets/icons/windspeed_icon.svg?react';
import WeatherIcon from '../../assets/icons/weather_icon.svg?react';
import './Weather.css';

function Card({id, value, icon}) {
    return (
        <div className="h-[500px] bg-white p-5 my-16 lg:my-24 sm:max-w-md w-w80 rounded-xl bg-homeBackground bg-no-repeat bg-cover hover:shadow-gray-500 hover:shadow-xl">
            <div className="flex flex-col h-full">
                <div className="flex flex-row h-2/5 w-full items-center justify-center">
                    {icon}
                    <p className="basis-full sm:basis-1/2 text-2xl font-semibold text-center">{id}</p>
                </div>
                <div className='h-3/5 flex justify-center items-center font-semibold text-4xl'>
                    <p>{value}</p>
                </div>
            </div>
        </div>
    );
}


export default Card;