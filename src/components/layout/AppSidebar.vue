<template>
  <!-- Backdrop (mobile only) -->
  <Transition name="backdrop">
    <div
      v-if="layoutStore.isSidebarOpen"
      class="sidebar-backdrop"
      data-testid="sidebar-backdrop"
      @click="layoutStore.closeSidebar()"
    ></div>
  </Transition>

  <!-- Sidebar -->
  <aside
    class="sidebar"
    :class="{
      'sidebar--open': layoutStore.isSidebarOpen,
    }"
    data-testid="nav-sidebar"
    :data-sidebar-overlay="layoutStore.isSidebarOpen ? '' : undefined"
  >
    <!-- Logo (desktop + tablet) -->
    <router-link to="/" class="sidebar-header sidebar-header--full" data-testid="sidebar-home-link">
      <div class="sidebar-logo"></div>
      <span class="sidebar-title">UI Components</span>
      <span class="sidebar-version">v0.1</span>
    </router-link>

    <!-- Mobile overlay header with close button -->
    <div class="sidebar-header sidebar-header--mobile">
      <div class="sidebar-logo"></div>
      <span class="sidebar-title">UI Components</span>
      <button
        class="sidebar-close-button"
        data-testid="sidebar-close-button"
        @click="layoutStore.closeSidebar()"
        aria-label="Close navigation"
      >
        ✕
      </button>
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
          @click="onNavItemClick"
        />
      </div>
    </nav>

    <!-- Tablet Icon Rail Nav -->
    <nav class="sidebar-rail-nav" data-testid="sidebar-rail">
      <button
        v-for="group in navigation"
        :key="'rail-' + group.category"
        class="rail-category-button"
        :class="{ active: layoutStore.activeCategory === group.category }"
        :data-testid="'rail-category-' + slugify(group.category)"
        :title="group.category"
        @click="layoutStore.setActiveCategory(group.category)"
      >
        {{ group.icon }}
      </button>
    </nav>

    <!-- Tablet Flyout Panel -->
    <Transition name="flyout">
      <div
        v-if="layoutStore.activeCategory"
        class="sidebar-flyout"
        data-testid="sidebar-flyout"
      >
        <div class="flyout-header">{{ layoutStore.activeCategory }}</div>
        <NavItem
          v-for="item in activeGroupItems"
          :key="item.routeName"
          :label="item.label"
          :routeName="item.routeName"
          :isActive="currentRoute === item.routeName"
          @click="onFlyoutNavClick"
        />
      </div>
    </Transition>

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
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { useLayoutStore } from '@/stores/layout';
import { navigation, categorySlug } from '@/config/navigation';
import NavItem from './NavItem.vue';

export default {
  components: { NavItem },
  setup() {
    const route = useRoute();
    const themeStore = useThemeStore();
    const layoutStore = useLayoutStore();
    const currentRoute = computed(() => route.name);

    // Flyout: items for the active category
    const activeGroupItems = computed(() => {
      if (!layoutStore.activeCategory) return [];
      const group = navigation.find(g => g.category === layoutStore.activeCategory);
      return group ? group.items : [];
    });

    function slugify(name) {
      return categorySlug(name);
    }

    function onNavItemClick() {
      if (window.innerWidth < 768) {
        layoutStore.closeSidebar();
      }
    }

    function onFlyoutNavClick() {
      layoutStore.clearActiveCategory();
    }

    function onEscape(e) {
      if (e.key === 'Escape') {
        layoutStore.closeSidebar();
        layoutStore.clearActiveCategory();
      }
    }

    function onClickOutsideFlyout(e) {
      const flyout = document.querySelector('[data-testid="sidebar-flyout"]');
      const rail = document.querySelector('[data-testid="sidebar-rail"]');
      if (flyout && !flyout.contains(e.target) && rail && !rail.contains(e.target)) {
        layoutStore.clearActiveCategory();
      }
    }

    function handleBreakpointChange() {
      layoutStore.closeSidebar();
      layoutStore.clearActiveCategory();
    }

    // Close sidebar and flyout on route change
    watch(() => route.path, () => {
      layoutStore.closeSidebar();
      layoutStore.clearActiveCategory();
    });

    // Body scroll lock when sidebar open (mobile only)
    watch(() => layoutStore.isSidebarOpen, (open) => {
      if (window.innerWidth < 768) {
        document.body.style.overflow = open ? 'hidden' : '';
      } else {
        document.body.style.overflow = '';
      }
    });

    let mobileQuery, tabletQuery;

    onMounted(() => {
      document.addEventListener('keydown', onEscape);
      document.addEventListener('click', onClickOutsideFlyout);

      mobileQuery = window.matchMedia('(max-width: 767px)');
      tabletQuery = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
      mobileQuery.addEventListener('change', handleBreakpointChange);
      tabletQuery.addEventListener('change', handleBreakpointChange);
    });

    onUnmounted(() => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('click', onClickOutsideFlyout);
      if (mobileQuery) mobileQuery.removeEventListener('change', handleBreakpointChange);
      if (tabletQuery) tabletQuery.removeEventListener('change', handleBreakpointChange);
    });

    return {
      navigation, themeStore, layoutStore, currentRoute,
      onNavItemClick, activeGroupItems, slugify, onFlyoutNavClick,
    };
  },
};
</script>

