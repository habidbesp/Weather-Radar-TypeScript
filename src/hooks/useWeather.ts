import axios from "axios";
import type { SearchType, Weather } from "../types";

// TYPE GUARD OR ASSERTION
function isWeatherResponse(weather: unknown): weather is Weather {
  return (
    Boolean(weather) &&
    typeof weather === "object" &&
    typeof (weather as Weather).name === "string" &&
    typeof (weather as Weather).main.temp === "number" &&
    typeof (weather as Weather).main.temp_max === "number" &&
    typeof (weather as Weather).main.temp_min === "number"
  );
}

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    try {
      const { city, country } = search;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;

      const { data } = await axios(geoUrl);
      const { lat, lon } = data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      const { data: weatherResult } = await axios(weatherUrl);

      // TYPE GUARDS
      const result = isWeatherResponse(weatherResult);
      console.log(result);
      if (result) {
        console.log(weatherResult.name);
        console.log(weatherResult.main);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { fetchWeather };
}
