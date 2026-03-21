<template>
  <div class="page">
    <h1>Long List</h1>
    <p class="page-desc">200 items with live search filtering</p>

    <div class="search-row">
      <input
        type="text"
        class="search-input"
        data-testid="long-list-search"
        v-model="searchQuery"
        placeholder="Search by name or category..."
      />
      <button
        v-if="searchQuery"
        class="clear-btn"
        data-testid="long-list-clear"
        @click="searchQuery = ''"
      >✕</button>
    </div>

    <p class="count-text" data-testid="long-list-count">Showing {{ filteredItems.length }} of {{ allItems.length }} items</p>

    <div class="list-container">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="list-item"
        :data-testid="`long-list-item-${item.id}`"
      >
        <span class="item-name">{{ item.name }}</span>
        <span class="item-badge" :class="`badge-${item.category.toLowerCase()}`">{{ item.category }}</span>
      </div>
      <div v-if="filteredItems.length === 0" class="empty-msg" data-testid="long-list-empty">
        No items match your search.
      </div>
    </div>
  </div>
</template>

<script>
const ALL_ITEMS = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: ['Alpha', 'Beta', 'Gamma', 'Delta'][i % 4],
}));

export default {
  data() {
    return {
      allItems: ALL_ITEMS,
      searchQuery: '',
    };
  },
  computed: {
    filteredItems() {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.allItems;
      return this.allItems.filter(item =>
        item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.search-row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.search-input { flex: 1; max-width: 360px; padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; }
.clear-btn { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-muted); cursor: pointer; }
.count-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
.list-container { max-height: 480px; overflow-y: auto; border: 1px solid var(--border); border-radius: var(--radius); }
.list-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; color: var(--text-primary); }
.list-item:last-child { border-bottom: none; }
.item-badge { font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 999px; }
.badge-alpha { background: #ede9fe; color: #7c3aed; }
.badge-beta  { background: #fef3c7; color: #d97706; }
.badge-gamma { background: #dcfce7; color: #16a34a; }
.badge-delta { background: #dbeafe; color: #2563eb; }
.empty-msg { padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.875rem; }
</style>
