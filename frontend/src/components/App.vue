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
    
    <header class="header" :class="{ 'header-blur': isHeaderBlur }">
      <div class="container">
        <a href="/" class="logo" @click.prevent="resetToLanding">
          <h1 class="nav-title">
            <span class="weather-animated-logo-gradient">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- All white sun and cloud -->
                <g class="sun-group">
                  <circle cx="20" cy="20" r="12" fill="#fff"/>
                  <ellipse cx="20" cy="34" rx="10" ry="2.5" fill="#fff" opacity="0.18"/>
                </g>
                <g class="gradient-cloud-group">
                  <ellipse cx="26" cy="26" rx="8" ry="5" fill="#fff" fill-opacity="0.92" stroke="#bdbdbd" stroke-width="2"/>
                  <ellipse cx="32" cy="28" rx="5" ry="3" fill="#fff" fill-opacity="0.7" stroke="#bdbdbd" stroke-width="2"/>
                </g>
              </svg>
            </span>
            Climatic
          </h1>
        </a>
        <div class="search-container">
          <div class="search-box" @click="isSearchActive = true">
            <span class="m-icon search-icon">search</span>
            <span class="search-placeholder">Search city...</span>
          </div>
        </div>
        <div class="header-actions">
          <button 
            id="ai-button" 
            class="btn-primary has-state" 
            @click="() => { 
              isAssistantActive = true; 
              fetchWeatherAnalysis();
              chatMessages = []; // Clear previous messages
            }"  
            data-current-location-btn 
            :disabled="isnotReady"
          >
            <span class="m-icon">bolt</span>
            <span class="span">Weather Assistant</span>
          </button>
          <!-- Mobile search button (≤400px) -->
          <button
            class="btn-primary search-btn"
            @click="isSearchActive = true"
            aria-label="Search"
          >
            <span class="m-icon search-icon">search</span>
          </button>
          <button
            class="btn-primary has-state current-location-btn"
            @click.prevent="fetchForCurrentLocation" 
            :disabled="isdisabled"
            :class="{ 'current-location-active': isCurrentLocation }"
          >
            <span class="m-icon">my_location</span>
            <span class="span">Current Location</span>
          </button>
        
        </div>
      </div>
    </header>
   
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
                  <svg :width="64" :height="64" viewBox="0 0 64 64">
                    <defs>
                      <radialGradient id="moonGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#fffbe6"/>
                        <stop offset="100%" stop-color="#bdbdbd"/>
                      </radialGradient>
                    </defs>
                    <!-- Full moon -->
                    <circle cx="32" cy="32" r="24" fill="url(#moonGradient)" />
                    <!-- Shadow (phase) -->
                    <ellipse
                      v-if="moonPhaseEllipse.rx > 0"
                      :cx="moonPhaseEllipse.cx"
                      cy="32"
                      :rx="moonPhaseEllipse.rx"
                      ry="24"
                      fill="#131214"
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
                        <p class="uv-recommendation">{{ getUvIndexRecommendation(uvIndex) }}</p>
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
          <!-- Weather News Card -->
          <section v-if="isLoadingNews || newsHeadlines.length > 0" class="section weather-news" aria-label="weather news">
            <div class="card card-lg weather-news-card">
              <h2 class="title-2 card-title">Weather News
                 <button class="refresh-btn" :disabled="isLoadingNews" @click="fetchNews" title="Refresh news">
                   <span class="m-icon">refresh</span>
                 </button>
               </h2>
             <ul class="news-list">
               <li v-if="isLoadingNews" class="news-item">
                 <span class="m-icon" style="color:#2196f3;">autorenew</span>
                 <div class="news-content">
                   <p class="title-3">Loading news...</p>
                 </div>
               </li>
               <li v-else v-for="item in newsHeadlines" :key="item.url" class="news-item">
                 <span class="m-icon" style="color:#2196f3;">article</span>
                 <div class="news-content">
                   <p class="title-3">{{ item.title }}</p>
                   <p class="label-2">{{ item.source.name }}</p>
                   <a :href="item.url" class="read-more" target="_blank">Read More</a>
                 </div>
               </li>
             </ul>
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

    <div class="assistant-overlay" :class="{ 'active': isAssistantActive }">
      <div class="assistant-popup">
        <div class="assistant-header">
          <h2 class="assistant-title">Weather Assistant</h2>
          <button 
            class="icon-btn close-btn" 
            aria-label="close assistant"
            @click="isAssistantActive = false"
          >
            <span class="m-icon">close</span>
          </button>
        </div>
        <div class="assistant-content">
          <div v-if="!assistantResponse" class="assistant-loading">
            <div class="loading-circle"></div>
            <p>Analyzing weather data...</p>
          </div>
          <div v-else class="assistant-response">
            <!-- Welcome Card -->
            <div class="welcome-card">
              <div class="welcome-header">
                <h3>Hello! Here's your weather update for today:</h3>
              </div>
              <div class="weather-display" v-if="weather && weather.weather && weather.weather[0]">
                <img 
                  :src="getWeatherIcon(weather.weather[0].icon)" 
                  alt="Weather Icon" 
                  class="weather-icon-large" 
                  width="80" 
                  height="80"
                />
                <div class="temperature-display">
                  {{ Math.floor(weather.main.temp) }}°C
                </div>
                <p class="weather-description">{{ weather.weather[0].description }}</p>
              </div>
              <div class="weather-stats" v-if="weather && weather.main">
                <div class="stat-card">
                  <span class="m-icon">arrow_upward</span>
                  <p class="stat-value">{{ Math.floor(weather.main.temp_max) }}°C</p>
                  <p class="stat-label">High</p>
                </div>
                <div class="stat-card">
                  <span class="m-icon">arrow_downward</span>
                  <p class="stat-value">{{ Math.floor(weather.main.temp_min) }}°C</p>
                  <p class="stat-label">Low</p>
                </div>
                <div class="stat-card">
                  <span class="m-icon">air</span>
                  <p class="stat-value">{{ weather.wind.speed }} m/s</p>
                  <p class="stat-label">Wind</p>
                </div>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="chat-messages" ref="chatContainer" @scroll="handleScroll">
              <div class="message-bubble assistant">
                <div class="message-content">
                  Hello! I'm your weather assistant. How can I help you today?
                </div>
              </div>
            </div>

            <!-- Scroll to Bottom Button -->
            <button 
              v-if="showScrollButton" 
              class="scroll-to-bottom-btn" 
              @click="smartScrollToBottom"
              aria-label="Scroll to bottom"
            >
              <span class="m-icon">arrow_downward</span>
            </button>

            <!-- Chat Input -->
            <div class="chat-input-container">
              <input 
                type="text" 
                v-model="userMessage" 
                placeholder="Ask about the weather..." 
                @keyup.enter="sendMessage"
                class="chat-input"
              />
              <button 
                class="send-button" 
                @click="sendMessage"
                :disabled="!userMessage.trim()"
              >
                <span class="m-icon">send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWeatherApp } from '@/weather.js';
