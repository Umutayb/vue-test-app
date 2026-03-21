# Phase 3 — Interactive & Dynamic Components

## Overview

Phase 3 adds 9 new interactive component pages across two existing categories: Alerts/Frame/Windows and Interactions. Every component demonstrates dynamic UI behavior (open/close, trigger/dismiss, scroll-loading, drag-drop) with stable `data-testid` selectors for automation.

## Context & Constraints

- Same rules as Phase 2: Vue 3 Options API, CSS custom properties, no new dependencies
- All 9 components get their own routes (all are interactive/stateful)
- `data-testid` naming follows the same pattern: `{component}-{descriptor}`
- No CSS framework — custom CSS using the theme variable system

## Navigation Config Changes

Add to `"Alerts, Frame & Windows"` category:
```js
{ label: "Modal",           routeName: "modal",    path: "/modal" },
{ label: "Toast",           routeName: "toast",    path: "/toast" },
{ label: "Tooltip & Popover", routeName: "tooltip", path: "/tooltip" },
{ label: "Drawer",          routeName: "drawer",   path: "/drawer" },
```

Add to `"Interactions"` category (after existing 5 items):
```js
{ label: "Kanban",          routeName: "kanban",        path: "/kanban" },
{ label: "Drop Zone",       routeName: "dropzone",      path: "/dropzone" },
{ label: "Infinite Scroll", routeName: "infiniteScroll", path: "/infinite-scroll" },
{ label: "Loading States",  routeName: "loading",       path: "/loading" },
{ label: "Dynamic Form",    routeName: "dynamicForm",   path: "/dynamic-form" },
```

## Router Changes

Add to `componentMap`:
```js
modal: ModalPage, toast: ToastPage, tooltip: TooltipPage, drawer: DrawerPage,
kanban: KanbanPage, dropzone: DropZonePage, infiniteScroll: InfiniteScrollPage,
loading: LoadingPage, dynamicForm: DynamicFormPage,
```

Add to `descriptionMap`:
```js
modal:         "Modal dialogs — open, close, confirm, dismiss",
toast:         "Toast notifications — success, error, warning, info with auto-dismiss",
tooltip:       "Hover tooltips and click-triggered popovers",
drawer:        "Slide-in drawer panel from left or right",
kanban:        "Drag-and-drop Kanban board with three columns",
dropzone:      "Drag items between source list and drop target zone",
infiniteScroll: "Scrollable list that loads more items at the bottom",
loading:       "Spinner, skeleton, progress bar, and button loading states",
dynamicForm:   "Form with dynamically added and removed fields",
```

## File Structure

New files:
```
src/views/tools/
├── ModalPage.vue
├── ToastPage.vue
├── TooltipPage.vue
├── DrawerPage.vue
├── KanbanPage.vue
├── DropZonePage.vue
├── InfiniteScrollPage.vue
├── LoadingPage.vue
└── DynamicFormPage.vue
```

## Component Specifications

### 1. Modal (`/modal`, `ModalPage.vue`)

A button opens a modal overlay. The modal has a title, body, confirm and cancel buttons.

**Testids:**
- `modal-open` — button that opens the modal
- `modal-overlay` — the dark backdrop div (clicking it closes the modal)
- `modal-dialog` — the white modal box
- `modal-title` — heading inside the modal
- `modal-body` — paragraph body text
- `modal-confirm` — "Confirm" button (closes + sets status to "confirmed")
- `modal-cancel` — "Cancel" / "✕" button (closes + sets status to "cancelled")
- `modal-status` — text showing current status: "idle" | "open" | "confirmed" | "cancelled"

**Behavior:**
- Initial status: "idle"
- Clicking `modal-open` → status = "open", modal visible
- Clicking `modal-confirm` → modal closes, status = "confirmed"
- Clicking `modal-cancel` or ✕ → modal closes, status = "cancelled"
- Clicking `modal-overlay` → modal closes, status = "cancelled"
- Modal shown with `v-if` (not `v-show`) so DOM is absent when closed

