# Phase 1 — Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Pickleib test app with a Clean & Modern theme, persistent sidebar navigation with uniform selectors, Pinia state management, and migrate all existing pages into the new shell.

**Architecture:** Two-panel layout (sidebar + content area). Single navigation config drives both sidebar and router. Pinia replaces mitt for theme state. CSS custom properties handle light/dark theming with no per-component logic.

**Tech Stack:** Vue 3, Vue Router 4, Pinia, CSS custom properties, Vue CLI

**Spec:** `docs/superpowers/specs/2026-03-21-phase1-foundation-design.md`

---

## Task 1: Install dependencies and clean up orphan files

**Files:**
- Modify: `package.json`
- Delete: `src/views/FormsPage.vue`

- [ ] **Step 1: Install Pinia**

Run: `npm install pinia`

- [ ] **Step 2: Uninstall mitt and @vueuse/core**

Run: `npm uninstall mitt @vueuse/core`

- [ ] **Step 3: Delete orphan FormsPage.vue**

Run: `rm src/views/FormsPage.vue`

The router imports from `src/views/categories/FormsPage.vue`, so this orphan at `src/views/FormsPage.vue` is unused.

- [ ] **Step 4: Note: build will fail until main.js and App.vue are updated in later tasks.** Do not attempt to build yet — proceed to commit.

- [ ] **Step 5: Commit**

```bash
git rm src/views/FormsPage.vue
git add package.json package-lock.json
git commit -m "Add pinia, remove mitt and @vueuse/core, delete orphan FormsPage"
```

---

## Task 2: Create CSS theme variables

**Files:**
- Rewrite: `src/styles/main.css`

- [ ] **Step 1: Write the global CSS with theme variables**

Replace the contents of `src/styles/main.css` with:

```css
/* ===== Theme Variables ===== */
:root {
  --bg-primary: #ffffff;
  --bg-sidebar: #f8fafc;
  --bg-input: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --accent: #6366f1;
  --accent-hover: #4f46e5;
  --accent-light: #ede9fe;
  --radius: 8px;
  --sidebar-width: 240px;
}

.dark {
  --bg-primary: #0f172a;
  --bg-sidebar: #0f172a;
  --bg-input: #1e293b;
  --text-primary: #e2e8f0;
  --text-secondary: #94a3b8;
  --text-muted: #475569;
  --border: #1e293b;
  --accent: #818cf8;
  --accent-hover: #6366f1;
  --accent-light: rgba(99, 102, 241, 0.15);
}

/* ===== Global Reset ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* ===== App Layout ===== */
#app {
  display: flex;
  min-height: 100vh;
}

/* ===== Typography ===== */
h1, h2, h3, h4 {
  color: var(--text-primary);
  line-height: 1.3;
}

h1 { font-size: 1.75rem; font-weight: 700; }
h2 { font-size: 1.375rem; font-weight: 600; margin-bottom: 0.25rem; }
h3 { font-size: 1.125rem; font-weight: 600; }

a {
  color: var(--accent);
  text-decoration: none;
}

a:hover {
  color: var(--accent-hover);
}

/* ===== Form Elements ===== */
input,
select,
textarea {
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--text-primary);
  background-color: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 0.5rem 0.75rem;
  outline: none;
  transition: border-color 0.15s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-light);
}

/* ===== Buttons ===== */
button,
input[type="submit"] {
  font-family: inherit;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  border-radius: var(--radius);
  padding: 0.5rem 1rem;
  transition: background-color 0.15s, transform 0.1s;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  color: #ffffff;
  font-weight: 500;
}

.btn-primary:hover {
  opacity: 0.9;
}

/* ===== Content Area ===== */
.page-content {
  flex: 1;
  padding: 2rem 2.5rem;
  overflow-y: auto;
}

.page-description {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/styles/main.css
git commit -m "Add CSS theme variables and global styles"
```

---

## Task 3: Create Pinia theme store

**Files:**
- Create: `src/stores/theme.js`

- [ ] **Step 1: Create the stores directory**

Run: `mkdir -p src/stores`

- [ ] **Step 2: Write the theme store**

Create `src/stores/theme.js`:

```js
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
```

- [ ] **Step 3: Commit**

```bash
git add src/stores/theme.js
git commit -m "Add Pinia theme store for dark mode"
```

---

## Task 4: Create navigation config

**Files:**
- Create: `src/config/navigation.js`

- [ ] **Step 1: Create the config directory**

Run: `mkdir -p src/config`

- [ ] **Step 2: Write the navigation config**

