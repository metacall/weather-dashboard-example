const axios = require("axios");
const { WEATHER_API_KEY } = require("../main");
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
// Forecast Using open weather to get 5 days forecast
const forecastHandler = async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) return res.status(400).json({ error: "City is required" });

        const response = await axios.get(`${FORECAST_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const forecast = response.data.list.map(item => ({
            day_n: new Date(item.dt * 1000).toLocaleString("en-US", { day: "numeric" }),
            week_day: new Date(item.dt * 1000).toLocaleString("en-US", { weekday: "long" }),
            month: new Date(item.dt * 1000).toLocaleString("en-US", { month: "short" }),
            hour: new Date(item.dt * 1000).toLocaleString("en-US", { hour: "2-digit", hour12: true }),
            temp: Math.floor(item.main.temp),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            speed: item.wind.speed,
            direction: item.wind.deg,
            pop: item.pop
        }));
        
        console.table(forecast);

        

        res.json(forecast);
    } catch (error) {
        console.error("Error fetching forecast data:", error.message);
        res.status(500).json({ error: "Failed to fetch forecast data" });
    }
};

module.exports = forecastHandler;
