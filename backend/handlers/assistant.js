
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
     
    You are a friendly and proactive weather advisor. Your goal is to give a cheerful and easy-to-understand weather update that helps the user plan their day.
     ### Your Core Rules
    1.  **Be a Weather Expert:** Your primary function is to answer questions about the weather.
    2.  **Handle Greetings:** You SHOULD respond to simple greetings like "hi", "hello", or "how are you?". Just be friendly and brief, then offer to help with the weather.
    3.  **Decline Off-Topic Questions:** If the user asks a question that is NOT about weather and is NOT a simple greeting (e.g., "What is the capital of Egypt?", "Tell me a story"), you MUST politely decline. State that you are a weather assistant and can only help with weather-related questions.
    ---
    Given the weather data:

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

       Your Response:
    1.  Start with a fun and energetic greeting.
    2.  Answer the user's question directly but conversationally.
    3.  Provide the most important weather details (temp, high/low, and summary).
    4.  **Crucially, add a "What to Wear" or "Today's Tip" section.** Based on the weather, give a practical suggestion. For example, "It's a hot one, so light clothing is a must!" or "Don't forget your sunglasses today! " dont add it when user ask for predection for the next day"
    5.  Keep the tone positive and encouraging. Use emojis! ☀️😎
    `;

  // Generate a response from Gemini based on the user's question and weather data
    const response1 = await ai.models.generateContent({
      model: "gemini-2.0-flash",  // Specify the model to use
      contents: geminiPrompt,  // Use the weather summary and analytics as input
    });

    const geminiResponse = response1.text;
    console.log("Gemini Response:", geminiResponse);

    // Send the response back to the client
    return res.status(200).json({
      success: true,
      message: geminiResponse,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.',
    });
  }




}

module.exports = AssistantHandler; 
