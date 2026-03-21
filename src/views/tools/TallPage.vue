<template>
  <div class="tall-page">
    <h1>Tall Page</h1>
    <p class="page-desc">A long scrollable page for scroll position testing</p>

    <p class="scroll-info">Scroll position: <span data-testid="tall-scroll-position">{{ scrollY }}px</span></p>

    <div
      v-for="n in 10"
      :key="n"
      class="tall-section"
      :data-testid="`tall-section-${n}`"
    >
      <h2>Section {{ n }}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
    </div>

    <button
      v-show="scrollY > 200"
      class="back-to-top"
      data-testid="tall-top-btn"
      @click="scrollToTop"
    >↑ Top</button>
  </div>
</template>

<script>
export default {
  data() {
    return { scrollY: 0 };
  },
  mounted() {
    this._onScroll = () => { this.scrollY = Math.round(window.scrollY); };
    window.addEventListener('scroll', this._onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this._onScroll);
  },
  methods: {
    scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); },
  },
};
</script>

<style scoped>
.tall-page { padding: 2rem; max-width: 700px; position: relative; }
.page-desc { color: var(--text-secondary); margin-bottom: 0.5rem; }
.scroll-info { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 2rem; }
.scroll-info span { font-weight: 600; color: var(--text-primary); }
.tall-section { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
.tall-section h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; }
.tall-section p { color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem; }
.back-to-top {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  background: var(--accent); color: #fff;
  border: none; border-radius: var(--radius); padding: 0.5rem 1rem;
  cursor: pointer; font-size: 0.875rem; font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.back-to-top:hover { background: var(--accent-hover); }
</style>
