const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const logger = require("./logger");
const PORT = process.env.PORT || 5000; 
app.use(cors());
app.use(express.json());
require('dotenv').config();// OpenWeather Api Key
const handlersDir = path.join(__dirname, "handlers");
logger.info("🛠️  Setting up routes...");
fs.readdirSync(handlersDir).forEach((file) => { // loop through the files and create routes with the filename
    if (file.endsWith(".js")) {
        try {
            const handler = require(path.join(handlersDir, file));
            let routeName = file.replace(".js", "");  // Remove '.js' extension
            if (routeName.includes("-")) {
                routeName = routeName.split("-").join("/"); // Replace hyphens with slashes
            }

            logger.info(`🛠️  Setting up route: /${routeName} (from ${file})`);

            // Bind the route to its respective handler function
            app.post(`/${routeName}`, handler);
        } catch(error) {
            logger.error(`❌ Failed to load route from ${file}: ${error.message}`);
        }
    }
});

app.listen(PORT, () => logger.info(`Server running on http://localhost:${PORT}`));




