import statistics
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LinearRegression

def get_weather_summary(weather_data, predicted_temp_next_day):
    """Generate a summary of today's weather and tomorrow's predicted temperature."""
    temps = [item["main"]["temp"] for item in weather_data["list"]]
    avg_temp = round(statistics.mean(temps), 2)   

    if len(temps) < 16:
        return {"error": "Not enough data to predict", "language": "Python"}

    
    today_temps = temps[:8]

    max_temp_today = int(round(max(today_temps)))
    min_temp_today = int(round(min(today_temps)))
    predicted_temp = int(round(predicted_temp_next_day))

    # Check if temperature is steadily increasing or decreasing
    is_steadily_increasing = all(today_temps[i] < today_temps[i + 1] for i in range(len(today_temps) - 1))
    is_steadily_decreasing = all(today_temps[i] > today_temps[i + 1] for i in range(len(today_temps) - 1))

    if is_steadily_increasing:
        summary = f"Weather Today: Temperatures will gradually rise, peaking at {max_temp_today}°C."
    elif is_steadily_decreasing:
        summary = f"Weather Today: Temperatures will gradually drop, reaching a low of {min_temp_today}°C."
    else:
        summary = f"Weather Today will be warmer with a high of {max_temp_today}°C and a low of {min_temp_today}°C."
    
    # Add prediction for tomorrow
    summary += f" Tomorrow, the expected temperature will be around {predicted_temp}°C."

    return {
        "summary": summary,
        "max_temp_today": max_temp_today,
        "min_temp_today": min_temp_today,
        "predicted_temp_next_day": predicted_temp
    }

def detect_condition(temps):
    """Detects whether the temperature is increasing or decreasing."""
    trend = np.polyfit(range(len(temps)), temps, 1)[0]  
    if trend > 0:
        return "warming"
    elif trend < 0:
        return "cooling"
    return "stable"
def detect_trend(temps):
    """Detect whether the temperature trend is increasing, decreasing, or stable."""
    trend = np.polyfit(range(len(temps)), temps, 1)[0]
    if trend > 0:
        return "increasing"
    elif trend < 0:
        return "decreasing"
    return "stable"
def get_weather_stats(weather_data):
    """Enhanced function using polynomial regression for better accuracy."""
    temps = [item["main"]["temp"] for item in weather_data["list"]]
    timestamps = np.arange(len(temps)).reshape(-1, 1)

    if len(temps) < 3:
        return {"error": "Not enough data to predict", "language": "Python"}

    # Use Polynomial Regression (degree 2 for better curve fitting)
    model = make_pipeline(PolynomialFeatures(degree=2), LinearRegression())
    model.fit(timestamps, temps)

    # Predict next day's temperature
    next_time_index = np.array([[len(temps)]])
    predicted_temp = round(model.predict(next_time_index)[0], 2)
    trend = detect_trend(temps)
    condition = detect_condition(temps)
    weather_summary = get_weather_summary(weather_data, predicted_temp)
    

    return {
        "average_temperature": round(np.mean(temps), 2),
        "max_temp": round(np.max(temps), 2),
        "min_temp": round(np.min(temps), 2),
        "predicted_temp_next_day": round(predicted_temp, 2),
        "trend": trend,
        "summary": weather_summary["summary"],   
        "condition": condition
    }
