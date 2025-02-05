import { useEffect } from "react";

export const DailyForcast2 = ({ weatherData, forecastData, loading, airQualityData }) => {
    // to get the airquailty  
    const getAQICategory = (aqi) => {
        switch (aqi) {
            case 1: return { category: "Good", color: "#00E400", bgColor: "#DFFFD6" };
            case 2: return { category: "Fair", color: "#FFFF00", bgColor: "#FFFFCC" };
            case 3: return { category: "Moderate", color: "#FF7E00", bgColor: "#FFE0B2" };
            case 4: return { category: "Poor", color: "#FF0000", bgColor: "#FFCCCC" };
            case 5: return { category: "Very Poor", color: "#8F3F97", bgColor: "#E6CCE6" };
            case 6: return { category: "Hazardous", color: "#7E0023", bgColor: "#F2D7D5" };
            case 7: return { category: "Severe", color: "#660000", bgColor: "#E6B0AA" };
            default: return { category: "Unknown", color: "#808080", bgColor: "#F0F0F0" };
        }
    };

    const isDaytime = (timestamp) => {
        const hour = new Date(timestamp * 1000).getHours();
        return hour >= 6 && hour < 18;
    };

    const getWeatherIcon = (description, dayTime) => {

        let iconPath = "";
        switch (description.toLowerCase()) {
            case "clear sky":
                iconPath = dayTime ? "/images/sun.png" : "/images/moon.png";
                break;

            case "partly cloudy":
                iconPath = dayTime ? "/images/partly-cloudy.png" : "/images/partly-cloudy-night.png";
                break;

            case "few clouds":
                iconPath = dayTime ? "/images/cloudy.png" : "/images/cloudy-night.png";
                break;

            case 'overcast clouds':
                iconPath = dayTime ? "/images/stratuscumulus.png" : "/images/cloudy-night.png";
                break;

            case "scattered clouds":
                iconPath = dayTime ? "/images/clouds.png" : "/images/cloudy-night.png";
                break;
            case "broken clouds":
                iconPath = dayTime ? "/images/cloudy (1).png" : "/images/cloudy-night.png";
                break;
            case "shower rain":
                iconPath = dayTime ? "/images/cloudy (2).png" : "/images/rainy.png";
                break;
            case "rain":
                iconPath = dayTime ? "/images/heavy-rain.png" : "/images/raining.png";
                break;
            case "thunderstorm":
                iconPath = dayTime ? "/images/storm.png" : "/images/thunder.png";
                break;
            case "snow":
                iconPath = "/images/snow.png";
                break;
            case "mist": iconPath = "/images/foog.png";
                break;
            case "haze":
                iconPath = "/images/foog.png";
                break;
            default:
                iconPath = null;
        }
        return iconPath;
    };



    const adjustDescription = (description, cloudPercentage) => {
        if (cloudPercentage > 50) {
            return "overcast clouds";
        } else if (cloudPercentage > 20) {
            return "scattered clouds";
        } else if (cloudPercentage > 5) {
            return "partly cloudy";
        }
        return description;
    };

    useEffect(() => {
        if (forecastData?.weather?.[0]?.description) {
            const description = forecastData.weather[0].description.toLowerCase();
            const dayTime = isDaytime();
            const icon = getWeatherIcon(description, dayTime);
            return icon
        }
    }, [forecastData]);

    const getWindCategory = (speed) => {
        if (speed < 0) return { category: "Calm", icon: "images/weather.png" };
        if (speed < 5) return { category: "Light Air", icon: "images/wind (3).png" };
        if (speed < 11) return { category: "Gentle Breeze", icon: "images/wind.png" };
        if (speed < 20) return { category: "Moderate Breeze", icon: "images/windy.png" };
        if (speed < 29) return { category: "Fresh Breeze", icon: "images/fresh.png" };
        if (speed < 39) return { category: "Strong Breeze", icon: "images/strong-wind.png" };
        return { category: "High Wind", icon: "images/strom.png" };
    };

    return (
        <>
            <div className="overflow">
                <div className="card_second flex_col">
                    <h1 className="Weather_Info">Today Weather Info</h1>
                    <div className="flex_row ">
                        <div className="card_normal">
                            {airQualityData && !loading && (
                                <div className="current-weather-disc">
                                    <div className="flexquailty">
                                        <p>Air Quailty</p>
                                        <p style={{ backgroundColor: getAQICategory(airQualityData.aqi).color, padding: "0.1rem 0.5rem", borderRadius: "2rem", color: getAQICategory(airQualityData.aqi).bgColor }}>
                                            {getAQICategory(airQualityData.aqi).category}
                                        </p>
                                    </div>
                                    <div className="flexQuailty">
                                        <div>
                                            <img src="images/wind (2).png" alt="" />
                                        </div>
                                        <div className="flexInfo">
                                            <div className="quailty">
                                                <p className="sixe">PM2.5</p>
                                                <p className="pm2_5">{(airQualityData.pm2_5).toFixed(0)}</p>
                                            </div>
                                            <div className="quailty">
                                                <p className="sixe">SO2</p>
                                                <p className="pm2_5">{(airQualityData.so2).toFixed(0)}</p>
                                            </div>
                                            <div className="quailty">
                                                <p className="sixe">NO2</p>
                                                <p className="pm2_5">{(airQualityData.no2).toFixed(0)}</p>
                                            </div>
                                            <div className="quailty">
                                                <p className="sixe">O3</p>
                                                <p className="pm2_5">{(airQualityData.o3).toFixed(0)}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                        <div className="card_normal">
                            {weatherData && !loading && (
                                <div className="current-weather-disc">
                                    <h1 className="Sunrisehead">Sunrise & Sunset</h1>
                                    <div className="flex_sunSet">
                                        <div className="flexon">
                                            <div >
                                                <img src="images/sunrise.png" alt="" />
                                            </div>
                                            <div className="col">
                                                <p className="dec">Sunrise</p>
                                                <p className="sunrise">
                                                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>

                                            </div>
                                        </div>
                                        <div className="flexon">
                                            <div>
                                                <img src="images/sunset.png" alt="" />
                                            </div>
                                            <div className="col">
                                                <p className="dec">Sunset</p>
                                                <p className="sunrise">
                                                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="">
                        {weatherData && !loading && (
                            <div className="current-weather-disc">
                                <div className="card2 flexTemp">
                                    <div className="flexHumid">
                                        <div className="order">
                                            <h1 className="Humid">Humidity</h1>
                                        </div>
                                        <div className="gap">
                                            <img src="images/humidity.png" alt="" />
                                            <p className="humidity">{weatherData.main.humidity}<span className="mids">%</span></p>
                                        </div>

                                    </div>
                                    <div className="flexHumid">
                                        <div className="order">
                                            <h1 className="Humid">Pressure</h1>
                                        </div>
                                        <div className="gap">
                                            <img src="images/barometer.png" alt="" />
                                            <p className="humidity">{weatherData.main.pressure}<span className="mids">hPa</span> </p>
                                        </div>

                                    </div>
                                    <div className="flexHumid">
                                        <div className="order">
                                            <h1 className="Humid">visibility</h1>
                                        </div>
                                        <div className="gap">
                                            <img src="images/weather (1).png" alt="" />
                                            <p className="humidity">{(weatherData.visibility) / 1000}<span className="mids">km</span></p>
                                        </div>

                                    </div>
                                    <div className="flexHumid">
                                        <div className="order">
                                            <h1 className="Humid">temprature</h1>
                                        </div>
                                        <div className="gap">
                                            <img src="images/temprature.png" alt="" />
                                            <p className="humidity">{weatherData.main.temp}<span className="mids">°C</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="">
                    <h1 className="daily">daily forcast</h1>
                    <div className="flex_col_forcast">
                        <div className="flex_row_forcast">
                            {
                                forecastData && !loading && (
                                    <div className="forecast-list">
                                        {forecastData.list.slice(0, 7).map((day, index) => {
                                            const cloudPercentage = day.clouds?.all ?? 0;
                                            const adjustedDescription = adjustDescription(day.weather[0].description, cloudPercentage);
                                            const dayTime = isDaytime(day.dt);
                                            const icon = getWeatherIcon(adjustedDescription, dayTime);

                                            return (
                                                <div key={index} className="daily_card_normal">
                                                    <p className="time">
                                                        {new Date(day.dt * 1000).toLocaleTimeString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                    <figure>
                                                        {icon ? (
                                                            <img
                                                                src={icon}
                                                                alt={day.weather[0].description}
                                                                className="weather-icons-daily"
                                                            />
                                                        ) : (
                                                            <p>Icon Unavailable</p>
                                                        )}
                                                    </figure>
                                                    <div className="flex">
                                                        <p className="time">{day.main.temp}°C</p>
                                                        <p className="time">{day.weather[0].main}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex_row_forcast">
                            {
                                forecastData && !loading && (
                                    <div className="forecast-list">
                                        {forecastData.list.slice(0, 7).map((day, index) => {
                                            const { category, icon } = getWindCategory(day.wind.speed); // Extract category and icon
                                            return (
                                                <div key={index} className="daily_card_normal">
                                                    <p className="time">
                                                        {new Date(day.dt * 1000).toLocaleTimeString('en-US', {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </p>
                                                    <div>
                                                        <img
                                                            src={icon}
                                                            alt={category}
                                                            className="weather-icons-daily "
                                                        />
                                                    </div>
                                                    <div className="flex">
                                                        <p className="time">{day.main.temp.toFixed(1)}°C</p>
                                                        <p className="time">{day.wind.speed.toFixed(0)} km/h</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}