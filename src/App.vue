<template>
  <div id="app">
    <p>Dark theme: {{ isDark }}</p>

    <button @click="toggleDark">
      Toggle Color Mode
    </button>

    <router-view />
  </div>
</template>

<script>
import { useDark } from "@vueuse/core";

export default {
  data() {
    return {
      // Use isDark as a data property to make it reactive
      isDark: useDark(),
    };
  },
  methods: {
    // Define a method to toggle the dark mode
    toggleDark() {
      this.isDark = !this.isDark;
      // Optionally, you can use a library function to set the dark mode (if supported)
      document.documentElement.classList.toggle("dark", this.isDark);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h2 {
  margin-bottom: 10px;
}

/* Optionally, you can define dark mode styles using a class */
.dark {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
