<template>
  <div class="page">
    <h1>Sliders</h1>
    <p class="page-desc">Range sliders — single, dual-handle, and stepped</p>

    <section class="section">
      <h2>Basic Slider</h2>
      <div class="slider-row">
        <input type="range" min="0" max="100" step="1" v-model.number="basic" data-testid="slider-basic" />
        <span class="value-badge" data-testid="slider-basic-value">{{ basic }}</span>
      </div>
    </section>

    <section class="section">
      <h2>Steps (step=10)</h2>
      <div class="slider-row">
        <input type="range" min="0" max="100" step="10" v-model.number="steps" data-testid="slider-steps" />
        <span class="value-badge" data-testid="slider-steps-value">{{ steps }}</span>
      </div>
    </section>

    <section class="section">
      <h2>Disabled</h2>
      <div class="slider-row">
        <input type="range" min="0" max="100" value="40" disabled data-testid="slider-disabled" />
        <span class="value-badge">40</span>
      </div>
    </section>

    <section class="section">
      <h2>Dual-Handle Range</h2>
      <div class="slider-stack">
        <div class="slider-row">
          <span class="range-label">Min</span>
          <input type="range" min="0" max="100" step="1" v-model.number="rangeMin" data-testid="slider-range-min" @input="clampMin" />
        </div>
        <div class="slider-row">
          <span class="range-label">Max</span>
          <input type="range" min="0" max="100" step="1" v-model.number="rangeMax" data-testid="slider-range-max" @input="clampMax" />
        </div>
        <span class="value-badge" data-testid="slider-range-value">{{ rangeMin }} – {{ rangeMax }}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { basic: 50, steps: 30, rangeMin: 20, rangeMax: 70 };
  },
  methods: {
    clampMin() { if (this.rangeMin > this.rangeMax) this.rangeMin = this.rangeMax; },
    clampMax() { if (this.rangeMax < this.rangeMin) this.rangeMax = this.rangeMin; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.slider-row { display: flex; align-items: center; gap: 1rem; }
input[type="range"] { flex: 1; accent-color: var(--accent); cursor: pointer; height: 4px; }
input[type="range"]:disabled { opacity: 0.5; cursor: not-allowed; }
.value-badge {
  min-width: 64px; text-align: center; padding: 0.25rem 0.5rem;
  background: var(--accent-light); color: var(--accent); border-radius: var(--radius);
  font-size: 0.875rem; font-weight: 600;
}
.slider-stack { display: flex; flex-direction: column; gap: 0.75rem; }
.range-label { min-width: 32px; font-size: 0.75rem; color: var(--text-muted); }
</style>