import { ref, onMounted, defineEmits, onUnmounted, watch, nextTick, computed } from "vue";
import _debounce from 'lodash.debounce';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const emit = defineEmits(['city-selected']);

Chart.register(...registerables);

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

const isAssistantActive = ref(false);
const assistantResponse = ref(null);

const userMessage = ref('');
const chatMessages = ref([]);

const chatContainer = ref(null);
const showScrollButton = ref(false);
const isNearBottom = ref(true);
const scrollThreshold = 100; // pixels from bottom to consider "near bottom"

// Header blur on scroll
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

// Reset chat messages when assistant is opened
watch(isAssistantActive, (newValue) => {
  if (newValue) {
    chatMessages.value = []; // Reset to empty array
  }
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

async function getCityName(lat, lon) {
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
      assistantResponse.value = data;
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

// Add this function
async function sendInitialWeatherMessage() {
  if (!weather.value || !weather.value.weather || !weather.value.weather[0] || !weather.value.main) {
    console.warn('Weather data not available for initial message');
    return;
  }
  
  const message = `Current weather in ${weather.value.name}: ${Math.floor(weather.value.main.temp)}°C, ${weather.value.weather[0].description}.`;
  
  // Ensure chatMessages is an array and add the message
  chatMessages.value = Array.isArray(chatMessages.value) ? [...chatMessages.value, {
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

const resetToLanding = () => {
  weather.value = null
  isSearchActive.value = false
}

// Add cleanup for loading timeout
onUnmounted(() => {
  if (loadingTimeout.value) {
    clearTimeout(loadingTimeout.value);
  }
});

async function smartScrollToBottom() {
  if (!chatContainer.value) {
    console.log("gg")
  } 
  
  requestAnimationFrame(() => {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    console.log("zingy")

    showScrollButton.value = false;
    isNearBottom.value = true;
  });
}

async function sendMessage() {
  if (!userMessage.value.trim()) return;

  try {
    // Get the chat container
    const chatContainer = document.querySelector('.chat-messages');
    if (!chatContainer) return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message-bubble', 'user');
    userMessageDiv.innerHTML = `
      <div class="message-content user-message" style="
        padding: 1rem 1.5rem;
        border-radius: 12px;
        background: rgba(79, 172, 254, 0.2);
        border: 1px solid rgba(79, 172, 254, 0.3);
        color: #fff;
        backdrop-filter: blur(5px);
        max-width: 80%;
        word-wrap: break-word;
        margin-left: auto;
        margin-right: 1rem;
      ">
        ${userMessage.value}
      </div>
    `;
    chatContainer.appendChild(userMessageDiv);
    
    // Check if we should auto-scroll
    if (isNearBottom.value) {
      
      requestAnimationFrame(() => {
        
        console.log("Before scroll:", chatContainer.scrollTop);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        console.log("After scroll:", chatContainer.scrollTop);
      });
    }

    // Save and clear input
    const messageToSend = userMessage.value;
    userMessage.value = '';

    // Create assistant message div
    const assistantMessageDiv = document.createElement('div');
    assistantMessageDiv.classList.add('message-bubble', 'assistant');

    // Call the real API
    const response = await fetch('http://localhost:5000/gemini-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userQuestion: messageToSend,
        currentLocation: weather.value?.name || null
      })
    });

    let assistantText = '';
    let formattedMessage = ''; // Declare formattedMessage at the top level of the function
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.message) {
        // Convert markdown to HTML and format the response
        formattedMessage = data.message
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n\*/g, '</p><p class="bullet">•')
          .trim();

        assistantText = `
          <div class="assistant-response-content typing-effect">
            <p>${formattedMessage}</p>
          </div>
        `;
      } else {
        formattedMessage = data.reply || data.response || JSON.stringify(data);
        assistantText = formattedMessage;
      }
    } else {
      formattedMessage = 'Sorry, I could not get a response from the assistant.';
      assistantText = formattedMessage;
    }

    // Add assistant response
    assistantMessageDiv.innerHTML = `
      <div class="message-content" style="
        padding: 1.5rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        backdrop-filter: blur(5px);
        max-width: 100%;
        word-wrap: break-word;
      ">
        ${assistantText}
      </div>
    `;
    chatContainer.appendChild(assistantMessageDiv);
    
    // Check if we should auto-scroll after adding the assistant message
    if (isNearBottom.value) {
      requestAnimationFrame(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    }

    // Add typing animation
    const typingContent = assistantMessageDiv.querySelector('.typing-effect');
    if (typingContent) {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = assistantText;
      const textContent = tempElement.textContent;
      const words = textContent.split(' ');
      typingContent.textContent = '';
      typingContent.classList.add('typing');
      
      let wordIndex = 0;
      let currentText = '';

      const typeNextWord = () => {
        if (wordIndex < words.length) {
          currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
          typingContent.textContent = currentText;
          wordIndex++;
          
          // Check if we should auto-scroll during typing
          if (isNearBottom.value) {
            requestAnimationFrame(() => {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            });
          }
          
          // Random delay between words for natural feel
          const delay = Math.random() * (80 - 40) + 40; // Between 40ms and 80ms
          setTimeout(typeNextWord, delay);
        } else {
          typingContent.classList.remove('typing');
          // Restore HTML formatting after typing is complete
          typingContent.innerHTML = formattedMessage;
          
          // Final scroll check after typing is complete
          if (isNearBottom.value) {
            requestAnimationFrame(() => {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            });
          }
        }
      };

      typeNextWord();
    }
  } catch (error) {
    console.error('Error in sendMessage:', error);
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('message-bubble', 'assistant');
    errorDiv.innerHTML = `
      <div class="message-content" style="
        padding: 1rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #fff;
        backdrop-filter: blur(5px);
        max-width: 100%;
        word-wrap: break-word;
      ">
        An error occurred. Please try again later.
      </div>
    `;
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.appendChild(errorDiv);
      
      // Check if we should auto-scroll after error message
      if (isNearBottom.value) {
        requestAnimationFrame(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        });
      }
    }
  }
}

