<template>
    <div>
      <h2>Widgets Page</h2>
      <a>Wellcome to Widgets!</a>
      <v-select :options="countriesList" />
      <!-- Your content for the Forms category page -->
    </div>
  </template>

  <script>
    import vSelect from 'vue-select';
    import 'vue-select/dist/vue-select.css';
    import {countries} from "countries-list";

    export default {
    components: {
      vSelect,
    },
    data() {
    return {
      countriesList: countries.countries,
    };
  },
    
  };
  </script>
