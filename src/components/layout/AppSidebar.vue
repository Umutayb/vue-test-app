<template>
  <aside class="sidebar" data-testid="nav-sidebar">
    <!-- Logo -->
    <div class="sidebar-header">
      <div class="sidebar-logo"></div>
      <span class="sidebar-title">Pickleib</span>
      <span class="sidebar-version">v0.1</span>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div
        v-for="group in navigation"
        :key="group.category"
        class="nav-group"
      >
        <div class="nav-category">{{ group.category }}</div>
        <NavItem
          v-for="item in group.items"
          :key="item.routeName"
          :label="item.label"
          :routeName="item.routeName"
          :isActive="currentRoute === item.routeName"
        />
      </div>
    </nav>

    <!-- Dark mode toggle -->
    <div class="sidebar-footer">
      <button
        class="dark-toggle"
        data-testid="dark-mode-toggle"
        @click="themeStore.toggleDark()"
      >
        <span class="toggle-track" :class="{ on: themeStore.isDark }">
          <span class="toggle-thumb"></span>
        </span>
        <span class="toggle-label">Dark mode</span>
      </button>
    </div>
  </aside>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { navigation } from '@/config/navigation';
import NavItem from './NavItem.vue';

export default {
  components: { NavItem },
  setup() {
    const route = useRoute();
    const themeStore = useThemeStore();
    const currentRoute = computed(() => route.name);

    return { navigation, themeStore, currentRoute };
  },
};
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.sidebar-logo {
  width: 1.75rem;
  height: 1.75rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.sidebar-title {
  font-weight: 700;
  font-size: 0.9375rem;
  color: var(--text-primary);
}

.sidebar-version {
  font-size: 0.6875rem;
  color: var(--text-muted);
  background-color: var(--bg-primary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  margin-left: auto;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 0.5rem;
}

.nav-group {
  margin-bottom: 0.25rem;
}

.nav-category {
  padding: 0.375rem 0.75rem;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03125rem;
  color: var(--text-muted);
}

.sidebar-footer {
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--border);
}

.dark-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
}

.toggle-track {
  width: 2.25rem;
  height: 1.25rem;
  background-color: var(--border);
  border-radius: 0.625rem;
  position: relative;
  transition: background-color 0.2s;
  flex-shrink: 0;
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

.toggle-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}
</style>
