<template>
  <div id="app" :class="{ dark: isDark }">
    <h1>Pickleib Test</h1>
    <p>Dark theme: {{ isDark }}</p>

    <button @click="toggleDark">
      Toggle Color Mode
    </button>

    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDark } from '@vueuse/core';

export default {
  setup() {
    // Use ref to make isDark reactive
    const isDark = ref(useDark());

    // Define a method to toggle the dark mode
    const toggleDark = () => {
      isDark.value = !isDark.value;
      // Optionally, you can use a library function to set the dark mode (if supported)
      document.documentElement.classList.toggle('dark', isDark.value);
    };

    // Optionally, you can set the dark mode on component mount
    onMounted(() => {
      document.documentElement.classList.toggle('dark', true);
    });

    return {
      isDark,
      toggleDark,
    };
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
