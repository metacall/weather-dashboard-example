const axios = require("axios");
require("metacall");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const weather = require('./weather_analytics.py'); // Assuming this is the Python script for weather analytics

const weatherAnalyzeHandler = async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) return res.status(400).json({ error: "City is required" });

        // Fetch Forecast Data from OpenWeatherMap
        const response = await axios.get(`${FORECAST_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;
        

        // Call Python Function via MetaCall
       const analytics = await weather.get_weather_stats(weatherData);
       

        const forecast = weatherData.list.slice(0, 5).map(item => ({
            date: new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
            time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }));


        

        res.json({
            forecast: forecast,
            city: city,
            analytics: {
                average_temperature: Math.floor(analytics.average_temperature),
                max_temp: Math.floor(analytics.max_temp),
                min_temp: Math.floor(analytics.min_temp),
                predicted_temp_next_day: Math.floor(analytics.predicted_temp_next_day),
                trend: analytics.trend,
                condition: analytics.condition,
                forechart: analytics.forecast_chart,
                summary: analytics.summary
            },
            language: analytics.language
        });
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = weatherAnalyzeHandler;
