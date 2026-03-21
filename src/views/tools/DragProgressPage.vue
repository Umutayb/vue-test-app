<template>
  <div class="page">
    <h1>Drag Progress</h1>
    <p class="page-desc">Click or drag on the progress bar to set its fill percentage</p>

    <div class="section">
      <h2>Interactive Bar</h2>
      <p class="pct-label"><span data-testid="drag-progress-value">{{ percentage }}</span>%</p>
      <div
        class="track"
        data-testid="drag-progress-track"
        @mousedown.prevent="startDrag"
        @click="onClick"
      >
        <div
          class="fill"
          data-testid="drag-progress-fill"
          :style="{ width: percentage + '%' }"
        >
          <div class="handle" data-testid="drag-progress-handle"></div>
        </div>
      </div>
      <div class="btn-row">
        <button class="ctrl-btn" data-testid="drag-progress-reset" @click.stop="percentage = 0">Reset</button>
        <button class="ctrl-btn" data-testid="drag-progress-set-half" @click.stop="percentage = 50">50%</button>
        <button class="ctrl-btn accent" data-testid="drag-progress-set-full" @click.stop="percentage = 100">100%</button>
      </div>
    </div>

    <div class="section">
      <h2>Animated Bar</h2>
      <p class="pct-label"><span data-testid="drag-progress-animated-value">{{ animatedPct }}</span>%</p>
      <div class="track" data-testid="drag-progress-animated-track">
        <div class="fill" data-testid="drag-progress-animated-fill" :style="{ width: animatedPct + '%' }"></div>
      </div>
      <button class="ctrl-btn accent" data-testid="drag-progress-animate-btn" @click="startAnimation" :disabled="animating">
        {{ animating ? 'Animating...' : 'Animate' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 30,
      isDragging: false,
      animatedPct: 0,
      animating: false,
    };
  },
  created() {
    this.animInterval = null;
  },
  mounted() {
    this.onMouseMoveHandler = this.onMouseMove.bind(this);
    this.onMouseUpHandler = () => { this.isDragging = false; };
    document.addEventListener('mousemove', this.onMouseMoveHandler);
    document.addEventListener('mouseup', this.onMouseUpHandler);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this.onMouseMoveHandler);
    document.removeEventListener('mouseup', this.onMouseUpHandler);
    if (this.animInterval) clearInterval(this.animInterval);
  },
  methods: {
    pctFromEvent(event) {
      const track = this.$el.querySelector('[data-testid="drag-progress-track"]');
      const rect = track.getBoundingClientRect();
      const pct = (event.clientX - rect.left) / rect.width;
      return Math.round(Math.max(0, Math.min(1, pct)) * 100);
    },
    startDrag(event) {
      this.isDragging = true;
      this.percentage = this.pctFromEvent(event);
    },
    onMouseMove(event) {
      if (!this.isDragging) return;
      this.percentage = this.pctFromEvent(event);
    },
    onClick(event) {
      this.percentage = this.pctFromEvent(event);
    },
    startAnimation() {
      if (this.animating) return;
      this.animating = true;
      this.animatedPct = 0;
      this.animInterval = setInterval(() => {
        this.animatedPct = Math.min(100, this.animatedPct + 2);
        if (this.animatedPct >= 100) {
          clearInterval(this.animInterval);
          setTimeout(() => {
            this.animatedPct = 0;
            this.animating = false;
          }, 500);
        }
      }, 20);
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 3rem; }
.section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
.pct-label { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; }
.track {
  height: 24px; border-radius: 12px; background: var(--border);
  cursor: pointer; position: relative; user-select: none; overflow: visible;
}
.fill {
  height: 100%; border-radius: 12px; background: var(--accent);
  position: relative; min-width: 0; transition: none;
}
.handle {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--accent); border: 3px solid var(--bg-primary);
  position: absolute; right: -10px; top: 50%; transform: translateY(-50%);
  cursor: grab; box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.handle:active { cursor: grabbing; }
.btn-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
.ctrl-btn {
  padding: 0.35rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); cursor: pointer; font-size: 0.875rem;
}
.ctrl-btn:hover { background: var(--border); }
.ctrl-btn.accent { background: var(--accent); color: #fff; border-color: var(--accent); }
.ctrl-btn.accent:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.ctrl-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
