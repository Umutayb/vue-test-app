import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLayoutStore = defineStore('layout', () => {
  const isSidebarOpen = ref(false);
  const activeCategory = ref(null);

  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  function closeSidebar() {
    isSidebarOpen.value = false;
  }

  function setActiveCategory(cat) {
    activeCategory.value = activeCategory.value === cat ? null : cat;
  }

  function clearActiveCategory() {
    activeCategory.value = null;
  }

  return {
    isSidebarOpen,
    activeCategory,
    toggleSidebar,
    closeSidebar,
    setActiveCategory,
    clearActiveCategory,
  };
});
