<template>
  <div class="page">
    <h1>Slider Indicator</h1>
    <p class="page-desc">Range slider with a floating value bubble that follows the thumb</p>

    <!-- Basic Value Indicator -->
    <div class="slider-section">
      <h2>Basic Value Indicator</h2>
      <div class="slider-wrapper">
        <div
          class="indicator-bubble"
          :style="{ left: bubbleLeft(value, 0, 100) }"
          data-testid="slider-indicator-bubble"
        >{{ value }}</div>
        <input
          type="range"
          class="indicator-range"
          data-testid="slider-indicator"
          min="0"
          max="100"
          step="1"
          v-model.number="value"
        />
        <div class="range-labels"><span>0</span><span>100</span></div>
      </div>
      <p class="value-text">Value: <span data-testid="slider-indicator-value">{{ value }}</span></p>
    </div>

    <!-- Temperature Picker -->
    <div class="slider-section">
      <h2>Temperature Picker</h2>
      <div class="slider-wrapper">
        <div
          class="indicator-bubble"
          :class="tempClass"
          :style="{ left: bubbleLeft(temp, 0, 40) }"
          data-testid="slider-temp-bubble"
        >{{ temp }}°</div>
        <input
          type="range"
          class="indicator-range"
          data-testid="slider-temp"
          min="0"
          max="40"
          step="1"
          v-model.number="temp"
        />
        <div class="range-labels"><span>0°C</span><span>40°C</span></div>
      </div>
      <p class="value-text">Temperature: <span data-testid="slider-temp-value">{{ temp }}</span></p>
    </div>

    <!-- Volume Control -->
    <div class="slider-section">
      <h2>Volume Control</h2>
      <div class="slider-wrapper">
        <div
          class="indicator-bubble"
          :style="{ left: bubbleLeft(volume, 0, 100) }"
          data-testid="slider-volume-bubble"
        >{{ volume }}</div>
        <input
          type="range"
          class="indicator-range"
          data-testid="slider-volume"
          min="0"
          max="100"
          step="5"
          v-model.number="volume"
        />
        <div class="range-labels"><span>0</span><span>100</span></div>
      </div>
      <p class="value-text">Volume: <span data-testid="slider-volume-value">{{ volume }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderIndicatorPage",
  data() {
    return { value: 50, temp: 20, volume: 60 };
  },
  computed: {
    tempClass() {
      if (this.temp <= 10) return "bubble-cold";
      if (this.temp >= 30) return "bubble-hot";
      return "bubble-warm";
    },
  },
  methods: {
    bubbleLeft(val, min, max) {
      const pct = (val - min) / (max - min);
      return `calc(${pct * 100}% + ${8 - pct * 16}px)`;
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.page-desc {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.slider-section {
  background: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.slider-section h2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.slider-wrapper {
  position: relative;
  padding-top: 2rem;
}

.indicator-bubble {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  transition: left 0.05s linear;
}

.indicator-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--accent);
}

.bubble-cold {
  background: #3b82f6;
}

.bubble-cold::after {
  border-top-color: #3b82f6;
}

.bubble-hot {
  background: #ef4444;
}

.bubble-hot::after {
  border-top-color: #ef4444;
}

.bubble-warm {
  background: #f59e0b;
}

.bubble-warm::after {
  border-top-color: #f59e0b;
}

.indicator-range {
  width: 100%;
  accent-color: var(--accent);
  cursor: pointer;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.value-text {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.value-text span {
  font-weight: 600;
  color: var(--text-primary);
}
</style>
