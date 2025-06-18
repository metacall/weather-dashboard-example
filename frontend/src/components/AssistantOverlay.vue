<template>
  <div class="assistant-overlay" :class="{ 'active': isActive }">
    <div class="assistant-popup">
      <div class="assistant-header">
        <h2 class="assistant-title">Weather Assistant</h2>
        <button 
          class="icon-btn close-btn" 
          aria-label="close assistant"
          @click="$emit('close')"
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
            <div v-if="weather && weather.weather && weather.weather[0]" class="message-bubble assistant">
              <div class="message-content">
                Current weather in {{ weather.name }}: {{ Math.floor(weather.main.temp) }}°C, {{ weather.weather[0].description }}.
              </div>
            </div>
            <div v-for="(msg, idx) in chatMessages" :key="idx" :class="['message-bubble', msg.type]">
              <div class="message-content" v-if="msg.type === 'assistant'" v-html="renderMarkdown(msg.text)"></div>
              <div class="message-content" v-else>{{ msg.text }}</div>
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
            <textarea
              ref="inputRef"
              v-model="inputMessage"
              @input="autoResize"
              @keydown="handleInputKeydown"
              class="chat-input"
              placeholder="Type your message..."
              rows="1"
              style="resize: none; overflow: hidden;"
            ></textarea>
            <button 
              class="send-button" 
              @click="sendMessage"
              :disabled="!inputMessage.trim()"
            >
              <span class="m-icon">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted, nextTick, defineEmits } from 'vue';
import { marked } from 'marked';
const props = defineProps({
  isActive: Boolean,
  assistantResponse: Object,
  weather: Object,
  userMessage: String,
  chatMessages: Array,
  getWeatherIcon: Function
});

const chatContainer = ref(null);
const showScrollButton = ref(false);
const isNearBottom = ref(true);
const inputMessage = ref('');
const inputRef = ref(null);
const scrollThreshold = 100; // px from bottom to consider "near bottom"

const emit = defineEmits(['add-message']);

// Auto-focus input when overlay opens
watch(() => props.isActive, (val) => {
  if (val) {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus();
        autoResize();
      }
    });
  }
});

function isUserNearBottom() {
  if (!chatContainer.value) return true;
  const { scrollTop, scrollHeight, clientHeight } = chatContainer.value;
  const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
  return distanceFromBottom < scrollThreshold;
}

function handleScroll() {
  isNearBottom.value = isUserNearBottom();
  showScrollButton.value = !isNearBottom.value;
}

async function smartScrollToBottom() {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    showScrollButton.value = false;
    isNearBottom.value = true;
  }
}

// When a new message is added, auto-scroll if user is near bottom
function observeNewMessages() {
  const observer = new MutationObserver(() => {
    if (isNearBottom.value) {
      smartScrollToBottom();
    }
  });
  if (chatContainer.value) {
    observer.observe(chatContainer.value, { childList: true, subtree: true });
  }
}

onMounted(() => {
  if (chatContainer.value) {
    chatContainer.value.addEventListener('scroll', handleScroll);
    observeNewMessages();
  }
});

// Send on Enter, new line on Shift+Enter
function handleInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

// Markdown support for assistant responses
function renderMarkdown(text) {
  return marked.parse(text || '', { breaks: true });
}

watch(() => props.userMessage, (val) => {
  inputMessage.value = val;
});

async function sendMessage() {
  if (!inputMessage.value.trim()) return;

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
        ${inputMessage.value}
      </div>
    `;
    chatContainer.appendChild(userMessageDiv);

    // Auto-scroll
    if (isNearBottom.value) {
      requestAnimationFrame(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    }

    // Save and clear input
    const messageToSend = inputMessage.value;
    inputMessage.value = '';

    // Create assistant message div
    const assistantMessageDiv = document.createElement('div');
    assistantMessageDiv.classList.add('message-bubble', 'assistant');

    // Call the real API
    const response = await fetch('http://localhost:5000/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userQuestion: messageToSend,
        currentLocation: props.weather?.name || null
      })
    });

    let assistantText = '';
    let formattedMessage = '';
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.message) {
        formattedMessage = renderMarkdown(data.message);
        assistantText = `
          <div class="assistant-response-content typing-effect">
            <p>${formattedMessage}</p>
          </div>
        `;
      } else {
        formattedMessage = renderMarkdown(data.reply || data.response || JSON.stringify(data));
        assistantText = formattedMessage;
      }
    } else {
      formattedMessage = renderMarkdown('Sorry, I could not get a response from the assistant.');
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

    // Auto-scroll after adding the assistant message
    if (isNearBottom.value) {
      requestAnimationFrame(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      });
    }

    // Typing animation
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
          if (isNearBottom.value) {
            requestAnimationFrame(() => {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            });
          }
          const delay = Math.random() * (40 - 20) + 30;
          setTimeout(typeNextWord, delay);
        } else {
          typingContent.classList.remove('typing');
          typingContent.innerHTML = formattedMessage;
          if (isNearBottom.value) {
            requestAnimationFrame(() => {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            });
          }
        }
      };

      typeNextWord();
    }

    // Push to chatMessages
    const newMessage = {
      type: 'assistant',
      text: assistantText
    };
    emit('add-message', newMessage);
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
      if (isNearBottom.value) {
        requestAnimationFrame(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        });
      }
    }
  }
}

// Add autoResize method
function autoResize() {
  const el = inputRef.value;
  if (el) {
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}
</script>

<style scoped>
.assistant-response-content,
.message-content {
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  max-width: 100%;
}

pre,
code {
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
  max-width: 100%;
  box-sizing: border-box;
  display: block;
}

.message-bubble {
  max-width: 80%;
  box-sizing: border-box;
}
</style>

