const axios = require("axios");
const getCoordinates = async (city) => {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const response = await axios.get(geoUrl);
    const results = response.data.results;
    if (results && results.length > 0) {
        return {
            latitude: results[0].latitude,
            longitude: results[0].longitude,
        };
    }
    throw new Error("City not found");
};
const weatherForecast = async (req, res) => {
    try {
        let { city, lat, lon } = req.body;
        let latitude, longitude;

        if (city) {
            // Fetch coordinates if a city is provided
            ({ latitude, longitude } = await getCoordinates(city));
        } else if (lat !== undefined && lon !== undefined) {
            // Use provided latitude and longitude
            latitude = parseFloat(lat);
            longitude = parseFloat(lon);
        } else {
            return res.status(400).json({ error: "Provide either a city or latitude and longitude" });
        }

        // Check if latitude and longitude are valid numbers
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: "Invalid latitude or longitude values" });
        }
      
      // Get coordinates for the given city
      
      
      // Build the URL for a 16-day forecast with daily parameters
      const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum&forecast_days=16&timezone=auto`;
  
      // Fetch forecast data from Open‑Meteo
      const weatherResponse = await axios.get(openMeteoUrl);
      const forecastData = weatherResponse.data;
      
      // Filter the daily forecast data
      const daily = forecastData.daily;
      const filteredForecast = daily.time.map((date, index) => ({
        date,
        max_temp: Math.floor(daily.temperature_2m_max[index]),
        min_temp: Math.floor(daily.temperature_2m_min[index]),
        weathercode: daily.weathercode[index],
        
      }));
      
      
      
      // Return the filtered forecast data along with the city and coordinates
      res.json({
        city,
        latitude,
        longitude,
        forecast: filteredForecast,
      });
    } catch (error) {
      console.error("Error fetching Open‑Meteo data:", error.message);
      res.status(500).json({ error: error.message });
    }
};

module.exports = weatherForecast;