Create `src/config/navigation.js`:

```js
export const navigation = [
  {
    category: "Elements",
    items: [
      { label: "Radio Buttons", routeName: "radiobuttons", path: "/radiobuttons" },
    ]
  },
  {
    category: "Forms",
    items: [
      { label: "Full Form", routeName: "forms", path: "/forms" },
      { label: "Dropdown", routeName: "dropDown", path: "/dropdown" },
    ]
  },
  {
    category: "Alerts, Frame & Windows",
    items: [
      { label: "Alerts", routeName: "alerts", path: "/alerts" },
    ]
  },
  {
    category: "Widgets",
    items: [
      { label: "Widgets", routeName: "widgets", path: "/widgets" },
    ]
  },
  {
    category: "Interactions",
    items: [
      { label: "Sortable", routeName: "sortable", path: "/sortable" },
      { label: "Draggable", routeName: "draggable", path: "/draggable" },
      { label: "Droppable", routeName: "droppable", path: "/droppable" },
      { label: "Resizable", routeName: "resizable", path: "/resizable" },
      { label: "Tall Page", routeName: "tall", path: "/tall" },
    ]
  },
];

/**
 * Look up a nav item by route name.
 * Returns { label, routeName, path, category } or undefined.
 */
export function findNavItem(routeName) {
  for (const group of navigation) {
    const item = group.items.find(i => i.routeName === routeName);
    if (item) return { ...item, category: group.category };
  }
  return undefined;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/config/navigation.js
git commit -m "Add navigation config as single source of truth"
```

---

## Task 5: Create NavItem component

**Files:**
- Create: `src/components/layout/NavItem.vue`

- [ ] **Step 1: Create the layout components directory**

Run: `mkdir -p src/components/layout`

- [ ] **Step 2: Write NavItem.vue**

Create `src/components/layout/NavItem.vue`:

```vue
<template>
  <router-link
    :to="{ name: routeName }"
    class="nav-item"
    :class="{ active: isActive }"
    :data-testid="`nav-item-${routeName}`"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    routeName: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
.nav-item {
  display: block;
  padding: 0.4375rem 0.75rem 0.4375rem 1.5rem;
  color: var(--text-secondary);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-decoration: none;
  transition: background-color 0.15s, color 0.15s;
}

.nav-item:hover {
  background-color: var(--accent-light);
  color: var(--accent);
}

.nav-item.active {
  background-color: var(--accent-light);
  color: var(--accent);
  font-weight: 500;
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/NavItem.vue
git commit -m "Add NavItem component with uniform selectors"
```

---

## Task 6: Create AppSidebar component

**Files:**
- Create: `src/components/layout/AppSidebar.vue`

- [ ] **Step 1: Write AppSidebar.vue**

Create `src/components/layout/AppSidebar.vue`:

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/AppSidebar.vue
git commit -m "Add AppSidebar component with navigation and dark toggle"
```

---

## Task 7: Create AppBreadcrumb component

**Files:**
- Create: `src/components/layout/AppBreadcrumb.vue`

- [ ] **Step 1: Write AppBreadcrumb.vue**

Create `src/components/layout/AppBreadcrumb.vue`:

```vue
<template>
  <div v-if="navItem" class="breadcrumb" data-testid="breadcrumb">
    <span class="breadcrumb-category">{{ navItem.category }}</span>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-current">{{ navItem.label }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { findNavItem } from '@/config/navigation';

export default {
  setup() {
    const route = useRoute();
    const navItem = computed(() => findNavItem(route.name));
    return { navItem };
  },
};
</script>

