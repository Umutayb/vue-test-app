<template>
    <div>
      <h2>Dropdown Page</h2>
      <a>Where the most threacherous dropdowns reside...</a>
      <v-select :options="countriesList" id="countriesDropDown" :class="{ 'custom-dropdown': isDark }" />
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
        isDark: false
      };
    },
    created (){
    this.emitter.on('isDark', (evt) => {
      this.isDark = evt.isDark;
    })
  }
}
  </script>
<style>
.custom-dropdown .vs__dropdown-menu {
  --vs-controls-color: #4e6172;
  --vs-border-color: #4e6172;

  --vs-dropdown-bg: #282c34;
  --vs-dropdown-color: #4e6172;
  --vs-dropdown-option-color: #4e6172;

  --vs-selected-bg: #50708d;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #4e6172;
  --vs-dropdown-option--active-color: #eeeeee;
}
</style>