<template>
  <div class="weather-dashboard">
    

    <header class="header">
      <div class="container">
        <a href="#" class="logo">
          <img :src="require('@/assets/images/logo.png')" width="364" height="58" alt="logo" />
        </a>
        <div class="search-view" :class="{ 'active': isSearchActive }" data-search-view>
                <div class="search-wrapper">
                    <input type="search" name="search" placeholder="Search city..."  @input="SearchInput"
                    class="search-field " :class="{ 'searching': isSearching }"  autocomplete="off" data-search-field v-model="city" @keyup.enter="fetchWeather"> <!-- data-search-field -->
                    <span class="m-icon search-icon">search</span>
                    <button class="icon-btn leading-icon has-state" aria-label="close search"
                data-search-toggler @click="isSearchActive = false">
                <span class="m-icon">arrow_back</span>
                    </button>
                </div>
                <div 
                @focus="active = true"

                
      
                :class="{ active : true }" class=" search-result" v-if="cities.length > 0 || isSearching">   
                    <ul class="view-list" data-search-list>
                      
                      <li v-if="isSearching" class="view-item">
          Loading...
        </li>
                        <li
                         v-for="city in cities"
                         :key="`${city.lat}-${city.lon}`"
                        class="view-item"
                        @click="selectCity(city)"
                        >
                            <span class="m-icon">location_on</span>
                            <div>
                                <p class="item-title"> {{ city.name }}</p>
                                <p class="label-2 item-subtitle">{{ city.state ? `${city.state}, ` : '' }}{{ city.country }}</p>
                            </div>
                            
                            <a href="#" class="item-link has-state" data-search-toggler>

                            </a>
                        </li>                              
                    </ul>
                </div>

                
            





            </div>
        <div class="header-actions">
          
          <button class="icon-btn has-state" aria-label="open search" @click="isSearchActive = true">
            
            
          </button>
          <button  id="ai-button"  class="btn-primary has-state" 
        @click.prevent="fetchWeatherAnalysis"  
        data-current-location-btn 
        :disabled="isnotReady">
        <span class="m-icon">bolt</span>
        
  <span class="span">Weather Assistant</span>
  <span class="glow"></span>
  <span class="sparkle sparkle1"></span>
      <span class="sparkle sparkle2"></span>
      <span class="sparkle sparkle3"></span>
</button>
          <button class="btn-primary has-state" 
        @click.prevent="fetchForCurrentLocation" 
        
        :disabled="isdisabled">
  <span class="m-icon">my_location</span>
  <span class="span">Current Location</span>
</button>


        </div>
      </div>
      
    </header>
   








    <main v-if="weather">
      <article class="container">

        



        
        <div class="content-left" >
          <section class="section current-weather" aria-label="current weather">
            <div class="card card-lg current-weather-card">
              <h2 class="title-2 card-title">Now</h2>
              <div class="wrapper">
                <p class="heading">{{ Math.floor(weather.main.temp) }}&deg;c</p>
                <img :src="getWeatherIcon(weather.weather[0].icon)" alt="Weather Icon" class="weather-icon" width="64" height="64" />
              </div>
              <p class="body-3">{{ weather.weather[0].description }}</p>
              <ul class="meta-list">
                <li class="meta-item">
                  <span class="m-icon">calendar_today</span>
                  <p class="title-3 meta-text">{{ formatUnixTime(weather.dt) }}</p>
                </li>
                <li class="meta-item">
                  <span class="m-icon">location_on</span>
                  <p class="title-3 meta-text">{{ weather.name }}, {{ weather.sys.country }}</p>
                </li>
              </ul>
            </div>
          </section>

          <section class="section forecast" aria-labelledby="forecast-label">
            <h2 class="title-2" id="forecast-label">5 Days Forecast</h2>
            <div class="card card-lg forecast-card">
              <ul>
                <li v-for="day in forecast" :key="day.date" class="card-item">
                  <div class="icon-wrapper">
                    <img :src="getWeatherIcon(day.icon)" alt="Forecast Icon" class="weather-icon" width="36" height="36" />
                    <span class="title-2">{{ day.temp }}&deg;</span>
                  </div>
                  <p class="label-1">{{ day.day_n }} {{ day.month }}</p>
                  <p class="label-1">{{ day.week_day }}</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
