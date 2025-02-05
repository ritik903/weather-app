import React, { useState, useEffect } from "react";
import axios from "axios";
import { CurrentWeather2 } from "./CurrentWeather2";
import { DailyForcast2 } from "./DailyForcast2";
import { WeatherSearching } from "./SearchingCity";
// Himachal Pradesh
export const WeatherFullDataPage = () => {
    const [city, setCity] = useState('Sahnewal,IN');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [fiveDayForecast, setFiveDayForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [airQualityData, setAirQualityData] = useState(null);

    const apiKey = 'bdb2f93c801a06a8dd9950a727074fa5';
    const apiUrl = 'https://api.openweathermap.org/data/2.5';

    // Fetch weather data load
    useEffect(() => {
        fetchWeatherData();
    }, []);

    //  fetch forecast data
    const fetchWeatherData = async (event) => {
        if (event) event.preventDefault();
        if (!city) {
            setError('Please enter a city.');
            return;
        }
        setLoading(true);
        setCity("")
        setError('');

        try {
            // Fetch current weather data
            const weatherResponse = await axios.get(`${apiUrl}/weather`, {
                params: {
                    q: city,
                    appid: apiKey,
                    units: 'metric',
                },
            });

            setWeatherData(weatherResponse.data);


            const { coord } = weatherResponse.data; // Extract coordinates
            const { lat, lon } = coord;

            // Fetch air quality data
            const airQualityResponse = await axios.get(`${apiUrl}/air_pollution`, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: apiKey,
                },
            });

            setAirQualityData({
                aqi: airQualityResponse.data.list[0].main.aqi,
                ...airQualityResponse.data.list[0].components
            });


            // Fetch today forecast data
            const forecastResponse = await axios.get(`${apiUrl}/forecast`, {
                params: {
                    q: city,
                    appid: apiKey,
                    units: 'metric',
                },
            });

            setForecastData(forecastResponse.data);

            const groupedForecast = {};
            forecastResponse.data.list.forEach((item) => {
                const date = item.dt_txt.split(" ")[0];
                if (!groupedForecast[date]) {
                    groupedForecast[date] = item;
                }
            });

            setFiveDayForecast(Object.values(groupedForecast).slice(0, 5));


        } catch (error) {
            setError('Failed to fetch data. Please check the city name or try again.');
            console.error('Error fetching weather data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-dark-blue flex justify-center items-center min-h-screen">
                <div className="relative text-center text-white">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 bg-yellow-400 rounded-full mx-auto animate-spin-slow animate-sunGlow">
                        <div className="absolute top-8 left-8 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-75 animate-bounce"></div>
                        <div className="absolute top-8 right-8 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-75 animate-bounce"></div>
                        <div className="absolute bottom-8 left-8 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-75 animate-bounce"></div>
                        <div className="absolute bottom-8 right-8 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-75 animate-bounce"></div>
                    </div>
                    <div className="absolute top-10 left-0 w-32 h-16 sm:w-48 sm:h-24 md:w-56 md:h-28 bg-white rounded-full opacity-60 animate-moveClouds"></div>
                    <div className="absolute top-24 right-0 w-40 h-20 sm:w-56 sm:h-28 md:w-64 md:h-32 bg-white rounded-full opacity-50 animate-moveClouds delay-200"></div>
                    <div className="text-3xl sm:text-6xl font-semibold mt-8 animate-fadeIn">
                        Loading...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="container">
            <div className="header_flex">
                <div>
                    <div className="flex items-center space-x-2 text-blue-400 font-semibold text-lg faimly">
                        <span className="text-6xl">🌤️</span>
                        <span className="text-4xl md:text-6xl ">SkyWave</span>
                    </div>
                </div>
                <div>
                    <WeatherSearching fetchWeatherData={fetchWeatherData} city={city} setCity={setCity} />
                    {error && <p className="error">{error}</p>}
                    {loading && <p>Loading...</p>}
                </div>
            </div>

            <div className="grid_Two_column">
                <div>
                    <CurrentWeather2 weatherData={weatherData} forecastData={forecastData} loading={loading} fiveDayForecast={fiveDayForecast} />
                </div>
                <div>
                    <DailyForcast2 weatherData={weatherData} forecastData={forecastData} loading={loading} airQualityData={airQualityData} />
                </div>
            </div>

            <div className="footer">
                <p className="footer-heading">&copy; Design and development by Ritik choudhary😊</p>
            </div>
        </section>
    );
}