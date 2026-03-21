# Phase 4 — Media, Auth & State, Edge Cases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 8 new pages (Drag Progress, Image Gallery, Carousel, Login Form, Pinia Counter, Long List, Multi-step Form, State Viewer) across 3 new categories, plus fix 6 legacy pages (Sortable, Dropdown, Draggable, Droppable, Resizable, Tall Page).

**Architecture:** Same pattern as Phases 2–3 — Vue 3 Options API SFCs in `src/views/tools/`. New categories added to `src/config/navigation.js`. Routes registered in `src/router/index.js` via componentMap/descriptionMap. Pinia counter adds a new `src/stores/counter.js`. No new npm dependencies.

**Tech Stack:** Vue 3 Options API, Vue Router 4, Pinia (already installed), CSS custom properties, mouse events for drag interactions

**Spec:** `docs/superpowers/specs/2026-03-21-phase4-media-auth-edge-design.md`

---

## Background

Router pattern: import at top of `src/router/index.js`, add `routeName: ComponentName` to `componentMap`, add `routeName: "description"` to `descriptionMap`. The nav config loop generates routes automatically from `src/config/navigation.js`.

CSS variables: `--bg-primary`, `--bg-sidebar`, `--bg-input`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border`, `--accent`, `--accent-hover`, `--accent-light`, `--radius`.

Existing Pinia setup: `src/main.js` already calls `app.use(createPinia())`. The theme store is at `src/stores/theme.js`. New counter store goes in `src/stores/counter.js`.

---

## Task 1: Navigation config + router prep

**Files:**
- Modify: `src/config/navigation.js`
- Modify: `src/router/index.js`

- [ ] **Step 1: Update `src/config/navigation.js`**

In the `"Elements"` category, add after `sliderIndicator`:
```js
{ label: "Drag Progress",   routeName: "dragProgress",  path: "/drag-progress" },
```

Append three new categories at the end of the navigation array:
```js
{
  category: "Media",
  items: [
    { label: "Image Gallery", routeName: "gallery",  path: "/gallery" },
    { label: "Carousel",      routeName: "carousel", path: "/carousel" },
  ]
},
{
  category: "Auth & State",
  items: [
    { label: "Login Form",    routeName: "loginForm",    path: "/login-form" },
    { label: "Pinia Counter", routeName: "piniaCounter", path: "/pinia-counter" },
  ]
},
{
  category: "Edge Cases",
  items: [
    { label: "Long List",       routeName: "longList",    path: "/long-list" },
    { label: "Multi-step Form", routeName: "multistep",   path: "/multistep" },
    { label: "State Viewer",    routeName: "stateViewer", path: "/state-viewer" },
  ]
},
```

- [ ] **Step 2: Add Phase 4 descriptions to `src/router/index.js` descriptionMap**

```js
dragProgress: "Click or drag on a progress bar to set its fill percentage",
gallery:      "Image grid with click-to-zoom overlay",
carousel:     "Auto-playing slideshow with prev/next navigation and dot indicators",
loginForm:    "Login form with validation, error, and success states",
piniaCounter: "Shared Pinia counter with increment, decrement, and reset",
longList:     "200-item list with live search filter and count display",
multistep:    "Three-step form wizard with validation and step indicators",
stateViewer:  "Toggle between empty, loading, error, and populated UI states",
```

- [ ] **Step 3: Verify build**

```bash
cd /Users/Ay/GitHub/vue-test-app && npm run lint && npm run build
```

- [ ] **Step 4: Verify build and commit**

```bash
cd /Users/Ay/GitHub/vue-test-app && npm run lint && npm run build
git add src/config/navigation.js src/router/index.js
git commit -m "phase4: nav config and router prep for 8 new pages"
```

---

## Task 2: Fix Sortable page

**Files:**
- Modify: `src/views/tools/SortablePage.vue`

Rewrite with data-testids and theme-consistent styling. Keep the two-list drag-to-move concept. Items are 1-indexed.

- [ ] **Step 1: Rewrite `src/views/tools/SortablePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Sortable</h1>
    <p class="page-desc">Drag items between the two lists</p>

    <div class="lists-layout">
      <div
        class="sort-list"
        data-testid="sortable-list-1"
        @drop.prevent="onDrop($event, 1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <p class="list-title">First List <span class="list-count" data-testid="sortable-count-1">{{ getList(1).length }} items</span></p>
        <div
          class="sort-item"
          v-for="item in getList(1)"
          :key="item.id"
          :data-testid="`sortable-item-${item.id}`"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >{{ item.title }}</div>
      </div>

      <div
        class="sort-list"
        data-testid="sortable-list-2"
        @drop.prevent="onDrop($event, 2)"
        @dragover.prevent
        @dragenter.prevent
      >
        <p class="list-title">Second List <span class="list-count" data-testid="sortable-count-2">{{ getList(2).length }} items</span></p>
        <div
          class="sort-item"
          v-for="item in getList(2)"
          :key="item.id"
          :data-testid="`sortable-item-${item.id}`"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, title: 'Item A', list: 1 },
        { id: 2, title: 'Item B', list: 1 },
        { id: 3, title: 'Item C', list: 1 },
        { id: 4, title: 'Item D', list: 2 },
        { id: 5, title: 'Item E', list: 2 },
      ],
    };
  },
  methods: {
    getList(list) {
      return this.items.filter(item => item.list === list);
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemID', item.id);
    },
    onDrop(event, newList) {
      const itemID = parseInt(event.dataTransfer.getData('itemID'), 10);
      const idx = this.items.findIndex(item => item.id === itemID);
      if (idx !== -1) {
        this.items[idx].list = newList;
      }
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.lists-layout { display: flex; gap: 1.5rem; }
.sort-list {
  flex: 1; min-height: 120px;
  background: var(--bg-sidebar); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 0.75rem;
}
.list-title { font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; display: flex; justify-content: space-between; }
.list-count { font-weight: 400; font-size: 0.8rem; color: var(--text-muted); }
.sort-item {
  background: var(--bg-primary); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 0.6rem 0.75rem;
  margin-bottom: 0.5rem; cursor: grab; color: var(--text-primary); font-size: 0.875rem;
}
.sort-item:active { cursor: grabbing; }
</style>
```

- [ ] **Step 2: Lint and commit**

```bash
npm run lint
git add src/views/tools/SortablePage.vue
git commit -m "fix: rewrite Sortable page with data-testids and theme styling"
```

---

## Task 3: Fix Dropdown page

**Files:**
- Modify: `src/views/tools/DropDownPage.vue`

Replace `vue-select` + `countries-list` with a custom implementation using only native browser APIs and Vue 3.

- [ ] **Step 1: Rewrite `src/views/tools/DropDownPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Dropdown</h1>
    <p class="page-desc">Native and custom dropdown variants</p>

    <!-- Single select -->
    <div class="section">
      <h2>Single Select</h2>
      <select class="styled-select" data-testid="dropdown-single" v-model="singleValue">
        <option value="">-- Select a country --</option>
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
      <p class="value-display">Selected: <span data-testid="dropdown-single-value">{{ singleValue || 'none' }}</span></p>
    </div>

    <!-- Multi select -->
    <div class="section">
      <h2>Multi Select</h2>
      <select class="styled-select" data-testid="dropdown-multi" v-model="multiValue" multiple size="5">
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
      <p class="value-display">Selected: <span data-testid="dropdown-multi-value">{{ multiValue.join(', ') || 'none' }}</span></p>
    </div>

    <!-- Custom dropdown -->
    <div class="section">
      <h2>Custom Dropdown</h2>
      <div class="custom-dd-wrapper">
        <button
          type="button"
          class="custom-dd-trigger"
          data-testid="dropdown-custom"
          @click.stop="showCustom = !showCustom"
        >
          {{ customValue || 'Select a fruit' }}
          <span class="chevron" :class="{ open: showCustom }">▾</span>
        </button>
        <ul v-show="showCustom" class="custom-dd-list" data-testid="dropdown-custom-list">
          <li
            v-for="(opt, i) in customOptions"
            :key="opt"
            class="custom-dd-option"
            :data-testid="`dropdown-custom-option-${i + 1}`"
            @click="selectCustom(opt)"
          >{{ opt }}</li>
        </ul>
      </div>
      <p class="value-display">Selected: <span data-testid="dropdown-custom-value">{{ customValue || 'none' }}</span></p>
    </div>
  </div>
</template>

<script>
const COUNTRIES = [
  'Australia', 'Brazil', 'Canada', 'Denmark', 'Egypt',
  'France', 'Germany', 'Hungary', 'India', 'Japan',
];

export default {
  data() {
    return {
      countries: COUNTRIES,
      singleValue: '',
      multiValue: [],
      customOptions: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
      customValue: '',
      showCustom: false,
    };
  },
  mounted() {
    this._closeHandler = () => { this.showCustom = false; };
    document.addEventListener('click', this._closeHandler);
  },
  beforeUnmount() {
    document.removeEventListener('click', this._closeHandler);
  },
  methods: {
    selectCustom(opt) {
      this.customValue = opt;
      this.showCustom = false;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; }
.styled-select {
  width: 100%; max-width: 320px; padding: 0.5rem 0.75rem;
  background: var(--bg-input); border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem;
}
.styled-select[multiple] { height: auto; }
.value-display { margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-secondary); }
.value-display span { font-weight: 600; color: var(--text-primary); }
.custom-dd-wrapper { position: relative; width: 320px; }
.custom-dd-trigger {
  width: 100%; padding: 0.5rem 0.75rem; text-align: left;
  background: var(--bg-input); border: 1px solid var(--border);
  border-radius: var(--radius); color: var(--text-primary);
  font-size: 0.9rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
}
.chevron { transition: transform 0.15s; }
.chevron.open { transform: rotate(180deg); }
.custom-dd-list {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: var(--bg-primary); border: 1px solid var(--border);
  border-radius: var(--radius); z-index: 50; list-style: none; padding: 0.25rem 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.custom-dd-option {
  padding: 0.5rem 0.75rem; cursor: pointer; font-size: 0.875rem; color: var(--text-primary);
}
.custom-dd-option:hover { background: var(--accent-light); color: var(--accent); }
</style>
```

- [ ] **Step 2: Lint and commit**

```bash
npm run lint
git add src/views/tools/DropDownPage.vue
git commit -m "fix: replace Dropdown external dependencies with custom native implementation"
```

---

## Task 4: Fix Draggable page

**Files:**
- Create: `src/views/tools/DraggablePage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/DraggablePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Draggable</h1>
    <p class="page-desc">Freely reposition elements by dragging them around the canvas</p>

    <p class="status-text">Dragging: <span data-testid="draggable-status">{{ draggingId !== null ? `item-${draggingId}` : 'none' }}</span></p>

    <div
      class="canvas"
      data-testid="draggable-canvas"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="drag-item"
        :data-testid="`draggable-item-${item.id}`"
        :style="{ left: item.x + 'px', top: item.y + 'px' }"
        @mousedown.prevent="onMouseDown($event, item)"
      >{{ item.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, label: 'Block A', x: 40,  y: 40 },
        { id: 2, label: 'Block B', x: 200, y: 40 },
        { id: 3, label: 'Block C', x: 40,  y: 160 },
        { id: 4, label: 'Block D', x: 200, y: 160 },
      ],
      draggingId: null,
      offsetX: 0,
      offsetY: 0,
    };
  },
  methods: {
    onMouseDown(event, item) {
      this.draggingId = item.id;
      this.offsetX = event.clientX - item.x;
      this.offsetY = event.clientY - item.y;
    },
    onMouseMove(event) {
      if (this.draggingId === null) return;
      const canvas = this.$el.querySelector('.canvas');
      const rect = canvas.getBoundingClientRect();
      const item = this.items.find(i => i.id === this.draggingId);
      if (!item) return;
      item.x = Math.max(0, Math.min(rect.width - 80, event.clientX - this.offsetX));
      item.y = Math.max(0, Math.min(rect.height - 40, event.clientY - this.offsetY));
    },
    onMouseUp() {
      this.draggingId = null;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.status-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem; }
.status-text span { font-weight: 600; color: var(--text-primary); }
.canvas {
  position: relative; width: 100%; height: 280px;
  border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-sidebar); user-select: none; overflow: hidden;
}
.drag-item {
  position: absolute; width: 80px; height: 40px;
  background: var(--bg-primary); border: 1px solid var(--accent);
  border-radius: var(--radius); cursor: grab;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
}
.drag-item:active { cursor: grabbing; }
</style>
```

- [ ] **Step 2: Wire into router (replace InteractionsPage mapping)**

In `src/router/index.js`:
- Add: `import DraggablePage from "@/views/tools/DraggablePage.vue";`
- Change componentMap: `draggable: DraggablePage,` (replacing `draggable: InteractionsPage,`)

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/DraggablePage.vue src/router/index.js
git commit -m "fix: add Draggable page with free-position mouse drag"
```

---

## Task 5: Fix Droppable page

**Files:**
- Create: `src/views/tools/DroppablePage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/DroppablePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Droppable</h1>
    <p class="page-desc">Drag items to matching colored drop zones</p>

    <p class="status-text">Status: <span data-testid="droppable-status">{{ status }}</span></p>

    <!-- Source items -->
    <div class="source-section">
      <h2>Source Items</h2>
      <div class="source-row">
        <div
          v-for="item in sourceItems"
          :key="item.id"
          class="drop-item"
          :class="`item-${item.type}`"
          :data-testid="`droppable-item-${item.id}`"
          draggable="true"
          @dragstart="onDragStart($event, item)"
        >{{ item.label }}</div>
      </div>
    </div>

    <!-- Drop zones -->
    <div class="zones-row">
      <div
        v-for="zone in zones"
        :key="zone.type"
        class="drop-zone"
        :class="`zone-${zone.type}`"
        :data-testid="`droppable-zone-${zone.type}`"
        @dragover.prevent
        @drop.prevent="onDrop($event, zone.type)"
      >
        <p class="zone-title">{{ zone.label }}</p>
        <p class="zone-count" :data-testid="`droppable-zone-count-${zone.type}`">{{ zone.items.length }} items</p>
        <div
          v-for="item in zone.items"
          :key="item.id"
          class="drop-item"
          :class="`item-${item.type}`"
        >{{ item.label }}</div>
      </div>
    </div>

    <button class="reset-btn" data-testid="droppable-reset" @click="reset">Reset</button>
  </div>
</template>

<script>
const INITIAL_ITEMS = [
  { id: 1, label: 'Red 1',   type: 'red' },
  { id: 2, label: 'Red 2',   type: 'red' },
  { id: 3, label: 'Blue 1',  type: 'blue' },
  { id: 4, label: 'Blue 2',  type: 'blue' },
  { id: 5, label: 'Green 1', type: 'green' },
  { id: 6, label: 'Green 2', type: 'green' },
];

export default {
  data() {
    return {
      sourceItems: INITIAL_ITEMS.map(i => ({ ...i })),
      zones: [
        { type: 'red',   label: 'Red Zone',   items: [] },
        { type: 'blue',  label: 'Blue Zone',  items: [] },
        { type: 'green', label: 'Green Zone', items: [] },
      ],
      draggingItem: null,
      status: 'Ready',
    };
  },
  methods: {
    onDragStart(event, item) {
      this.draggingItem = item;
    },
    onDrop(event, zoneType) {
      if (!this.draggingItem) return;
      if (this.draggingItem.type !== zoneType) {
        this.status = 'Wrong zone!';
        this.draggingItem = null;
        return;
      }
      const idx = this.sourceItems.findIndex(i => i.id === this.draggingItem.id);
      if (idx !== -1) {
        this.sourceItems.splice(idx, 1);
        const zone = this.zones.find(z => z.type === zoneType);
        zone.items.push(this.draggingItem);
        this.status = `Dropped ${this.draggingItem.label} into ${zone.label}`;
      }
      this.draggingItem = null;
    },
    reset() {
      this.sourceItems = INITIAL_ITEMS.map(i => ({ ...i }));
      this.zones.forEach(z => { z.items = []; });
      this.status = 'Ready';
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.status-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
.status-text span { font-weight: 600; color: var(--text-primary); }
.source-section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem; }
.source-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
.zones-row { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
.drop-zone { flex: 1; min-height: 120px; border: 2px dashed var(--border); border-radius: var(--radius); padding: 0.75rem; }
.zone-title { font-weight: 600; font-size: 0.875rem; margin-bottom: 0.25rem; }
.zone-count { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; }
.zone-red   { border-color: #ef4444; }
.zone-blue  { border-color: #3b82f6; }
.zone-green { border-color: #22c55e; }
.drop-item { padding: 0.4rem 0.6rem; border-radius: var(--radius); font-size: 0.8rem; font-weight: 600; cursor: grab; margin-bottom: 0.25rem; }
.item-red   { background: #fee2e2; color: #ef4444; }
.item-blue  { background: #dbeafe; color: #3b82f6; }
.item-green { background: #dcfce7; color: #22c55e; }
.reset-btn { padding: 0.4rem 1rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-secondary); cursor: pointer; font-size: 0.875rem; }
.reset-btn:hover { background: var(--border); }
</style>
```

- [ ] **Step 2: Wire into router (replace InteractionsPage mapping)**

In `src/router/index.js`:
- Add: `import DroppablePage from "@/views/tools/DroppablePage.vue";`
- Change componentMap: `droppable: DroppablePage,` (replacing `droppable: InteractionsPage,`)

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/DroppablePage.vue src/router/index.js
git commit -m "fix: add Droppable page with typed drag-to-zone interaction"
```

---

## Task 6: Fix Resizable page

**Files:**
- Create: `src/views/tools/ResizablePage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/ResizablePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Resizable</h1>
    <p class="page-desc">Drag the handle on the right edge to resize the panel</p>

    <p class="width-text">Width: <span data-testid="resizable-width">{{ panelWidth }}px</span></p>

    <div class="resizable-wrapper">
      <div
        class="resizable-panel"
        data-testid="resizable-panel"
        :style="{ width: panelWidth + 'px' }"
      >
        <div class="panel-content" data-testid="resizable-content">
          Drag the handle on the right edge to resize this panel. The current width is shown above.
        </div>
        <div
          class="resize-handle"
          data-testid="resizable-handle"
          @mousedown.prevent="startResize"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      panelWidth: 300,
      isResizing: false,
      startX: 0,
      startWidth: 300,
    };
  },
  mounted() {
    this._onMouseMove = this.onMouseMove.bind(this);
    this._onMouseUp = this.onMouseUp.bind(this);
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
  },
  methods: {
    startResize(event) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startWidth = this.panelWidth;
    },
    onMouseMove(event) {
      if (!this.isResizing) return;
      const delta = event.clientX - this.startX;
      this.panelWidth = Math.max(150, Math.min(600, this.startWidth + delta));
    },
    onMouseUp() {
      this.isResizing = false;
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; }
.page-desc { color: var(--text-secondary); margin-bottom: 1rem; }
.width-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1rem; }
.width-text span { font-weight: 600; color: var(--text-primary); }
.resizable-wrapper { overflow: visible; }
.resizable-panel {
  position: relative; height: 200px; min-width: 150px; max-width: 600px;
  background: var(--bg-sidebar); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1rem;
}
.panel-content { color: var(--text-secondary); font-size: 0.875rem; line-height: 1.5; }
.resize-handle {
  position: absolute; right: -5px; top: 0; bottom: 0; width: 10px;
  cursor: col-resize; display: flex; align-items: center; justify-content: center;
  border-radius: 0 var(--radius) var(--radius) 0;
}
.resize-handle::after {
  content: ''; width: 4px; height: 40px;
  background: var(--accent); border-radius: 2px; opacity: 0.6;
}
.resize-handle:hover::after { opacity: 1; }
</style>
```

- [ ] **Step 2: Wire into router (replace InteractionsPage mapping)**

In `src/router/index.js`:
- Add: `import ResizablePage from "@/views/tools/ResizablePage.vue";`
- Change componentMap: `resizable: ResizablePage,` (replacing `resizable: InteractionsPage,`)

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/ResizablePage.vue src/router/index.js
git commit -m "fix: add Resizable page with drag-to-resize panel"
```

