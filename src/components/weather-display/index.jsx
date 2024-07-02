import React, { useState } from "react";
import SearchInput from "../search-input";

const WeatherDisplay = () => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || null;
  const [Search, setSearch] = useState("Bengaluru");
  const [Loading, setLoading] = useState(false);
  const [WeatherData, setWeatherData] = useState(null);
  const [Error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchWeatherData = async (params) => {
    setLoading(true);
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=${API_KEY}`;

      const res = await fetch(URL);
      const data = await res.json();
      if (data) setWeatherData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.message);
    }
  };
  function handleSearch() {
    fetchWeatherData(Search);
  }
  function getCurrentDate(dt) {
    return new Date(dt * 1000).toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function kelvinToCelsius(tempKelvin) {
    return Math.floor(tempKelvin - 273.15);
  }

  return (
    <div className="flex h-full  flex-col  items-center  justify-center p-4">
      <div className=" w-full max-w-4xl  ">
        <div className="text-center font-mono text-2xl font-semibold">
          Search Weather Data
        </div>
        <SearchInput
          Search={Search}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
          Loading={Loading}
        />
        {Loading && (
          <div className=" flex justify-center p-4 ">
            <div className=" w-fit animate-pulse rounded bg-emerald-300 p-2 px-6 text-center">
              Loading Weather Data ...
            </div>
          </div>
        )}
        {Error && <div>ERROR : {Error}</div>}
        {!Loading && !Error && WeatherData ? (
          <div className=" space-y-4 rounded bg-emerald-200 p-4 text-center shadow-xl ">
            <div className="  text-4xl font-semibold">
              {WeatherData.name} , {WeatherData.sys.country}
            </div>
            <div className="  text-2xl font-medium">
              {getCurrentDate(parseInt(WeatherData.dt))}
            </div>
            <div className="  font-mono text-5xl font-bold">
              {kelvinToCelsius(parseInt(WeatherData?.main?.temp))}°C
            </div>
            <p className="text-2xl font-medium">
              {WeatherData &&
                WeatherData.weather &&
                WeatherData.weather[0] &&
                WeatherData.weather[0].description}
            </p>{" "}
            <div className="weather-info flex justify-center gap-6 text-lg font-extrabold ">
              <div className="column p-1">
                <div>
                  <p className="wind">{WeatherData?.wind?.speed}</p>
                  <p>Wind Speed</p>
                </div>
              </div>
              <div className="column p-1">
                <div>
                  <p className="humidity">{WeatherData?.main?.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherDisplay;
