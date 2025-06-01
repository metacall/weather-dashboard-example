# Climatic: A Step-by-Step Tutorial for a Polyglot Weather Dashboard with MetaCall

Welcome to this beginner-friendly tutorial! In this guide, you'll learn how to build **Climatic**, a weather dashboard that integrates **Node.js and Python** using **MetaCall**. You'll see how to install MetaCall, write Python functions for weather analytics, call them from Node.js, and deploy everything to the cloud.

---

## 🚀 1. Installing MetaCall
MetaCall allows you to execute functions across multiple programming languages within the same project. Let’s install it first!

### **Step 1: Download and Install MetaCall**
Open your terminal and run:

```sh
curl -sL https://raw.githubusercontent.com/metacall/install/master/install.sh | sh
```

### **Step 2: Verify Installation**
After installation, check if MetaCall is installed correctly by running:

```sh
metacall --version
```

For more details, visit the [MetaCall Installer](https://github.com/metacall/install).

---

## 📌 2. Understanding the Project (What We Are Building)

### **What is Climatic?**
Climatic is a **polyglot weather dashboard** that combines different programming languages to provide weather insights. Here's how it works:

- **Node.js Backend:** Handles API requests and serves data.
- **Python Analytics Module:** Processes weather data for analysis.
- **MetaCall Integration:** Runs Python functions directly inside Node.js.
- **Vue.js Frontend (Optional):** Displays weather data in a user-friendly UI.

### **Why Use Python in a Node.js Project?**
JavaScript is great for APIs, but it lacks powerful data analysis libraries like **pandas** and **NumPy**. That’s why we use **Python** to process the data while keeping the API logic in **Node.js**.

---

## 📦 3. Installing Project Dependencies
Before writing any code, let's install the necessary libraries.

### **Step 1: Install Node.js Dependencies**
Run the following command in your project folder:

```sh
npm install express metacall axios
```

### **Step 2: Install Python Dependencies**
For weather data analysis, install these Python packages:

```sh
pip install pandas numpy requests
```

Now, we are ready to write some code! 🚀

---

## 📝 4. Writing the Python Weather Analysis Function
We'll write a simple Python function to **analyze temperature data** using `pandas`.

### **Create a Python File (`weather_analysis.py`)**
```python
import pandas as pd

def analyze_weather(data):
    df = pd.DataFrame(data)
    return df.describe().to_dict()
```

- This function takes a **list of temperature readings** and returns **statistical summaries** (like min, max, and average temperature).

---

## 🔗 5. Calling Python Code from Node.js using MetaCall
Now, let’s integrate our Python function into a Node.js server!

### **Create a Node.js Server (`server.js`)**
```javascript
const { metacall } = require('metacall');

async function analyzeWeather(data) {
    await metacall.load('weather_analysis.py');
    const result = await metacall.call('analyze_weather', data);
    console.log("Weather Analysis Result:", result);
}

analyzeWeather([{ temperature: 20 }, { temperature: 25 }, { temperature: 30 }]);
```

### **How This Works:**
✅ **Loads** the Python file using `metacall.load()`.
✅ **Calls** the `analyze_weather` function with sample data.
✅ **Prints** the result in the terminal.

Run the script to test it:

```sh
node server.js
```

You should see the analyzed weather data printed to the console! 🎉

---

## 🌦️ 6. Connecting to a Live Weather API (OpenWeatherMap)
Instead of using static data, let’s fetch real-time weather data from **OpenWeatherMap**.

### **Step 1: Get an API Key**
1. Sign up at [OpenWeatherMap](https://openweathermap.org/).
2. Get your **API key** from the dashboard.

### **Step 2: Fetch Weather Data in Node.js**
Modify `server.js` to retrieve weather data:

```javascript
const axios = require('axios');

async function fetchWeather(city) {
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    return response.data;
}

fetchWeather('London').then(console.log);
```

Now, running `node server.js` will print live weather data for **London**. 🌍

---

## 🛠️ 7. Testing MetaCall FaaS Locally
Before deploying, let’s ensure our function works with MetaCall locally.

Run the following command:

```sh
metacall weather_analysis.py
```

This verifies that MetaCall can execute our function without errors.

---

## ☁️ 8. Deploying to MetaCall FaaS (Serverless Deployment)
Now, let's deploy our Python function to the **MetaCall Cloud** so it can be used anywhere!

### **Step 1: Log in to MetaCall Cloud**
Go to [MetaCall Dashboard](https://dashboard.metacall.io) and log in or sign up.

### **Step 2: Upload Your Python Script**
1. Navigate to the **Deployments** section.
2. Click **Upload Function** and select `weather_analysis.py`.

### **Step 3: Get Your API Endpoint**
- MetaCall will generate a **public API URL** for your function.
- Copy this URL to use it in your Node.js backend.

### **Step 4: Modify `server.js` to Use the Cloud API**
Replace the local MetaCall call with an HTTP request to your cloud function:

```javascript
const axios = require('axios');

async function analyzeWeather(data) {
    const response = await axios.post('YOUR_METACALL_API_URL', { args: [data] });
    console.log("Weather Analysis Result:", response.data);
}

analyzeWeather([{ temperature: 20 }, { temperature: 25 }, { temperature: 30 }]);
```

### **Step 5: Run Your Backend Again**
```sh
node server.js
```

Now, your **Node.js backend is using a cloud-based Python function**! 🚀

---

## 🎉 Final Thoughts
Congratulations! You’ve successfully built a **polyglot weather dashboard** that:

✅ **Uses Python for analytics** and **Node.js for API handling**
✅ **Calls Python functions inside Node.js using MetaCall**
✅ **Fetches live weather data from OpenWeatherMap**
✅ **Runs locally and on the MetaCall Cloud (FaaS)**

Now, you can expand it by:
- Adding a **Vue.js frontend** to display weather data.
- Enhancing Python functions for **better weather predictions**.

Let me know if you have any questions! 🚀