<!-- Only display the air quality card if data is available -->
        <div class="content-right">
          <section class="section highlights" aria-labelledby="highlights-label" >
            


            <div class="card card-lg">
              <h2 class="title-2" id="highlights-label">Today's Highlights</h2>
              
              
              
              <div class="highlight-list">
                <div id="highlight-chart-card" class="card card-sm highlight-card">
                  <div v-if="skeleton" class="skeleton-card">
      
      <div class="skeleton-text skeleton-loader"  style="justify-content: center;"  ></div>
      <div class="skeleton-text skeleton-loader"></div>
      <div class="skeleton-text skeleton-loader"></div>
        </div>

                  <div class="wrapper" style="display: flex; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%;">
      <p v-if="weatherSummary" class="title-2" style="font-size: 30px;">{{ weatherSummary.analytics.summary }}</p>
      <p v-else class="title-2" style="color: gray; font-style: italic;">Weather data is not available. Please try again later.</p>
    </div>
</div>
                <div class="card card-sm highlight-card one" v-if="air_quality">
                                <h3 class="title-3">
                                    Air Quality Index
                                </h3>
                                <div class="wrapper">
                                    <span class="m-icon">air</span>
                                    <ul class="card-list">

                                      <li class="card-item" 
                                          v-for="item in air_quality.airQualityData"  :key="item.pollutant">
                                 <p class="title-1">{{ Math.floor(item.value.toFixed(2)) }}</p>
                                 <p class="label-1">{{ item.pollutant.toUpperCase() }}</p>
                           </li>
                                        
                                    </ul>
                                </div>
                                <span class="badge label-1" :class="`aqi-${air_quality.aqi}`" title="aqi message">
                                  {{ air_quality ? getAqiMessage(air_quality.aqi) : 'Loading...' }}
                                  </span>
                            </div>
                            
                            
                            <div class="card card-sm highlight-card two">
                                <h3 class="title-3">
                                    Sunrise & Sunset
                                </h3>
                                <div class="card-list">
                                    <div class="card-item">
                                        <span class="m-icon">clear_day</span>
                                        <div>
                                            <p class="label-1">Sunrise</p>
                                            <p class="title-1">{{ formatTime(weather.sys.sunrise) }}</p>
                                        </div>
                                    </div>
                                    <div class="card-item">
                                        <span class="m-icon">clear_night</span>
                                        <div>
                                            <p class="label-1">Sunset</p>
                                            <p class="title-1">{{ formatTime(weather.sys.sunset) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Humidity</h3>
                  <div class="wrapper">
                    <span class="m-icon">humidity_percentage</span>
                    <p class="title-1" >{{ weather.main.humidity }}%</p>
                  </div>
                </div>
                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Pressure</h3>
                  <div class="wrapper">
                    <span class="m-icon">airwave</span>
                    <p class="title-1" >{{ weather.main.pressure  }} hPa</p>
                  </div>
                </div>
                <div class="card card-sm highlight-card">
                  <h3 class="title-3"  >Visibility</h3>
                  <div class="wrapper">
                    <span class="m-icon">visibility</span>
                    <p class="title-1" >{{ (weather.visibility / 1000).toFixed(1) }} Km</p>
                  </div>
                </div>
                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Feels Like</h3>
                  <div class="wrapper">
                    <span class="m-icon">thermostat</span>
                    <p class="title-1" >{{ Math.floor(weather.main.feels_like)
                                                                     }}&deg;c</p>
                  </div>
                </div>
                
                <div id="highlight-chart-card" class="card card-sm highlight-card">
                  <h2 class="title-2" id="highlights-label">Weather Forecast For 15 Days </h2>
                  
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</div>
  




              </div>
            </div>
          </section>
          <section  class="section hourly-forecast" aria-label="hourly-forecast" data-hourly-forecast>
    <h2  class="title-2">Today at</h2>
    <div   class="slider-container">
        
      <ul class="slider-list">
  <li v-for="hour in hourly" :key="hour.date" class="slider-item">
    <div class="card card-sm slider-card">
      <p class="body-3">{{ hour.hour }}</p>
      <img 
          id="weather-cloud"
          :src="getWeatherIcon(hour.icon)" alt="weather icon" class="weather-icon" width="48" height="48"
        loading="lazy" title=""   :style="{ transition: 'transform 0.5s ease'
          
        }" >
      <p class="body-3">{{ hour.temp }}&deg;</p>
    </div>

    <div class="card card-sm slider-card">
      <p class="body-3"></p>
      <img src="@/assets/images/weather_icons/direction.png" alt="day_weather" class="weather-icon" width="48" height="48"
        loading="lazy" title=""    :style="{ transform: 'rotate(' + hour.direction + 'deg)'
          
         }">
      <p class="body-3">{{ hour.speed }} m/s</p>
    </div>
  </li>
