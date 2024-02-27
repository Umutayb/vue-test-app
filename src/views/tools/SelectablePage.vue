<template>
    <div>
      <h2>Widgets Page</h2>
      <a>Wellcome to Widgets!</a>
      <v-select :options="countriesList" :key="code" />
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
        countriesList: Object.values(require("countries-list").countries).map(country => country.name)
      };
    }
  };
  </script>