<style scoped>
.breadcrumb {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.breadcrumb-separator {
  margin: 0 0.25rem;
}

.breadcrumb-current {
  color: var(--accent);
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/AppBreadcrumb.vue
git commit -m "Add AppBreadcrumb component"
```

---

## Task 8: Create HomePage

**Files:**
- Create: `src/views/HomePage.vue`

- [ ] **Step 1: Write HomePage.vue**

Create `src/views/HomePage.vue`:

```vue
<template>
  <div class="home-page">
    <h1>Pickleib Test Suite</h1>
    <p class="page-description">UI test automation target application</p>

    <div class="stats">
      <span class="stat">{{ totalComponents }} components</span>
      <span class="stat">{{ navigation.length }} categories</span>
    </div>

    <div class="category-grid">
      <router-link
        v-for="group in navigation"
        :key="group.category"
        :to="{ name: group.items[0].routeName }"
        class="home-card"
        :data-testid="`home-card-${group.items[0].routeName}`"
      >
        <h3>{{ group.category }}</h3>
        <p>{{ group.items.length }} {{ group.items.length === 1 ? 'component' : 'components' }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { navigation } from '@/config/navigation';

export default {
  setup() {
    const totalComponents = computed(() =>
      navigation.reduce((sum, group) => sum + group.items.length, 0)
    );
    return { navigation, totalComponents };
  },
};
</script>

<style scoped>
.home-page {
  max-width: 48rem;
}

.stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  font-size: 0.875rem;
  color: var(--text-muted);
  background-color: var(--accent-light);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  gap: 1rem;
}

.home-card {
  display: block;
  padding: 1.25rem;
  background-color: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.home-card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.home-card h3 {
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.home-card p {
  color: var(--text-muted);
  font-size: 0.8125rem;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/HomePage.vue
git commit -m "Add HomePage with category grid"
```

---

## Task 9: Rewrite main.js with Pinia (replace mitt)

**Files:**
- Rewrite: `src/main.js`

- [ ] **Step 1: Rewrite main.js**

Replace the contents of `src/main.js` with:

```js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./styles/main.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
router.isReady().then(() => app.mount("#app"));
```

This removes the `mitt` emitter and adds Pinia.

- [ ] **Step 2: Commit**

```bash
git add src/main.js
git commit -m "Replace mitt with Pinia in main.js"
```

---

## Task 10: Rewrite App.vue as shell layout

**Files:**
- Rewrite: `src/App.vue`

- [ ] **Step 1: Rewrite App.vue**

Replace the contents of `src/App.vue` with:

```vue
<template>
  <AppSidebar />
  <main class="page-content">
    <AppBreadcrumb />
    <router-view />
  </main>
</template>

<script>
import AppSidebar from '@/components/layout/AppSidebar.vue';
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue';

export default {
  components: {
    AppSidebar,
    AppBreadcrumb,
  },
};
</script>

<style>
/* App-level styles are in src/styles/main.css */
</style>
```

This removes the old dark mode logic, emitter usage, `@vueuse/core` import, and inline styles. The layout is now sidebar + content area.

- [ ] **Step 2: Commit**

```bash
git add src/App.vue
git commit -m "Rewrite App.vue as sidebar + content shell"
```

---

## Task 11: Rewrite router with meta and navigation config

**Files:**
- Rewrite: `src/router/index.js`

- [ ] **Step 1: Rewrite the router**

Replace the contents of `src/router/index.js` with:

```js
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import ElementsPage from "@/views/categories/ElementsPage.vue";
import FormsPage from "@/views/categories/FormsPage.vue";
import AlertsFrameWindowsPage from "@/views/categories/AlertsFrameWindowsPage.vue";
import WidgetsPage from "@/views/categories/WidgetsPage.vue";
import InteractionsPage from "@/views/categories/InteractionsPage.vue";
import SortablePage from "@/views/tools/SortablePage.vue";
import DropdownPage from "@/views/tools/DropDownPage.vue";
import TallPage from "@/views/tools/TallPage.vue";
import RadioButtonsPage from "@/views/tools/RadioButtonsPage.vue";

const componentMap = {
  radiobuttons: RadioButtonsPage,
  forms: FormsPage,
  dropDown: DropdownPage,
  alerts: AlertsFrameWindowsPage,
  widgets: WidgetsPage,
  sortable: SortablePage,
  draggable: InteractionsPage,
  droppable: InteractionsPage,
  resizable: InteractionsPage,
  tall: TallPage,
};

const descriptionMap = {
  radiobuttons: "Radio button interactions and state changes",
  forms: "A multi-field form with validation and submission modal",
  dropDown: "Country selector dropdown with search",
  alerts: "Click handlers, alerts, and window management",
  widgets: "Widget components — more coming in Phase 2",
  sortable: "Drag-and-drop sortable lists",
  draggable: "Draggable interaction components",
  droppable: "Droppable interaction components",
  resizable: "Resizable interaction components",
  tall: "Long scrollable page for scroll testing",
};

// Import navigation config for meta lookup
import { navigation } from "@/config/navigation";

// Build routes from navigation config
const pageRoutes = [];
for (const group of navigation) {
  for (const item of group.items) {
    const component = componentMap[item.routeName];
    if (component) {
      pageRoutes.push({
        path: item.path,
        name: item.routeName,
        component,
        meta: {
          category: group.category,
          description: descriptionMap[item.routeName] || "",
        },
      });
    }
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  // Redirects for old category-level routes
  { path: "/elements", redirect: "/radiobuttons" },
  { path: "/interactions", redirect: "/sortable" },
  ...pageRoutes,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

- [ ] **Step 2: Verify the app compiles**

Run: `npm run build`
Expected: Build should compile successfully (warnings about unused `this.emitter` in page components are acceptable). Runtime errors from emitter references will exist until Tasks 12–17 complete. If build fails due to lint errors, run `npm run lint -- --fix` and proceed.

- [ ] **Step 3: Commit**

```bash
git add src/router/index.js
git commit -m "Rewrite router to use navigation config with meta"
```

---

## Task 12: Migrate FormsPage / Full Form (remove emitter, apply theme)

**Files:**
- Modify: `src/views/categories/FormsPage.vue`

**CRITICAL: Preserve all element IDs, form field names, and text content.** External Playwright tests (pw-element-interactions) depend on: `#name`, `#email`, `#gender`, `#mobile`, `#dob`, `#hobbies`, `#currentAddress`, `#submit`, `#title`, `#submission-title`, the modal table structure, and page text like "Forms Page". Only CSS styling changes are safe.

- [ ] **Step 1: Update the template heading**

In the template, rename the `<h2>` from "Student Registration Form" to "Full Form":

Change:
```html
<h2>Student Registration Form</h2>
```
To:
```html
<h2>Full Form</h2>
```

Also change the `<h1>` page title from "Forms Page" to "Full Form":

Change:
```html
<h1 id="title">Forms Page</h1>
```
To:
```html
<h1 id="title">Full Form</h1>
```

All element IDs (`#name`, `#email`, `#gender`, `#mobile`, `#dob`, `#hobbies`, `#currentAddress`, `#submit`), form field names, and the modal table structure must remain exactly the same.

- [ ] **Step 2: Remove the VueDatePicker CSS import from FormsPage**

The import `@vuepic/vue-datepicker/dist/main.css` should stay (it's needed for the date picker).

- [ ] **Step 3: Update the styles**

Replace the `<style>` block in `src/views/categories/FormsPage.vue` with:

```css
<style>
form {
  width: 300px;
  margin: 0 auto;
  text-align: left;
}

label {
  display: block;
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-primary);
}

form input,
form select {
  width: 100%;
  margin-top: 0.3125rem;
}

input[type="submit"] {
  margin-top: 1.25rem;
  width: 100%;
  background: linear-gradient(135deg, var(--accent), #8b5cf6);
  color: #ffffff;
  font-weight: 500;
}

input[type="submit"]:hover {
  opacity: 0.9;
}

/* Error message */
.error-message {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

/* Modal styles */
.modal {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: var(--bg-primary);
  margin: 15% auto;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  width: 80%;
  max-width: 40rem;
}

/* Table styles */
.submitted-info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.submitted-info-table td {
  border: 1px solid var(--border);
  padding: 0.5rem;
  text-align: left;
  color: var(--text-primary);
}

.submitted-info-table .table-key {
  font-weight: bold;
  background-color: var(--bg-sidebar);
}

.close {
  color: var(--text-muted);
  float: right;
  font-size: 1.75rem;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: var(--text-primary);
  text-decoration: none;
  cursor: pointer;
}
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/views/categories/FormsPage.vue
git commit -m "Migrate FormsPage styles to CSS variables"
```

---

## Task 13: Migrate SortablePage (remove emitter, apply theme)

**Files:**
- Modify: `src/views/tools/SortablePage.vue`

- [ ] **Step 1: Remove emitter code from script**

In `src/views/tools/SortablePage.vue`, remove the `isDark: true` from `data()` and remove the entire `created()` hook that subscribes to the emitter:

Remove from `data()`:
```js
isDark: true
```

Remove entirely:
```js
created (){
    this.emitter.on('isDark', (evt) => {
      this.isDark = evt.isDark;
    })
},
```

- [ ] **Step 2: Update styles**

Replace the `<style>` block with:

```css
<style>
.drop-zone {
  width: 50%;
  margin: 1.5rem auto;
  background-color: var(--bg-sidebar);
  min-height: 10px;
  margin-bottom: 0.625rem;
  padding: 0.625rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.drag-el {
  background-color: var(--bg-input);
  color: var(--text-primary);
  margin-bottom: 0.625rem;
  padding: 0.5rem;
  border-radius: calc(var(--radius) / 2);
  border: 1px solid var(--border);
  cursor: grab;
}

.drag-el:active {
  cursor: grabbing;
}

.bold-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/views/tools/SortablePage.vue
git commit -m "Migrate SortablePage: remove emitter, apply theme"
```

---

## Task 14: Migrate DropDownPage (remove emitter, apply theme)

**Files:**
- Modify: `src/views/tools/DropDownPage.vue`

- [ ] **Step 1: Remove emitter code from script**

In `src/views/tools/DropDownPage.vue`, remove `isDark: true` from `data()` and remove the entire `mounted()` hook. Also remove the `:class="{ 'custom-dropdown': isDark }"` from the template — instead always apply the class.

Update the template's v-select to:
```html
<v-select :options="countriesList" id="countriesDropDown" class="themed-dropdown" />
```

Updated script (remove isDark and mounted, keep vue-select CSS import):
```js
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      countriesList: Object.values(require("countries-list").countries).map(country => country.name),
    };
  },
}
```

- [ ] **Step 2: Update styles**

Replace the `<style>` block with:

```css
<style>
.themed-dropdown {
  --vs-controls-color: var(--text-muted);
  --vs-border-color: var(--border);
  --vs-dropdown-bg: var(--bg-primary);
  --vs-dropdown-color: var(--text-secondary);
  --vs-dropdown-option-color: var(--text-secondary);
  --vs-selected-bg: var(--accent);
  --vs-selected-color: #ffffff;
  --vs-search-input-color: var(--text-primary);
  --vs-dropdown-option--active-bg: var(--accent-light);
  --vs-dropdown-option--active-color: var(--accent);
  max-width: 24rem;
  margin: 1rem auto;
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/views/tools/DropDownPage.vue
git commit -m "Migrate DropDownPage: remove emitter, apply theme"
```

---

## Task 15: Migrate AlertsFrameWindowsPage (apply theme)

**Files:**
- Modify: `src/views/categories/AlertsFrameWindowsPage.vue`

- [ ] **Step 1: Update styles**

Replace the `<style>` block in `src/views/categories/AlertsFrameWindowsPage.vue` with:

```css
<style>
.clickables {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1.25rem;
  padding: 0.625rem;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}

.button {
  padding: 0.375rem 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  cursor: pointer;
  text-align: center;
  background-color: var(--accent-light);
  color: var(--accent);
  height: 2.25rem;
  font-size: 0.875rem;
  transition: background-color 0.15s;
}

.button:hover {
  background-color: var(--accent);
  color: #ffffff;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/categories/AlertsFrameWindowsPage.vue
git commit -m "Migrate AlertsFrameWindowsPage styles to CSS variables"
```

---

## Task 16: Migrate remaining pages (ElementsPage, WidgetsPage, InteractionsPage, RadioButtonsPage)

**Files:**
- Modify: `src/views/categories/ElementsPage.vue`
- Modify: `src/views/categories/WidgetsPage.vue`
- Modify: `src/views/categories/InteractionsPage.vue`
- Modify: `src/views/tools/RadioButtonsPage.vue`

- [ ] **Step 1: Update ElementsPage.vue**

Replace the contents of `src/views/categories/ElementsPage.vue` with:

```vue
<template>
  <div>
    <h2>Elements</h2>
    <p class="page-description">UI element components for test automation</p>
    <ToolLayout :tools="tools"></ToolLayout>
  </div>
</template>

<script>
import ToolLayout from "@/components/tools/ToolLayout.vue";

export default {
  components: {
    ToolLayout
  },
  data() {
    return {
      tools: [
        { name: "Radio Buttons", routeName: "radiobuttons" }
      ],
    };
  }
}
</script>
```

(Removed the unused datepicker CSS import.)

- [ ] **Step 2: Update WidgetsPage.vue**

Replace the contents of `src/views/categories/WidgetsPage.vue` with:

```vue
<template>
  <div>
    <h2>Widgets</h2>
    <p class="page-description">Widget components — more coming in Phase 2</p>
  </div>
</template>
```

- [ ] **Step 3: Update InteractionsPage.vue**

Replace the contents of `src/views/categories/InteractionsPage.vue` with:

```vue
<template>
  <div>
    <h2>Interactions</h2>
    <p class="page-description">Drag, drop, sort, and resize components</p>
    <ToolLayout :tools="tools"></ToolLayout>
  </div>
</template>

<script>
import ToolLayout from "@/components/tools/ToolLayout.vue";

export default {
  components: {
    ToolLayout
  },
  data() {
    return {
      tools: [
        { name: "Sortable", routeName: "sortable" },
        { name: "Dropdown", routeName: "dropDown" },
        { name: "Resizable", routeName: "resizable" },
        { name: "Droppable", routeName: "droppable" },
        { name: "Draggable", routeName: "draggable" },
        { name: "Tall Page", routeName: "tall" },
      ],
    };
  }
}
</script>
```

(Removed unused datepicker CSS import.)

- [ ] **Step 4: Update RadioButtonsPage.vue styles**

Replace the `<style>` block in `src/views/tools/RadioButtonsPage.vue` with:

```css
<style>
.question-box {
  padding: 0.625rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  width: 100%;
}

.radio-group {
  display: grid;
  align-items: center;
  margin-bottom: 0.625rem;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 1rem;
}

.radio-button {
  display: flex;
  align-items: center;
}

.radio-button label {
  white-space: nowrap;
  display: flex;
  align-items: center;
  color: var(--text-primary);
}

input[type="radio"] {
  transform: scale(1);
  margin-right: 0.3125rem;
  accent-color: var(--accent);
}
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/views/categories/ElementsPage.vue src/views/categories/WidgetsPage.vue src/views/categories/InteractionsPage.vue src/views/tools/RadioButtonsPage.vue
git commit -m "Migrate ElementsPage, WidgetsPage, InteractionsPage, RadioButtonsPage"
```

---

## Task 17: Update CategoryCard and ToolButton (remove emitter, apply theme)

**Files:**
- Modify: `src/components/categories/CategoryCard.vue`
- Modify: `src/components/tools/ToolButton.vue`

- [ ] **Step 1: Update CategoryCard.vue**

Replace the contents of `src/components/categories/CategoryCard.vue` with:

```vue
<template>
  <router-link :to="{ name: routeName }" class="category-card">
    <h3>{{ categoryName }}</h3>
    <p>{{ categoryDescription }}</p>
  </router-link>
</template>

<script>
export default {
  props: {
    categoryName: String,
    categoryDescription: String,
    routeName: String,
  },
};
</script>

<style scoped>
.category-card {
  display: block;
  text-decoration: none;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 1.25rem;
  cursor: pointer;
  margin: 0.625rem;
  border-radius: var(--radius);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.category-card:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

.category-card h3 {
  color: var(--text-primary);
}

.category-card p {
  color: var(--text-secondary);
  font-size: 0.875rem;
}
</style>
```

- [ ] **Step 2: Update ToolButton.vue**

Replace the contents of `src/components/tools/ToolButton.vue` with:

```vue
<template>
  <router-link :to="{ name: routeName }" class="tool-button">
    <h3>{{ toolName }}</h3>
  </router-link>
</template>

<script>
export default {
  props: {
    toolName: String,
    routeName: String,
  },
};
</script>

<style scoped>
.tool-button {
  display: block;
  text-decoration: none;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 1.25rem;
  cursor: pointer;
  margin: 0.625rem;
  border-radius: var(--radius);
  transition: border-color 0.15s, box-shadow 0.15s;
}

.tool-button:hover {
  border-color: var(--accent);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/categories/CategoryCard.vue src/components/tools/ToolButton.vue
git commit -m "Migrate CategoryCard and ToolButton: remove emitter, apply theme"
```

---

## Task 18: Delete CategoryLayout.vue

**Files:**
- Delete: `src/components/categories/CategoryLayout.vue`

- [ ] **Step 1: Delete the file**

Run: `rm src/components/categories/CategoryLayout.vue`

This component is replaced by `HomePage.vue` and is no longer imported by the router.

- [ ] **Step 2: Commit**

```bash
git add -u src/components/categories/CategoryLayout.vue
git commit -m "Remove CategoryLayout, replaced by HomePage"
```

---

## Task 19: Build and verify

- [ ] **Step 1: Run the build**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run the dev server and verify visually**

Run: `npm run serve`

Check:
1. Home page shows category cards
2. Sidebar navigation works — clicking items loads the correct page
3. Active nav item is highlighted
4. Breadcrumbs show correct category > page
5. Dark mode toggle works (click the toggle at sidebar bottom)
6. All existing pages render correctly: Forms, Sortable, Dropdown, RadioButtons, Alerts, Tall Page
7. All `data-testid` attributes are present on nav items (`data-testid="nav-item-forms"`, etc.)

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: No errors. Fix any that appear.

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "Fix lint issues from Phase 1 migration"
```

- [ ] **Step 5: Commit all remaining changes**

Make sure working tree is clean:
Run: `git status`
Expected: `nothing to commit, working tree clean`
