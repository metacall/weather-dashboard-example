<template>
  <div class="weather-dashboard">
    <div class="location-loading " :class="{ 'active': isLocationLoading }">
      <div class="location-content">
        <div class="location-icon">
          <div class="location-pulse"></div>
          <span class="m-icon">my_location</span>
        </div>
        <h2 class="location-text">Detecting Your Location</h2>
        <p class="location-subtext">Please allow location access</p>
      </div>
    </div>
    
    <div class="loading-state" :class="{ 'active': loading }">
      <div class="loading-content">
        <div class="loading-icon">
          <div class="loading-circle"></div>
          <div class="loading-circle"></div>
          <div class="loading-circle"></div>
        </div>
        <h2 class="loading-text">Analyzing Weather Data</h2>
        <p class="loading-subtext">Preparing your personalized weather insights</p>
      </div>
    </div>
    
    <WeatherNavbar
      :is-header-blur="isHeaderBlur"
      :is-not-ready="isnotReady"
      :is-disabled="isdisabled"
      :is-current-location="isCurrentLocation"
      @reset="resetToLanding"
      @search-click="isSearchActive = true"
      @assistant-click="assistant.isActive = true"
      @current-location-click="fetchForCurrentLocation"
    />
   
    <main v-if="!weather">
      <div class="landing-container">
        <div class="landing-content" :class="{ 'fade-out': loading }">
          <div class="hero-flex">
            <div class="hero-text">
              <h1 class="main-title">
                <span class="text-normal">Advanced</span>
                <span class="text-gradient">Weather</span>
                <span class="text-normal">Intelligence</span>
              </h1>
            </div>
            <div class="hero-lottie">
              <DotLottieVue style="height: 200px; width: 200px" autoplay loop src="https://lottie.host/05fcafe0-d050-418d-afde-d7ae9b0f6070/zJlh54NBwj.lottie" />
            </div>
          </div>
          
          
          <div class="feature-grid">
            <div class="feature-card temperature-card">
              <div class="card-content">
                <div class="card-header">
                <span class="feature-icon">
                  <span class="m-icon">thermostat</span>
                </span>
                  <h3>Weather Insights</h3>
              </div>
                <p>Experience precise temperature forecasting with real-time updates and feels-like metrics.</p>
                <div class="feature-stats">
                  <div class="stat-item">
                    <span class="m-icon">update</span>
                    <span>Real-time Updates</span>
            </div>
                  <div class="stat-item">
                    <span class="m-icon">thermostat_auto</span>
                    <span>Feels-like Temp</span>
                  </div>
                  <div class="stat-item">
                    <span class="m-icon">insights</span>
                    <span>Comfort Analysis</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="feature-card summary-card">
              <div class="card-content">
                <div class="card-header">
                <span class="feature-icon">
                    <span class="m-icon">insights</span>
                </span>
                  <h3>Weather Summary</h3>
              </div>
                <p>Get a comprehensive overview of current weather conditions and trends.</p>
                <div class="feature-stats">
                  <div class="stat-item">
                    <span class="m-icon">analytics</span>
                    <span>Weather Trends</span>
            </div>
                  <div class="stat-item">
                    <span class="m-icon">trending_up</span>
                    <span>Pattern Analysis</span>
                  </div>
                  <div class="stat-item">
                    <span class="m-icon">notifications</span>
                    <span>Weather Alerts</span>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div class="feature-card assistant-card">
              <div class="card-content">
                <div class="card-header">
                <span class="feature-icon">
                    <span class="m-icon">smart_toy</span>
                </span>
                  <h3>Weather Assistant</h3>
              </div>
                <p>Get personalized weather insights and recommendations from our AI assistant.</p>
                <div class="feature-stats">
                  <div class="stat-item">
                    <span class="m-icon">chat</span>
                    <span>Smart Chat</span>
            </div>
                  <div class="stat-item">
                    <span class="m-icon">psychology</span>
                    <span>AI Insights</span>
                  </div>
                  <div class="stat-item">
                    <span class="m-icon">recommendation</span>
                    <span>Smart Tips</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
          <footer class="landing-footer">
            <span class="footer-text">
              © 2024 MetaCall. All rights reserved. &nbsp; Powered By
              <a href="https://www.metacall.io" target="_blank" class="footer-logo-link">
                <img src="@/assets/images/metacall_icon.png" alt="MetaCall Icon" loading="lazy" class="footer-logo"/>
              </a>
            </span>
          </footer>
          
        </div>
      </div>
    </main>

    <main v-else>
      <article class="container">
        <div class="content-left" >
          <section class="section current-weather" aria-label="current weather">
            <div class="card card-lg current-weather-card">
                <h2 class="title-2 card-title">Now</h2>
                <div class="wrapper">
                  <div class="temperature-container">
                    <p class="heading">{{ Math.floor(weather?.main?.temp) }}&deg;c</p>
                    <div class="temperature-details">
                      <span class="temp-min">↓ {{ Math.floor(weather?.main?.temp_min) }}&deg;</span>
                      <span class="temp-max">↑ {{ Math.floor(weather?.main?.temp_max) }}&deg;</span>
                    </div>
                  </div>
                  <div class="weather-icon-container">
                    <img 
                      :src="getWeatherIcon(weather.weather[0].icon)" 
                      alt="Weather Icon" 
                      class="weather-icon" 
                      width="64" 
                      height="64"
                      :class="weather.weather[0].main.toLowerCase()"
                    />
                  </div>
                </div>
                <p class="body-3 weather-description">{{ weather.weather[0].description }}</p>
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

          <!-- New Moon Phase Card -->
          <section class="section moon-phase" aria-label="moon phase">
            <div class="card card-lg moon-phase-card">
                <h2 class="title-2 card-title">Moon Phase</h2>
                <div class="wrapper" style="flex-direction: column; align-items: center; gap: 8px;">
                  <!-- Moon Phase Card SVG -->
                  <svg :width="64" :height="64" viewBox="0 0 64 64">
                    <defs>
                      <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fffbe6"/>
                        <stop offset="100%" stop-color="#bdbdbd"/>
                      </radialGradient>
                      <clipPath id="moonClip">
                        <circle cx="32" cy="32" r="24" />
                      </clipPath>
                    </defs>
                    <!-- Full moon base -->
                    <circle cx="32" cy="32" r="24" fill="url(#moonGradient)" />
                    <!-- Shadow (phase) -->
                    <circle
                      v-if="moonPhase < 0.5"
                      :cx="32 + 24 * (1 - 2 * moonPhase)"
                      cy="32"
                      r="24"
                      fill="#131214"
                      :clip-path="'url(#moonClip)'"
                    />
                    <circle
                      v-else
                      :cx="32 - 24 * (2 * moonPhase - 1)"
                      cy="32"
                      r="24"
                      fill="#131214"
                      :clip-path="'url(#moonClip)'"
                    />
                  </svg>
                  <p class="title-3" style="margin-top: 8px;">{{ moonPhaseName }}</p>
              </div>
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
        <div class="content-right">
          <section class="section highlights" aria-labelledby="highlights-label">
            <div class="card card-lg">
              <h2 class="title-2" id="highlights-label">Today's Highlights</h2>
              
              <div class="highlight-list">
                <div id="highlight-chart-card" class="card card-sm highlight-card summary-card">
                  <div v-if="skeleton" class="skeleton-card">
                    <div class="skeleton-text skeleton-loader" style="justify-content: center;"></div>
                    <div class="skeleton-text skeleton-loader"></div>
                    <div class="skeleton-text skeleton-loader"></div>
                  </div>

                  <div v-else class="wrapper" style="display: flex; align-items: center; justify-content: center; text-align: center; height: 100%; width: 100%;">
                    <p v-if="weatherSummary && weatherSummary.analytics && weatherSummary.analytics.summary" 
                       class="title-2" 
                       style="font-size: 30px;">
                      {{ weatherSummary.analytics.summary }}
                    </p>
                    <p v-else class="title-2" style="font-size: 30px;">
                      Loading weather analysis...
                    </p>
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

              <!-- New section for additional weather data -->
              <div class="additional-highlights">
                <h2 class="title-2">Weather Details</h2>
                <div class="highlight-grid">
                  <div class="card card-sm highlight-card">
                    <h3 class="title-3">UV Index</h3>
                    <div class="wrapper">
                      <span class="m-icon">wb_sunny</span>
                      <div class="uv-index">
                        <div class="uv-bar">
                          <div 
                            class="uv-fill"
                            :style="{
                              width: `${Math.min((uvIndex || 0) / 11 * 100, 100)}%`,
                              background: uvIndex === null ? '#ccc' :
                                uvIndex <= 2 ? '#4CAF50' :
                                uvIndex <= 5 ? '#FFEB3B' :
                                uvIndex <= 7 ? '#FF9800' :
                                uvIndex <= 10 ? '#F44336' :
                                '#9C27B0'
                            }"
                          ></div>
                        </div>
                        <div class="uv-info">
                          <p class="title-1">{{ uvIndex !== null ? uvIndex.toFixed(1) : 'N/A' }}</p>
                          <span class="uv-badge" :class="getUvIndexClass(uvIndex)">
                            {{ getUvIndexLevel(uvIndex) }}
                          </span>
                        </div>
                        <p class="label-1">{{ getUvIndexRecommendation(uvIndex) }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="card card-sm highlight-card">
                    <h3 class="title-3">Precipitation</h3>
                    <div class="wrapper">
                      <span class="m-icon">water_drop</span>
                      <div class="precipitation-info">
                        <p class="title-1">
                          {{ (hourly && hourly.length && typeof hourly[0].pop === 'number') ? Math.round(hourly[0].pop * 100) : 'N/A' }}%
                        </p>
                        <p class="label-1">Chance of Rain (Next Hour)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="section additional-weather" aria-labelledby="additional-weather-label">
            <div class="card card-lg">
              <h2 class="title-2" id="additional-weather-label">Additional Weather Data</h2>
              
              <div class="highlight-list">
                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Wind Direction</h3>
                  <div class="wrapper wind-wrapper">
                    <div class="wind-info">
                      <p class="title-1">{{ getWindDirection(weather.wind.deg).full }}</p>
                      <p class="label-1">{{ getWindDirection(weather.wind.deg).description }}</p>
                      <p class="label-2">{{ weather.wind.deg }}°</p>
                    </div>
                    <div class="wind-direction">
                      <span 
                        class="m-icon wind-icon" 
                        :style="{ transform: `rotate(${weather.wind.deg}deg)` }"
                      >explore</span>
                    </div>
                  </div>
                </div>

                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Cloud Coverage</h3>
                  <div class="wrapper">
                    <span class="m-icon">cloud</span>
                    <div class="cloud-coverage">
                      <div class="coverage-bar">
                        <div class="coverage-fill" :style="{ width: `${weather.clouds.all}%` }"></div>
                      </div>
                      <p class="title-1">{{ weather.clouds.all }}%</p>
                    </div>
                  </div>
                </div>

                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Dew Point</h3>
                  <div class="wrapper">
                    <span class="m-icon">water_drop</span>
                    <p class="title-1">
                      {{ (weather.main && typeof weather.main.temp === 'number' && typeof weather.main.humidity === 'number')
                        ? calculateDewPoint(weather.main.temp, weather.main.humidity).toFixed(1) : 'N/A' }}°C
                    </p>
                    </div>
                  </div>

                <div class="card card-sm highlight-card">
                  <h3 class="title-3">Wind Gusts</h3>
                  <div class="wrapper">
                    <span class="m-icon">air</span>
                    <p class="title-1">{{ weather.wind.gust ? Math.floor(weather.wind.gust) : '0' }} m/s</p>
                </div>
                </div>
              </div>
            </div>
          </section>
          <section  class="section hourly-forecast" aria-label="hourly-forecast" data-hourly-forecast>
            <h2 class="title-2">Today at</h2>
            <div class="slider-container">
              <ul class="slider-list">
                <li v-for="hour in hourly" :key="hour.date" class="slider-item">
                  <div class="card card-sm slider-card">
                    <p class="body-3">{{ hour.hour }}</p>
                    <img 
                      id="weather-cloud"
                      :src="getWeatherIcon(hour.icon)" 
                      alt="weather icon" 
                      class="weather-icon" 
                      width="48" 
                      height="48"
                      loading="lazy" 
                      title=""   
                      :style="{ transition: 'transform 0.5s ease' }">
                    <div class="hourly-main-row">
                      <span class="hourly-temp">{{ hour.temp }}°</span>
                      <span class="hourly-precip"
                            :style="{ color: '#fff' }"
                            @mouseenter="hoveredHour = hour.hour"
                            @mouseleave="hoveredHour = null">
                        <div class="precip-static-icon" style="display: flex; justify-content: center; margin-top: 4px;">
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <g>
                              <path d="M12 2C12 2 7 10 7 14a5 5 0 0 0 10 0c0-4-5-12-5-12z" fill="#2196f3"/>
                            </g>
                          </svg>
                        </div>
                        {{ typeof hour.pop === 'number' ? Math.round(hour.pop * 100) : 'N/A' }}%
                        <span v-if="hoveredHour === hour.hour" class="tooltip">Chance of precipitation</span>
                      </span>
                    </div>
                  </div>

                  <div class="card card-sm slider-card">
                    <p class="body-3"></p>
                    <img 
                      src="@/assets/images/weather_icons/direction.png" 
                      alt="day_weather" 
                      class="weather-icon" 
                      width="48" 
                      height="48"
                      loading="lazy" 
                      title=""    
                      :style="{ transform: 'rotate(' + hour.direction + 'deg)' }">
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
    
    <div class="search-overlay" :class="{ 'active': isSearchActive }">
      <div class="search-popup">
        <div class="search-header">
          <h2 class="search-title">Search Location</h2>
          <button 
            class="icon-btn close-btn" 
            aria-label="close search"
            @click="isSearchActive = false"
          >
            <span class="m-icon">close</span>
          </button>
        </div>
        <div class="search-content">
          <div class="search-input-wrapper">
            <input 
              type="search" 
              name="search" 
              placeholder="Enter city name..."  
              @input="SearchInput"
              class="search-field" 
              :class="{ 'searching': isSearching }"  
              autocomplete="off" 
              data-search-field 
              v-model="city" 
              @keyup.enter="fetchWeather"
              ref="searchInput"
            >
            <span class="m-icon search-icon">search</span>
          </div>
          <div 
            class="search-results" 
            v-if="cities.length > 0 || isSearching || !city || (city && !isSearching && cities.length === 0)"
          >   
            <div v-if="isSearching" class="loading-state">
              <div class="loading-circle"></div>
              <p>Searching...</p>
            </div>
            <div v-else-if="!city" class="no-results">
              <span class="m-icon no-results-icon">search</span>
              <h3 class="no-results-title">Start Searching</h3>
              <p class="no-results-message">Enter a city name to find weather information</p>
            </div>
            <div v-else-if="city && !isSearching && cities.length === 0" class="no-results">
              <span class="m-icon no-results-icon">search_off</span>
              <h3 class="no-results-title">No Results Found</h3>
              <p class="no-results-message">No cities found matching your search</p>
            </div>
            <ul v-else class="results-list">
              <li
                v-for="city in cities"
                :key="`${city.lat}-${city.lon}`"
                class="result-item"
                @click="selectCity(city)"
              >
                <span class="m-icon">location_on</span>
                <div class="result-content">
                  <p class="city-name">{{ city.name }}</p>
                  <p class="city-details">{{ city.state ? `${city.state}, ` : '' }}{{ city.country }}</p>
                </div>
              </li>                              
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="error-popup" :class="{ 'active': showError }">
      <div class="error-content">
        <span class="m-icon error-icon">error</span>
        <p class="error-message">{{ errorMessage }}</p>
        <button class="error-close" @click="showError = false">
          <span class="m-icon">close</span>
        </button>
      </div>
    </div>

    <AssistantOverlay
      :is-active="assistant.isActive"
      :assistant-response="assistant.response"
      :weather="weather"
      :user-message="assistant.userMessage"
      :chat-messages="assistant.chatMessages"
      :get-weather-icon="getWeatherIcon"
      @close="assistant.isActive = false"
    />
  </div>
</template>

<script setup>
import { weatherUtils } from '@/weather-utils.js';
const {
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
} = weatherUtils();
import WeatherNavbar from './Navbar.vue';
import { ref, onMounted, defineEmits, onUnmounted, watch, nextTick, computed, reactive } from "vue";
import _debounce from 'lodash.debounce';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'
import AssistantOverlay from './AssistantOverlay.vue';


const emit = defineEmits(['city-selected']);

Chart.register(...registerables);

const SearchInput = _debounce(() => {
  searchCities();
}, 300);

const isnotReady = ref(true);
const city = ref("");
const weather = ref(null);
const forecast = ref("");
const hourly = ref("");
const air_quality = ref("");
const isSearchActive = ref(false);
const isdisabled = ref(false);
const isSearching = ref(false);
const skeleton = ref(true);
const query = ref('');
const cities = ref([]);
const isCurrentLocation = ref(false);

const weatherSummary = ref(null);
const loading = ref(false);
const loadingTimeout = ref(null);
const errorMessage = ref('');
const showError = ref(false);

const chartCanvas = ref(null);
const forecastData = ref([]);

const isLocationLoading = ref(false);
const locationTimeout = ref(null);

const assistant = reactive({
  isActive: false,
  response: null,
  userMessage: '',
  chatMessages: []
});

const isHeaderBlur = ref(false);
function handleHeaderScroll() {
  isHeaderBlur.value = window.scrollY > 10;
}
onMounted(() => {
  window.addEventListener('scroll', handleHeaderScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleHeaderScroll);
});

const uvIndex = ref(null);

const hoveredHour = ref(null);

async function fetchUvIndex(lat, lon) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=uv_index,uv_index_clear_sky&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('UV Index API Response:', data);
    
    if (data.hourly && data.hourly.uv_index && data.hourly.time) {
      // Get current time
      const now = new Date();
      
      // Find the closest time slot
      let closestIndex = 0;
      let minDiff = Infinity;
      
      data.hourly.time.forEach((time, index) => {
        const diff = Math.abs(new Date(time) - now);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });
      
      // Get the UV index for the closest time slot
      const uvValue = data.hourly.uv_index[closestIndex];
      console.log('Closest time slot:', data.hourly.time[closestIndex]);
      console.log('UV Index value:', uvValue);
      
      // Only set UV index if it's greater than 0
      if (uvValue > 0) {
        uvIndex.value = parseFloat(uvValue.toFixed(1));
      } else {
        // Find the next non-zero UV index
        const nextIndex = data.hourly.uv_index.findIndex((value, index) => value > 0 && index > closestIndex);
        if (nextIndex !== -1) {
          uvIndex.value = parseFloat(data.hourly.uv_index[nextIndex].toFixed(1));
          console.log('Next available UV Index:', uvIndex.value);
        } else {
          console.log('No UV index data available');
          uvIndex.value = 0;
        }
      }
    } else {
      console.error('UV index data not found in response');
      uvIndex.value = null;
    }
  } catch (error) {
    console.error('Failed to fetch UV index:', error);
    uvIndex.value = null;
  }
}