// Initialize chat with welcome message

// Function to check if user is near the bottom of the chat
function isUserNearBottom() {
  if (!chatContainer.value) return true;
  
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
  const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
  
  return distanceFromBottom < scrollThreshold;
}

// Handle scroll events to show/hide the scroll button
function handleScroll() {
  isNearBottom.value = isUserNearBottom();
  showScrollButton.value = !isNearBottom.value;
}

// Watch for changes in chat messages and auto-scroll if near bottom
watch(chatMessages, () => {
  if (isNearBottom.value) {
    nextTick(() => {
      requestAnimationFrame(() => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      });
    });
  }
});

function getWindDirection(degrees) {
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

function calculateDewPoint(tempC, humidity) {
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * tempC) / (b + tempC)) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);
  return dewPoint;
}

// Moon phase calculation
function getMoonPhase(date = new Date()) {
  // Simple moon phase calculation (0=new, 0.5=full)
  const lp = 2551443; // lunar period in seconds
  const now = date.getTime() / 1000;
  const new_moon = new Date(2001, 0, 24, 13, 35, 0).getTime() / 1000;
  const phase = ((now - new_moon) % lp) / lp;
  return phase;
}

const moonPhase = computed(() => getMoonPhase());

const moonPhaseName = computed(() => {
  const phase = moonPhase.value;
  if (phase < 0.03 || phase > 0.97) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
});

