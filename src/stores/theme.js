import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(
    localStorage.getItem('theme-dark') === 'true' ||
    (!localStorage.getItem('theme-dark') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  function applyTheme() {
    document.documentElement.classList.toggle('dark', isDark.value);
  }

  function toggleDark() {
    isDark.value = !isDark.value;
  }

  watch(isDark, (val) => {
    localStorage.setItem('theme-dark', val);
    applyTheme();
  });

  // Apply on init
  applyTheme();

  return { isDark, toggleDark };
});
