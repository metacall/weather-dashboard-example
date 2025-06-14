<template>
  <header class="header" :class="{ 'header-blur': isHeaderBlur }">
    <div class="container">
      <a href="/" class="logo" @click.prevent="$emit('reset')">
        <h1 class="nav-title">
          <span class="weather-animated-logo-gradient">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div class="search-box" @click="$emit('search-click')">
          <span class="m-icon search-icon">search</span>
          <span class="search-placeholder">Search city...</span>
        </div>
      </div>
      <div class="header-actions">
        <button 
          id="ai-button" 
          class="btn-primary has-state" 
          @click="$emit('assistant-click')"
          :disabled="isNotReady"
        >
          <span class="m-icon">bolt</span>
          <span class="span">Weather Assistant</span>
        </button>
        <button
          class="btn-primary search-btn"
          @click="$emit('search-click')"
          aria-label="Search"
        >
          <span class="m-icon search-icon">search</span>
        </button>
        <button
          class="btn-primary has-state current-location-btn"
          @click.prevent="$emit('current-location-click')"
          :disabled="isDisabled"
          :class="{ 'current-location-active': isCurrentLocation }"
        >
          <span class="m-icon">my_location</span>
          <span class="span">Current Location</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  isHeaderBlur: {
    type: Boolean,
    default: false
  },
  isNotReady: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  },
  isCurrentLocation: {
    type: Boolean,
    default: false
  }
});

defineEmits([
  'reset',
  'search-click',
  'assistant-click',
  'current-location-click'
]);
</script>

<script>
export default {
  name: 'WeatherNavbar'
};
</script>
