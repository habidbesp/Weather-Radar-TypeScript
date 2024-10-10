import { Weather } from "../../hooks/useWeather";
// import styles from "./WeatherDetail.module.css";

type WeatherDetailProps = {
  weather: Weather;
};

export default function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div>
      WeatherDetail
      <p>{weather.name}</p>
    </div>
  );
}