// Update the watch to ensure UV index is fetched when weather data changes
watch(weather, (val) => {
  if (val && val.coord && val.coord.lat && val.coord.lon) {
    console.log('Fetching UV index for coordinates:', val.coord.lat, val.coord.lon);
    fetchUvIndex(val.coord.lat, val.coord.lon);
  }
}, { immediate: true });

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

async function fetchForCurrentLocation() {
  console.log('Starting fetchForCurrentLocation');
  if (!navigator.geolocation) {
    console.error('Geolocation is not supported by this browser');
    return;
  }

  console.log('Setting initial states...');
  
  isLocationLoading.value = false;
  isCurrentLocation.value = true;
  loading.value = true;
  skeleton.value = true;
  
  // Set a timeout for location detection
 // 10 seconds timeout

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      console.log('Got position:', position.coords);
      clearTimeout(locationTimeout.value);
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        console.log('Fetching weather data for location:', { lat, lon });
        const response = await fetch("http://localhost:5000/weather/current/location", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lat, lon }),
        });

        console.log('Weather API response status:', response.status);
        const data = await response.json();
        console.log('Weather API response data:', data);

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch weather data");
        }

        if (!data || typeof data !== 'object') {
          throw new Error("Invalid response format");
        }

        weather.value = data;
        
        console.log('Getting city name for coordinates...');
        const current_city = await getCityName(lat, lon);
        console.log('Got city name:', current_city);
        const cleanedCity = current_city.replace(/\s+City$/, "").trim();
        if (!cleanedCity) throw new Error("Failed to determine city name");
        
        city.value = cleanedCity;
        weather.value.name = cleanedCity;
        
        // Fetch weather analysis for current location
        await fetchWeatherAnalysis();
        
        console.log('Fetching additional data...');
        await Promise.all([
          fetchForecast(cleanedCity),
          fetchAirQuality(cleanedCity),
          fetchForecastData(cleanedCity),
        ]);
        
        isnotReady.value = false;
        city.value = null;
        
        isCurrentLocation.value = true; // Keep active state
        loading.value = false;
        skeleton.value = false;
        
      } catch (err) {
        console.error('Error fetching weather data:', err);
        isLocationLoading.value = false;
        isdisabled.value = false;
        isCurrentLocation.value = false;
        loading.value = false;
        skeleton.value = false;
        errorMessage.value = err.message || "Failed to fetch weather data. Please try again.";
        showError.value = true;
      }
    },
    (error) => {
      console.error('Geolocation error:', error);
      clearTimeout(locationTimeout.value);
      isLocationLoading.value = false;
      isCurrentLocation.value = false;
      isdisabled.value = false;
      loading.value = false;
      skeleton.value = false;
     
      
    },
    {
      enableHighAccuracy: true,
      timeout: 100000,
      maximumAge: 0
    }
  );
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

  // Validate input
  if (!city.value) return;

  isSearching.value = true;

  try {
    const response = await axios.post('http://localhost:5000/search/city', {
      city: city.value
    });

    if (response.data.length === 0) {
      return;
    }

    cities.value = response.data;
    
  } catch (error) {
    console.error('Search error:', error);
  } finally {
    
    isSearching.value = false;
  }
}

