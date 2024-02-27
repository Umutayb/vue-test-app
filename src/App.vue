<template>
  <div id="app" :class="{ dark: isDark }">
    <h1 class="clickable-title" @click="goToDestination">Pickleib Test</h1>
    <p>Dark theme: {{ isDark }}</p>

    <button @click="toggleDark">
      Toggle Color Mode
    </button>

    <router-view @customEvent="handleCustomEvent" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDark } from '@vueuse/core';

export default {
  methods: {
    goToDestination() {
      // Use $router.push to navigate programmatically
      this.$router.push('/');
    },
    toggleDark() {
      this.isDark = !this.isDark;
      // Optionally, you can use a library function to set the dark mode (if supported)
      document.documentElement.classList.toggle('dark', this.isDark);
      // Emit a custom event when dark mode is toggled
      this.emitter.emit('isDark', { isDark: this.isDark });
    },
    handleCustomEvent(eventData) {
      // Handle the emitted custom event in App.vue
      console.log('Received custom event in App.vue:', eventData);
    },
  },
  setup() {
    // Use ref to make isDark reactive
    const isDark = ref(useDark());

    // Optionally, you can set the dark mode on component mount
    onMounted(() => {
      document.documentElement.classList.toggle('dark', true);
    });

    return {
      isDark,
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

.clickable-title {
  /* Change styles on hover */
  &:hover {
    cursor: pointer;
    color: #384b5d; /* Change the color on hover */
  }
}
</style>