---

## Task 7: Fix Tall page

**Files:**
- Modify: `src/views/tools/TallPage.vue`

Replace broken image references with meaningful scrollable content.

- [ ] **Step 1: Rewrite `src/views/tools/TallPage.vue`**

```vue
<template>
  <div class="tall-page" @scroll.passive="onScroll">
    <h1>Tall Page</h1>
    <p class="page-desc">A long scrollable page for scroll position testing</p>

    <p class="scroll-info">Scroll position: <span data-testid="tall-scroll-position">{{ scrollY }}px</span></p>

    <div
      v-for="n in 10"
      :key="n"
      class="tall-section"
      :data-testid="`tall-section-${n}`"
    >
      <h2>Section {{ n }}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</p>
    </div>

    <button
      v-show="scrollY > 200"
      class="back-to-top"
      data-testid="tall-top-btn"
      @click="scrollToTop"
    >↑ Top</button>
  </div>
</template>

<script>
export default {
  data() {
    return { scrollY: 0 };
  },
  mounted() {
    this._onScroll = () => { this.scrollY = Math.round(window.scrollY); };
    window.addEventListener('scroll', this._onScroll, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this._onScroll);
  },
  methods: {
    onScroll() {},
    scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); },
  },
};
</script>

<style scoped>
.tall-page { padding: 2rem; max-width: 700px; position: relative; }
.page-desc { color: var(--text-secondary); margin-bottom: 0.5rem; }
.scroll-info { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 2rem; }
.scroll-info span { font-weight: 600; color: var(--text-primary); }
.tall-section { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
.tall-section h2 { font-size: 1.25rem; font-weight: 600; color: var(--text-primary); margin-bottom: 1rem; }
.tall-section p { color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.75rem; }
.back-to-top {
  position: fixed; bottom: 1.5rem; right: 1.5rem;
  background: var(--accent); color: #fff;
  border: none; border-radius: var(--radius); padding: 0.5rem 1rem;
  cursor: pointer; font-size: 0.875rem; font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.back-to-top:hover { background: var(--accent-hover); }
</style>
```

