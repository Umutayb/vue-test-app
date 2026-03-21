<template>
  <div class="page">
    <h1>Accordion</h1>
    <p class="page-desc">Collapsible accordion items with expand/collapse controls</p>

    <div class="accordion-controls">
      <button data-testid="accordion-expand-all" @click="expandAll">Expand All</button>
      <button data-testid="accordion-collapse-all" @click="collapseAll">Collapse All</button>
    </div>

    <div class="accordion">
      <div v-for="(item, i) in items" :key="i" class="accordion-item">
        <button
          class="accordion-header"
          :data-testid="`accordion-header-${i + 1}`"
          @click="toggle(i)"
        >
          <span>{{ item.question }}</span>
          <span class="chevron" :class="{ open: item.open }">▼</span>
        </button>
        <div
          v-show="item.open"
          class="accordion-body"
          :data-testid="`accordion-body-${i + 1}`"
        >{{ item.answer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          question: 'What is this accordion used for?',
          answer: 'This accordion is a UI test automation target. It demonstrates expand/collapse behavior that automated tests can interact with using data-testid selectors.',
          open: false
        },
        {
          question: 'How do I interact with it in tests?',
          answer: 'Click accordion-header-{n} to toggle an item. Check accordion-body-{n} visibility to verify the open state. Use accordion-expand-all and accordion-collapse-all for bulk operations.',
          open: false
        },
        {
          question: 'Can multiple items be open at once?',
          answer: 'Yes — this accordion allows multiple items open simultaneously. Each item state is independent.',
          open: false
        },
        {
          question: 'What happens when I expand all?',
          answer: 'All accordion bodies become visible at once. The expand-all button sets every item\'s open state to true.',
          open: true
        },
        {
          question: 'Is there animation?',
          answer: 'No animation in Phase 2 — the show/hide is immediate via v-show. Animated transitions may be added in a later phase.',
          open: false
        },
      ]
    };
  },
  methods: {
    toggle(i) { this.items[i].open = !this.items[i].open; },
    expandAll() { this.items.forEach(item => { item.open = true; }); },
    collapseAll() { this.items.forEach(item => { item.open = false; }); }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.accordion-controls { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
.accordion-controls button {
  padding: 0.4rem 1rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-secondary); cursor: pointer; font-size: 0.875rem;
}
.accordion-controls button:hover { background: var(--border); }
.accordion { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.accordion-item { border-bottom: 1px solid var(--border); }
.accordion-item:last-child { border-bottom: none; }
.accordion-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.25rem; background: var(--bg-primary); border: none; cursor: pointer;
  text-align: left; font-size: 0.9rem; font-weight: 500; color: var(--text-primary);
}
.accordion-header:hover { background: var(--bg-sidebar); }
.chevron { transition: transform 0.2s; font-size: 0.75rem; color: var(--text-muted); flex-shrink: 0; }
.chevron.open { transform: rotate(180deg); }
.accordion-body {
  padding: 0.75rem 1.25rem 1rem; color: var(--text-secondary);
  font-size: 0.875rem; line-height: 1.6; background: var(--bg-sidebar);
}
</style>