**Content:** Title: "Confirm Action". Body: "Are you sure you want to proceed? This action cannot be undone."

**Styles:** Overlay: fixed fullscreen, `background: rgba(0,0,0,0.5)`, `z-index: 100`. Dialog: centered (flex on overlay), `background: var(--bg-primary)`, `border-radius: var(--radius)`, `padding: 1.5rem`, `min-width: 320px`, `max-width: 480px`. Header has a ✕ close button top-right.

---

### 2. Toast (`/toast`, `ToastPage.vue`)

Trigger buttons fire toasts that auto-dismiss after 3 seconds. Multiple toasts can be active simultaneously.

**Testids:**
- `toast-trigger-success` — "Success" button
- `toast-trigger-error` — "Error" button
- `toast-trigger-warning` — "Warning" button
- `toast-trigger-info` — "Info" button
- `toast-container` — the container div holding active toasts (fixed position, bottom-right)
- Each active toast: `data-testid="toast-{n}"` where n is the toast's `id` (auto-incrementing integer starting at 1, not position)
- Each toast's close button: `data-testid="toast-close-{n}"`

**Behavior:**
- Each button adds a toast object `{ id, type, message }` to a `toasts` array
- After 3000ms the toast is removed (use `setTimeout`, clear on manual close)
- Manual close removes the toast immediately
- Toast messages: "Operation completed successfully" / "Something went wrong" / "Please check your input" / "Here is some information"

**Styles:** Toast container: fixed, bottom 1.5rem, right 1.5rem, z-index 200, flex column gap 0.5rem. Each toast: `background: var(--bg-primary)`, `border-left: 4px solid {type-color}`, `border-radius: var(--radius)`, `padding: 0.75rem 1rem`, `min-width: 260px`, `box-shadow: 0 4px 12px rgba(0,0,0,0.15)`. Type colors: success=#22c55e, error=#ef4444, warning=#f59e0b, info=var(--accent). Dismiss button: small `×` at right.

---

### 3. Tooltip & Popover (`/tooltip`, `TooltipPage.vue`)

Tooltips (hover-triggered) and popovers (click-triggered, click-away to close).

**Tooltips section** — 3 trigger elements:
- Trigger buttons: `data-testid="tooltip-trigger-1"`, `"tooltip-trigger-2"`, `"tooltip-trigger-3"`
- Tooltip content divs: `data-testid="tooltip-content-1"`, `"tooltip-content-2"`, `"tooltip-content-3"`
- Each tooltip is shown with `v-show` bound to a `tooltipVisible[n]` boolean
- Shown on `@mouseenter`, hidden on `@mouseleave`
- Tooltip is absolutely positioned above/below the trigger using CSS `position: relative` wrapper

**Popovers section** — 2 trigger buttons:
- Triggers: `data-testid="popover-trigger-1"`, `"popover-trigger-2"`
- Content: `data-testid="popover-content-1"`, `"popover-content-2"`
- Shown on click, hidden on second click or clicking outside (use `@click.stop` on trigger, `@click` on document in `mounted`/`beforeUnmount`)
- Popovers have more content than tooltips: a title + short paragraph

**Styles:** Tooltip: small, `background: var(--text-primary)`, `color: var(--bg-primary)`, `border-radius: 4px`, `padding: 0.3rem 0.6rem`, `font-size: 0.75rem`, `white-space: nowrap`, `position: absolute`. Popover: `background: var(--bg-primary)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`, `padding: 1rem`, `min-width: 200px`, `position: absolute`.

---

### 4. Drawer (`/drawer`, `DrawerPage.vue`)

A slide-in panel from the left or right side of the screen.

**Testids:**
- `drawer-open-left` — button to open left drawer
- `drawer-open-right` — button to open right drawer
- `drawer-overlay` — dark backdrop (clicking closes)
- `drawer-panel` — the sliding panel div, with class `.drawer-left` or `.drawer-right` depending on which was opened
- `drawer-close` — close button inside the panel
- `drawer-status` — text showing: "closed" | "left" | "right"

