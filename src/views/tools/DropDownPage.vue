<template>
    <div>
      <h2>Dropdown Page</h2>
      <a>Where the most threacherous dropdowns reside...</a>
      <v-select :options="countriesList" id="countriesDropDown" class="themed-dropdown" />
      <!-- Your content for the Forms category page -->
    </div>
  </template>

  <script>
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';

    export default {
      components: {
        vSelect,
      },
      data() {
        return {
          countriesList: Object.values(require("countries-list").countries).map(country => country.name),
        };
      },
    }
  </script>
<style>
.themed-dropdown {
  --vs-controls-color: var(--text-muted);
  --vs-border-color: var(--border);
  --vs-dropdown-bg: var(--bg-primary);
  --vs-dropdown-color: var(--text-secondary);
  --vs-dropdown-option-color: var(--text-secondary);
  --vs-selected-bg: var(--accent);
  --vs-selected-color: #ffffff;
  --vs-search-input-color: var(--text-primary);
  --vs-dropdown-option--active-bg: var(--accent-light);
  --vs-dropdown-option--active-color: var(--accent);
  max-width: 24rem;
  margin: 1rem auto;
}
</style>
