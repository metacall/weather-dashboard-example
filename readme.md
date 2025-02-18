# Climatic

This is a weather app built with `Vue.js/`, Node.js, Python Using MetaCall Loader and Express that provides the weather api  . The API supports various endpoints, including current weather for a given location, weather forecasts, weather analysis using MetaCall with Python integration, and weather predictions based on machine learning models.

## Features

- **Weather by City or Coordinates**: Get weather information based on city name or latitude/longitude.
- **Current Location**: Get weather information for the user's current location (based on coordinates).
- **Weather Forecast**: Get weather forecasts for the next 16 days.
- **Weather Analysis**: Analyze weather data using a Python loader in MetaCall.
- **Weather Prediction**: Use machine learning models using MetaCall to predict weather trends (e.g., temperature, precipitation).









![Weather Dashboard](/showcase/show_case1.png)


https://github.com/user-attachments/assets/0935acca-4d2e-472e-8fe7-d8cdfc33fde0

## Installation

Follow these steps to set up the project locally:

### Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (version 16 or higher) – [Download Node.js](https://nodejs.org/)
- **NPM** (Node Package Manager) – comes with Node.js
- **Python** (version 3.8 or higher) – [Download Python](https://www.python.org/)
- **MetaCall** – for running Python code in Node.js. Follow the [MetaCall Installation Guide](https://metacall.io/docs/installation/) for installation steps.
- **OpenWeather API** for Weather Forecast Data. [Website Link](https://openweathermap.org/api)

### Step-by-Step Installation
**Backend Setup:**
1. **Clone the repository**:
   Open your terminal/command prompt and run the following command to clone the repository:
   ```bash
   git clone https://github.com/MoX678/metacall-weather-dashboard.git
   cd backend
   ```
2.  **Install The Requirements**:
   ```bash
   cd backend
   metacall pip install -r requirements.txt
   metacall npm install
   ```
   This Will Install All Dependencies Required To Run The Project
   
**Frontend Setup:**
**Install The Requirements**:
```bash
   cd frontend
   npm install
   ```
### How WE Run the Application ? 
1. **Start the Backend:**

   Go to the `backend/` folder and run the backend server:

   ```bash
   cd backend
   metacall main.js
   ```

   This will start the backend server which listens for weather data requests.

2. **Start the Frontend:**

   In the `frontend/` folder, run the Vue.js development server:

   ```bash
   cd frontend
   npm run serve
   ```
## Hope u enjoyed this `:)`   


