<template>
  <div class="page">
    <h1>Infinite Scroll</h1>
    <p class="page-desc">Scrollable list that loads more items at the bottom</p>

    <section class="section">
      <p data-testid="scroll-count" class="scroll-count">Showing {{ items.length }} of {{ maxItems }} items</p>
      <div
        data-testid="scroll-container"
        class="scroll-container"
        @scroll="onScroll"
      >
        <div
          v-for="item in items"
          :key="item.n"
          :data-testid="`scroll-item-${item.n}`"
          class="scroll-item"
        >
          {{ item.text }}
        </div>
        <div v-show="isLoading" data-testid="scroll-loader" class="scroll-loader">
          Loading more...
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      isLoading: false,
      maxItems: 50,
    };
  },
  methods: {
    loadBatch() {
      if (this.items.length >= this.maxItems) return;
      this.isLoading = true;
      setTimeout(() => {
        const start = this.items.length + 1;
        const end = Math.min(start + 10, this.maxItems + 1);
        for (let n = start; n < end; n++) {
          this.items.push({ n, text: `Item ${n}` });
        }
        this.isLoading = false;
      }, 800);
    },
    onScroll(event) {
      const el = event.target;
      if (
        el.scrollTop + el.clientHeight >= el.scrollHeight - 50 &&
        !this.isLoading &&
        this.items.length < this.maxItems
      ) {
        this.loadBatch();
      }
    },
  },
  mounted() {
    this.loadBatch();
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.scroll-count { color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem; }
.scroll-container {
  height: 400px;
  overflow-y: scroll;
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.scroll-item {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
}
.scroll-loader {
  padding: 0.75rem 1rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}
</style>
