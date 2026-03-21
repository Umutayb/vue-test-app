# Phase 3 — Interactive & Dynamic Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 11 new interactive component pages (Modal, Toast, Tooltip & Popover, Drawer, Kanban, Drop Zone, Infinite Scroll, Loading States, Dynamic Form, Slider Indicator) across the Alerts/Frame/Windows, Interactions, and Elements categories, and fix the Radio Buttons layout.

**Architecture:** Same pattern as Phase 2 — each page is a standalone Vue 3 Options API SFC in `src/views/tools/`. Navigation entries added to `src/config/navigation.js`, routes registered in `src/router/index.js` via componentMap/descriptionMap. No new dependencies.

**Tech Stack:** Vue 3 Options API, Vue Router 4, CSS custom properties, HTML5 Drag and Drop API, Vue CLI

**Spec:** `docs/superpowers/specs/2026-03-21-phase3-interactive-dynamic-design.md`

---

## Background

The router pattern: add import at top of `src/router/index.js`, add `routeName: ComponentName` to `componentMap`, add `routeName: "description"` to `descriptionMap`. The nav config loop generates routes automatically.

CSS variables available: `--bg-primary`, `--bg-sidebar`, `--bg-input`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--accent`, `--accent-hover`, `--accent-light`, `--radius`.

---

## Task 1: Navigation config + router prep

**Files:**
- Modify: `src/config/navigation.js`
- Modify: `src/router/index.js`

- [ ] **Step 1: Add Phase 3 nav entries to `src/config/navigation.js`**

In the `"Alerts, Frame & Windows"` category, add after the existing `alerts` item:
```js
{ label: "Modal",             routeName: "modal",          path: "/modal" },
{ label: "Toast",             routeName: "toast",          path: "/toast" },
{ label: "Tooltip & Popover", routeName: "tooltip",        path: "/tooltip" },
{ label: "Drawer",            routeName: "drawer",         path: "/drawer" },
```

In the `"Elements"` category, add after `sliders`:
```js
{ label: "Slider Indicator",  routeName: "sliderIndicator", path: "/slider-indicator" },
```

In the `"Interactions"` category, add after `tall`:
```js
{ label: "Kanban",            routeName: "kanban",         path: "/kanban" },
{ label: "Drop Zone",         routeName: "dropzone",       path: "/dropzone" },
{ label: "Infinite Scroll",   routeName: "infiniteScroll", path: "/infinite-scroll" },
{ label: "Loading States",    routeName: "loading",        path: "/loading" },
{ label: "Dynamic Form",      routeName: "dynamicForm",    path: "/dynamic-form" },
```

- [ ] **Step 2: Add Phase 3 descriptions to `src/router/index.js` descriptionMap**

Add (without imports yet — pages don't exist yet, `if (component)` guard skips missing entries):
```js
modal:          "Modal dialogs — open, close, confirm, dismiss",
toast:          "Toast notifications — success, error, warning, info with auto-dismiss",
tooltip:        "Hover tooltips and click-triggered popovers",
drawer:         "Slide-in drawer panel from left or right",
kanban:         "Drag-and-drop Kanban board with three columns",
dropzone:       "Drag items between source list and drop target zone",
infiniteScroll: "Scrollable list that loads more items at the bottom",
loading:        "Spinner, skeleton, progress bar, and button loading states",
dynamicForm:    "Form with dynamically added and removed fields",
sliderIndicator: "Range slider with a floating value bubble that follows the thumb",
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/Ay/GitHub/vue-test-app && npm run lint && npm run build
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/config/navigation.js src/router/index.js
git commit -m "phase3: nav config and router prep for 9 new interactive pages"
```

---

## Task 2: Modal page

**Files:**
- Create: `src/views/tools/ModalPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/ModalPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Modal</h1>
    <p class="page-desc">Modal dialogs — open, close, confirm, dismiss</p>

    <section class="section">
      <button class="btn btn-primary" data-testid="modal-open" @click="open">Open Modal</button>
      <p class="status-text">Status: <span data-testid="modal-status">{{ status }}</span></p>
    </section>

    <template v-if="isOpen">
      <div class="modal-overlay" data-testid="modal-overlay" @click="cancel"></div>
      <div class="modal-dialog" data-testid="modal-dialog">
        <div class="modal-header">
          <h2 data-testid="modal-title">Confirm Action</h2>
          <button class="modal-x" data-testid="modal-cancel" @click="cancel">✕</button>
        </div>
        <p class="modal-body" data-testid="modal-body">Are you sure you want to proceed? This action cannot be undone.</p>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-testid="modal-cancel" @click="cancel">Cancel</button>
          <button class="btn btn-primary" data-testid="modal-confirm" @click="confirm">Confirm</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return { isOpen: false, status: 'idle' };
  },
  methods: {
    open()    { this.isOpen = true;  this.status = 'open'; },
    confirm() { this.isOpen = false; this.status = 'confirmed'; },
    cancel()  { this.isOpen = false; this.status = 'cancelled'; },
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.status-text { margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary); }
.status-text span { font-weight: 600; color: var(--accent); }
/* Buttons */
.btn { border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius); padding: 0.5rem 1.25rem; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-sidebar); color: var(--text-primary); border: 1px solid var(--border); }
.btn-secondary:hover { background: var(--border); }
/* Modal */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100;
}
.modal-dialog {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: var(--bg-primary); border-radius: var(--radius); padding: 1.5rem;
  min-width: 320px; max-width: 480px; width: 90%; z-index: 101;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.modal-header h2 { font-size: 1.1rem; color: var(--text-primary); margin: 0; }
.modal-x { background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--text-muted); padding: 0.25rem; }
.modal-x:hover { color: var(--text-primary); }
.modal-body { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1.5rem; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; }
</style>
```

**Note:** `modal-cancel` appears on both the ✕ button and the Cancel button — both close the modal with status "cancelled". This is intentional per the spec.

- [ ] **Step 2: Wire into router**

```js
import ModalPage from "@/views/tools/ModalPage.vue";
// componentMap:
modal: ModalPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/ModalPage.vue src/router/index.js
git commit -m "phase3: add Modal page"
```

---

## Task 3: Toast page

**Files:**
- Create: `src/views/tools/ToastPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/ToastPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Toast</h1>
    <p class="page-desc">Toast notifications with auto-dismiss after 3 seconds</p>

    <section class="section">
      <div class="btn-row">
        <button class="btn btn-success" data-testid="toast-trigger-success" @click="addToast('success')">Success</button>
        <button class="btn btn-error"   data-testid="toast-trigger-error"   @click="addToast('error')">Error</button>
        <button class="btn btn-warning" data-testid="toast-trigger-warning" @click="addToast('warning')">Warning</button>
        <button class="btn btn-info"    data-testid="toast-trigger-info"    @click="addToast('info')">Info</button>
      </div>
    </section>

    <div class="toast-container" data-testid="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast-${toast.type}`"
        :data-testid="`toast-${toast.id}`"
      >
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" :data-testid="`toast-close-${toast.id}`" @click="remove(toast.id)">×</button>
      </div>
    </div>
  </div>