</ul>

    </div>

          </section>
          <footer class="footer">
          <p class="body-3">
            © 2024 MetaCall. All rights reserved.
          </p>
          <p class="body-3">
            Powered By <a href="https://www.metacall.io" target="_blank">
              <img src="@/assets/images/metacall_icon.png" alt="MetaCall Icon" width="64" height="64" loading="lazy"/>
            </a>
          </p>
        </footer>
            
        </div>


        



        

      </article>
    </main>
    
  </div>
</template>

<script setup>

import { useWeatherApp } from '@/weather.js';
import { ref, onMounted , defineEmits } from "vue";
import _debounce from 'lodash.debounce';
import axios from 'axios';
const emit = defineEmits(['city-selected']);

const SearchInput = _debounce(() => {
  searchCities();
  
}, 300);


const {
  getWeatherIcon,
  getAqiMessage,
  formatTime,
  formatUnixTime
  
} = useWeatherApp();


const isnotReady = ref(true);
const city = ref("");
const weather = ref(null);
const error = ref("");
const forecast = ref("");
const hourly = ref("");
const air_quality = ref("");
const isSearchActive = ref(false);
const isdisabled = ref(false);
const isSearching = ref(false);
const skeleton = ref(true);
const query = ref('');
const cities = ref([]);

const errorMessage = ref('');

const weatherSummary = ref(null);
const loading = ref(false);

const chartCanvas = ref(null);
import { nextTick } from 'vue';
Chart.register(...registerables);
const forecastData = ref([]);
import { Chart, registerables } from 'chart.js';

async function fetchForecastData() {
  try {
    const response = await fetch("http://localhost:5000/weather/forecast/16", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city.value })
    });
    const data = await response.json();
    
    // Assign the forecast array from the backend response
    forecastData.value = data.forecast;
    
    await nextTick();
    // Ensure DOM updates before creating the chart
     // Import nextTick from 'vue' if not already
    createChart();
    forecastData.value = null;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
  }
}
let myChart = null;
function createChart() {
  if (!chartCanvas.value || !forecastData.value.length) return;

  
  if (myChart) {
    myChart.destroy();
  }
  // Extract data from forecastData
  const dates = forecastData.value.map(item => item.date);
  const dayTemperatures = forecastData.value.map(item => Number(item.max_temp));
  

  // Get 2D context from the canvas
  const ctx = chartCanvas.value.getContext('2d');

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      // We'll store the raw date strings in labels,
      // but override them in the x-axis ticks callback
      labels: dates,
      datasets: [
        {
          label: 'Day Temperature (°C)',
          data: dayTemperatures,
          borderColor: '#B9B6BF',    // Orange line color
          backgroundColor: 'transparent',
          tension: 0.4,             // Smoother curve
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, 
      scales: {
        x: {
          grid: { display: false },
          
          ticks: {
            color: '#B9B6BF',
            callback: function (value) {
              const dateStr = this.getLabelForValue(value); // e.g. "2025-02-13"
              const dateObj = new Date(dateStr);
              const day = dateObj.getDate(); // 13
              const month = dateObj.toLocaleString('en-US', { month: 'short' }); // "Feb"
              return `${day} ${month}`; // "13 Feb"
            }
          }
        },
        y: {
          beginAtZero: false,
          // Append "°" to each y-axis tick
          ticks: {
            color: '#B9B6BF',
            callback: function (value) {
              return value + '°';
            }
          },
          title: {
            display: true,
            text: 'Temperature (°C)'
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          backgroundColor: '#F18B60'
        }
      }
    }
  });
}


// Automatically fetch data when the component mounts





