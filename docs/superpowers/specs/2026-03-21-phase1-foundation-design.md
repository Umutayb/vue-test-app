# Phase 1 — Foundation: Visual Redesign, Sidebar Navigation & Infrastructure

## Overview

This spec covers Phase 1 of scaling up the Pickleib test app — a Vue 3 application that serves as a UI test automation target for QA packages and libraries. Phase 1 establishes the foundation: a new visual theme, persistent sidebar navigation with consistent selectors, Pinia state management, and migration of all existing pages into the new shell.

## Context & Constraints

- **Purpose**: The app is a test target for UI automation libraries. Every UI pattern must have predictable, consistent selectors.
- **Critical constraint**: Navigation selectors and routing logic must be uniform across the entire app. Test automation code across repos should not need per-page special handling.
- **Approach**: Incremental migration — the app stays functional throughout. No big-bang rewrite.
- **Tooling**: Stay on Vue CLI for now. Vite migration is out of scope.
- **Responsiveness**: Mobile/responsive layout is out of scope for Phase 1.

## Visual Direction

**Clean & Modern** — light, airy, rounded corners, with a proper dark mode toggle. Friendly enough for demos, functional enough for daily QA use.

### CSS Custom Properties

All theming uses CSS variables on `:root`, overridden under `.dark`:

```css
:root {
  --bg-primary: #ffffff;
  --bg-sidebar: #f8fafc;
  --bg-input: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --border: #e2e8f0;
  --accent: #6366f1;
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
  --accent-light: rgba(99, 102, 241, 0.15);
}
```

- No CSS framework — keeps selectors predictable for automation.
- Dark class toggles on `<html>` element, driven by Pinia theme store. Existing selectors like `.dark .drop-zone` and `.dark #app` will continue to work since `<html>` is an ancestor of all elements. The current `:class="{ dark: isDark }"` binding on `<div id="app">` is removed.
- All components consume these variables — no per-component dark mode logic.

## App Shell & Layout

### Structure

The app uses a two-panel layout:

- **Left**: Persistent sidebar (240px) with categories and nav items
- **Right**: Main content area with breadcrumb + `<router-view />`

### Sidebar Design

Categories are **static headings** (uppercase, muted color), not collapsible toggles. All nav items are always visible. This eliminates expand/collapse state management in tests.

Every nav item uses:
- CSS class: `.nav-item`
- Test selector: `data-testid="nav-item-{routeName}"` (e.g., `data-testid="nav-item-forms"`, `data-testid="nav-item-sortable"`) — unique per item, pattern-consistent across all items
- Active state: `.nav-item.active` with accent highlight
- Rendered by a single `NavItem.vue` component

Dark mode toggle sits at the bottom of the sidebar, rendered as a `<button>` with `data-testid="dark-mode-toggle"`.

### Sidebar Data Source

The sidebar is driven by a **single navigation config array** defined in `src/config/navigation.js`. This is the single source of truth for both the sidebar and the router:

```js
// src/config/navigation.js
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
      { label: "Student Registration", routeName: "forms", path: "/forms" },
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
```

The router imports this config and generates routes from it (combined with component imports). `AppSidebar.vue` imports and renders it directly. Adding a new page means:
1. Create the view component
2. Add one entry to `navigation.js`
3. Add the component import + route entry in `router/index.js`

This avoids dual-maintenance — the nav config is authoritative for structure, the router adds only the component mapping.

### Breadcrumbs

The content area shows a breadcrumb derived from route meta: `Category > Page Name`. This gives test automation a secondary way to verify current location.

## File Structure

```
src/
├── App.vue                    # Shell: sidebar + router-view wrapper
├── main.js                    # App entry, Pinia + router setup
├── router/
│   └── index.js               # All routes with meta (category, description)
├── config/
│   └── navigation.js          # Single source of truth for sidebar + routes
├── stores/
│   └── theme.js               # Pinia store: dark mode state
├── components/
│   ├── layout/
│   │   ├── AppSidebar.vue     # Sidebar component (single source of truth)
│   │   ├── NavItem.vue        # Individual nav link (.nav-item, data-testid)
│   │   └── AppBreadcrumb.vue  # Breadcrumb from route meta
│   ├── categories/
│   │   └── CategoryCard.vue   # Retained for potential home page use
│   └── tools/
│       ├── ToolButton.vue     # Retained
│       └── ToolLayout.vue     # Retained
├── views/
│   ├── HomePage.vue           # New landing page at /
│   ├── categories/
│   │   ├── ElementsPage.vue
│   │   ├── FormsPage.vue
│   │   ├── AlertsFrameWindowsPage.vue
│   │   ├── WidgetsPage.vue
│   │   └── InteractionsPage.vue
│   └── tools/
│       ├── SortablePage.vue
│       ├── DropDownPage.vue
│       ├── RadioButtonsPage.vue
│       └── TallPage.vue
├── styles/
│   └── main.css               # CSS variables, base styles, global resets
└── assets/
    ├── image.png
    └── logo.png
```

