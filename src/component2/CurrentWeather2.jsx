import { useEffect, useState } from "react";

export const CurrentWeather2 = ({ weatherData, loading, fiveDayForecast, forecastData }) => {
    const [weatherCondition, setWeatherCondition] = useState("")

    useEffect(() => {
        if (weatherData?.weather[0]?.description) {
            const description = weatherData.weather[0].description.toLowerCase();
            const cloudPercentage = weatherData?.clouds?.all || 0;

            const isDaytime = () => {
                const currentHour = new Date().getHours(); // Get current hour (0-23)
                return currentHour >= 6 && currentHour < 18; // Daytime between 6 AM and 6 PM
            };

            const dayTime = isDaytime(); // Check if it's day or night
            let iconPath = "";

            let modifiedDescription = description;

            if (description === "clear sky" && cloudPercentage > 5) {
                modifiedDescription = "partly cloudy";
            }

            switch (modifiedDescription) {
                case 'clear sky':
                    iconPath = dayTime ? "/images/sun.png" : "/images/moon.png";
                    break;

                case 'partly cloudy':
                    iconPath = dayTime ? "/images/partly-cloudy.png" : "/images/partly-cloudy-night.png";
                    break;

                case 'few clouds':
                    iconPath = dayTime ? "/images/cloudy.png" : "/images/cloudy-night.png";
                    break;

                case 'overcast clouds':
                    iconPath = dayTime ? "/images/stratuscumulus.png" : "/images/cloudy-night.png";
                    break;

                case 'scattered clouds':
                    iconPath = dayTime ? "/images/clouds.png" : "/images/cloudy-night.png";
                    break;

                case 'broken clouds':
                    iconPath = dayTime ? "/images/cloudy (1).png" : "/images/cloudy-night.png";
                    break;

                case 'shower rain':
                    iconPath = dayTime ? "/images/cloudy (2).png" : "/images/rainy.png";
                    break;

                case 'rain':
                    iconPath = dayTime ? "/images/heavy-rain.png" : "/images/raining.png";
                    break;

                case 'light rain':
                    iconPath = dayTime ? "/images/light-rain.png" : "/images/light-rain (1).png";
                    break;

                case 'thunderstorm':
                    iconPath = dayTime ? "/images/storm.png" : "/images/thunder.png";
                    break;

                case 'snow':
                    iconPath = "/images/snow.png";
                    break;

                case 'mist':
                    iconPath = "/images/foog.png";
                    break;

                case 'haze':
                    iconPath = "/images/foog.png";
                    break;

                default:
                    iconPath = null;
                    break;
            }
            setWeatherCondition(iconPath);
        }
    }, [weatherData])



    const getWeather5dayIcon = (description) => {
        let iconPath = "";
        switch (description.toLowerCase()) {
            case "clear sky":
                iconPath = "/images/sun.png"
                break;
            case "few clouds":
                iconPath = "/images/cloudy.png"
                break;
            case 'overcast clouds':
                iconPath = "/images/stratuscumulus.png"
                break;
            case "scattered clouds":
                iconPath = "/images/clouds.png"
                break;
            case "broken clouds":
                iconPath = "/images/cloudy (1).png"
                break;
            case "shower rain":
                iconPath = "/images/cloudy (2).png"
                break;
            case "rain":
                iconPath = "/images/heavy-rain.png"
                break;
            case "light rain":
                iconPath = "/images/light-rain.png"
                break;
            case "thunderstorm":
                iconPath = "/images/storm.png"
                break;
            case "snow":
                iconPath = "/images/snow.png";
                break;
            case "mist":
            case "haze":
                iconPath = "/images/foog.png";
                break;
            default:
                iconPath = null;
        }
        return iconPath;
    };

    return (
        <>
            <section className="">
                <div className="flex_coling">
                    <div className="card">
                        {weatherData && !loading && (
                            <div className="center">
                                <h1>Weather Report</h1>
                                <hr className="hr" />
                                <div className="flexMain">
                                    <div>
                                        <h1 className="temp">{(weatherData.main.temp).toFixed(0)}°C</h1>
                                        <p className="para">{weatherData.weather[0].description}</p>
                                    </div>
                                    <div className="weather-container">
                                        <figure>
                                            {weatherCondition ? (
                                                <img
                                                    src={weatherCondition}
                                                    alt="Weather Icon"
                                                    className="weather-icon glow"
                                                />
                                            ) : (
                                                <p>Icon Unavailable</p>
                                            )}
                                        </figure>
                                    </div>
                                </div>
                                <p className="namecountry">{weatherData.name},{weatherData.sys.country}</p>
                                <hr className="hr" />
                                <div className="flex_date">
                                    <p className="Population">Population : {forecastData?.city?.population}</p>
                                    <p className="dateweek">
                                        {new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="card">
                        {forecastData && forecastData.list && !loading ? (
                            <div className="forecast">
                                <h2 className="day">5-day Forecasts</h2>
                                <div className="forecast-grid">
                                    {fiveDayForecast.map((forecast, index) => (
                                        <div key={index} className="forecast-item">
                                            <p>
                                                <img
                                                    src={getWeather5dayIcon(forecast.weather[0].description, new Date(forecast.dt_txt).getHours() >= 6 && new Date(forecast.dt_txt).getHours() < 18)}
                                                    alt={forecast.weather[0].description}
                                                    className="weather-icons"
                                                />
                                            </p>

                                            <p className="weeking">
                                                {new Date(forecast.dt_txt).toLocaleDateString("en-GB", {
                                                    weekday: 'long',
                                                    day: '2-digit',
                                                    month: 'short',
                                                })}
                                            </p>
                                            <p className="week">{(forecast.main.temp).toFixed(0)}°C</p>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>Loading forecast data...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}