const fetchWeather = async (selectedCity) => {
  const city_name = selectedCity
    ? selectedCity.name
    : city.value.trim();

  // start loading
  loading.value     = true;
  skeleton.value    = true;
  showError.value   = false;
    isSearchActive.value = false;
    
  // fetch the data
    const response = await fetch("http://localhost:5000/weather", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: city_name }),
    });
    const data = await response.json();

  // handle non-200
    if (!response.ok) {
    errorMessage.value = data.message || "Failed to fetch weather data";
    showError.value    = true;
    // fall through to reset UI...
  } else {
    weather.value = data;
    await fetchWeatherAnalysis();
    await fetchForecast(city_name);
    await fetchAirQuality(city_name);
    fetchForecastData(city_name);
  }

  // end loading
  loading.value  = false;
    skeleton.value = false;
    
  // ◀️ **Here's your re‑enable logic**:
  isdisabled.value       = false;
  isCurrentLocation.value = false;
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
  try {
    if (!weather.value || !weather.value.name) {
      throw new Error("No weather data available");
    }

    console.log("Fetching analysis for city:", weather.value.name);
    skeleton.value = true;

    const response = await fetch("http://localhost:5000/weather/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: weather.value.name }),
    });

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    console.log("Weather analysis data:", data);
    
    if (data && data.analytics && data.analytics.summary) {
      weatherSummary.value = data;
      assistant.response = data;
      // Send initial weather message
      await sendInitialWeatherMessage();
      console.log("Updated weather summary:", weatherSummary.value);
    } else {
      throw new Error("Invalid analysis data format");
    }
    
  } catch (error) {
    console.error("Error fetching weather analysis:", error);
    errorMessage.value = "Failed to get weather analysis. Please try again.";
    showError.value = true;
  } finally {
    skeleton.value = false;
  }
};

