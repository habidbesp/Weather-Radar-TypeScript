import axios from "axios";
import { SearchType } from "../types";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

export default function useWeather() {
  const fetchWeather = async (search: SearchType) => {
    try {
      const { city, country } = search;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;

      const { data } = await axios(geoUrl);
      const { lat, lon } = data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      const { data: weatherData } = await axios(weatherUrl);
      console.log(weatherData);
    } catch (error) {
      console.log(error);
    }
  };
  return { fetchWeather };
}
