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
        icon: <WeatherIcon className="card-icon" />
    },
    {
        id: "Temperature",
        value: "",
        icon: <TemperatureIcon className="card-icon" />
    },
    {
        id: "Humidity",
        value: "",
        icon: <HumidityIcon className="card-icon" />
    },
    {
        id: "Wind Speed",
        value: "",
        icon: <WindspeedIcon className="card-icon" />
    },
    {
        id: "Sunrise",
        value: "",
        icon: <SunriseIcon className="card-icon" />
    },
    {
        id: "Sunset",
        value: "",
        icon: <SunsetIcon className="card-icon" />
    }
]