// Realistic moon shadow ellipse calculation
const moonPhaseEllipse = computed(() => {
  // 0 = new, 0.5 = full, 1 = new
  const phase = moonPhase.value;
  // For new moon, shadow covers all; for full moon, shadow is gone
  if (phase < 0.03 || phase > 0.97) {
    return { cx: 32, rx: 24 }; // fully shadowed
  }
  if (phase < 0.5) {
    // Waxing: shadow on left, shrinks as phase increases
    return {
      cx: 32 - 24 * (1 - 2 * phase),
      rx: 24 * (1 - 2 * phase)
    };
  } else {
    // Waning: shadow on right, grows as phase increases
    return {
      cx: 32 + 24 * (2 * phase - 1),
      rx: 24 * (2 * phase - 1)
    };
  }
});

// Weather News API integration
const newsHeadlines = ref([]);
const isLoadingNews = ref(false);
const newsError = ref('');

async function fetchNews() {
  isLoadingNews.value = true;
  newsError.value = '';
  try {
    // Replace YOUR_API_KEY with your NewsAPI.org API key
    const apiKey = 'YOUR_API_KEY';
    const url = `https://newsapi.org/v2/everything?q=weather%20OR%20storm%20OR%20rain%20OR%20heatwave%20OR%20flood%20OR%20snow&language=en&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch news');
    const data = await response.json();
    if (data.status !== 'ok') throw new Error(data.message || 'Failed to fetch news');
    newsHeadlines.value = data.articles;
  } catch (err) {
    newsError.value = err.message || 'Failed to fetch news.';
    newsHeadlines.value = [];
  } finally {
    isLoadingNews.value = false;
  }
}

onMounted(fetchNews);

function getUvIndexClass(value) {
  if (value === null) return 'uv-low';
  if (value <= 2) return 'uv-low';
  if (value <= 5) return 'uv-moderate';
  if (value <= 7) return 'uv-high';
  if (value <= 10) return 'uv-very-high';
  return 'uv-extreme';
}

function getUvIndexLevel(value) {
  if (value === null) return 'N/A';
  if (value <= 2) return 'Low';
  if (value <= 5) return 'Moderate';
  if (value <= 7) return 'High';
  if (value <= 10) return 'Very High';
  return 'Extreme';
}

function getUvIndexRecommendation(value) {
  if (value === null) return 'UV data unavailable';
  if (value <= 2) return 'No protection needed';
  if (value <= 5) return 'Wear sunscreen and seek shade during midday';
  if (value <= 7) return 'Reduce time in the sun between 10 a.m. and 4 p.m.';
  if (value <= 10) return 'Minimize sun exposure during midday hours';
  return 'Avoid sun exposure during midday hours';
}

</script>

<style>
.wind-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.wind-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.wind-direction {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  
  border-radius: 50%;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.wind-icon {
  font-size: 3.2rem;
  color: var(--on-surface);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.wind-direction:hover .wind-icon {
  transform: scale(1.1);
  color: var(--white);
}

.wind-info .title-1 {
  font-size: 2.4rem;
  font-weight: var(--weight-semiBold);
  color: var(--on-surface);
}

.wind-info .label-1 {
  color: white;
  font-size: 1.7rem;
  margin-top: 2px;
}

.wind-info .label-2 {
  color: var(--on-surface-variant-2);
  font-size: 1.4rem;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .wind-wrapper {
    padding: 8px 0;
  }
  
  .wind-info .title-1 {
    font-size: 2rem;
  }
  
  .wind-direction {
    padding: 8px;
  }
  
  .wind-icon {
    font-size: 2.8rem;
  }
}

.uv-index, .precipitation-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.uv-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.uv-fill {
  height: 100%;
  transition: width 0.3s ease, background 0.3s ease;
}

@media (max-width: 768px) {
  .highlight-list {
    grid-template-columns: 1fr;
  }
  
  .uv-bar {
    height: 6px;
  }
}

@media (min-width: 1200px) {
  .highlight-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .card-sm {
    padding: 16px;
  }
}

.highlight-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  width: 100%;
}

.card-sm {
  padding: 16px;
  min-height: 120px;
}

.wrapper {
  display: flex;
  align-items: center;
  column-gap: 8px;
  padding-top: 6px;
}

.title-3 {
  margin-bottom: 4px;
}

.additional-highlights {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--outline);
  
}

.additional-highlights .title-2 {
  margin-bottom: 16px;
}

.highlight-grid {
  display: flex;
  grid-template-columns: repeat(2, 1fr); /* Change from 1fr to repeat(2, 1fr) */
  gap: 12px;
  width: 100%;
  
  grid-auto-flow: row; 
}

.highlight-grid .card-sm {
  padding: 16px;
  min-height: 120px;
}

.highlight-grid .wrapper {
  padding-top: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.highlight-grid .uv-index,
.highlight-grid .precipitation-info {
  flex: 1;
}

.highlight-grid > .card {
  flex: 1 1 0;
  min-width: 0;  /* prevents overflow */
}
.highlight-grid .m-icon {
  font-size: 3.2rem;
}

/* Override any conflicting media queries */
.additional-weather .highlight-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Remove overrides that break grid layout */
/* .additional-weather .highlight-list > .card { width: 100%; } */
/* .additional-weather .highlight-list > .card:nth-child(4) { grid-column: span 1; justify-self: start; } */

.additional-weather .highlight-list > .card {
  grid-column: span 1 !important;
}

.tooltip {
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(40, 40, 40, 0.95);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 1.2rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.2s;
}

.precip-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 1.2rem;
  margin-top: 2px;
  position: relative;
}

.precip-icon {
  font-size: 1.3em;
  color: #2196f3;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.precip-value {
  font-weight: 500;
  color: #2196f3;
}

.tooltip {
  position: absolute;
  bottom: 140%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(40, 40, 40, 0.95);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 1.1rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.2s;
}

.hourly-main-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 4px;
}

.hourly-temp {
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
}

.hourly-precip {
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.hourly-precip .precip-icon {
  font-size: 1.3em;
  margin-right: 4px;
}

.tooltip {
  position: absolute;
  bottom: 140%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(40, 40, 40, 0.95);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 1.1rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  z-index: 10;
  opacity: 1;
  pointer-events: none;
  transition: opacity 0.2s;
}

.weather-news-card .news-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.weather-news-card .news-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  padding: 12px 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.weather-news-card .news-item:hover {
  background: rgba(255,255,255,0.07);
}

.weather-news-card .news-item.expanded {
  background: rgba(33,150,243,0.08);
}

.weather-news-card .m-icon {
  font-size: 2.4rem;
  margin-top: 2px;
}

.weather-news-card .news-content {
  flex: 1;
}

.weather-news-card .title-3 {
  margin: 0 0 2px 0;
  font-size: 1.3rem;
  font-weight: 700;
}

.weather-news-card .label-2 {
  margin: 0;
  color: #bdbdbd;
  font-size: 1.1rem;
}

.weather-news-card .news-details {
  margin-top: 8px;
  background: rgba(0,0,0,0.08);
  border-radius: 6px;
  padding: 8px 10px;
}

.weather-news-card .read-more {
  display: inline-block;
  margin-top: 6px;
  color: #2196f3;
  font-size: 1.1rem;
  text-decoration: underline;
  transition: color 0.2s;
}

.weather-news-card .read-more:hover {
  color: #1565c0;
}

.weather-news-card .expand-icon {
  font-size: 2rem;
  margin-left: 8px;
  align-self: flex-start;
  color: #bdbdbd;
}

.weather-news-card .refresh-btn {
  background: none;
  border: none;
  color: #2196f3;
  font-size: 1.8rem;
  margin-left: 8px;
  cursor: pointer;
  vertical-align: middle;
  transition: color 0.2s;
}

.weather-news-card .refresh-btn:disabled {
  color: #bdbdbd;
  cursor: not-allowed;
}

.weather-news-card .fade-enter-active, .weather-news-card .fade-leave-active {
  transition: opacity 0.3s;
}

.weather-news-card .fade-enter-from, .weather-news-card .fade-leave-to {
  opacity: 0;
}

.weather-animated-logo-gradient {
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5em;
  width: 40px;
  height: 40px;
}
.weather-animated-logo-gradient .sun-group {
  animation: sun-float 4s ease-in-out infinite;
}
@keyframes sun-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
.weather-animated-logo-gradient .gradient-cloud-group {
  animation: gradient-cloud-slide 3.5s ease-in-out infinite;
}
@keyframes gradient-cloud-slide {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(5px) translateY(-2px); }
}

.uv-info {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}

.uv-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
}

.uv-low {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.uv-moderate {
  background: rgba(255, 235, 59, 0.2);
  color: #FFC107;
}

.uv-high {
  background: rgba(255, 152, 0, 0.2);
  color: #FF9800;
}

.uv-very-high {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

.uv-extreme {
  background: rgba(156, 39, 176, 0.2);
  color: #9C27B0;
}

.uv-recommendation {
  font-size: 1.2rem;
  color: var(--on-surface-variant);
  margin-top: 8px;
  line-height: 1.4;
}



.feature-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 28px;
  padding: 36px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  width: 100%;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.15);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover::after {
  opacity: 1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, var(--gradient-start), var(--gradient-end));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card:hover .feature-icon::before {
  opacity: 0.2;
}

.feature-icon .m-icon {
  font-size: 28px;
  color: #fff;
  position: relative;
  z-index: 1;
}

.feature-card h3 {
  font-size: 2.4rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.feature-card p {
  font-size: 1.5rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
}

.feature-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-item:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
}

.stat-item .m-icon {
  font-size: 28px;
  color: #fff;
  margin-bottom: 12px;
  transition: transform 0.4s ease;
}

.stat-item:hover .m-icon {
  transform: scale(1.1);
}

.stat-item span:not(.m-icon) {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

@media (max-width: 768px) {
  
  
  .feature-card {
    padding: 28px;
    border-radius: 24px;
  }
  
  .feature-card h3 {
    font-size: 2rem;
  }
  
  .feature-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .stat-item {
    padding: 16px;
  }
}

@media (max-width: 600px) {
  
  
  .feature-card {
    padding: 24px;
  }
  
  .feature-stats {
    grid-template-columns: 1fr;
  }
  
  .stat-item {
    padding: 20px;
  }
  
  .feature-icon {
    width: 48px;
    height: 48px;
  }
  
  .feature-icon .m-icon {
    font-size: 24px;
  }
}

.hero-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
}
.hero-text {
  flex: 1;
  min-width: 250px;
}
.hero-lottie {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 300px;
  width: 500px;
  
}

.sun-rays {
  transform-origin: 60px 60px;
  animation: sun-rays-rotate 4s linear infinite;
}
@keyframes sun-rays-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.hero-animated-sun {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}
.sun-rays {
  transform-origin: 60px 60px;
  animation: sun-rays-rotate 4s linear infinite;
}
@keyframes sun-rays-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.hero-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
}
.hero-animated-weather-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 180px;
  width: 180px;
  height: 180px;
  margin-left: 32px;
}
.weather-sun-rays {
  transform-origin: 60px 60px;
  animation: sun-rays-rotate 4s linear infinite;
}
@keyframes sun-rays-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.weather-raindrops ellipse {
  animation: rain-drop 1.2s infinite alternate;
}
.weather-raindrops ellipse:nth-child(2) {
  animation-delay: 0.4s;
}
.weather-raindrops ellipse:nth-child(3) {
  animation-delay: 0.8s;
}
@keyframes rain-drop {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0.3; transform: translateY(8px); }
}
@media (max-width: 900px) {
  .hero-flex {
    flex-direction: column;
    gap: 24px;
  }
  .hero-animated-weather-icon {
    min-width: 120px;
    min-height: 120px;
    width: 120px;
    height: 120px;
    margin-left: 0;
    margin-top: 16px;
  }
}

.animated-sun-rays {
  transform-origin: 90px 100px;
  animation: sun-rays-spin 6s linear infinite;
}
@keyframes sun-rays-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.animated-cloud {
  animation: cloud-float 3s ease-in-out infinite alternate;
}
@keyframes cloud-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-10px); }
}
.hero-animated-weather-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 180px;
  min-height: 180px;
  width: 180px;
  height: 180px;
  margin-left: 32px;
}
@media (max-width: 900px) {
  .hero-animated-weather-icon {
    min-width: 120px;
    min-height: 120px;
    width: 120px;
    height: 120px;
    margin-left: 0;
    margin-top: 16px;
  }
}
</style>

<!-- HERO SECTION START -->
<section class="main-hero">
  <div class="hero-flex">
    <div class="hero-text">
      <h1 class="main-title">
        <span class="text-normal">Advanced</span>
        <span class="text-gradient">Weather</span>
        <span class="text-normal">Intelligence</span>
      </h1>
    </div>
    <div class="hero-animated-weather-icon">
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Animated Sun Rays -->
        <g class="animated-sun-rays">
          <line x1="130" y1="60" x2="150" y2="40" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="90" y1="30" x2="90" y2="10" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="50" y1="60" x2="30" y2="40" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="130" y1="100" x2="150" y2="100" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="50" y1="100" x2="30" y2="100" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="130" y1="140" x2="150" y2="160" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="90" y1="150" x2="90" y2="170" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
          <line x1="50" y1="140" x2="30" y2="160" stroke="#FFC107" stroke-width="5" stroke-linecap="round"/>
        </g>
        <!-- Sun -->
        <circle cx="90" cy="100" r="40" fill="#FFD600" stroke="#FFC107" stroke-width="5"/>
        <!-- Animated Cloud -->
        <g class="animated-cloud">
          <ellipse cx="110" cy="140" rx="38" ry="20" fill="#fff" stroke="#90caf9" stroke-width="4"/>
          <ellipse cx="70" cy="150" rx="28" ry="14" fill="#E3F2FD" stroke="#90caf9" stroke-width="4"/>
        </g>
      </svg>
    </div>
  </div>
  <p class="hero-subtitle" style="text-align:center; margin-top: 24px;">Experience the future of weather forecasting with AI-powered insights</p>
</section>
<!-- HERO SECTION END -->

<style>
.hero-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 48px;
}
.hero-text {
  flex: 1;
  min-width: 250px;
}
.hero-lottie {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10px;
  min-height: 10px;
  width: 300px;
  height: 200px;
}
@media (max-width: 900px) {
  .hero-flex {
    flex-direction: column;
    gap: 24px;
  }
  .hero-lottie {
    min-width: 200px;
    min-height: 200px;
    width: 90vw;
    height: 50vw;
    max-width: 95vw;
    margin-left: 0;
    margin-top: 16px;
  }
}
@media (max-width: 1024px) {
  .hero-flex {
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .hero-flex {
    flex-direction: column;
    gap: 24px;
  }
}



@media (max-width: 600px) {
  
  .search-container {
    display: none !important;
  }
  .search-btn {
    display: flex !important;
    min-width: 40px;
    height: 40px;
    margin-right: 8px;
    /* Use only default .btn-primary styles for background, border, border-radius, and padding */
  }
  .search-btn .search-icon {
    font-size: 1.7rem;
    color: #fff;
  }
}
@media (min-width: 600px) {
  .search-btn {
    display: none !important;
  }
}
</style>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: #0A0A0A; /* Or use your app's gradient if preferred */
   
}
</style>