- [ ] **Step 2: Lint and commit**

```bash
npm run lint
git add src/views/tools/TallPage.vue
git commit -m "fix: rewrite Tall page with scrollable sections and back-to-top button"
```

---

## Task 8: Drag Progress page

**Files:**
- Create: `src/views/tools/DragProgressPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/DragProgressPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Drag Progress</h1>
    <p class="page-desc">Click or drag on the progress bar to set its fill percentage</p>

    <div class="section">
      <h2>Interactive Bar</h2>
      <p class="pct-label"><span data-testid="drag-progress-value">{{ percentage }}</span>%</p>
      <div
        class="track"
        data-testid="drag-progress-track"
        @mousedown.prevent="startDrag"
        @click="onClick"
      >
        <div
          class="fill"
          data-testid="drag-progress-fill"
          :style="{ width: percentage + '%' }"
        >
          <div class="handle" data-testid="drag-progress-handle"></div>
        </div>
      </div>
      <div class="btn-row">
        <button class="ctrl-btn" data-testid="drag-progress-reset" @click="percentage = 0">Reset</button>
        <button class="ctrl-btn" data-testid="drag-progress-set-half" @click="percentage = 50">50%</button>
        <button class="ctrl-btn accent" data-testid="drag-progress-set-full" @click="percentage = 100">100%</button>
      </div>
    </div>

    <div class="section">
      <h2>Animated Bar</h2>
      <p class="pct-label"><span data-testid="drag-progress-animated-value">{{ animatedPct }}</span>%</p>
      <div class="track" data-testid="drag-progress-animated-track">
        <div class="fill" data-testid="drag-progress-animated-fill" :style="{ width: animatedPct + '%' }"></div>
      </div>
      <button class="ctrl-btn accent" data-testid="drag-progress-animate-btn" @click="startAnimation" :disabled="animating">
        {{ animating ? 'Animating...' : 'Animate' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      percentage: 30,
      isDragging: false,
      animatedPct: 0,
      animating: false,
      _animInterval: null,
    };
  },
  mounted() {
    this._onMouseMove = this.onMouseMove.bind(this);
    this._onMouseUp = () => { this.isDragging = false; };
    document.addEventListener('mousemove', this._onMouseMove);
    document.addEventListener('mouseup', this._onMouseUp);
  },
  beforeUnmount() {
    document.removeEventListener('mousemove', this._onMouseMove);
    document.removeEventListener('mouseup', this._onMouseUp);
    if (this._animInterval) clearInterval(this._animInterval);
  },
  methods: {
    pctFromEvent(event) {
      const track = this.$el.querySelector('[data-testid="drag-progress-track"]');
      const rect = track.getBoundingClientRect();
      const pct = (event.clientX - rect.left) / rect.width;
      return Math.round(Math.max(0, Math.min(1, pct)) * 100);
    },
    startDrag(event) {
      this.isDragging = true;
      this.percentage = this.pctFromEvent(event);
    },
    onMouseMove(event) {
      if (!this.isDragging) return;
      this.percentage = this.pctFromEvent(event);
    },
    onClick(event) {
      this.percentage = this.pctFromEvent(event);
    },
    startAnimation() {
      if (this.animating) return;
      this.animating = true;
      this.animatedPct = 0;
      this._animInterval = setInterval(() => {
        this.animatedPct = Math.min(100, this.animatedPct + 2);
        if (this.animatedPct >= 100) {
          clearInterval(this._animInterval);
          setTimeout(() => {
            this.animatedPct = 0;
            this.animating = false;
          }, 500);
        }
      }, 20);
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 3rem; }
.section h2 { font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
.pct-label { font-size: 1.75rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.75rem; }
.track {
  height: 24px; border-radius: 12px; background: var(--border);
  cursor: pointer; position: relative; user-select: none; overflow: visible;
}
.fill {
  height: 100%; border-radius: 12px; background: var(--accent);
  position: relative; min-width: 0; transition: none;
}
.handle {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--accent); border: 3px solid var(--bg-primary);
  position: absolute; right: -10px; top: 50%; transform: translateY(-50%);
  cursor: grab; box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.handle:active { cursor: grabbing; }
.btn-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
.ctrl-btn {
  padding: 0.35rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); cursor: pointer; font-size: 0.875rem;
}
.ctrl-btn:hover { background: var(--border); }
.ctrl-btn.accent { background: var(--accent); color: #fff; border-color: var(--accent); }
.ctrl-btn.accent:hover { background: var(--accent-hover); border-color: var(--accent-hover); }
.ctrl-btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import DragProgressPage from "@/views/tools/DragProgressPage.vue";
// componentMap:
dragProgress: DragProgressPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/DragProgressPage.vue src/router/index.js
git commit -m "phase4: add Drag Progress page"
```

