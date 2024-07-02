import React, { useState } from "react";
import WeatherDisplay from "./components/weather-display";

function App() {
  return (
    <div className=" h-svh bg-emerald-50 p-4  px-2">
      <WeatherDisplay />
    </div>
  );
}

export default App;