**Behavior:**
- Opening left: `drawerSide = 'left'`, `isOpen = true`
- Opening right: `drawerSide = 'right'`, `isOpen = true`
- Closing (any method): `isOpen = false`
- Panel shown with `v-if="isOpen"`

**Panel content:** A heading ("Left Drawer" or "Right Drawer"), a short paragraph, and the close button.

**Styles:** Overlay: fixed fullscreen, `background: rgba(0,0,0,0.4)`, z-index 100. Panel: fixed, full height, `width: 280px`, `background: var(--bg-primary)`, `border: 1px solid var(--border)`, `padding: 1.5rem`, z-index 101. `.drawer-left`: `left: 0; top: 0`. `.drawer-right`: `right: 0; top: 0`. No CSS transitions needed (v-if show/hide is immediate).

---

### 5. Kanban (`/kanban`, `KanbanPage.vue`)

Three-column Kanban board with HTML5 drag-and-drop between columns.

**Testids:**
- `kanban-column-todo` — "To Do" column container
- `kanban-column-inprogress` — "In Progress" column container
- `kanban-column-done` — "Done" column container
- Each card: `data-testid="kanban-card-{id}"` where id is the card's unique integer id
- Each column's "Add" button: `data-testid="kanban-add-todo"`, `"kanban-add-inprogress"`, `"kanban-add-done"`

**Initial data:**
```js
columns: {
  todo:       { label: 'To Do',       cards: [
    { id: 1, text: 'Design wireframes' },
    { id: 2, text: 'Write unit tests' },
    { id: 3, text: 'Set up CI/CD' },
  ]},
  inprogress: { label: 'In Progress', cards: [
    { id: 4, text: 'Build login form' },
    { id: 5, text: 'API integration' },
  ]},
  done:       { label: 'Done',        cards: [
    { id: 6, text: 'Project setup' },
    { id: 7, text: 'Database schema' },
  ]},
}
```

**Drag behavior:**
- `@dragstart` on card: store `draggingCardId` and `sourceColumn` in data
- `@dragover.prevent` on column: allow drop
- `@drop` on column: move card from sourceColumn to target column

**Add card:** Clicking "Add" generates a new card with auto-incrementing id and text "New card {n}", appended to that column.

**Styles:** Three columns in a flex row, equal width. Column header bold. Cards: `background: var(--bg-primary)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`, `padding: 0.75rem`, `margin-bottom: 0.5rem`, `cursor: grab`. Dragging card: `opacity: 0.5`. Column `background: var(--bg-sidebar)`, `border-radius: var(--radius)`, `padding: 0.75rem`.

---

### 6. Drop Zone (`/dropzone`, `DropZonePage.vue`)

Drag items from a source list into a target drop zone. Items accumulate in the zone; a Clear button resets it.

**Testids:**
- `dropzone-source-{n}` — n is the item's index (1-indexed) in the source list
- `dropzone-target` — the drop zone div
- `dropzone-dropped-{n}` — n is the item's index (1-indexed) in the dropped items list
- `dropzone-clear` — button to clear dropped items
- `dropzone-count` — shows "X items in zone"

**Source items** (5 items, static labels): "Alpha", "Beta", "Gamma", "Delta", "Epsilon"

**Behavior:**
- Dragging a source item and dropping it on the target adds it to `droppedItems` array
- Items can be dropped multiple times (duplicates allowed)
- Drop zone shows `.drag-over` class while dragged item is over it
- Clear empties `droppedItems`

**Styles:** Two-panel layout: source list on left, drop target on right. Drop target: `min-height: 120px`, dashed border, `background: var(--accent-light)` on drag-over.

---

### 7. Infinite Scroll (`/infinite-scroll`, `InfiniteScrollPage.vue`)

A fixed-height scrollable container that loads 10 more items when scrolled near the bottom.