---

## Task 9: Image Gallery page

**Files:**
- Create: `src/views/tools/GalleryPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/GalleryPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Image Gallery</h1>
    <p class="page-desc">Click any image to view it full size</p>

    <div class="grid">
      <div
        v-for="(item, i) in items"
        :key="item.id"
        class="grid-card"
        :data-testid="`gallery-item-${i + 1}`"
        @click="open(i)"
      >
        <div class="placeholder" :style="{ background: item.color }">{{ item.alt }}</div>
      </div>
    </div>

    <div v-if="isOpen" class="overlay" data-testid="gallery-overlay" @click.self="close">
      <div class="overlay-inner">
        <div
          class="full-image"
          data-testid="gallery-full-image"
          :style="{ background: activeItem.color }"
        >{{ activeItem.alt }}</div>
        <p class="caption" data-testid="gallery-caption">Image {{ activeIndex + 1 }} of {{ items.length }}</p>
        <div class="nav-row">
          <button class="nav-btn" data-testid="gallery-prev" @click="prev">‹ Prev</button>
          <button class="nav-btn" data-testid="gallery-next" @click="next">Next ›</button>
        </div>
        <button class="close-btn" data-testid="gallery-close" @click="close">✕</button>
      </div>
    </div>
  </div>
</template>

<script>
const ITEMS = [
  { id: 1, alt: 'Mountain landscape',  color: '#6366f1' },
  { id: 2, alt: 'Ocean sunset',        color: '#f59e0b' },
  { id: 3, alt: 'Forest path',         color: '#22c55e' },
  { id: 4, alt: 'City skyline',        color: '#3b82f6' },
  { id: 5, alt: 'Desert dunes',        color: '#ef4444' },
  { id: 6, alt: 'Snowy peaks',         color: '#06b6d4' },
  { id: 7, alt: 'Autumn leaves',       color: '#f97316' },
  { id: 8, alt: 'Tropical beach',      color: '#8b5cf6' },
];

export default {
  data() {
    return { items: ITEMS, activeIndex: 0, isOpen: false };
  },
  computed: {
    activeItem() { return this.items[this.activeIndex]; },
  },
  methods: {
    open(index) { this.activeIndex = index; this.isOpen = true; },
    close()     { this.isOpen = false; },
    prev()      { this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length; },
    next()      { this.activeIndex = (this.activeIndex + 1) % this.items.length; },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.grid-card { aspect-ratio: 4/3; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); cursor: pointer; }
.grid-card:hover { opacity: 0.85; }
.placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.7rem; text-align: center; padding: 0.5rem; }
.overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 200; display: flex; align-items: center; justify-content: center; }
.overlay-inner { text-align: center; position: relative; }
.full-image { width: 480px; height: 320px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.1rem; }
.caption { color: #fff; margin: 0.75rem 0 0.5rem; font-size: 0.9rem; }
.nav-row { display: flex; gap: 1rem; justify-content: center; }
.nav-btn { background: rgba(255,255,255,0.15); color: #fff; border: 1px solid rgba(255,255,255,0.3); border-radius: var(--radius); padding: 0.4rem 1rem; cursor: pointer; font-size: 0.9rem; }
.nav-btn:hover { background: rgba(255,255,255,0.25); }
.close-btn { position: absolute; top: -2rem; right: -2rem; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer; padding: 0.25rem; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import GalleryPage from "@/views/tools/GalleryPage.vue";
// componentMap:
gallery: GalleryPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/GalleryPage.vue src/router/index.js
git commit -m "phase4: add Image Gallery page"
```

