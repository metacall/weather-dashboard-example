// weatherHandler.js
const axios = require("axios");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// Use the environment variable directly

const searchHandler = async (req, res) => {
   const { city } = req.body;
    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }
  
    try {
        
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
        params: {
          q: city,
          limit: 10, // Limit the number of cities returned
          appid: WEATHER_API_KEY
        }
      });
      
      if (!response.data || response.data.length === 0) {
        return res.status(404).json({ error: "No cities found" });
      }
  
      const cities = response.data.map(city => ({
        name: city.name,
        country: city.country, 
        state: city.state || null, // Some places have states
        lat: city.lat,
        lon: city.lon
    }));
      
  
      res.json(cities); // Send the array of cities to the frontend
    }  catch (error) {
        console.error("OpenWeatherMap API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch cities from OpenWeatherMap",error });
      }
};

module.exports = searchHandler;
