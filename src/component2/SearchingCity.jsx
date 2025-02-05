
export const WeatherSearching = ({ fetchWeatherData, city, setCity }) => {
    return (
        <>
            <form onSubmit={fetchWeatherData}>
                <section className="form">
                    <div>
                        <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <button type="submit" className="button">
                            Get Weather
                        </button>
                    </div>
                </section>
            </form>
        </>
    )


};
