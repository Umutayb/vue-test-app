<template>
  <div id="app" :class="{ dark: isDark }">
    <h1 class="clickable-title" @click="returnHome">Pickleib Test</h1>
    <p>Dark theme: {{ isDark }}</p>

    <button @click="toggleDark">
      Toggle Color Mode
    </button>

    <!-- 👇 Display iframe status -->
    <div id="data-inner-dark" style="margin-top: 20px;"></div>

    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDark } from '@vueuse/core';

export default {
  methods: {
    returnHome() {
      this.$router.push('/');
    },
    toggleDark() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark', this.isDark);
      this.emitter?.emit?.('isDark', { isDark: this.isDark });
    },
  },
  setup() {
    const isDark = ref(useDark());

    onMounted(() => {
      // Set initial dark mode state on <html>
      document.documentElement.classList.toggle('dark', isDark.value);

      // Listen for messages from iframe
      window.addEventListener('message', (event) => {
      console.log("📥 Parent received postMessage:", event);

        const data = event.data;
        if (data?.type === 'inner-dark-mode-toggle') {
          const statusEl = document.getElementById('data-inner-dark');
          if (statusEl) {
            statusEl.innerText = data.isDark ? 'Inner Dark Mode: ON' : 'Inner Dark Mode: OFF';
            statusEl.style.color = data.isDark ? '#90ee90' : '#ff6666';
            statusEl.style.fontWeight = 'bold';
          }
        }
      });
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

.white-title {
  font-weight: bold;
  color: #fff;
}
</style>
