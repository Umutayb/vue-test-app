<template>
  <div class="mobile-top-bar" data-testid="mobile-top-bar">
    <button
      class="hamburger-button"
      data-testid="hamburger-button"
      @click="layoutStore.toggleSidebar()"
      aria-label="Toggle navigation"
    >
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <span class="topbar-title">UI Components</span>

    <button
      class="topbar-dark-toggle"
      data-testid="dark-mode-toggle-mobile"
      @click="themeStore.toggleDark()"
      aria-label="Toggle dark mode"
    >
      <span class="toggle-track" :class="{ on: themeStore.isDark }">
        <span class="toggle-thumb"></span>
      </span>
    </button>
  </div>
</template>

<script>
import { useLayoutStore } from '@/stores/layout';
import { useThemeStore } from '@/stores/theme';

export default {
  setup() {
    const layoutStore = useLayoutStore();
    const themeStore = useThemeStore();
    return { layoutStore, themeStore };
  },
};
</script>

<style scoped>
.mobile-top-bar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--topbar-height);
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border);
  align-items: center;
  padding: 0 1rem;
  z-index: var(--z-topbar);
  gap: 0.75rem;
}

@media (max-width: 767px) {
  .mobile-top-bar {
    display: flex;
  }
}

.hamburger-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius);
}

.hamburger-button:hover {
  background-color: var(--accent-light);
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.hamburger-icon span {
  display: block;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: 1px;
}

.topbar-title {
  flex: 1;
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--text-primary);
}

.topbar-dark-toggle {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.toggle-track {
  width: 2.25rem;
  height: 1.25rem;
  background-color: var(--border);
  border-radius: 0.625rem;
  position: relative;
  transition: background-color 0.2s;
}

.toggle-track.on {
  background-color: var(--accent);
}

.toggle-thumb {
  width: 1rem;
  height: 1rem;
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  transition: transform 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.toggle-track.on .toggle-thumb {
  transform: translateX(1rem);
}
</style>
