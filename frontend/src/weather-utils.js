export function weatherUtils() {
 

  // All Weather Utils  ===================================================================
  const getWindDirection = (degrees) => {
    const directions = [
      { short: 'N', full: 'North', description: 'Blowing from the North' },
      { short: 'NNE', full: 'North-Northeast', description: 'Blowing from the North-Northeast' },
      { short: 'NE', full: 'Northeast', description: 'Blowing from the Northeast' },
      { short: 'ENE', full: 'East-Northeast', description: 'Blowing from the East-Northeast' },
      { short: 'E', full: 'East', description: 'Blowing from the East' },
      { short: 'ESE', full: 'East-Southeast', description: 'Blowing from the East-Southeast' },
      { short: 'SE', full: 'Southeast', description: 'Blowing from the Southeast' },
      { short: 'SSE', full: 'South-Southeast', description: 'Blowing from the South-Southeast' },
      { short: 'S', full: 'South', description: 'Blowing from the South' },
      { short: 'SSW', full: 'South-Southwest', description: 'Blowing from the South-Southwest' },
      { short: 'SW', full: 'Southwest', description: 'Blowing from the Southwest' },
      { short: 'WSW', full: 'West-Southwest', description: 'Blowing from the West-Southwest' },
      { short: 'W', full: 'West', description: 'Blowing from the West' },
      { short: 'WNW', full: 'West-Northwest', description: 'Blowing from the West-Northwest' },
      { short: 'NW', full: 'Northwest', description: 'Blowing from the Northwest' },
      { short: 'NNW', full: 'North-Northwest', description: 'Blowing from the North-Northwest' }
    ];
    const index = Math.round(degrees / 22.5) % 16;
  const direction = directions[index];
  
  return {
    short: direction.short,
    full: direction.full,
    description: direction.description,
    degrees: degrees
  };
    
  }
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

    const getMoonPhase = (date = new Date()) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
  
  // Calculate Julian date
     let a = Math.floor((14 - month) / 12);
     let y = year + 4800 - a;
     let m = month + 12 * a - 3;
     let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // Calculate the number of days since the last new moon
    const knownNewMoon = 2451549.5; // January 6, 2000
    const lunarMonth = 29.530588853; // Length of a lunar month in days
    const phase = ((jd - knownNewMoon) % lunarMonth) / lunarMonth;
  
  return phase;
    }
  const getUvIndexClass = (value) => {
    if (value === null) return 'uv-low';
    if (value <= 2) return 'uv-low';
    if (value <= 5) return 'uv-moderate';
    if (value <= 7) return 'uv-high';
    if (value <= 10) return 'uv-very-high';
    return 'uv-extreme';
  }
  const getUvIndexLevel = (value) => {
    if (value === null) return 'N/A';
    if (value <= 2) return 'Low';
    if (value <= 5) return 'Moderate';
    if (value <= 7) return 'High';
    if (value <= 10) return 'Very High';
    return 'Extreme';
  }
  const getUvIndexRecommendation = (value) => {
    if (value === null) return 'UV data unavailable';
    if (value <= 2) return 'No protection needed';
    if (value <= 5) return 'Wear sunscreen and seek shade during midday';
    if (value <= 7) return 'Reduce time in the sun between 10 a.m. and 4 p.m.';
    if (value <= 10) return 'Minimize sun exposure during midday hours';
    return 'Avoid sun exposure during midday hours';
  }
  const calculateDewPoint = (tempC, humidity) => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * tempC) / (b + tempC)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return dewPoint;
  }
  const getCityName = async (lat, lon) => {
    console.log("lat",lat, "lon",lon)
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || data.address.county || data.address.state;

  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
  }

  

  return {
    getAqiMessage,
    getWeatherIcon,
    formatUnixTime,
    formatTime,
    getWindDirection,
    getMoonPhase,
    getUvIndexClass,
    getUvIndexLevel,
    getUvIndexRecommendation,
    calculateDewPoint,
    getCityName
    

  };
}

