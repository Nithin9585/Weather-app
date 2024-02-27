import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';
import { useState } from 'react';

export default function Txt() {
  const api_url = 'https://api.openweathermap.org/data/2.5/weather';
  const api_key = '6b9ff5b490104a645eb0d326d58e52ec';

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null); // State to store weather data

  const getWeatherInfo = async () => {
    try {
      const response = await fetch(`${api_url}?q=${city}&appid=${api_key}&units=metric`);
      const data = await response.json();
      setWeatherData(data);
      console.log(data); // Update the state with weather data
    } catch (error) {
      console.error('Error fetching weather information:', error);
      setWeatherData(null); // Reset weather data on error
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherInfo();
    setCity(''); // Reset the input field
  };

  return (
    <>
      <div className="bod">
        <form onSubmit={handleSubmit}>
          <TextField id="city" label="City Name" variant="standard" required value={city} onChange={handleChange} />
          <Button variant="contained" type="submit">
            Search
          </Button>
        </form>

        {weatherData && (
          <div className='dat'>
            <h3><b>City:</b> {weatherData.name}</h3> {/* Corrected line */}
            <p><b>Temperature:</b> {weatherData.main.temp}°C</p>
            <p><b>Feels like: </b>{weatherData.main.feels_like}</p>

            <p><b>Weather:</b> {weatherData.weather[0].description}</p>
            <p><b>Max Temp:</b> {weatherData.main.temp_max}</p>
            <p><b>Min Temp:</b> {weatherData.main.temp_min}</p>
            <p><b>Pressure:</b> {weatherData.main.pressure}</p>
          </div>
        )}
      </div>
    </>
  );
}