## Cleanup

### File removal

- `src/views/FormsPage.vue` — orphan duplicate of `src/views/categories/FormsPage.vue` (the router imports the `categories/` version). Delete.
- `src/components/categories/CategoryLayout.vue` — replaced by `HomePage.vue` as the `/` route component. Delete.

### Route path normalization

The current `/dropDown` path is normalized to `/dropdown` (lowercase) for consistency with all other routes. The route name stays `dropDown` for backward compatibility.

### Shared-component routes

The current router maps `/resizable`, `/droppable`, and `/draggable` all to `InteractionsPage.vue`. These are kept as separate routes for now but each gets its own sidebar nav item. In Phase 2+, they will be split into distinct page components.

### Dependency changes

- **Add**: `pinia`
- **Remove**: `mitt` (replaced by Pinia), `@vueuse/core` (only used for `useDark`, replaced by Pinia theme store)
- **Keep**: All other dependencies unchanged

## State Management

### Pinia Theme Store (`stores/theme.js`)

Replaces the current `mitt` emitter-based dark mode:

- `isDark` — reactive boolean, initialized from `localStorage` or system preference
- `toggleDark()` — flips state, persists to `localStorage`, toggles `.dark` on `<html>`
- Components read `isDark` from the store — no more per-component `emitter.on('isDark')` listeners

### Why Pinia over current approach

The current emitter pattern requires every component to:
1. Declare its own `isDark: true` data property
2. Subscribe to the emitter in `mounted`/`created`
3. Handle cleanup manually

Pinia gives reactive state that any component can read without boilerplate.

## Router Changes

Routes gain `meta` fields:

```js
{
  path: "/forms",
  name: "forms",
  component: FormsPage,
  meta: {
    category: "Forms",
    description: "A multi-field registration form with validation"
  }
}
```

- `category` — used by breadcrumbs to show the parent group. Tool pages like SortablePage use their parent category (e.g., `category: "Interactions"`). The sidebar reads categories directly from `navigation.js`, not from route meta.
- `description` — shown below the page title in the content area

Note: The `label` for sidebar display and breadcrumb page name comes from `navigation.js`, not from route meta. This avoids duplicating labels in two places. The breadcrumb component looks up the current route name in the navigation config to get the display label.

The home route `/` renders `HomePage.vue` instead of `CategoryLayout`.

### HomePage content

`HomePage.vue` shows:
- App title and a short description ("UI test automation target application")
- A grid of category cards (reusing the category data from `navigation.js`) — each card links to the first item in that category
- A count of total available components

This replaces the current `CategoryLayout` which rendered `CategoryCard` components. The same card-based navigation is preserved but restyled to match the new theme.

## Migration of Existing Pages

Each page keeps its existing functionality. Changes are limited to:

1. **Remove emitter dark mode code** — delete `emitter.on('isDark')` listeners and local `isDark` data properties
2. **Replace hardcoded colors** with CSS variable references (e.g., `background-color: var(--bg-primary)`)
3. **Remove scoped layout styles** that conflict with the new shell (margins, centering)
4. **Keep all interactive logic** — forms, drag-and-drop, dropdowns, etc. unchanged

### Page-specific notes

- **FormsPage**: Form inputs restyle to use `var(--bg-input)`, `var(--border)`, `var(--radius)`. Modal styles updated. Submit button uses accent gradient.
- **SortablePage**: Drop zones and drag elements themed via variables. Drag logic untouched.
- **DropDownPage**: vue-select custom CSS variables mapped to theme variables instead of hardcoded dark values.
- **RadioButtonsPage**: Styled to match new input theme.
- **ElementsPage, AlertsFrameWindowsPage, WidgetsPage, InteractionsPage**: Currently minimal — get proper page headings, descriptions, and placeholder content indicating what components will be added in Phase 2+.
- **TallPage**: Kept as-is (useful for scroll testing).

## What's NOT in Phase 1

- New component pages (Phase 2–4)
- Vitest/Cypress testing setup
- Vite migration
- CI/CD changes

## Future Phases (Context Only)

- **Phase 2**: Form inputs, navigation components, data display (tables, progress bars)
- **Phase 3**: Overlays/modals, advanced drag & drop, dynamic behavior (infinite scroll, lazy loading)
- **Phase 4**: Media, auth/state, edge cases (iframes, shadow DOM, stale elements)
