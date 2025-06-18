<template>
  <div class="search-overlay" :class="{ 'active': isSearchActive }">
    <div class="search-popup">
      <div class="search-header">
        <h2 class="search-title">Search Location</h2>
        <button 
          class="icon-btn close-btn" 
          aria-label="close search"
          @click="closeSearch"
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
            @input="handleSearchInput"
            class="search-field" 
            :class="{ 'searching': isSearching }"  
            autocomplete="off" 
            data-search-field 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            ref="searchInput"
          >
          <span class="m-icon search-icon">search</span>
        </div>
        <div 
          class="search-results" 
          v-if="cities.length > 0 || isSearching || !searchQuery || (searchQuery && !isSearching && cities.length === 0)"
        >   
          <div v-if="isSearching" class="loading-state">
            <div class="loading-circle"></div>
            <p>Searching...</p>
          </div>
          <div v-else-if="!searchQuery" class="no-results">
            <span class="m-icon no-results-icon">search</span>
            <h3 class="no-results-title">Start Searching</h3>
            <p class="no-results-message">Enter a city name to find weather information</p>
          </div>
          <div v-else-if="searchQuery && !isSearching && cities.length === 0" class="no-results">
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
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import _debounce from 'lodash.debounce';
import axios from 'axios';

defineProps({
  isSearchActive: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'city-selected']);

const searchQuery = ref("");
const cities = ref([]);
const isSearching = ref(false);
const searchInput = ref(null);

const handleSearchInput = _debounce(() => {
  searchCities();
}, 300);

async function searchCities() {
  cities.value = [];
  if (!searchQuery.value) return;
  isSearching.value = true;

  try {
    const response = await axios.post('http://localhost:5000/search/city', {
      city: searchQuery.value
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

function handleSearch() {
  if (searchQuery.value.trim()) {
    searchCities();
  }
}

function selectCity(city) {
  emit('city-selected', {
    name: city.name,
    lat: city.lat,
    lon: city.lon
  });
  cities.value = [];
  searchQuery.value = '';
}

function closeSearch() {
  emit('close');
  searchQuery.value = '';
  cities.value = [];
}
</script>

