const axios = require("axios");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
// Get Air Quality Data From open weather api
const AirQualityHandler = async (req, res) => {
    const cityName = req.body.city; // Correctly extract city from body
        
        
        if (!cityName) {
            return res.status(400).json({ error: 'City name is required' });
        }
    
        try {
            // Step 1: Get city coordinates
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${WEATHER_API_KEY}`;
            const geoResponse = await axios.get(geoUrl);
            const geoData = geoResponse.data;
            
    
            if (geoData.length === 0) { // Check if array is empty
                return res.status(404).json({ error: 'City not found' });
            }
    
            // Extract coordinates from first result
            const { lat, lon } = geoData[0];
    
            // Step 2: Get air quality data
            const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`;
            const airQualityResponse = await axios.get(airQualityUrl);
            const airQualityData = airQualityResponse.data;
    
            if (!airQualityData.list?.length) {
                return res.status(500).json({ error: 'Failed to fetch air quality data' });
            }
    
            // Step 3: Return results
            return res.json({
                city: cityName,
                aqi: airQualityData.list[0].main.aqi,
                airQualityData: airQualityData.list[0].components,
            });
    
            
        } catch (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
};


module.exports = AirQualityHandler;