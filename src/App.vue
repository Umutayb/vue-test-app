<template>
  <div id="app" :class="{ dark: isDark }">
    <h1 class="clickable-title" @click="returnHome">Pickleib Test</h1>
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
  methods: {
    returnHome() {
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

.dark #app {
  color: #41566a; /* Change the text color in dark mode */
}

h2 {
  margin-bottom: 10px;
}

/* Optionally, you can define dark mode styles using a class */
.dark {
  background-color: #1a1a1a;
}

.clickable-title {
  /* Change styles on hover */
  &:hover {
    cursor: pointer;
    color: #2b3f51; /* Change the color on hover */
  }
}

.white-title {
  font-weight: bold;
  color: #fff;
}
</style>