async function fetchForCurrentLocation() {
  if (!navigator.geolocation) {
    error.value = "Geolocation is not supported by this browser.";
    return;
  }

  isdisabled.value = true; 

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const response = await fetch("http://localhost:5000/weather/current/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lon }),
        });

        const data = await response.json();
        weather.value = data;
        
        error.value = "";
        
        const current_city = await getCityName(lat, lon);
        
    const cleanedCity = current_city.replace(/\s+City$/, "").trim();
    if (!cleanedCity) throw new Error("Failed to determine city name");
    
    city.value = cleanedCity;
    weather.value.name = cleanedCity;
    
    

    // Parallelize forecast and air quality requests
    await Promise.all([
      fetchForecast(cleanedCity),
      fetchAirQuality(cleanedCity),
      fetchForecastData(cleanedCity),
      fetchWeatherAnalysis(cleanedCity),
      
    ]);
    isnotReady.value = false; // enable the weather assistant button after fetching all the data 
    city.value = null;

      } catch (err) {
        error.value = err.message;
      } 
    },
    (error) => {
      error.value = "Failed to get current location.";
      
      
    }
  );
  
}

async function getCityName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village;
  } catch (error) {
    console.error("Error fetching city name:", error);
    return null;
  }
}
async function fetchForecast(city) {
  const cityName = (typeof city === "object" && city.value) ? city.value : city;

  if (!cityName) {
    console.error("City name is missing!");
    return;
  }

 
    const response = await fetch("http://localhost:5000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityName.trim()})
    });
    
    const data = await response.json();
     hourly.value = data.slice(0,6);
   

    

    
    const uniqueDays = new Map();
    forecast.value = data.filter(item => {
        if (!uniqueDays.has(item.day_n)) {
            uniqueDays.set(item.day_n, true);
            return true;
        }
        return false;
    });
    
    
    return data;
     // Handle forecast data in UI
}

async function searchCities() {
  // Clear previous results
  cities.value = [];
  errorMessage.value = '';

  // Validate input
  if (!city.value) return;

  isSearching.value = true;

  try {
    const response = await axios.post('http://localhost:5000/search/city', {
      city: city.value
    });

    if (response.data.length === 0) {
      errorMessage.value = 'No cities found';
      return;
    }

    cities.value = response.data;
    
  } catch (error) {
    console.error('Search error:', error);
    errorMessage.value = 'Failed to search cities. Please try again.';
  } finally {
    
    isSearching.value = false;
  }
}














const fetchWeather = async (selectedCity) => {
  const city_name = selectedCity ? selectedCity.name : city.value.trim()  ;
    try {
        const response = await fetch("http://localhost:5000/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: city_name }),
        });

        const data = await response.json();

    if (!data.main) {
      throw new Error("Invalid weather data received");
    }
        
        await fetchForecast(city_name);
        await fetchAirQuality(city_name)
        fetchForecastData(city_name) 
        fetchWeatherAnalysis(city_name) // Debugging

        

        weather.value = data;
        
        
        isSearching.value = false;
        error.value = "";
        isSearchActive.value = false;
        isdisabled.value = false;
        isnotReady.value = false;
        
        city.value = null;
    } catch (err) {
        error.value = err.message;
        isSearchActive.value = ref(true);
    }
};




async function fetchAirQuality(city) {
  try {
    const response = await fetch("http://localhost:5000/air/quality", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city }),
    });

    const data = await response.json();

    // Convert airQualityData (object) to an array of objects,
    // then limit it to the first 5 items.
    const airQualityArray = Object.entries(data.airQualityData)
      .map(([pollutant, value]) => ({
        pollutant,
        value: Number(value)  // convert value to number if needed
      }))
      .slice(0, 4); // take only the first 5 entries

    // Set the reactive variable with the updated data.
    // Now, air_quality.value.airQualityData is an array of 5 items.
    air_quality.value = {
      ...data,
      airQualityData: airQualityArray,
    };

    
  } catch (error) {
    console.error("Error fetching air quality:", error);
  }
}




const fetchWeatherAnalysis = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await fetch("http://localhost:5000/weather/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city.value }),
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    weatherSummary.value = data;
    
  } catch (error) {
    errorMessage.value = "Error fetching weather data.";
  } finally {
    loading.value = false;
    skeleton.value = false;
  }
};
function selectCity(city) {

emit('city-selected', {
  name: city.name,
  lat: city.lat,
  lon: city.lon
});
fetchWeather(city)
// Clear search results
cities.value = [];
query.value = '';

}
onMounted(async () => {
  
  document.title = "Climatic";
});

</script>


