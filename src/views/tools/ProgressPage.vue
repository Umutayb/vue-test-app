<template>
  <div class="page">
    <h1>Progress</h1>
    <p class="page-desc">Determinate and animated progress indicators</p>

    <section class="section">
      <h2>Static Progress Bars</h2>
      <div v-for="(pct, i) in staticBars" :key="i" class="progress-group">
        <div class="progress-track" :data-testid="`progress-bar-${i + 1}`">
          <div class="progress-fill" :data-testid="`progress-fill-${i + 1}`" :style="{ width: pct + '%' }"></div>
        </div>
        <span class="progress-label">{{ pct }}%</span>
      </div>
    </section>

    <section class="section">
      <h2>Animated Progress</h2>
      <div class="progress-group">
        <div class="progress-track" data-testid="progress-animated">
          <div class="progress-fill" :style="{ width: animatedValue + '%' }"></div>
        </div>
        <span class="progress-label" data-testid="progress-animated-value">{{ animatedValue }}%</span>
      </div>
      <div class="btn-row">
        <button class="btn-start" data-testid="progress-start" @click="startAnimation" :disabled="running">Start</button>
        <button class="btn-reset" data-testid="progress-reset" @click="resetAnimation">Reset</button>
      </div>
    </section>

    <section class="section">
      <h2>Indeterminate</h2>
      <div class="progress-track indeterminate-track" data-testid="progress-indeterminate">
        <div class="progress-fill indeterminate-fill"></div>
      </div>
    </section>

    <section class="section">
      <h2>Circular Progress</h2>
      <div class="circular-wrapper">
        <svg width="80" height="80" viewBox="0 0 80 80" data-testid="progress-circular">
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" stroke-width="8"/>
          <circle
            cx="40" cy="40" r="34" fill="none" stroke="var(--accent)" stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span class="circular-label" data-testid="progress-circular-value">{{ animatedValue }}%</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staticBars: [0, 25, 50, 75, 100],
      animatedValue: 0,
      running: false,
      timer: null,
    };
  },
  computed: {
    circumference() { return 2 * Math.PI * 34; },
    dashOffset() { return this.circumference * (1 - this.animatedValue / 100); }
  },
  methods: {
    startAnimation() {
      if (this.running) return;
      this.running = true;
      this.timer = setInterval(() => {
        if (this.animatedValue >= 100) { clearInterval(this.timer); this.running = false; return; }
        this.animatedValue += 1;
      }, 30);
    },
    resetAnimation() {
      clearInterval(this.timer);
      this.running = false;
      this.animatedValue = 0;
    }
  },
  beforeUnmount() { clearInterval(this.timer); }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.progress-group { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.progress-track { flex: 1; height: 12px; background: var(--border); border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); border-radius: 999px; transition: width 0.05s linear; }
.progress-label { min-width: 40px; font-size: 0.8rem; color: var(--text-secondary); text-align: right; }
.btn-row { display: flex; gap: 0.75rem; margin-top: 0.75rem; }
.btn-start, .btn-reset {
  padding: 0.4rem 1rem; border: 1px solid var(--border); border-radius: var(--radius);
  cursor: pointer; font-size: 0.875rem;
}
.btn-start { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-start:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-reset { background: var(--bg-input); color: var(--text-secondary); }
.btn-reset:hover { background: var(--border); }
.indeterminate-fill {
  width: 40%; animation: indeterminate 1.2s ease-in-out infinite;
}
@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
.circular-wrapper { display: inline-flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.circular-label { font-size: 0.8rem; color: var(--text-secondary); }
</style>
