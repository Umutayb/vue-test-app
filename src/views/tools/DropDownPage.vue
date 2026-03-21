<template>
  <div class="page">
    <h1>Dropdown</h1>
    <p class="page-desc">Native and custom dropdown variants</p>

    <!-- Single select -->
    <div class="section">
      <h2>Single Select</h2>
      <select class="styled-select" data-testid="dropdown-single" v-model="singleValue">
        <option value="">-- Select a country --</option>
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
      <p class="value-display">Selected: <span data-testid="dropdown-single-value">{{ singleValue || 'none' }}</span></p>
    </div>

    <!-- Multi select -->
    <div class="section">
      <h2>Multi Select</h2>
      <select class="styled-select" data-testid="dropdown-multi" v-model="multiValue" multiple size="5">
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
      <p class="value-display">Selected: <span data-testid="dropdown-multi-value">{{ multiValue.join(', ') || 'none' }}</span></p>
    </div>

    <!-- Custom dropdown -->
    <div class="section">
      <h2>Custom Dropdown</h2>
      <div class="custom-dd-wrapper">
        <button
          type="button"
          class="custom-dd-trigger"
          data-testid="dropdown-custom"
          @click.stop="showCustom = !showCustom"
        >
          {{ customValue || 'Select a fruit' }}
          <span class="chevron" :class="{ open: showCustom }">▾</span>
        </button>
        <ul v-show="showCustom" class="custom-dd-list" data-testid="dropdown-custom-list">
          <li
            v-for="(opt, i) in customOptions"
            :key="opt"
            class="custom-dd-option"
            :data-testid="`dropdown-custom-option-${i + 1}`"
            @click="selectCustom(opt)"
          >{{ opt }}</li>
        </ul>
      </div>
      <p class="value-display">Selected: <span data-testid="dropdown-custom-value">{{ customValue || 'none' }}</span></p>
    </div>
  </div>
</template>

<script>
const COUNTRIES = [
  'Australia', 'Brazil', 'Canada', 'Denmark', 'Egypt',
  'France', 'Germany', 'Hungary', 'India', 'Japan',
];

export default {
  data() {
    return {
      countries: COUNTRIES,
      singleValue: '',
      multiValue: [],
      customOptions: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
      customValue: '',
      showCustom: false,
    };
  },
  mounted() {
    this._closeHandler = () => { this.showCustom = false; };
    document.addEventListener('click', this._closeHandler);
  },
  beforeUnmount() {
    document.removeEventListener('click', this._closeHandler);
  },
  methods: {
    selectCustom(opt) {
      this.customValue = opt;
      this.showCustom = false;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; }
.styled-select {
  width: 100%; max-width: 320px; padding: 0.5rem 0.75rem;
  background: var(--bg-input); border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem;
}
.styled-select[multiple] { height: auto; }
.value-display { margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary); }
.value-display span { font-weight: 600; color: var(--text-primary); }
.custom-dd-wrapper { position: relative; width: 320px; }
.custom-dd-trigger {
  width: 100%; padding: 0.5rem 0.75rem; text-align: left;
  background: var(--bg-input); border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--text-primary);
  font-size: 0.9rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
}
.chevron { transition: transform 0.15s; }
.chevron.open { transform: rotate(180deg); }
.custom-dd-list {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: var(--bg-primary); border: 1px solid var(--border);
  border-radius: var(--radius); z-index: 50; list-style: none; padding: 0.25rem 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.custom-dd-option {
  padding: 0.5rem 0.75rem; cursor: pointer; font-size: 0.875rem; color: var(--text-primary);
}
.custom-dd-option:hover { background: var(--accent-light); color: var(--accent); }
</style>
