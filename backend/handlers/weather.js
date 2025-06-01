// weatherHandler.js
const axios = require("axios");


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// Get All Weather Data 
const weatherHandler = async (req, res) => {
    try {
        const { city } = req.body;
        const response = await axios.get(`${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;
        if (!weatherData || !weatherData.main) {
            return res.status(404).json({ error: "Weather data not found for the specified city" });
        }

        

        
        res.json({
            ...weatherData,
            
        });

    } catch (error) {
        console.error("Error in /weather endpoint:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};

module.exports = weatherHandler;
