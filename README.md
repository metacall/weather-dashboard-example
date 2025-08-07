# Climatic

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen)
![MetaCall](https://img.shields.io/badge/Powered%20by-MetaCall-orange)

**Climatic** is a weather application built with `Vue.js`, Node.js, and Python using MetaCall and Express. It provides a robust weather API with multiple endpoints, including current conditions, forecasts, analytical data processing, and predictions powered by machine learning models.

## Features

- **Weather by City or Coordinates** – Fetch weather data using city names or latitude/longitude.
- **Current Location Support** – Retrieve weather information based on the user's current location.
- **16-Day Forecast** – Access extended weather forecasts for up to 16 days.
- **Weather Analysis** – Analyze historical or current weather data via Python scripts loaded with MetaCall.
- **Weather Prediction** – Predict weather trends (e.g., temperature, precipitation) using machine learning models through MetaCall.

![Weather Dashboard](/showcase/climatic.png)
![Weather Dashboard](/showcase/weather-info.png)
<video src="./showcase/show_vid.mp4" controls width="600"></video>

## Installation

Follow the steps below to set up the project on your local machine.

### Prerequisites

Make sure the following dependencies are installed:

- **Node.js** (v16 or higher) – [Download](https://nodejs.org/)
- **NPM** – Comes bundled with Node.js
- **Python** (v3.8 or higher) – [Download](https://www.python.org/)
- **MetaCall** – Enables Python integration in Node.js. See the [MetaCall Installation Guide](https://metacall.io/docs/installation/)
- **OpenWeather API** – Required for weather data. [API Website](https://openweathermap.org/api)

### Step-by-Step Installation

#### Backend Setup:

1. **Clone the repository**
   Open your terminal and run:
   ```bash
   git clone https://github.com/metacall/weather-dashboard-example.git
   cd weather-dashboard-example
   ```

2. **Install the requirements**
   ```bash
   cd backend
   metacall pip3 install -r requirements.txt
   metacall npm install
   ```
   This installs all necessary backend dependencies.

#### Frontend Setup:

**Install the requirements**
```bash
cd frontend
npm install
```

### How to Run the Application

1. **Start the Backend**
   Navigate to the `backend/` directory and run the server:
   ```bash
   cd backend
   node main.js
   ```
   This starts the backend server for processing weather data.

2. **Start the Frontend**
   In the `frontend/` directory, run the Vue.js development server:
   ```bash
   cd frontend
   npm run serve
   ```

## Documentation

For additional information, see the [tutorial sample](./docs/tutorial-sample.md).

---

**Thanks for checking out Climatic! Hope you enjoy using it 🙂**