---

## Task 10: Carousel page

**Files:**
- Create: `src/views/tools/CarouselPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/CarouselPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Carousel</h1>
    <p class="page-desc">Auto-playing slideshow with navigation controls</p>

    <div class="carousel-wrapper">
      <div class="carousel-track">
        <div
          v-for="(slide, i) in slides"
          :key="slide.id"
          class="slide"
          :data-testid="`carousel-slide-${i + 1}`"
          :style="{ background: slide.color }"
          v-show="currentSlide === i"
        >
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.desc }}</p>
        </div>
      </div>

      <button class="nav-btn prev-btn" data-testid="carousel-prev" @click="prev">‹</button>
      <button class="nav-btn next-btn" data-testid="carousel-next" @click="next">›</button>
    </div>

    <div class="controls-row">
      <div class="dots-row">
        <button
          v-for="(slide, i) in slides"
          :key="i"
          class="dot"
          :class="{ 'dot-active': currentSlide === i }"
          :data-testid="`carousel-dot-${i + 1}`"
          @click="goTo(i)"
        ></button>
      </div>
      <button class="play-btn" data-testid="carousel-autoplay" @click="togglePlay">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
    </div>

    <p class="indicator" data-testid="carousel-indicator">Slide {{ currentSlide + 1 }} of {{ slides.length }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      isPlaying: true,
      _interval: null,
      slides: [
        { id: 1, title: 'Welcome to the Carousel',  desc: 'This is slide one',   color: '#6366f1' },
        { id: 2, title: 'Interactive Components',   desc: 'This is slide two',   color: '#f59e0b' },
        { id: 3, title: 'Built with Vue 3',         desc: 'This is slide three', color: '#22c55e' },
        { id: 4, title: 'Test Automation Ready',    desc: 'This is slide four',  color: '#3b82f6' },
        { id: 5, title: 'Fully Responsive',         desc: 'This is slide five',  color: '#ef4444' },
      ],
    };
  },
  mounted() {
    this.startInterval();
  },
  beforeUnmount() {
    this.stopInterval();
  },
  methods: {
    startInterval() {
      this._interval = setInterval(() => { this.next(); }, 3000);
    },
    stopInterval() {
      if (this._interval) { clearInterval(this._interval); this._interval = null; }
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying;
      this.isPlaying ? this.startInterval() : this.stopInterval();
    },
    prev() { this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length; },
    next() { this.currentSlide = (this.currentSlide + 1) % this.slides.length; },
    goTo(i) { this.currentSlide = i; },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.carousel-wrapper { position: relative; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); }
.carousel-track { position: relative; }
.slide { height: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; padding: 2rem; text-align: center; }
.slide h2 { font-size: 1.25rem; margin-bottom: 0.5rem; }
.slide p { font-size: 0.9rem; opacity: 0.9; }
.nav-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.3); border: none; color: #fff; font-size: 1.75rem; cursor: pointer; padding: 0.5rem 0.75rem; }
.prev-btn { left: 0; border-radius: 0 var(--radius) var(--radius) 0; }
.next-btn { right: 0; border-radius: var(--radius) 0 0 var(--radius); }
.nav-btn:hover { background: rgba(0,0,0,0.5); }
.controls-row { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; }
.dots-row { display: flex; gap: 0.5rem; }
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--border); border: none; cursor: pointer; padding: 0; }
.dot-active { background: var(--accent); }
.play-btn { padding: 0.3rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); cursor: pointer; font-size: 0.8rem; }
.indicator { text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import CarouselPage from "@/views/tools/CarouselPage.vue";
// componentMap:
carousel: CarouselPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/CarouselPage.vue src/router/index.js
git commit -m "phase4: add Carousel page"
```

---

## Task 11: Login Form page

