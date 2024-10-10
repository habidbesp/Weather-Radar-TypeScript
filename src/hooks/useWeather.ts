import axios from "axios";
import { z } from "zod";
// import { object, string, number, InferOutput, parse } from "valibot";
import type { SearchType } from "../types";
import { useState } from "react";

// TYPE GUARD OR ASSERTION
// function isWeatherResponse(weather: unknown): weather is Weather {
//   return (
//     Boolean(weather) &&
//     typeof weather === "object" &&
//     typeof (weather as Weather).name === "string" &&
//     typeof (weather as Weather).main.temp === "number" &&
//     typeof (weather as Weather).main.temp_max === "number" &&
//     typeof (weather as Weather).main.temp_min === "number"
//   );
// }

// Zod
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});
export type Weather = z.infer<typeof Weather>;

// Valibot
// const WeatherSchema = object({
//   name: string(),
//   main: object({
//     temp: number(),
//     temp_max: number(),
//     temp_min: number(),
//   }),
// });
// type Weather = InferOutput<typeof WeatherSchema>;

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    name: "",
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  });

  const fetchWeather = async (search: SearchType) => {
    const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
    try {
      const { city, country } = search;
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`;

      const { data } = await axios(geoUrl);
      const { lat, lon } = data[0];

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      const { data: weatherResult } = await axios(weatherUrl);

      // CAST THE TYPE
      // const { data: weatherResult } = await axios<Weather>(weatherUrl);

      // TYPE GUARDS
      // const result = isWeatherResponse(weatherResult);
      // console.log(result);
      // if (result) {
      //   console.log(weatherResult.name);
      //   console.log(weatherResult.main);
      // }

      // TYPE ZOD
      const result = Weather.safeParse(weatherResult);
      console.log(result);

      if (result.success) {
        setWeather(result.data);
      } else {
        throw new Error(result.error.message);
      }

      // VALIBOT
      // const result = parse(WeatherSchema, weatherResult);
    } catch (error) {
      console.log(error);
    }
  };
  return { weather, fetchWeather };
}
