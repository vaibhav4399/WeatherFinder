import TemperatureIcon from '../../assets/icons/temperature_icon.svg?react';
import HumidityIcon from '../../assets/icons/humidity_icon.svg?react';
import SunriseIcon from '../../assets/icons/sunrise_icon.svg?react';
import SunsetIcon from '../../assets/icons/sunset_icon.svg?react';
import WindspeedIcon from '../../assets/icons/windspeed_icon.svg?react';
import WeatherIcon from '../../assets/icons/weather_icon.svg?react';

export let data = [
    {
        id: "Weather",
        value: "",
        icon: <WeatherIcon className="hidden md:block basis-1/2" />
    },
    {
        id: "Temperature",
        value: "",
        icon: <TemperatureIcon className="hidden md:block basis-1/2" />
    },
    {
        id: "Humidity",
        value: "",
        icon: <HumidityIcon className="hidden md:block basis-1/2" />
    },
    {
        id: "Wind Speed",
        value: "",
        icon: <WindspeedIcon className="hidden md:block basis-1/2" />
    },
    {
        id: "Sunrise",
        value: "",
        icon: <SunriseIcon className="hidden md:block basis-1/2" />
    },
    {
        id: "Sunset",
        value: "",
        icon: <SunsetIcon className="hidden md:block basis-1/2" />
    }
]