async function sendInitialWeatherMessage() {
  if (!weather.value || !weather.value.weather || !weather.value.weather[0] || !weather.value.main) {
    console.warn('Weather data not available for initial message');
    return;
  }
  
  const message = `Current weather in ${weather.value.name}: ${Math.floor(weather.value.main.temp)}°C, ${weather.value.weather[0].description}.`;
  
  // Ensure chatMessages is an array and add the message
  assistant.chatMessages = Array.isArray(assistant.chatMessages) ? [...assistant.chatMessages, {
    type: 'assistant',
    text: message
  }] : [{
    type: 'assistant',
    text: message
  }];
}

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
onMounted(() => {
  const cards = document.querySelectorAll('.feature-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate angle for gradient
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      card.style.setProperty('--gradient-angle', `${angle}deg`);
    });
  });
});

const resetToLanding = async () => {
  weather.value = null
  isSearchActive.value = false
  isnotReady.value = true
  isdisabled.value = false
  isCurrentLocation.value = false
}
// Add cleanup for loading timeout
onUnmounted(() => {
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value);
  }
});

const moonPhase = computed(() => getMoonPhase());
const moonPhaseName = computed(() => {
  const phase = moonPhase.value;
  console.log("phase",phase)
  if (phase < 0.03 || phase > 0.97) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
});
</script>
