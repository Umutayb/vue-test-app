<template>
  <div class="page">
    <h1>Carousel</h1>
    <p class="page-desc">Auto-playing slideshow with navigation controls</p>

    <div class="carousel-wrapper">
      <div class="carousel-track">
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          class="slide"
          :data-testid="`carousel-slide-${i + 1}`"
          :style="{ background: slide.color }"
          v-show="currentSlide === i"
        >
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.desc }}</p>
        </div>
      </div>

      <button class="nav-btn prev-btn" data-testid="carousel-prev" @click="prev">&#8249;</button>
      <button class="nav-btn next-btn" data-testid="carousel-next" @click="next">&#8250;</button>
    </div>

    <div class="controls-row">
      <div class="dots-row">
        <button
          v-for="(slide, i) in slides"
          :key="i"
          class="dot"
          :class="{ 'dot-active': currentSlide === i }"
          :data-testid="`carousel-dot-${i + 1}`"
          @click="goTo(i)"
        ></button>
      </div>
      <button class="play-btn" data-testid="carousel-autoplay" @click="togglePlay">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
    </div>

    <p class="indicator" data-testid="carousel-indicator">Slide {{ currentSlide + 1 }} of {{ slides.length }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      isPlaying: true,
      slides: [
        { id: 1, title: 'Welcome to the Carousel',  desc: 'This is slide one',   color: '#6366f1' },
        { id: 2, title: 'Interactive Components',   desc: 'This is slide two',   color: '#f59e0b' },
        { id: 3, title: 'Built with Vue 3',         desc: 'This is slide three', color: '#22c55e' },
        { id: 4, title: 'Test Automation Ready',    desc: 'This is slide four',  color: '#3b82f6' },
        { id: 5, title: 'Fully Responsive',         desc: 'This is slide five',  color: '#ef4444' },
      ],
    };
  },
  created() {
    this.slideInterval = null;
  },
  mounted() {
    this.startInterval();
  },
  beforeUnmount() {
    this.stopInterval();
  },
  methods: {
    startInterval() {
      this.slideInterval = setInterval(() => { this.next(); }, 3000);
    },
    stopInterval() {
      if (this.slideInterval) { clearInterval(this.slideInterval); this.slideInterval = null; }
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.startInterval() : this.stopInterval();
    },
    prev() { this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length; },
    next() { this.currentSlide = (this.currentSlide + 1) % this.slides.length; },
    goTo(i) { this.currentSlide = i; },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.carousel-wrapper { position: relative; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); }
.carousel-track { position: relative; }
.slide { height: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; padding: 2rem; text-align: center; }
.slide h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
.slide p { font-size: 0.9rem; opacity: 0.9; }
.nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.3); border: none; color: #fff; font-size: 1.75rem; cursor: pointer; padding: 0.5rem 0.75rem; }
.prev-btn { left: 0; border-radius: 0 var(--radius) var(--radius) 0; }
.next-btn { right: 0; border-radius: var(--radius) 0 0 var(--radius); }
.nav-btn:hover { background: rgba(0,0,0,0.5); }
.controls-row { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
.dots-row { display: flex; gap: 0.5rem; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; padding: 0; }
.dot-active { background: var(--accent); }
.play-btn { padding: 0.3rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); cursor: pointer; font-size: 0.8rem; }
.indicator { text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; }
</style>
