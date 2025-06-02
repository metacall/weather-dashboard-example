
const { GoogleGenAI } = require("@google/genai");
const { loggers } = require("winston");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Get All Weather Data 
const AssistantHandler = async (req, res) => {
    const { userQuestion, currentLocation } = req.body;

  // Validate input
  if (!userQuestion || !currentLocation) {
    return res.status(400).json({
      success: false,
      message: 'User question and current location are required.',
    });
  }
  try {
    // Fetch weather analytics data for the current location
    const analyticsResponse  = await fetch(`http://localhost:5000/weather/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: currentLocation }),
    });

    // Fetch weather summary data for the current location
    const weatherResponse = await fetch("http://localhost:5000/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: currentLocation }),
    });

    const weatherData = await weatherResponse.json();
    const analyticsData = await analyticsResponse.json();

    if (!weatherResponse.ok || !weatherData || !analyticsResponse.ok || !analyticsData) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch weather data or analytics.',
      });
    }

    const weatherSummary = weatherData.weather[0].description;
    const coordinates = weatherData.coord;
    const currentTemperature = weatherData.main.temp;
    
    const windSpeed = weatherData.wind.speed;
    const humidity = weatherData.main.humidity;

    // Extract analytics data
    const weatherAnalytics = analyticsData.analytics;
    const averageTemp = weatherAnalytics.average_temperature;
    const maxTemp = weatherAnalytics.max_temp;
    const minTemp = weatherAnalytics.min_temp;
    const predictedTempNextDay = weatherAnalytics.predicted_temp_next_day;
    const trend = weatherAnalytics.trend;
    const condition = weatherAnalytics.condition;
    const analyticsSummary = weatherAnalytics.summary;

    

    // Create a Gemini prompt with the weather summary and analytics data
    const geminiPrompt = `
     You are a helpful weather assistant.
      Given the following weather data and analytics, answer the user's question accurately.

      Location: ${currentLocation}
      Coordinates: Latitude ${coordinates.lat}, Longitude ${coordinates.lon}
      Weather Summary: ${weatherSummary}
      Current Temperature: ${currentTemperature}°C
      
      Wind Speed: ${windSpeed} m/s
      Humidity: ${humidity}%
      
      Analytics: 
      - Average Temperature: ${averageTemp}°C
      - Max Temp: ${maxTemp}°C
      - Min Temp: ${minTemp}°C
      - Predicted Temp (Next Day): ${predictedTempNextDay}°C
      - Trend: ${trend}
      - Condition: ${condition}
      - Analytics Summary: ${analyticsSummary}

      User Question: ${userQuestion}

      Your response:
    `;

  // Generate a response from Gemini based on the user's question and weather data
    const response1 = await ai.models.generateContent({
      model: "gemini-2.0-flash",  // Specify the model to use
      contents: geminiPrompt,  // Use the weather summary and analytics as input
    });

    const geminiResponse = response1.text;

    // Send the response back to the client
    return res.status(200).json({
      success: true,
      message: geminiResponse,
    });

  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }




}

module.exports = AssistantHandler; 