**Testids:**
- `scroll-container` — the scrollable div (fixed height, `overflow-y: scroll`)
- `scroll-item-{n}` — each item, 1-indexed by the item's number (not position)
- `scroll-loader` — loading indicator (`v-show="isLoading"`)
- `scroll-count` — "Showing X of Y items" text

**Behavior:**
- Initial: 10 items loaded (`totalItems = 10`, `maxItems = 50`)
- `@scroll` handler on the container: when `scrollTop + clientHeight >= scrollHeight - 50`, trigger load
- Loading: set `isLoading = true`, wait 800ms (setTimeout), add 10 more items, `isLoading = false`
- Items are `{ n: number, text: "Item {n}" }`
- Stop loading when `totalItems >= maxItems`
- Loader hidden after max reached

**Styles:** Scroll container: `height: 400px`, `overflow-y: scroll`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`. Each item: `padding: 0.75rem 1rem`, `border-bottom: 1px solid var(--border)`. Loader: centered text "Loading more..." with a spinner. Count display above the scroll container.

---

### 8. Loading States (`/loading`, `LoadingPage.vue`)

Demonstrates common loading UI patterns. Toggle buttons show/hide each state.

**Sections and testids:**

**Spinner:** A CSS-animated circular spinner, always visible.
- `data-testid="loading-spinner"`

**Skeleton screen:** Three skeleton "lines" (grey blocks) that pulse. Shown when `showSkeleton = true`.
- Toggle: `data-testid="loading-skeleton-toggle"` (button)
- Container: `data-testid="loading-skeleton"` (shown/hidden)

**Skeleton card:** A full card-shaped skeleton (avatar circle + lines). Always visible.
- `data-testid="loading-skeleton-card"`

**Progress bar loader:** A thin animated bar at 100% width that loops. Always visible.
- `data-testid="loading-bar"`

**Button loading state:** A button that when clicked enters loading state for 2 seconds, then returns to normal.
- `data-testid="loading-btn"` — button, shows spinner + "Loading..." when `btnLoading = true`, otherwise "Click Me"

**Styles:** Spinner: 40px circle, `border: 4px solid var(--border)`, `border-top-color: var(--accent)`, `border-radius: 50%`, `animation: spin 0.8s linear infinite`. Skeleton items: `background: var(--border)`, `border-radius: 4px`, `animation: pulse 1.5s ease-in-out infinite` (opacity 0.4–1). Progress bar: `height: 3px`, `background: var(--accent)`, `animation: slide 1.5s ease-in-out infinite` (translateX -100% to 100%).

---

### 9. Dynamic Form (`/dynamic-form`, `DynamicFormPage.vue`)

A form where users can add and remove text input fields dynamically. Submitting shows a summary of values.

**Testids:**
- `dynamic-form` — the form element
- `dynamic-field-{n}` — each input, 1-indexed by field's `id` (not position)
- `dynamic-remove-{n}` — remove button for field n (not shown for the first field — minimum 1 field)
- `dynamic-add` — "Add Field" button
- `dynamic-submit` — submit button
- `dynamic-result` — div showing submitted values (v-if submission happened)

**Behavior:**
- Initial state: 1 field `{ id: 1, label: 'Field 1', value: '' }`
- "Add Field": appends `{ id: nextId++, label: 'Field {n}', value: '' }` (n is count of total fields ever created)
- "Remove Field n": removes that field from the array. Remove button not rendered for last remaining field.
- Submit: `e.preventDefault()`, sets `submittedValues` to current `{ label: value }` map, shows result div
- Result div shows each field label and its value

**Styles:** Each field row: `display: flex; gap: 0.5rem; align-items: center`. Input: `flex: 1`. Remove button: small, red-tinted. Add and Submit buttons use the `.btn` pattern from ButtonsPage.

## What's NOT in Phase 3

- Animated transitions (CSS transition/animation on modal/drawer open)
- Nested modals or drawer-within-drawer
- Toast positioning options (always bottom-right)
- Kanban drag to reorder within a column
