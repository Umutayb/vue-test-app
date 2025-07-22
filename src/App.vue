<template>
  <div id="app" :class="{ dark: isDark }">
    <h1 class="clickable-title" @click="returnHome">Pickleib Test</h1>
    <p>Dark theme: {{ isDark }}</p>

    <button @click="toggleDark">
      Toggle Color Mode
    </button>

    <!-- Only show this if route is /lameframe -->
    <div
      v-if="showInnerDarkStatus"
      id="data-inner-dark"
      style="margin-top: 20px;"
      :style="{ color: innerDark ? '#90ee90' : '#ff6666', fontWeight: 'bold' }"
    >
      Inner Dark Mode: {{ innerDark ? 'ON' : 'OFF' }}
    </div>

    <router-view />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDark } from '@vueuse/core';

export default {
  setup() {
    const isDark = ref(useDark());
    const innerDark = ref(false); // status from iframe
    const route = useRoute();     // current route

    // Only show the indicator on /lameframe route
    const showInnerDarkStatus = computed(() => route.name === 'lameframe');

    onMounted(() => {
      // Set main dark mode class
      document.documentElement.classList.toggle('dark', isDark.value);

      // Listen for postMessage from iframe
      window.addEventListener('message', (event) => {
        // Optional origin check here
        const data = event.data;
        if (data?.type === 'inner-dark-mode-toggle') {
          innerDark.value = !!data.isDark;
          console.log('📥 Received inner dark mode:', innerDark.value);
        }
      });
    });

    const toggleDark = () => {
      isDark.value = !isDark.value;
      document.documentElement.classList.toggle('dark', isDark.value);
    };

    const returnHome = () => {
      window.location.href = '/';
    };

    return {
      isDark,
      innerDark,
      showInnerDarkStatus,
      toggleDark,
      returnHome,
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
  color: #cfd8dc;
}

.dark {
  background-color: #1a1a1a;
}

h2 {
  margin-bottom: 10px;
}

.clickable-title:hover {
  cursor: pointer;
  color: #2b3f51;
}
</style>