**Files:**
- Create: `src/views/tools/LoginFormPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/LoginFormPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Login Form</h1>
    <p class="page-desc">Form with client-side validation and simulated authentication</p>

    <div class="form-card">
      <div v-if="loginSuccess" class="success-msg" data-testid="login-success">
        ✓ Login successful! Welcome, {{ username }}.
      </div>

      <form v-else @submit.prevent="onSubmit" class="login-form">
        <div class="field">
          <label for="login-username-input">Username</label>
          <input
            id="login-username-input"
            type="text"
            class="input"
            :class="{ 'input-error': usernameError }"
            data-testid="login-username"
            v-model="username"
          />
          <p v-if="usernameError" class="field-error" data-testid="login-username-error">{{ usernameError }}</p>
        </div>

        <div class="field">
          <label for="login-password-input">Password</label>
          <div class="password-row">
            <input
              id="login-password-input"
              :type="passwordType"
              class="input"
              :class="{ 'input-error': passwordError }"
              data-testid="login-password"
              v-model="password"
            />
            <button type="button" class="show-btn" data-testid="login-show-password" @click="togglePassword">
              {{ passwordType === 'password' ? 'Show' : 'Hide' }}
            </button>
          </div>
          <p v-if="passwordError" class="field-error" data-testid="login-password-error">{{ passwordError }}</p>
        </div>

        <p v-if="loginError" class="login-error" data-testid="login-error">{{ loginError }}</p>

        <button type="submit" class="submit-btn" data-testid="login-submit" :disabled="isLoading">
          <span v-show="isLoading" data-testid="login-loading">Signing in...</span>
          <span v-show="!isLoading">Sign In</span>
        </button>

        <p class="hint">Hint: admin / password123</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordType: 'password',
      usernameError: '',
      passwordError: '',
      loginError: '',
      isLoading: false,
      loginSuccess: false,
      _loginTimer: null,
    };
  },
  beforeUnmount() {
    if (this._loginTimer) clearTimeout(this._loginTimer);
  },
  methods: {
    togglePassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    },
    onSubmit() {
      this.usernameError = '';
      this.passwordError = '';
      this.loginError = '';
      let valid = true;
      if (!this.username) { this.usernameError = 'Username is required'; valid = false; }
      if (!this.password) { this.passwordError = 'Password is required'; valid = false; }
      else if (this.password.length < 6) { this.passwordError = 'Password must be at least 6 characters'; valid = false; }
      if (!valid) return;
      this.isLoading = true;
      this._loginTimer = setTimeout(() => {
        this.isLoading = false;
        if (this.username === 'admin' && this.password === 'password123') {
          this.loginSuccess = true;
        } else {
          this.loginError = 'Invalid username or password';
        }
      }, 1500);
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.form-card { background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; max-width: 400px; }
.login-form { display: flex; flex-direction: column; gap: 1.25rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
.input { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; width: 100%; }
.input-error { border-color: #ef4444; }
.password-row { display: flex; gap: 0.5rem; }
.password-row .input { flex: 1; }
.show-btn { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-secondary); cursor: pointer; font-size: 0.8rem; white-space: nowrap; }
.field-error { font-size: 0.8rem; color: #ef4444; }
.login-error { font-size: 0.875rem; color: #ef4444; text-align: center; }
.submit-btn { width: 100%; padding: 0.6rem; background: var(--accent); color: #fff; border: none; border-radius: var(--radius); font-size: 0.9rem; font-weight: 600; cursor: pointer; }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.submit-btn:hover:not(:disabled) { background: var(--accent-hover); }
.success-msg { color: #22c55e; font-weight: 600; text-align: center; padding: 1rem; }
.hint { font-size: 0.75rem; color: var(--text-muted); text-align: center; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import LoginFormPage from "@/views/tools/LoginFormPage.vue";
// componentMap:
loginForm: LoginFormPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/LoginFormPage.vue src/router/index.js
git commit -m "phase4: add Login Form page"
```

---

## Task 12: Pinia Counter page

**Files:**
- Create: `src/stores/counter.js`
- Create: `src/views/tools/PiniaCounterPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/stores/counter.js`**

```js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    step: 1,
    history: [],
  }),
  actions: {
    increment() {
      this.count += this.step;
      this._log(`+${this.step}`);
    },
    decrement() {
      this.count -= this.step;
      this._log(`-${this.step}`);
    },
    reset() {
      this.count = 0;
      this._log('Reset');
    },
    setStep(n) {
      this.step = Math.max(1, parseInt(n, 10) || 1);
    },
    _log(op) {
      this.history.unshift(`${op} → ${this.count}`);
      if (this.history.length > 5) this.history.pop();
    },
  },
});
```

- [ ] **Step 2: Create `src/views/tools/PiniaCounterPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Pinia Counter</h1>
    <p class="page-desc">Shared counter state managed with Pinia</p>

    <div class="counter-card">
      <div class="count-display" data-testid="counter-value">{{ store.count }}</div>

      <div class="main-btns">
        <button class="btn btn-secondary" data-testid="counter-decrement" @click="store.decrement()">− Step</button>
        <button class="btn btn-primary"   data-testid="counter-increment" @click="store.increment()">+ Step</button>
        <button class="btn btn-danger"    data-testid="counter-reset"     @click="store.reset()">Reset</button>
      </div>

      <div class="step-row">
        <label>Step size:</label>
        <input
          type="number"
          class="step-input"
          data-testid="counter-step-input"
          :value="store.step"
          min="1"
          @input="store.setStep($event.target.value)"
        />
      </div>

      <div class="history-section">
        <p class="history-title">Last operations:</p>
        <div data-testid="counter-history" class="history-list">
          <div
            v-for="(entry, i) in store.history"
            :key="i"
            class="history-item"
            :data-testid="`counter-history-item-${i + 1}`"
          >{{ entry }}</div>
          <div v-if="store.history.length === 0" class="history-empty">No operations yet</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter.js';

export default {
  setup() {
    const store = useCounterStore();
    return { store };
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 500px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.counter-card { background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
.count-display { font-size: 3.5rem; font-weight: 700; text-align: center; color: var(--text-primary); line-height: 1; }
.main-btns { display: flex; gap: 0.75rem; justify-content: center; }
.btn { padding: 0.5rem 1.25rem; border-radius: var(--radius); font-size: 0.9rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-input); color: var(--text-primary); border-color: var(--border); }
.btn-secondary:hover { background: var(--border); }
.btn-danger { background: #fee2e2; color: #ef4444; border-color: #fca5a5; }
.btn-danger:hover { background: #fecaca; }
.step-row { display: flex; align-items: center; gap: 0.75rem; justify-content: center; }
.step-row label { font-size: 0.875rem; color: var(--text-secondary); }
.step-input { width: 80px; padding: 0.4rem 0.6rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; text-align: center; }
.history-title { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
.history-list { display: flex; flex-direction: column; gap: 0.25rem; }
.history-item { font-size: 0.85rem; color: var(--text-secondary); padding: 0.3rem 0.6rem; background: var(--bg-primary); border-radius: 4px; }
.history-empty { font-size: 0.85rem; color: var(--text-muted); }
</style>
```

