<template>
  <div class="page">
    <h1>Image Gallery</h1>
    <p class="page-desc">Click any image to view it full size</p>

    <div class="grid">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="grid-card"
        :data-testid="`gallery-item-${i + 1}`"
        @click="open(i)"
      >
        <div class="placeholder" :style="{ background: item.color }">{{ item.alt }}</div>
      </div>
    </div>

    <div v-if="isOpen" class="overlay" data-testid="gallery-overlay" @click.self="close">
      <div class="overlay-inner">
        <div
          class="full-image"
          data-testid="gallery-full-image"
          :style="{ background: activeItem.color }"
        >{{ activeItem.alt }}</div>
        <p class="caption" data-testid="gallery-caption">Image {{ activeIndex + 1 }} of {{ items.length }}</p>
        <div class="nav-row">
          <button class="nav-btn" data-testid="gallery-prev" @click="prev">&#8249; Prev</button>
          <button class="nav-btn" data-testid="gallery-next" @click="next">Next &#8250;</button>
        </div>
        <button class="close-btn" data-testid="gallery-close" @click="close">&#x2715;</button>
      </div>
    </div>
  </div>
</template>

<script>
const ITEMS = [
  { id: 1, alt: 'Mountain landscape',  color: '#6366f1' },
  { id: 2, alt: 'Ocean sunset',        color: '#f59e0b' },
  { id: 3, alt: 'Forest path',         color: '#22c55e' },
  { id: 4, alt: 'City skyline',        color: '#3b82f6' },
  { id: 5, alt: 'Desert dunes',        color: '#ef4444' },
  { id: 6, alt: 'Snowy peaks',         color: '#06b6d4' },
  { id: 7, alt: 'Autumn leaves',       color: '#f97316' },
  { id: 8, alt: 'Tropical beach',      color: '#8b5cf6' },
];

export default {
  data() {
    return { items: ITEMS, activeIndex: 0, isOpen: false };
  },
  computed: {
    activeItem() { return this.items[this.activeIndex]; },
  },
  methods: {
    open(index) { this.activeIndex = index; this.isOpen = true; },
    close()     { this.isOpen = false; },
    prev()      { this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length; },
    next()      { this.activeIndex = (this.activeIndex + 1) % this.items.length; },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.grid-card { aspect-ratio: 4/3; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); cursor: pointer; }
.grid-card:hover { opacity: 0.85; }
.placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.7rem; text-align: center; padding: 0.5rem; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 200; display: flex; align-items: center; justify-content: center; }
.overlay-inner { text-align: center; position: relative; }
.full-image { width: 480px; height: 320px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.1rem; }
.caption { color: #fff; margin: 0.75rem 0 0.5rem; font-size: 0.9rem; }
.nav-row { display: flex; gap: 1rem; justify-content: center; }
.nav-btn { background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: var(--radius); padding: 0.4rem 1rem; cursor: pointer; font-size: 0.9rem; }
.nav-btn:hover { background: rgba(255,255,255,0.25); }
.close-btn { position: absolute; top: -2rem; right: -2rem; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; padding: 0.25rem; }
</style>