<style scoped>
/* ===== Sidebar Base ===== */
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

/* ===== Sidebar Header ===== */
.sidebar-header {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  cursor: pointer;
}

/* ===== Mobile Header (hidden by default) ===== */
/* Moved BELOW .sidebar-header so display: none overrides display: flex */
.sidebar-header--mobile {
  display: none;
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

/* ===== Close Button (mobile overlay) ===== */
.sidebar-close-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--text-secondary);
  border-radius: var(--radius);
  margin-left: auto;
  padding: 0;
}

.sidebar-close-button:hover {
  background-color: var(--accent-light);
  color: var(--text-primary);
}

/* ===== Backdrop ===== */
.sidebar-backdrop {
  display: none;
}

/* ===== Tablet (768px – 1023px): Icon Rail ===== */
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar {
    width: var(--rail-width);
  }

  .sidebar-header--full {
    justify-content: center;
    padding: 1rem 0.5rem;
  }

  .sidebar-title,
  .sidebar-version {
    display: none;
  }

  .nav-category {
    font-size: 0;
    padding: 0.5rem 0;
    text-align: center;
  }

  .toggle-label {
    display: none;
  }

  .sidebar-footer {
    display: flex;
    justify-content: center;
  }
}

/* ===== Mobile (< 768px): Overlay ===== */
@media (max-width: 767px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 260px;
    z-index: var(--z-sidebar-overlay);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    height: 100vh;
    height: 100dvh;
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar-header--full {
    display: none;
  }

  .sidebar-header--mobile {
    display: flex;
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: var(--z-sidebar-backdrop);
  }

  :deep(.nav-item) {
    min-height: 44px;
    display: flex;
    align-items: center;
  }
}

/* ===== Backdrop Transitions ===== */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* ===== Tablet Rail Nav (hidden on mobile/desktop) ===== */
.sidebar-rail-nav {
  display: none;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar-nav {
    display: none;
  }

  .sidebar-rail-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    padding: 0.5rem 0;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .rail-category-button {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--radius);
    font-size: 1.25rem;
    transition: background-color 0.15s;
  }

  .rail-category-button:hover,
  .rail-category-button.active {
    background-color: var(--accent-light);
  }
}

/* ===== Flyout Panel ===== */
.sidebar-flyout {
  display: none;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar-flyout {
    display: block;
    position: fixed;
    top: 0;
    left: var(--rail-width);
    width: 200px;
    height: 100vh;
    background-color: var(--bg-sidebar);
    border-right: 1px solid var(--border);
    z-index: var(--z-flyout);
    padding: 0.75rem 0.5rem;
    overflow-y: auto;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.1);
  }

  .flyout-header {
    padding: 0.375rem 0.75rem;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.03125rem;
    color: var(--text-muted);
    margin-bottom: 0.25rem;
  }
}

/* ===== Flyout Transitions ===== */
.flyout-enter-active,
.flyout-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
