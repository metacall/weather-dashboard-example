const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const CurrentLocationHandler = async (req, res) => {
  try {
    // 1. Validate Input
    const { lat, lon } = req.body;
    if (lat == null || lon == null) {
      // Use == null to catch both null and undefined
      return res.status(400).json({ message: "Latitude (lat) and Longitude (lon) are required." });
    }

    // 2. Check for API Key
    if (!WEATHER_API_KEY) {
        console.error("WEATHER_API_KEY is not set in environment variables.");
        return res.status(500).json({ message: "Server configuration error: Missing API key." });
    }

    // 3. Make the API Call (using https is best practice)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    
    const response = await fetch(apiUrl);

    // 4. Check for non-OK HTTP responses (like 401 Unauthorized, 404 Not Found)
    if (!response.ok) {
      // Log the error for debugging
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      console.error(`API Error: ${response.status}`, errorData);
      
      return res.status(response.status).json({ 
        message: `Failed to fetch weather data. API responded with status ${response.status}.`,
        apiError: errorData.message
      });
    }

    // 5. Send Successful Response
    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Fetch Error:", error);
    return res.status(500).json({ message: "An unexpected error occurred while trying to contact the weather service." });
  }
};

module.exports = CurrentLocationHandler;