- [ ] **Step 3: Wire into router**

```js
import PiniaCounterPage from "@/views/tools/PiniaCounterPage.vue";
// componentMap:
piniaCounter: PiniaCounterPage,
```

- [ ] **Step 4: Lint and commit**

```bash
npm run lint
git add src/stores/counter.js src/views/tools/PiniaCounterPage.vue src/router/index.js
git commit -m "phase4: add Pinia Counter page and counter store"
```

---

## Task 13: Long List page

**Files:**
- Create: `src/views/tools/LongListPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/LongListPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Long List</h1>
    <p class="page-desc">200 items with live search filtering</p>

    <div class="search-row">
      <input
        type="text"
        class="search-input"
        data-testid="long-list-search"
        v-model="searchQuery"
        placeholder="Search by name or category..."
      />
      <button
        v-if="searchQuery"
        class="clear-btn"
        data-testid="long-list-clear"
        @click="searchQuery = ''"
      >✕</button>
    </div>

    <p class="count-text" data-testid="long-list-count">Showing {{ filteredItems.length }} of {{ allItems.length }} items</p>

    <div class="list-container">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="list-item"
        :data-testid="`long-list-item-${item.id}`"
      >
        <span class="item-name">{{ item.name }}</span>
        <span class="item-badge" :class="`badge-${item.category.toLowerCase()}`">{{ item.category }}</span>
      </div>
      <div v-if="filteredItems.length === 0" class="empty-msg" data-testid="long-list-empty">
        No items match your search.
      </div>
    </div>
  </div>
</template>

<script>
const ALL_ITEMS = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: ['Alpha', 'Beta', 'Gamma', 'Delta'][i % 4],
}));

export default {
  data() {
    return {
      allItems: ALL_ITEMS,
      searchQuery: '',
    };
  },
  computed: {
    filteredItems() {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.allItems;
      return this.allItems.filter(item =>
        item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.search-row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
.search-input { flex: 1; max-width: 360px; padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; }
.clear-btn { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-muted); cursor: pointer; }
.count-text { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.75rem; }
.list-container { max-height: 480px; overflow-y: auto; border: 1px solid var(--border); border-radius: var(--radius); }
.list-item { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; color: var(--text-primary); }
.list-item:last-child { border-bottom: none; }
.item-badge { font-size: 0.7rem; font-weight: 600; padding: 0.15rem 0.5rem; border-radius: 999px; }
.badge-alpha { background: #ede9fe; color: #7c3aed; }
.badge-beta  { background: #fef3c7; color: #d97706; }
.badge-gamma { background: #dcfce7; color: #16a34a; }
.badge-delta { background: #dbeafe; color: #2563eb; }
.empty-msg { padding: 2rem; text-align: center; color: var(--text-muted); font-size: 0.875rem; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import LongListPage from "@/views/tools/LongListPage.vue";
// componentMap:
longList: LongListPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/LongListPage.vue src/router/index.js
git commit -m "phase4: add Long List page"
```

---

## Task 14: Multi-step Form page

**Files:**
- Create: `src/views/tools/MultistepPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/MultistepPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Multi-step Form</h1>
    <p class="page-desc">Three-step wizard with per-step validation</p>

    <!-- Step indicators -->
    <div class="step-indicators">
      <div
        v-for="n in 3"
        :key="n"
        class="step-indicator"
        :class="{ 'step-active': currentStep === n, 'step-done': currentStep > n }"
        :data-testid="`multistep-step-${n}`"
      >
        <span class="step-circle">{{ currentStep > n ? '✓' : n }}</span>
        <span class="step-label">{{ ['Personal', 'Contact', 'Message'][n - 1] }}</span>
      </div>
    </div>
    <p class="current-step-text" data-testid="multistep-current-step">Step {{ currentStep }} of 3</p>

    <!-- Step 1: Personal -->
    <div v-if="currentStep === 1" class="step-form">
      <div class="field">
        <label>First Name</label>
        <input type="text" class="input" data-testid="multistep-first-name" v-model="form.firstName" />
        <p v-if="errors.firstName" class="field-error" data-testid="multistep-first-name-error">{{ errors.firstName }}</p>
      </div>
      <div class="field">
        <label>Last Name</label>
        <input type="text" class="input" data-testid="multistep-last-name" v-model="form.lastName" />
        <p v-if="errors.lastName" class="field-error" data-testid="multistep-last-name-error">{{ errors.lastName }}</p>
      </div>
    </div>

    <!-- Step 2: Contact -->
    <div v-if="currentStep === 2" class="step-form">
      <div class="field">
        <label>Email</label>
        <input type="email" class="input" data-testid="multistep-email" v-model="form.email" />
        <p v-if="errors.email" class="field-error" data-testid="multistep-email-error">{{ errors.email }}</p>
      </div>
      <div class="field">
        <label>Phone <span class="optional">(optional)</span></label>
        <input type="tel" class="input" data-testid="multistep-phone" v-model="form.phone" />
      </div>
    </div>

    <!-- Step 3: Message -->
    <div v-if="currentStep === 3" class="step-form">
      <div class="field">
        <label>Message</label>
        <textarea class="input textarea" data-testid="multistep-message" v-model="form.message" rows="4"></textarea>
        <p v-if="errors.message" class="field-error" data-testid="multistep-message-error">{{ errors.message }}</p>
      </div>
    </div>

    <!-- Navigation -->
    <div class="nav-btns">
      <button v-if="currentStep > 1" class="btn btn-secondary" data-testid="multistep-back" @click="back">Back</button>
      <button v-if="currentStep < 3" class="btn btn-primary" data-testid="multistep-next" @click="next">Next</button>
      <button v-if="currentStep === 3" class="btn btn-primary" data-testid="multistep-submit" @click="submit">Submit</button>
    </div>

    <!-- Result -->
    <div v-if="submitted" class="result" data-testid="multistep-result">
      <h2>Submitted!</h2>
      <div v-for="(val, key) in form" :key="key" class="result-row" v-show="val">
        <strong>{{ key }}:</strong> {{ val }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      submitted: false,
      errors: {},
      form: { firstName: '', lastName: '', email: '', phone: '', message: '' },
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (this.currentStep === 1) {
        if (!this.form.firstName) this.errors.firstName = 'First name is required';
        if (!this.form.lastName) this.errors.lastName = 'Last name is required';
      } else if (this.currentStep === 2) {
        if (!this.form.email) this.errors.email = 'Email is required';
        else if (!this.form.email.includes('@')) this.errors.email = 'Enter a valid email';
      } else if (this.currentStep === 3) {
        if (!this.form.message) this.errors.message = 'Message is required';
      }
      return Object.keys(this.errors).length === 0;
    },
    next() { if (this.validate()) this.currentStep++; },
    back() { this.currentStep--; this.errors = {}; },
    submit() { if (this.validate()) this.submitted = true; },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.step-indicators { display: flex; gap: 0; margin-bottom: 0.75rem; }
.step-indicator { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
.step-indicator:not(:last-child)::after { content: ''; flex: 1; height: 2px; background: var(--border); margin: 0 0.5rem; }
.step-circle { width: 28px; height: 28px; border-radius: 50%; background: var(--border); color: var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; flex-shrink: 0; }
.step-active .step-circle { background: var(--accent); color: #fff; }
.step-done .step-circle { background: var(--accent); color: #fff; }
.step-label { font-size: 0.75rem; color: var(--text-muted); }
.step-active .step-label { color: var(--accent); font-weight: 600; }
.current-step-text { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.step-form { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
.field { display: flex; flex-direction: column; gap: 0.3rem; }
.field label { font-size: 0.875rem; font-weight: 500; color: var(--text-primary); }
.optional { font-weight: 400; color: var(--text-muted); font-size: 0.8rem; }
.input { padding: 0.5rem 0.75rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); font-size: 0.9rem; }
.textarea { resize: vertical; }
.field-error { font-size: 0.8rem; color: #ef4444; }
.nav-btns { display: flex; gap: 0.75rem; }
.btn { padding: 0.5rem 1.25rem; border-radius: var(--radius); font-size: 0.9rem; font-weight: 600; cursor: pointer; border: 1px solid transparent; }
.btn-primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-input); color: var(--text-primary); border-color: var(--border); }
.result { margin-top: 2rem; padding: 1.5rem; background: var(--bg-sidebar); border: 1px solid var(--border); border-radius: var(--radius); }
.result h2 { color: #22c55e; margin-bottom: 1rem; }
.result-row { font-size: 0.875rem; color: var(--text-secondary); padding: 0.3rem 0; border-bottom: 1px solid var(--border); }
.result-row strong { color: var(--text-primary); }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import MultistepPage from "@/views/tools/MultistepPage.vue";
// componentMap:
multistep: MultistepPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/MultistepPage.vue src/router/index.js
git commit -m "phase4: add Multi-step Form page"
```

