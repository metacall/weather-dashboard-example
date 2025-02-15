const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
require('dotenv').config();
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
exports.WEATHER_API_KEY = WEATHER_API_KEY; // OpenWeather Api Key
app.use(cors());
app.use(express.json());
const { metacall_load_from_file } = require("metacall");
const result = metacall_load_from_file("py", ["weather_analytics.py"]);
if (result === null) {
    console.error("❌ Failed to load Python script.");
    process.exit(1);
}
console.log("✅ Python script loaded successfully!");

  const handlersDir = path.join(__dirname, "handlers");
  fs.readdirSync(handlersDir).forEach((file) => { // loop through the files and create routes with the filename
    if (file.endsWith(".js")) {
        const handler = require(path.join(handlersDir, file));
        let routeName = file.replace(".js", "");  // Remove '.js' extension
        routeName = routeName.replace("Handler", "");
        if (routeName.includes("-")) {
            routeName = routeName.split("-").join("/"); // Replace hyphens with slashes
          }  // Remove the word "Handler"

        console.log("Route :", routeName);  // Log the route name
        console.log("Handler File:", file);
         // Log the handler file name

        // Bind the route to its respective handler function
        app.post(`/${routeName}`, handler); // Example: /weather/analyze, /forecast
    }
});

PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
