
export function useWeatherApp() {

  // Utilities ===================================================================
  
  const getAqiMessage = (aqi) => {
    const messages = {
      1: "Good", 2: "Fair", 3: "Moderate", 4: "Poor", 5: "Very Poor"
    };
    return messages[aqi] || '';
  };
  
  const getWeatherIcon = (icon) => `/weather_icons/${icon}.png`;

  const formatUnixTime = (unixTimestamp) => 
    new Date(unixTimestamp * 1000).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: true
    });

  const formatTime = (unixTimestamp) =>
    new Date(unixTimestamp * 1000).toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

  return {
    getAqiMessage,
    getWeatherIcon,
    formatUnixTime,
    formatTime,
  };
}