---

## Task 15: State Viewer page

**Files:**
- Create: `src/views/tools/StateViewerPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/StateViewerPage.vue`**

```vue
<template>
  <div class="page">
    <h1>State Viewer</h1>
    <p class="page-desc">Toggle between empty, loading, error, and populated UI states</p>

    <div class="trigger-row">
      <button class="state-btn" data-testid="state-btn-empty"     @click="setState('empty')">Empty</button>
      <button class="state-btn" data-testid="state-btn-loading"   @click="simulateLoad">Loading</button>
      <button class="state-btn" data-testid="state-btn-error"     @click="setState('error')">Error</button>
      <button class="state-btn" data-testid="state-btn-populated" @click="setState('populated')">Populated</button>
    </div>

    <p class="current-state">Current state: <span class="state-badge" :class="`badge-${state}`" data-testid="state-current">{{ state }}</span></p>

    <div class="state-card">
      <!-- Empty -->
      <div v-if="state === 'empty'" class="state-view empty-view" data-testid="state-empty-view">
        <div class="state-icon">○</div>
        <p>No data available. Try loading some content.</p>
      </div>

      <!-- Loading -->
      <div v-if="state === 'loading'" class="state-view loading-view" data-testid="state-loading-view">
        <div class="spinner"></div>
        <p>Loading content...</p>
      </div>

      <!-- Error -->
      <div v-if="state === 'error'" class="state-view error-view" data-testid="state-error-view">
        <div class="state-icon error-icon">✕</div>
        <p>Something went wrong. Please try again.</p>
        <button class="retry-btn" data-testid="state-retry" @click="simulateLoad">Retry</button>
      </div>

      <!-- Populated -->
      <div v-if="state === 'populated'" class="state-view populated-view" data-testid="state-populated-view">
        <div
          v-for="(item, i) in populatedItems"
          :key="i"
          class="populated-item"
          :data-testid="`state-populated-item-${i + 1}`"
        >{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: 'empty',
      populatedItems: ['First result', 'Second result', 'Third result', 'Fourth result', 'Fifth result'],
      _loadTimer: null,
    };
  },
  beforeUnmount() {
    if (this._loadTimer) clearTimeout(this._loadTimer);
  },
  methods: {
    setState(s) { this.state = s; },
    simulateLoad() {
      this.state = 'loading';
      this._loadTimer = setTimeout(() => { this.state = 'populated'; }, 1500);
    },
  },
};
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.trigger-row { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.state-btn { padding: 0.4rem 1rem; background: var(--bg-input); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary); cursor: pointer; font-size: 0.875rem; }
.state-btn:hover { background: var(--border); }
.current-state { font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 1.5rem; }
.state-badge { font-weight: 700; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.8rem; }
.badge-empty     { background: var(--bg-sidebar); color: var(--text-muted); }
.badge-loading   { background: #dbeafe; color: #2563eb; }
.badge-error     { background: #fee2e2; color: #ef4444; }
.badge-populated { background: #dcfce7; color: #16a34a; }
.state-card { border: 1px solid var(--border); border-radius: var(--radius); min-height: 180px; }
.state-view { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; gap: 0.75rem; min-height: 180px; color: var(--text-secondary); }
.state-icon { font-size: 2rem; }
.error-icon { color: #ef4444; }
.spinner { width: 36px; height: 36px; border: 4px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.retry-btn { padding: 0.4rem 1rem; background: #ef4444; color: #fff; border: none; border-radius: var(--radius); cursor: pointer; font-size: 0.875rem; }
.populated-view { padding: 0.5rem; }
.populated-item { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; color: var(--text-primary); }
.populated-item:last-child { border-bottom: none; }
</style>
```

- [ ] **Step 2: Wire into router**

```js
import StateViewerPage from "@/views/tools/StateViewerPage.vue";
// componentMap:
stateViewer: StateViewerPage,
```

- [ ] **Step 3: Lint and commit**

```bash
npm run lint
git add src/views/tools/StateViewerPage.vue src/router/index.js
git commit -m "phase4: add State Viewer page"
```

---

## Task 16: Final build verification

- [ ] **Step 1: Run full lint and build**

```bash
cd /Users/Ay/GitHub/vue-test-app && npm run lint && npm run build
```

Expected: Zero lint errors, build succeeds.

- [ ] **Step 2: Verify all new routes present in componentMap**

dragProgress, gallery, carousel, loginForm, piniaCounter, longList, multistep, stateViewer

- [ ] **Step 3: Verify fixed routes now point to correct pages (not InteractionsPage)**

draggable → DraggablePage, droppable → DroppablePage, resizable → ResizablePage

- [ ] **Step 4: Commit any fixes**

```bash
git add -p
git commit -m "phase4: fix final build issues"
```