</template>

<script>
const MESSAGES = {
  success: 'Operation completed successfully',
  error:   'Something went wrong',
  warning: 'Please check your input',
  info:    'Here is some information',
};

export default {
  data() {
    return { toasts: [], nextId: 1, timers: {} };
  },
  methods: {
    addToast(type) {
      const id = this.nextId++;
      this.toasts.push({ id, type, message: MESSAGES[type] });
      this.timers[id] = setTimeout(() => this.remove(id), 3000);
    },
    remove(id) {
      clearTimeout(this.timers[id]);
      delete this.timers[id];
      this.toasts = this.toasts.filter(t => t.id !== id);
    }
  },
  beforeUnmount() {
    Object.values(this.timers).forEach(clearTimeout);
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.btn-row { display: flex; flex-wrap: wrap; gap: 0.75rem; }
.btn { border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius); padding: 0.5rem 1.25rem; color: #fff; }
.btn-success { background: #22c55e; }
.btn-success:hover { background: #16a34a; }
.btn-error   { background: #ef4444; }
.btn-error:hover { background: #dc2626; }
.btn-warning { background: #f59e0b; }
.btn-warning:hover { background: #d97706; }
.btn-info    { background: var(--accent); }
.btn-info:hover { background: var(--accent-hover); }
/* Toast container */
.toast-container {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  display: flex; flex-direction: column; gap: 0.5rem; z-index: 200;
}
.toast {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  background: var(--bg-primary); border-radius: var(--radius);
  padding: 0.75rem 1rem; min-width: 260px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-left: 4px solid var(--border);
}
.toast-success { border-left-color: #22c55e; }
.toast-error   { border-left-color: #ef4444; }
.toast-warning { border-left-color: #f59e0b; }
.toast-info    { border-left-color: var(--accent); }
.toast-message { font-size: 0.875rem; color: var(--text-primary); }
.toast-close {
  background: none; border: none; cursor: pointer; font-size: 1.1rem;
  color: var(--text-muted); padding: 0; line-height: 1; flex-shrink: 0;
}
.toast-close:hover { color: var(--text-primary); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import ToastPage from "@/views/tools/ToastPage.vue";
// componentMap:
toast: ToastPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/ToastPage.vue src/router/index.js
git commit -m "phase3: add Toast page"
```

---

## Task 4: Tooltip & Popover page

**Files:**
- Create: `src/views/tools/TooltipPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/TooltipPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Tooltip &amp; Popover</h1>
    <p class="page-desc">Hover tooltips and click-triggered popovers</p>

    <section class="section">
      <h2>Tooltips (hover)</h2>
      <div class="trigger-row">
        <div v-for="n in 3" :key="n" class="tooltip-wrapper">
          <button
            class="btn"
            :data-testid="`tooltip-trigger-${n}`"
            @mouseenter="tooltipVisible[n] = true"
            @mouseleave="tooltipVisible[n] = false"
          >Hover me {{ n }}</button>
          <div v-show="tooltipVisible[n]" class="tooltip" :data-testid="`tooltip-content-${n}`">
            Tooltip {{ n }} content
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Popovers (click)</h2>
      <div class="trigger-row">
        <div v-for="n in 2" :key="n" class="popover-wrapper">
          <button
            class="btn"
            :data-testid="`popover-trigger-${n}`"
            @click.stop="togglePopover(n)"
          >Click me {{ n }}</button>
          <div v-show="popoverVisible[n]" class="popover" :data-testid="`popover-content-${n}`">
            <strong>Popover {{ n }}</strong>
            <p>This is popover {{ n }} content. Click outside to close.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tooltipVisible: { 1: false, 2: false, 3: false },
      popoverVisible: { 1: false, 2: false },
    };
  },
  methods: {
    togglePopover(n) {
      const current = this.popoverVisible[n];
      this.popoverVisible[1] = false;
      this.popoverVisible[2] = false;
      this.popoverVisible[n] = !current;
    },
    closeAll() {
      this.popoverVisible[1] = false;
      this.popoverVisible[2] = false;
    }
  },
  mounted() {
    this._clickHandler = () => this.closeAll();
    document.addEventListener('click', this._clickHandler);
  },
  beforeUnmount() {
    document.removeEventListener('click', this._clickHandler);
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; font-size: 1rem; color: var(--text-primary); }
.trigger-row { display: flex; flex-wrap: wrap; gap: 2rem; }
.btn {
  border: 1px solid var(--border); background: var(--bg-sidebar); color: var(--text-primary);
  cursor: pointer; font-size: 0.875rem; border-radius: var(--radius); padding: 0.5rem 1rem;
}
.btn:hover { background: var(--border); }
/* Tooltip */
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%);
  background: var(--text-primary); color: var(--bg-primary);
  border-radius: 4px; padding: 0.3rem 0.6rem; font-size: 0.75rem;
  white-space: nowrap; z-index: 10; pointer-events: none;
}
/* Popover */
.popover-wrapper { position: relative; display: inline-block; }
.popover {
  position: absolute; top: calc(100% + 6px); left: 0;
  background: var(--bg-primary); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem; min-width: 200px; z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover strong { font-size: 0.9rem; color: var(--text-primary); }
.popover p { margin-top: 0.4rem; font-size: 0.8rem; color: var(--text-secondary); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import TooltipPage from "@/views/tools/TooltipPage.vue";
// componentMap:
tooltip: TooltipPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/TooltipPage.vue src/router/index.js
git commit -m "phase3: add Tooltip & Popover page"
```

---

## Task 5: Drawer page

**Files:**
- Create: `src/views/tools/DrawerPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/DrawerPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Drawer</h1>
    <p class="page-desc">Slide-in drawer panel from left or right</p>

    <section class="section">
      <div class="btn-row">
        <button class="btn btn-primary" data-testid="drawer-open-left"  @click="openDrawer('left')">Open Left</button>
        <button class="btn btn-primary" data-testid="drawer-open-right" @click="openDrawer('right')">Open Right</button>
      </div>
      <p class="status-text">Status: <span data-testid="drawer-status">{{ status }}</span></p>
    </section>

    <template v-if="isOpen">
      <div class="drawer-overlay" data-testid="drawer-overlay" @click="close"></div>
      <div class="drawer-panel" data-testid="drawer-panel" :class="`drawer-${drawerSide}`">
        <div class="drawer-header">
          <h2>{{ drawerSide === 'left' ? 'Left Drawer' : 'Right Drawer' }}</h2>
          <button class="drawer-close-btn" data-testid="drawer-close" @click="close">✕</button>
        </div>
        <p class="drawer-body">This is the {{ drawerSide }} drawer panel. Use it to test slide-in navigation, filters, or detail panels.</p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return { isOpen: false, drawerSide: 'left', status: 'closed' };
  },
  methods: {
    openDrawer(side) { this.drawerSide = side; this.isOpen = true; this.status = side; },
    close()          { this.isOpen = false; this.status = 'closed'; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.btn-row { display: flex; gap: 0.75rem; }
.btn { border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius); padding: 0.5rem 1.25rem; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-hover); }
.status-text { margin-top: 1rem; font-size: 0.9rem; color: var(--text-secondary); }
.status-text span { font-weight: 600; color: var(--accent); }
/* Drawer */
.drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 100; }
.drawer-panel {
  position: fixed; top: 0; height: 100vh; width: 280px;
  background: var(--bg-primary); border: 1px solid var(--border);
  padding: 1.5rem; z-index: 101; display: flex; flex-direction: column; gap: 1rem;
}
.drawer-left  { left: 0; border-left: none; }
.drawer-right { right: 0; border-right: none; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; }
.drawer-header h2 { font-size: 1rem; color: var(--text-primary); margin: 0; }
.drawer-close-btn { background: none; border: none; cursor: pointer; font-size: 1.1rem; color: var(--text-muted); }
.drawer-close-btn:hover { color: var(--text-primary); }
.drawer-body { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import DrawerPage from "@/views/tools/DrawerPage.vue";
// componentMap:
drawer: DrawerPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/DrawerPage.vue src/router/index.js
git commit -m "phase3: add Drawer page"
```

---

## Task 6: Kanban page

**Files:**
- Create: `src/views/tools/KanbanPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/KanbanPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Kanban</h1>
    <p class="page-desc">Drag-and-drop Kanban board with three columns</p>

    <div class="board">
      <div
        v-for="(col, colKey) in columns"
        :key="colKey"
        class="kanban-column"
        :data-testid="`kanban-column-${colKey}`"
        @dragover.prevent
        @drop="onDrop(colKey)"
      >
        <div class="col-header">
          <span class="col-title">{{ col.label }}</span>
          <span class="col-count">{{ col.cards.length }}</span>
        </div>
        <div
          v-for="card in col.cards"
          :key="card.id"
          class="kanban-card"
          :data-testid="`kanban-card-${card.id}`"
          draggable="true"
          @dragstart="onDragStart(card.id, colKey)"
        >{{ card.text }}</div>
        <button
          class="add-btn"
          :data-testid="`kanban-add-${colKey}`"
          @click="addCard(colKey)"
        >+ Add card</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      draggingId: null,
      sourceCol: null,
      nextId: 8,
      columns: {
        todo: {
          label: 'To Do',
          cards: [
            { id: 1, text: 'Design wireframes' },
            { id: 2, text: 'Write unit tests' },
            { id: 3, text: 'Set up CI/CD' },
          ]
        },
        inprogress: {
          label: 'In Progress',
          cards: [
            { id: 4, text: 'Build login form' },
            { id: 5, text: 'API integration' },
          ]
        },
        done: {
          label: 'Done',
          cards: [
            { id: 6, text: 'Project setup' },
            { id: 7, text: 'Database schema' },
          ]
        }
      }
    };
  },
  methods: {
    onDragStart(id, colKey) {
      this.draggingId = id;
      this.sourceCol = colKey;
    },
    onDrop(targetCol) {
      if (!this.draggingId || targetCol === this.sourceCol) return;
      const src = this.columns[this.sourceCol].cards;
      const idx = src.findIndex(c => c.id === this.draggingId);
      if (idx < 0) return;
      const [card] = src.splice(idx, 1);
      this.columns[targetCol].cards.push(card);
      this.draggingId = null;
      this.sourceCol = null;
    },
    addCard(colKey) {
      const n = this.nextId++;
      this.columns[colKey].cards.push({ id: n, text: `New card ${n}` });
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 960px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.board { display: flex; gap: 1rem; align-items: flex-start; }
.kanban-column {
  flex: 1; background: var(--bg-sidebar); border-radius: var(--radius);
  padding: 0.75rem; min-height: 200px;
}
.col-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.col-title { font-weight: 600; font-size: 0.875rem; color: var(--text-primary); }
.col-count {
  background: var(--border); color: var(--text-muted); border-radius: 999px;
  padding: 0.1rem 0.5rem; font-size: 0.75rem;
}
.kanban-card {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 0.6rem 0.75rem; margin-bottom: 0.5rem; cursor: grab; font-size: 0.875rem;
  color: var(--text-primary);
}
.kanban-card:active { cursor: grabbing; opacity: 0.6; }
.add-btn {
  width: 100%; padding: 0.4rem; border: 1px dashed var(--border); border-radius: var(--radius);
  background: none; color: var(--text-muted); cursor: pointer; font-size: 0.8rem; margin-top: 0.25rem;
}
.add-btn:hover { background: var(--border); color: var(--text-secondary); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import KanbanPage from "@/views/tools/KanbanPage.vue";
// componentMap:
kanban: KanbanPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/KanbanPage.vue src/router/index.js
git commit -m "phase3: add Kanban page"
```

---

## Task 7: Drop Zone page

**Files:**
- Create: `src/views/tools/DropZonePage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/DropZonePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Drop Zone</h1>
    <p class="page-desc">Drag items from the source list into the drop target zone</p>

    <div class="dz-layout">
      <div class="dz-source">
        <h2>Source Items</h2>
        <div
          v-for="(item, i) in sourceItems"
          :key="item"
          class="dz-item"
          :data-testid="`dropzone-source-${i + 1}`"
          draggable="true"
          @dragstart="dragging = item"
        >{{ item }}</div>
      </div>

      <div
        class="dz-target"
        data-testid="dropzone-target"
        :class="{ 'drag-over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <p v-if="!droppedItems.length" class="dz-empty">Drop items here</p>
        <div
          v-for="(item, i) in droppedItems"
          :key="i"
          class="dz-item dz-dropped"
          :data-testid="`dropzone-dropped-${i + 1}`"
        >{{ item }}</div>
      </div>
    </div>

    <div class="dz-footer">
      <span data-testid="dropzone-count">{{ droppedItems.length }} item{{ droppedItems.length !== 1 ? 's' : '' }} in zone</span>
      <button class="clear-btn" data-testid="dropzone-clear" @click="droppedItems = []">Clear</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sourceItems: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'],
      droppedItems: [],
      dragging: null,
      isDragging: false,
    };
  },
  methods: {
    onDrop() {
      this.isDragging = false;
      if (this.dragging) {
        this.droppedItems.push(this.dragging);
        this.dragging = null;
      }
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.dz-layout { display: flex; gap: 1.5rem; }
.dz-source { flex: 1; }
.dz-source h2 { font-size: 1rem; color: var(--text-primary); margin-bottom: 0.75rem; }
.dz-item {
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius);
  padding: 0.6rem 0.75rem; margin-bottom: 0.5rem; cursor: grab; font-size: 0.875rem; color: var(--text-primary);
}
.dz-item:active { cursor: grabbing; }
.dz-target {
  flex: 1; min-height: 160px; border: 2px dashed var(--border); border-radius: var(--radius);
  padding: 0.75rem; transition: background 0.15s, border-color 0.15s;
}
.dz-target.drag-over { background: var(--accent-light); border-color: var(--accent); }
.dz-dropped { cursor: default; background: var(--accent-light); border-color: var(--accent); color: var(--accent); }
.dz-empty { color: var(--text-muted); font-size: 0.875rem; text-align: center; padding: 1rem; }
.dz-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
.dz-footer span { font-size: 0.875rem; color: var(--text-secondary); }
.clear-btn {
  padding: 0.3rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-secondary); cursor: pointer; font-size: 0.8rem;
}
.clear-btn:hover { background: var(--border); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import DropZonePage from "@/views/tools/DropZonePage.vue";
// componentMap:
dropzone: DropZonePage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/DropZonePage.vue src/router/index.js
git commit -m "phase3: add Drop Zone page"
```

---

## Task 8: Infinite Scroll page

**Files:**
- Create: `src/views/tools/InfiniteScrollPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/InfiniteScrollPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Infinite Scroll</h1>
    <p class="page-desc">Scrollable list that loads more items at the bottom</p>

    <p class="count-text" data-testid="scroll-count">Showing {{ items.length }} of {{ maxItems }} items</p>

    <div
      class="scroll-container"
      data-testid="scroll-container"
      @scroll="onScroll"
      ref="container"
    >
      <div
        v-for="item in items"
        :key="item.n"
        class="scroll-item"
        :data-testid="`scroll-item-${item.n}`"
      >Item {{ item.n }}</div>

      <div v-show="isLoading" class="scroll-loader" data-testid="scroll-loader">
        <span class="spinner"></span> Loading more...
      </div>
    </div>
  </div>
</template>

<script>
const BATCH = 10;
const MAX   = 50;

export default {
  data() {
    return { items: [], isLoading: false, maxItems: MAX };
  },
  mounted() {
    this.loadBatch();
  },
  methods: {
    loadBatch() {
      if (this.isLoading || this.items.length >= MAX) return;
      this.isLoading = true;
      setTimeout(() => {
        const start = this.items.length + 1;
        const end   = Math.min(start + BATCH - 1, MAX);
        for (let n = start; n <= end; n++) {
          this.items.push({ n });
        }
        this.isLoading = false;
      }, 800);
    },
    onScroll() {
      const el = this.$refs.container;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
        this.loadBatch();
      }
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.count-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
.scroll-container {
  height: 400px; overflow-y: scroll;
  border: 1px solid var(--border); border-radius: var(--radius);
}
.scroll-item {
  padding: 0.75rem 1rem; border-bottom: 1px solid var(--border);
  font-size: 0.875rem; color: var(--text-primary);
}
.scroll-loader {
  padding: 1rem; text-align: center; font-size: 0.875rem; color: var(--text-muted);
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
}
.spinner {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid var(--border); border-top-color: var(--accent);
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import InfiniteScrollPage from "@/views/tools/InfiniteScrollPage.vue";
// componentMap:
infiniteScroll: InfiniteScrollPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/InfiniteScrollPage.vue src/router/index.js
git commit -m "phase3: add Infinite Scroll page"
```

---

## Task 9: Loading States page

**Files:**
- Create: `src/views/tools/LoadingPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/LoadingPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Loading States</h1>
    <p class="page-desc">Spinner, skeleton, progress bar, and button loading states</p>

    <section class="section">
      <h2>Spinner</h2>
      <div class="spinner-lg" data-testid="loading-spinner"></div>
    </section>

    <section class="section">
      <h2>Skeleton Screen</h2>
      <button class="btn" data-testid="loading-skeleton-toggle" @click="showSkeleton = !showSkeleton">
        {{ showSkeleton ? 'Hide' : 'Show' }} Skeleton
      </button>
      <div v-show="showSkeleton" class="skeleton-group" data-testid="loading-skeleton">
        <div class="skeleton skeleton-line" style="width: 80%"></div>
        <div class="skeleton skeleton-line" style="width: 60%"></div>
        <div class="skeleton skeleton-line" style="width: 70%"></div>
      </div>
    </section>

    <section class="section">
      <h2>Skeleton Card</h2>
      <div class="skeleton-card" data-testid="loading-skeleton-card">
        <div class="skeleton skeleton-avatar"></div>
        <div class="skeleton-lines">
          <div class="skeleton skeleton-line" style="width: 70%"></div>
          <div class="skeleton skeleton-line" style="width: 50%"></div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Progress Bar Loader</h2>
      <div class="bar-track" data-testid="loading-bar">
        <div class="bar-fill"></div>
      </div>
    </section>

    <section class="section">
      <h2>Button Loading State</h2>
      <button class="btn btn-primary" data-testid="loading-btn" :disabled="btnLoading" @click="triggerBtn">
        <span v-if="btnLoading" class="btn-spinner"></span>
        {{ btnLoading ? 'Loading...' : 'Click Me' }}
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { showSkeleton: true, btnLoading: false, btnTimer: null };
  },
  methods: {
    triggerBtn() {
      if (this.btnLoading) return;
      this.btnLoading = true;
      this.btnTimer = setTimeout(() => { this.btnLoading = false; }, 2000);
    }
  },
  beforeUnmount() { clearTimeout(this.btnTimer); }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; font-size: 1rem; color: var(--text-primary); }
/* Spinner */
.spinner-lg {
  width: 40px; height: 40px;
  border: 4px solid var(--border); border-top-color: var(--accent);
  border-radius: 50%; animation: spin 0.8s linear infinite;
}
/* Skeleton */
.skeleton {
  background: var(--border); border-radius: 4px;
  animation: pulse 1.5s ease-in-out infinite;
}
.skeleton-line { height: 12px; margin-bottom: 0.6rem; }
.skeleton-group { margin-top: 0.75rem; padding: 1rem; background: var(--bg-sidebar); border-radius: var(--radius); }
.skeleton-card {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem; background: var(--bg-sidebar); border-radius: var(--radius); max-width: 360px;
}
.skeleton-avatar { width: 48px; height: 48px; border-radius: 50%; flex-shrink: 0; }
.skeleton-lines { flex: 1; }
/* Progress bar */
.bar-track {
  height: 4px; background: var(--border); border-radius: 999px; overflow: hidden;
}
.bar-fill {
  height: 100%; width: 40%; background: var(--accent); border-radius: 999px;
  animation: slide 1.5s ease-in-out infinite;
}
/* Button */
.btn { border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius); padding: 0.5rem 1.25rem; display: inline-flex; align-items: center; gap: 0.4rem; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover:not(:disabled) { background: var(--accent-hover); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.btn-spinner {
  width: 12px; height: 12px;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
@keyframes slide { 0% { transform: translateX(-150%); } 100% { transform: translateX(350%); } }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import LoadingPage from "@/views/tools/LoadingPage.vue";
// componentMap:
loading: LoadingPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/LoadingPage.vue src/router/index.js
git commit -m "phase3: add Loading States page"
```

---

## Task 10: Dynamic Form page

**Files:**
- Create: `src/views/tools/DynamicFormPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/DynamicFormPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Dynamic Form</h1>
    <p class="page-desc">Form with dynamically added and removed fields</p>

    <form data-testid="dynamic-form" @submit.prevent="onSubmit" class="dyn-form">
      <div v-for="(field, i) in fields" :key="field.id" class="field-row">
        <label class="field-label">{{ field.label }}</label>
        <input
          type="text"
          v-model="field.value"
          :data-testid="`dynamic-field-${field.id}`"
          :placeholder="`Enter ${field.label}`"
          class="field-input"
        />
        <button
          v-if="fields.length > 1"
          type="button"
          class="remove-btn"
          :data-testid="`dynamic-remove-${field.id}`"
          @click="removeField(i)"
        >Remove</button>
      </div>

      <div class="form-actions">
        <button type="button" class="btn btn-secondary" data-testid="dynamic-add" @click="addField">+ Add Field</button>
        <button type="submit" class="btn btn-primary" data-testid="dynamic-submit">Submit</button>
      </div>
    </form>

    <div v-if="submittedValues" class="result" data-testid="dynamic-result">
      <h2>Submitted Values</h2>
      <div v-for="(val, label) in submittedValues" :key="label" class="result-row">
        <strong>{{ label }}:</strong> {{ val || '(empty)' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [{ id: 1, label: 'Field 1', value: '' }],
      nextId: 2,
      fieldCount: 1,
      submittedValues: null,
    };
  },
  methods: {
    addField() {
      this.fieldCount++;
      this.fields.push({ id: this.nextId++, label: `Field ${this.fieldCount}`, value: '' });
    },
    removeField(index) {
      if (this.fields.length <= 1) return;
      this.fields.splice(index, 1);
    },
    onSubmit() {
      const result = {};
      this.fields.forEach(f => { result[f.label] = f.value; });
      this.submittedValues = result;
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.dyn-form { display: flex; flex-direction: column; gap: 0.75rem; }
.field-row { display: flex; align-items: center; gap: 0.75rem; }
.field-label { min-width: 80px; font-size: 0.875rem; color: var(--text-secondary); }
.field-input {
  flex: 1; padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem;
}
.field-input:focus { outline: none; border-color: var(--accent); }
.remove-btn {
  padding: 0.35rem 0.75rem; border: 1px solid #ef4444; border-radius: var(--radius);
  background: none; color: #ef4444; cursor: pointer; font-size: 0.8rem; white-space: nowrap;
}
.remove-btn:hover { background: #fef2f2; }
.form-actions { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
.btn { border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500; border-radius: var(--radius); padding: 0.5rem 1.25rem; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-sidebar); color: var(--text-primary); border: 1px solid var(--border); }
.btn-secondary:hover { background: var(--border); }
.result { margin-top: 2rem; padding: 1rem; background: var(--bg-sidebar); border-radius: var(--radius); }
.result h2 { font-size: 1rem; margin-bottom: 0.75rem; color: var(--text-primary); }
.result-row { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.4rem; }
.result-row strong { color: var(--text-primary); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import DynamicFormPage from "@/views/tools/DynamicFormPage.vue";
// componentMap:
dynamicForm: DynamicFormPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/DynamicFormPage.vue src/router/index.js
git commit -m "phase3: add Dynamic Form page"
```

---

## Task 11: Slider Indicator page

**Files:**
- Create: `src/views/tools/SliderIndicatorPage.vue`
- Modify: `src/router/index.js`

The slider thumb position must drive a floating value bubble. The bubble is positioned with a calc formula: `left: calc({pct*100}% + {8 - pct*16}px)` where pct = (value - min) / (max - min), and 8 is the thumb radius. This compensates for browser thumb constraint at the edges.

- [ ] **Step 1: Create `src/views/tools/SliderIndicatorPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Slider Indicator</h1>
    <p class="page-desc">Range slider with a floating value bubble that follows the thumb</p>

    <div class="slider-section">
      <h2>Basic Value Indicator</h2>
      <div class="slider-wrapper">
        <div
          class="indicator-bubble"
          :style="{ left: bubbleLeft(value, 0, 100) }"
          data-testid="slider-indicator-bubble"
        >{{ value }}</div>
        <input
          type="range"
          class="indicator-range"
          data-testid="slider-indicator"
          min="0" max="100"
          v-model.number="value"
        />
        <div class="range-labels"><span>0</span><span>100</span></div>
      </div>
      <p class="value-text">Current value: <span data-testid="slider-indicator-value">{{ value }}</span></p>
    </div>

    <div class="slider-section">
      <h2>Temperature Picker</h2>
      <div class="slider-wrapper">
        <div
          class="indicator-bubble"
          :class="tempColorClass"
          :style="{ left: bubbleLeft(temp, 0, 40) }"
          data-testid="slider-temp-bubble"
        >{{ temp }}°</div>
        <input
          type="range"
          class="indicator-range"
          data-testid="slider-temp"
          min="0" max="40"
          v-model.number="temp"
        />
        <div class="range-labels"><span>0°C</span><span>40°C</span></div>
      </div>
      <p class="value-text">Temperature: <span data-testid="slider-temp-value">{{ temp }}°C</span></p>
    </div>

    <div class="slider-section">
      <h2>Volume Control</h2>
      <div class="slider-wrapper">
        <div
          class="indicator-bubble"
          :style="{ left: bubbleLeft(volume, 0, 100) }"
          data-testid="slider-volume-bubble"
        >{{ volume }}</div>
        <input
          type="range"
          class="indicator-range"
          data-testid="slider-volume"
          min="0" max="100" step="5"
          v-model.number="volume"
        />
        <div class="range-labels"><span>0</span><span>100</span></div>
      </div>
      <p class="value-text">Volume: <span data-testid="slider-volume-value">{{ volume }}</span></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 50,
      temp: 20,
      volume: 60,
    };
  },
  computed: {
    tempColorClass() {
      if (this.temp <= 10) return 'bubble-cold';
      if (this.temp >= 30) return 'bubble-hot';
      return 'bubble-warm';
    },
  },
  methods: {
    bubbleLeft(val, min, max) {
      const pct = (val - min) / (max - min);
      return `calc(${pct * 100}% + ${8 - pct * 16}px)`;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.slider-section { margin-bottom: 2.5rem; }
.slider-section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1.25rem; }
.slider-wrapper { position: relative; padding-top: 2rem; }
.indicator-bubble {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  transition: left 0.05s linear;
}
.indicator-bubble::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--accent);
}
.bubble-cold { background: #3b82f6; }
.bubble-cold::after { border-top-color: #3b82f6; }
.bubble-hot  { background: #ef4444; }
.bubble-hot::after  { border-top-color: #ef4444; }
.bubble-warm { background: #f59e0b; }
.bubble-warm::after { border-top-color: #f59e0b; }
.indicator-range {
  width: 100%;
  accent-color: var(--accent);
  cursor: pointer;
}
.range-labels { display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem; }
.value-text { margin-top: 0.75rem; font-size: 0.875rem; color: var(--text-secondary); }
.value-text span { font-weight: 600; color: var(--text-primary); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import SliderIndicatorPage from "@/views/tools/SliderIndicatorPage.vue";
// componentMap:
sliderIndicator: SliderIndicatorPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/SliderIndicatorPage.vue src/router/index.js
git commit -m "phase3: add Slider Indicator page"
```

---

## Task 12: Fix Radio Buttons layout

**Files:**
- Modify: `src/views/tools/RadioButtonsPage.vue`

The current layout has the radio inputs and labels in a grid that doesn't look good — radio buttons are misaligned and the `Yes` option is missing `id="yes"` so its label's `for` attribute is broken. Fix the layout to be clean and aligned.

- [ ] **Step 1: Update `src/views/tools/RadioButtonsPage.vue`**

Replace the template and style entirely:

```vue
<template>
  <div>
    <div class="question-box">
      <h2>Do you like the site?</h2>
      <form>
        <div class="radio-group">
          <label class="radio-label">
            <input type="radio" name="like" id="yes" value="yes" @change="handleRadioChange" />
            <span>Yes</span>
          </label>
          <label class="radio-label">
            <input type="radio" name="like" id="impressive" value="impressive" @change="handleRadioChange" />
            <span>Impressive</span>
          </label>
          <label class="radio-label radio-label--disabled">
            <input type="radio" name="like" id="no" value="no" disabled />
            <span>No</span>
          </label>
        </div>
        <p v-if="thanks">Thanks!</p>
        <p v-if="wow">Isn't it!</p>
      </form>
    </div>
  </div>
</template>

<style>
.question-box {
  padding: 0.625rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  width: 100%;
}

.radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.radio-label--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="radio"] {
  margin: 0;
  accent-color: var(--accent);
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  flex-shrink: 0;
}

.radio-label--disabled input[type="radio"] {
  cursor: not-allowed;
}
</style>
```

Keep the `<script>` section unchanged (same methods).

- [ ] **Step 2: Lint and commit**

```bash
npm run lint
git add src/views/tools/RadioButtonsPage.vue
git commit -m "fix: clean up Radio Buttons layout and fix label association"
```

---

## Task 13: Final build verification

- [ ] **Step 1: Run full lint and build**

```bash
cd /Users/Ay/GitHub/vue-test-app && npm run lint && npm run build
```

Expected: Zero lint errors, build succeeds.

- [ ] **Step 2: Verify all new routes present in componentMap**

modal, toast, tooltip, drawer, kanban, dropzone, infiniteScroll, loading, dynamicForm, sliderIndicator

- [ ] **Step 3: Verify existing pages unaffected**

Spot-check: radiobuttons, forms, sortable, tabs, table all still in componentMap.

- [ ] **Step 4: Commit if any fixes needed**

```bash
git add -p
git commit -m "phase3: fix final build issues"
```
