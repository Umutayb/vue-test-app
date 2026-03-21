<template>
  <div class="page">
    <h1>Autocomplete</h1>
    <p class="page-desc">Input with filtered dropdown suggestions and keyboard navigation</p>

    <section class="section">
      <div class="autocomplete-wrapper">
        <input
          type="text"
          v-model="query"
          data-testid="autocomplete-input"
          placeholder="Type a country name..."
          @input="onInput"
          @keydown="onKeydown"
          @blur="delayClose"
          autocomplete="off"
        />
        <ul v-if="showDropdown && filtered.length" class="dropdown" data-testid="autocomplete-dropdown">
          <li
            v-for="(item, i) in filtered"
            :key="item"
            :class="{ highlighted: i === activeIndex }"
            :data-testid="`autocomplete-option-${i + 1}`"
            @mousedown.prevent="select(item)"
          >{{ item }}</li>
        </ul>
      </div>

      <button class="clear-btn" data-testid="autocomplete-clear" @click="clear">Clear</button>

      <p class="selected-display">
        Selected: <span data-testid="autocomplete-selected">{{ selected || '—' }}</span>
      </p>
    </section>
  </div>
</template>

<script>
const COUNTRIES = [
  'Afghanistan', 'Australia', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt',
  'Finland', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Kenya',
  'Mexico', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Poland',
  'Portugal', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden',
  'Turkey', 'United Kingdom', 'United States', 'Vietnam'
];

export default {
  data() {
    return { query: '', selected: '', showDropdown: false, activeIndex: -1 };
  },
  computed: {
    filtered() {
      if (!this.query) return [];
      const q = this.query.toLowerCase();
      return COUNTRIES.filter(c => c.toLowerCase().includes(q));
    }
  },
  methods: {
    onInput() { this.showDropdown = true; this.activeIndex = -1; },
    onKeydown(e) {
      if (!this.showDropdown || !this.filtered.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.activeIndex = Math.min(this.activeIndex + 1, this.filtered.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
      } else if (e.key === 'Enter' && this.activeIndex >= 0) {
        this.select(this.filtered[this.activeIndex]);
      } else if (e.key === 'Escape') {
        this.showDropdown = false;
      }
    },
    select(item) {
      this.query = item;
      this.selected = item;
      this.showDropdown = false;
      this.activeIndex = -1;
    },
    delayClose() { setTimeout(() => { this.showDropdown = false; }, 150); },
    clear() { this.query = ''; this.selected = ''; this.showDropdown = false; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.autocomplete-wrapper { position: relative; }
input[type="text"] {
  width: 100%; box-sizing: border-box; padding: 0.5rem 0.75rem;
  border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem;
}
input[type="text"]:focus { outline: none; border-color: var(--accent); }
.dropdown {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius);
  max-height: 200px; overflow-y: auto; z-index: 10; list-style: none; margin: 0; padding: 0.25rem 0;
}
.dropdown li { padding: 0.5rem 0.75rem; font-size: 0.875rem; color: var(--text-primary); cursor: pointer; }
.dropdown li:hover, .dropdown li.highlighted { background: var(--accent-light); color: var(--accent); }
.clear-btn {
  margin-top: 0.75rem; padding: 0.35rem 0.75rem; border: 1px solid var(--border);
  border-radius: var(--radius); background: var(--bg-input); color: var(--text-secondary); cursor: pointer;
}
.clear-btn:hover { background: var(--border); }
.selected-display { margin-top: 0.75rem; font-size: 0.875rem; color: var(--text-secondary); }
.selected-display span { font-weight: 600; color: var(--accent); }
</style>
