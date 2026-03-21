# Phase 2 — Core Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 10 new interactive component pages (Buttons, Text Inputs, Checkboxes & Toggles, Sliders, File Upload, Autocomplete, Tabs, Accordion, Progress, Table) to the existing Vue 3 test app across the Elements, Forms, and Widgets categories.

**Architecture:** Each page is a standalone Vue 3 Options API single-file component in `src/views/tools/`. Navigation entries are added to `src/config/navigation.js` (single source of truth for the sidebar). Route components are registered in `src/router/index.js` via `componentMap` and `descriptionMap` objects. The router generates routes automatically from the navigation config. No new dependencies.

**Tech Stack:** Vue 3 Options API, Vue Router 4, CSS custom properties (`var(--accent)`, `var(--bg-input)`, `var(--border)`, `var(--radius)`, etc.), Vue CLI

**Spec:** `docs/superpowers/specs/2026-03-21-phase2-core-components-design.md`

---

## Background: How the routing/navigation system works

Before starting, read `src/config/navigation.js` and `src/router/index.js` to understand the pattern.

The router builds routes with a loop:
```js
for (const group of navigation) {
  for (const item of group.items) {
    const component = componentMap[item.routeName];
    if (component) {          // ← missing components are silently skipped — no build error
      pageRoutes.push({ path: item.path, name: item.routeName, component, meta: { ... } });
    }
  }
}
```

This means: **you can add entries to `navigation.js` before the page files exist** — the app keeps building fine. Routes are only generated once both the nav entry AND the componentMap entry are in place.

---

## Task 1: Navigation config + router prep

**Files:**
- Modify: `src/config/navigation.js`
- Modify: `src/router/index.js`

- [ ] **Step 1: Update `src/config/navigation.js`**

Replace the entire file content with:

```js
export const navigation = [
  {
    category: "Elements",
    items: [
      { label: "Radio Buttons",       routeName: "radiobuttons", path: "/radiobuttons" },
      { label: "Buttons",             routeName: "buttons",      path: "/buttons" },
      { label: "Text Inputs",         routeName: "textInputs",   path: "/text-inputs" },
      { label: "Checkboxes & Toggles", routeName: "checkboxes",  path: "/checkboxes" },
      { label: "Sliders",             routeName: "sliders",      path: "/sliders" },
    ]
  },
  {
    category: "Forms",
    items: [
      { label: "Full Form",    routeName: "forms",        path: "/forms" },
      { label: "Dropdown",     routeName: "dropDown",     path: "/dropdown" },
      { label: "File Upload",  routeName: "fileUpload",   path: "/file-upload" },
      { label: "Autocomplete", routeName: "autocomplete", path: "/autocomplete" },
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
      { label: "Tabs",      routeName: "tabs",      path: "/tabs" },
      { label: "Accordion", routeName: "accordion", path: "/accordion" },
      { label: "Progress",  routeName: "progress",  path: "/progress" },
      { label: "Table",     routeName: "table",     path: "/table" },
    ]
  },
  {
    category: "Interactions",
    items: [
      { label: "Sortable",  routeName: "sortable",  path: "/sortable" },
      { label: "Draggable", routeName: "draggable", path: "/draggable" },
      { label: "Droppable", routeName: "droppable", path: "/droppable" },
      { label: "Resizable", routeName: "resizable", path: "/resizable" },
      { label: "Tall Page", routeName: "tall",       path: "/tall" },
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

Note: The `Interactions` category is unchanged. The old `{ label: "Widgets", routeName: "widgets" }` entry is replaced by the four real widget pages.

- [ ] **Step 2: Update `src/router/index.js` — remove WidgetsPage, add redirect**

In `src/router/index.js`:

a) Remove the `WidgetsPage` import line:
```js
import WidgetsPage from "@/views/categories/WidgetsPage.vue";
```

b) In `componentMap`, remove the `widgets` entry:
```js
widgets: WidgetsPage,
```

c) In `descriptionMap`, remove the `widgets` entry:
```js
widgets: "Widget components — more coming in Phase 2",
```

d) In the `routes` array (after `{ path: "/interactions", redirect: "/sortable" }`), add:
```js
{ path: "/widgets", redirect: "/tabs" },
```

The `WidgetsPage.vue` file itself is left in place — it is simply no longer imported or routed.

- [ ] **Step 3: Verify the app still builds**

```bash
npm run lint && npm run build
```

Expected: No errors. The sidebar now shows 4 Elements items (Radio Buttons through Sliders), but only Radio Buttons routes — the others are in nav config but not yet in componentMap, so they silently skip. Widgets category shows 4 items but none route yet.

- [ ] **Step 4: Commit**

```bash
git add src/config/navigation.js src/router/index.js
git commit -m "phase2: update nav config and router prep for 10 new component pages"
```

---

## Task 2: Buttons page

**Files:**
- Create: `src/views/tools/ButtonsPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/ButtonsPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Buttons</h1>
    <p class="page-desc">Button variants, states, and sizes</p>

    <section class="section">
      <h2>Variants</h2>
      <div class="btn-row">
        <button class="btn btn-primary" data-testid="btn-primary" @click="setResult('Primary')">Primary</button>
        <button class="btn btn-secondary" data-testid="btn-secondary" @click="setResult('Secondary')">Secondary</button>
        <button class="btn btn-danger" data-testid="btn-danger" @click="setResult('Danger')">Danger</button>
        <button class="btn btn-ghost" data-testid="btn-ghost" @click="setResult('Ghost')">Ghost</button>
        <button class="btn btn-outline" data-testid="btn-outline" @click="setResult('Outline')">Outline</button>
      </div>
    </section>

    <section class="section">
      <h2>Sizes</h2>
      <div class="btn-row">
        <button class="btn btn-primary btn-sm" data-testid="btn-small" @click="setResult('Small')">Small</button>
        <button class="btn btn-primary btn-md" data-testid="btn-medium" @click="setResult('Medium')">Medium</button>
        <button class="btn btn-primary btn-lg" data-testid="btn-large" @click="setResult('Large')">Large</button>
      </div>
    </section>

    <section class="section">
      <h2>States</h2>
      <div class="btn-row">
        <button class="btn btn-primary" disabled data-testid="btn-disabled">Disabled</button>
        <button class="btn btn-primary" data-testid="btn-loading" disabled>
          <span class="spinner"></span> Loading
        </button>
      </div>
    </section>

    <section class="section">
      <h2>Result</h2>
      <p class="result-text">Last clicked: <span data-testid="btn-result">{{ lastClicked || 'none' }}</span></p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { lastClicked: '' };
  },
  methods: {
    setResult(label) { this.lastClicked = label; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 900px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.btn-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; }
.btn {
  border: none; cursor: pointer; font-size: 0.875rem; font-weight: 500;
  border-radius: var(--radius); transition: background 0.15s, opacity 0.15s;
  display: inline-flex; align-items: center; gap: 0.4rem;
}
.btn-md, .btn:not(.btn-sm):not(.btn-lg) { padding: 0.5rem 1.25rem; }
.btn-sm { padding: 0.25rem 0.75rem; font-size: 0.75rem; }
.btn-lg { padding: 0.75rem 2rem; font-size: 1rem; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover:not(:disabled) { background: var(--accent-hover); }
.btn-secondary { background: var(--bg-sidebar); color: var(--text-primary); border: 1px solid var(--border); }
.btn-secondary:hover:not(:disabled) { background: var(--border); }
.btn-danger { background: #ef4444; color: #fff; }
.btn-danger:hover:not(:disabled) { background: #dc2626; }
.btn-ghost { background: transparent; color: var(--accent); }
.btn-ghost:hover:not(:disabled) { background: var(--accent-light); }
.btn-outline { background: transparent; color: var(--accent); border: 1px solid var(--accent); }
.btn-outline:hover:not(:disabled) { background: var(--accent-light); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.spinner {
  display: inline-block; width: 12px; height: 12px;
  border: 2px solid rgba(255,255,255,0.4); border-top-color: #fff;
  border-radius: 50%; animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.result-text { color: var(--text-secondary); font-size: 0.9rem; }
.result-text span { font-weight: 600; color: var(--accent); }
</style>
```

- [ ] **Step 2: Wire into router — add import and map entries to `src/router/index.js`**

Add import at top (with other page imports):
```js
import ButtonsPage from "@/views/tools/ButtonsPage.vue";
```

Add to `componentMap`:
```js
buttons: ButtonsPage,
```

Add to `descriptionMap`:
```js
buttons: "Button variants, states, and sizes",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Expected: No errors. The `/buttons` route is now live. Open http://localhost:8081/buttons and verify: 5 variant buttons, 3 size buttons, disabled/loading buttons, and clicking updates the result span.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/ButtonsPage.vue src/router/index.js
git commit -m "phase2: add Buttons page"
```

---

## Task 3: Text Inputs page

**Files:**
- Create: `src/views/tools/TextInputsPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/TextInputsPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Text Inputs</h1>
    <p class="page-desc">Input types and states</p>

    <div class="inputs-grid">
      <div class="input-group">
        <label>Text</label>
        <input type="text" v-model="values.text" data-testid="input-text" placeholder="Enter text" />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input type="password" v-model="values.password" data-testid="input-password" placeholder="Enter password" />
      </div>
      <div class="input-group">
        <label>Email</label>
        <input type="email" v-model="values.email" data-testid="input-email" placeholder="Enter email" />
      </div>
      <div class="input-group">
        <label>Number (0–100)</label>
        <input type="number" v-model.number="values.number" data-testid="input-number" min="0" max="100" placeholder="0–100" />
      </div>
      <div class="input-group full-width">
        <label>Textarea</label>
        <textarea v-model="values.textarea" data-testid="input-textarea" rows="3" placeholder="Enter text..."></textarea>
      </div>
      <div class="input-group">
        <label>Disabled</label>
        <input type="text" value="Read-only value" data-testid="input-disabled" disabled />
      </div>
      <div class="input-group">
        <label>Error state</label>
        <input type="text" value="invalid@" data-testid="input-error" class="input-error-state" />
        <span class="error-msg">Invalid email address</span>
      </div>
      <div class="input-group">
        <label>Success state</label>
        <input type="text" value="valid@example.com" data-testid="input-success" class="input-success-state" />
      </div>
    </div>

    <section class="section">
      <h2>Current Values</h2>
      <div data-testid="input-values" class="values-display">
        <span v-for="(val, key) in values" :key="key">
          <strong>{{ key }}:</strong> {{ val !== '' && val !== null ? val : '—' }}
        </span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      values: { text: '', password: '', email: '', number: '', textarea: '' }
    };
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 900px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.inputs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; margin-bottom: 2rem; }
.full-width { grid-column: 1 / -1; }
.input-group { display: flex; flex-direction: column; gap: 0.4rem; }
.input-group label { font-size: 0.875rem; font-weight: 500; color: var(--text-secondary); }
input, textarea {
  padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem;
  transition: border-color 0.15s;
}
input:focus, textarea:focus { outline: none; border-color: var(--accent); }
input:disabled { opacity: 0.6; cursor: not-allowed; background: var(--bg-sidebar); }
textarea { resize: vertical; }
.input-error-state { border-color: #ef4444; }
.input-success-state { border-color: #22c55e; }
.error-msg { font-size: 0.75rem; color: #ef4444; }
.section { margin-bottom: 1.5rem; }
.section h2 { margin-bottom: 0.75rem; font-size: 1rem; }
.values-display { display: flex; flex-wrap: wrap; gap: 0.5rem 2rem; padding: 0.75rem 1rem; background: var(--bg-sidebar); border-radius: var(--radius); }
.values-display span { font-size: 0.875rem; color: var(--text-secondary); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import TextInputsPage from "@/views/tools/TextInputsPage.vue";
```

Add to `componentMap`:
```js
textInputs: TextInputsPage,
```

Add to `descriptionMap`:
```js
textInputs: "Text, password, email, number, and textarea inputs with states",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/text-inputs. Verify: 8 input fields (text, password, email, number, textarea, disabled, error, success), values section updates as you type.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/TextInputsPage.vue src/router/index.js
git commit -m "phase2: add Text Inputs page"
```

---

## Task 4: Checkboxes & Toggles page

**Files:**
- Create: `src/views/tools/CheckboxesPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/CheckboxesPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Checkboxes &amp; Toggles</h1>
    <p class="page-desc">Checkbox and toggle switch states</p>

    <section class="section">
      <h2>Checkboxes</h2>
      <div class="controls-list">
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-unchecked" v-model="checks.unchecked" />
          <span>Unchecked (default)</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-checked" v-model="checks.checked" />
          <span>Checked (default)</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-indeterminate" ref="indeterminate" v-model="checks.indeterminate" />
          <span>Indeterminate</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-disabled" disabled />
          <span>Disabled unchecked</span>
        </label>
        <label class="control-label">
          <input type="checkbox" data-testid="checkbox-disabled-checked" disabled checked />
          <span>Disabled checked</span>
        </label>
      </div>
    </section>

    <section class="section">
      <h2>Toggle Switches</h2>
      <div class="controls-list">
        <label class="toggle-label">
          <input type="checkbox" data-testid="toggle-off" v-model="toggles.off" class="toggle-input" />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>Toggle (off)</span>
        </label>
        <label class="toggle-label">
          <input type="checkbox" data-testid="toggle-on" v-model="toggles.on" class="toggle-input" />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>Toggle (on by default)</span>
        </label>
        <label class="toggle-label">
          <input type="checkbox" data-testid="toggle-disabled" disabled class="toggle-input" />
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span>Toggle disabled</span>
        </label>
      </div>
    </section>

    <section class="section">
      <h2>State Summary</h2>
      <div data-testid="checkbox-state-summary" class="summary">{{ stateSummary }}</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checks: { unchecked: false, checked: true, indeterminate: false },
      toggles: { off: false, on: true }
    };
  },
  computed: {
    stateSummary() {
      const active = [];
      if (this.checks.unchecked) active.push('Unchecked');
      if (this.checks.checked) active.push('Checked');
      if (this.checks.indeterminate) active.push('Indeterminate');
      if (this.toggles.off) active.push('Toggle off');
      if (this.toggles.on) active.push('Toggle on');
      return active.length ? active.join(', ') : 'None checked';
    }
  },
  mounted() {
    this.$refs.indeterminate.indeterminate = true;
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.controls-list { display: flex; flex-direction: column; gap: 0.75rem; }
.control-label { display: flex; align-items: center; gap: 0.6rem; cursor: pointer; color: var(--text-primary); font-size: 0.9rem; }
.control-label input[type="checkbox"] { accent-color: var(--accent); width: 16px; height: 16px; cursor: pointer; }
.control-label input:disabled { cursor: not-allowed; }
/* Toggle */
.toggle-label { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; color: var(--text-primary); font-size: 0.9rem; }
.toggle-input { display: none; }
.toggle-track {
  position: relative; width: 44px; height: 24px; background: var(--border);
  border-radius: 999px; transition: background 0.2s; flex-shrink: 0;
}
.toggle-thumb {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
  background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle-input:checked + .toggle-track { background: var(--accent); }
.toggle-input:checked + .toggle-track .toggle-thumb { transform: translateX(20px); }
.toggle-input:disabled + .toggle-track { opacity: 0.5; cursor: not-allowed; }
.summary {
  padding: 0.75rem 1rem; background: var(--bg-sidebar); border-radius: var(--radius);
  color: var(--text-secondary); font-size: 0.9rem;
}
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import CheckboxesPage from "@/views/tools/CheckboxesPage.vue";
```

Add to `componentMap`:
```js
checkboxes: CheckboxesPage,
```

Add to `descriptionMap`:
```js
checkboxes: "Checkbox and toggle switch states",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/checkboxes. Verify: 5 checkboxes (the indeterminate one shows a dash), 3 toggles (off/on/disabled), state summary updates as you interact.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/CheckboxesPage.vue src/router/index.js
git commit -m "phase2: add Checkboxes & Toggles page"
```

---

## Task 5: Sliders page

**Files:**
- Create: `src/views/tools/SlidersPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/SlidersPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Sliders</h1>
    <p class="page-desc">Range sliders — single, dual-handle, and stepped</p>

    <section class="section">
      <h2>Basic Slider</h2>
      <div class="slider-row">
        <input type="range" min="0" max="100" step="1" v-model.number="basic" data-testid="slider-basic" />
        <span class="value-badge" data-testid="slider-basic-value">{{ basic }}</span>
      </div>
    </section>

    <section class="section">
      <h2>Steps (step=10)</h2>
      <div class="slider-row">
        <input type="range" min="0" max="100" step="10" v-model.number="steps" data-testid="slider-steps" />
        <span class="value-badge" data-testid="slider-steps-value">{{ steps }}</span>
      </div>
    </section>

    <section class="section">
      <h2>Disabled</h2>
      <div class="slider-row">
        <input type="range" min="0" max="100" value="40" disabled data-testid="slider-disabled" />
        <span class="value-badge">40</span>
      </div>
    </section>

    <section class="section">
      <h2>Dual-Handle Range</h2>
      <div class="slider-stack">
        <div class="slider-row">
          <span class="range-label">Min</span>
          <input type="range" min="0" max="100" step="1" v-model.number="rangeMin" data-testid="slider-range-min" @input="clampMin" />
        </div>
        <div class="slider-row">
          <span class="range-label">Max</span>
          <input type="range" min="0" max="100" step="1" v-model.number="rangeMax" data-testid="slider-range-max" @input="clampMax" />
        </div>
        <span class="value-badge" data-testid="slider-range-value">{{ rangeMin }} – {{ rangeMax }}</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { basic: 50, steps: 30, rangeMin: 20, rangeMax: 70 };
  },
  methods: {
    clampMin() { if (this.rangeMin > this.rangeMax) this.rangeMin = this.rangeMax; },
    clampMax() { if (this.rangeMax < this.rangeMin) this.rangeMax = this.rangeMin; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.slider-row { display: flex; align-items: center; gap: 1rem; }
input[type="range"] { flex: 1; accent-color: var(--accent); cursor: pointer; height: 4px; }
input[type="range"]:disabled { opacity: 0.5; cursor: not-allowed; }
.value-badge {
  min-width: 64px; text-align: center; padding: 0.25rem 0.5rem;
  background: var(--accent-light); color: var(--accent); border-radius: var(--radius);
  font-size: 0.875rem; font-weight: 600;
}
.slider-stack { display: flex; flex-direction: column; gap: 0.75rem; }
.range-label { min-width: 32px; font-size: 0.75rem; color: var(--text-muted); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import SlidersPage from "@/views/tools/SlidersPage.vue";
```

Add to `componentMap`:
```js
sliders: SlidersPage,
```

Add to `descriptionMap`:
```js
sliders: "Range sliders — single, dual-handle, and stepped",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/sliders. Verify: basic slider updates badge, steps slider snaps to tens, disabled slider can't be moved, dual-handle range shows combined value.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/SlidersPage.vue src/router/index.js
git commit -m "phase2: add Sliders page"
```

---

## Task 6: File Upload page

**Files:**
- Create: `src/views/tools/FileUploadPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/FileUploadPage.vue`**

```vue
<template>
  <div class="page">
    <h1>File Upload</h1>
    <p class="page-desc">Single, multiple, and drag-and-drop file inputs</p>

    <section class="section">
      <h2>Single File</h2>
      <input type="file" data-testid="file-input-single" @change="onSingle" />
      <p class="file-name" data-testid="file-single-name">{{ singleName || 'No file selected' }}</p>
    </section>

    <section class="section">
      <h2>Multiple Files</h2>
      <input type="file" multiple data-testid="file-input-multiple" @change="onMultiple" />
      <ul class="file-list" data-testid="file-multiple-list">
        <li v-for="name in multipleNames" :key="name">{{ name }}</li>
        <li v-if="!multipleNames.length" class="empty">No files selected</li>
      </ul>
    </section>

    <section class="section">
      <h2>Type Filtered (Images &amp; PDFs)</h2>
      <input type="file" accept=".jpg,.jpeg,.png,.pdf" data-testid="file-input-typed" />
      <p class="hint">Accepts .jpg, .jpeg, .png, .pdf only</p>
    </section>

    <section class="section">
      <h2>Drag &amp; Drop Zone</h2>
      <div
        class="drop-zone"
        data-testid="file-drop-zone"
        :class="{ 'drag-over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="onDrop"
      >
        <p>{{ isDragging ? 'Drop files here' : 'Drag files here' }}</p>
      </div>
      <ul class="file-list" data-testid="file-drop-list">
        <li v-for="name in dropNames" :key="name">{{ name }}</li>
        <li v-if="!dropNames.length" class="empty">No files dropped</li>
      </ul>
      <button class="clear-btn" data-testid="file-drop-clear" @click="dropNames = []">Clear</button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return { singleName: '', multipleNames: [], dropNames: [], isDragging: false };
  },
  methods: {
    onSingle(e) { this.singleName = e.target.files[0]?.name || ''; },
    onMultiple(e) { this.multipleNames = Array.from(e.target.files).map(f => f.name); },
    onDrop(e) {
      this.isDragging = false;
      const names = Array.from(e.dataTransfer.files).map(f => f.name);
      this.dropNames = [...this.dropNames, ...names];
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 0.75rem; color: var(--text-primary); font-size: 1rem; }
.file-name { margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.875rem; }
.file-list { margin-top: 0.5rem; padding-left: 1.25rem; font-size: 0.875rem; color: var(--text-secondary); }
.file-list .empty { list-style: none; padding-left: 0; color: var(--text-muted); }
.hint { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; }
.drop-zone {
  border: 2px dashed var(--border); border-radius: var(--radius);
  padding: 2.5rem; text-align: center; color: var(--text-muted);
  transition: background 0.15s, border-color 0.15s;
}
.drop-zone.drag-over { background: var(--accent-light); border-color: var(--accent); color: var(--accent); }
.clear-btn {
  margin-top: 0.5rem; padding: 0.3rem 0.75rem; border: 1px solid var(--border);
  border-radius: var(--radius); background: var(--bg-input); color: var(--text-secondary);
  cursor: pointer; font-size: 0.8rem;
}
.clear-btn:hover { background: var(--border); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import FileUploadPage from "@/views/tools/FileUploadPage.vue";
```

Add to `componentMap`:
```js
fileUpload: FileUploadPage,
```

Add to `descriptionMap`:
```js
fileUpload: "Single, multiple, and drag-and-drop file inputs",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/file-upload. Verify: single file input shows filename, multiple shows list, type-filtered input shows accept dialog filter, drag-zone highlights on drag and lists dropped files.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/FileUploadPage.vue src/router/index.js
git commit -m "phase2: add File Upload page"
```

---

## Task 7: Autocomplete page

**Files:**
- Create: `src/views/tools/AutocompletePage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/AutocompletePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Autocomplete</h1>
    <p class="page-desc">Input with filtered dropdown suggestions and keyboard navigation</p>

    <section class="section">
      <div class="autocomplete-wrapper">
        <input
          type="text"
          v-model="query"
          data-testid="autocomplete-input"
          placeholder="Type a country name..."
          @input="onInput"
          @keydown="onKeydown"
          @blur="delayClose"
          autocomplete="off"
        />
        <ul v-if="showDropdown && filtered.length" class="dropdown" data-testid="autocomplete-dropdown">
          <li
            v-for="(item, i) in filtered"
            :key="item"
            :class="{ highlighted: i === activeIndex }"
            :data-testid="`autocomplete-option-${i + 1}`"
            @mousedown.prevent="select(item)"
          >{{ item }}</li>
        </ul>
      </div>

      <button class="clear-btn" data-testid="autocomplete-clear" @click="clear">Clear</button>

      <p class="selected-display">
        Selected: <span data-testid="autocomplete-selected">{{ selected || '—' }}</span>
      </p>
    </section>
  </div>
</template>

<script>
const COUNTRIES = [
  'Afghanistan', 'Australia', 'Brazil', 'Canada', 'China', 'Denmark', 'Egypt',
  'Finland', 'France', 'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Kenya',
  'Mexico', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway', 'Pakistan', 'Poland',
  'Portugal', 'Russia', 'South Africa', 'South Korea', 'Spain', 'Sweden',
  'Turkey', 'United Kingdom', 'United States', 'Vietnam'
];

export default {
  data() {
    return { query: '', selected: '', showDropdown: false, activeIndex: -1 };
  },
  computed: {
    filtered() {
      if (!this.query) return [];
      const q = this.query.toLowerCase();
      return COUNTRIES.filter(c => c.toLowerCase().includes(q));
    }
  },
  methods: {
    onInput() { this.showDropdown = true; this.activeIndex = -1; },
    onKeydown(e) {
      if (!this.showDropdown || !this.filtered.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.activeIndex = Math.min(this.activeIndex + 1, this.filtered.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.activeIndex = Math.max(this.activeIndex - 1, 0);
      } else if (e.key === 'Enter' && this.activeIndex >= 0) {
        this.select(this.filtered[this.activeIndex]);
      } else if (e.key === 'Escape') {
        this.showDropdown = false;
      }
    },
    select(item) {
      this.query = item;
      this.selected = item;
      this.showDropdown = false;
      this.activeIndex = -1;
    },
    delayClose() { setTimeout(() => { this.showDropdown = false; }, 150); },
    clear() { this.query = ''; this.selected = ''; this.showDropdown = false; }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 600px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.autocomplete-wrapper { position: relative; }
input[type="text"] {
  width: 100%; box-sizing: border-box; padding: 0.5rem 0.75rem;
  border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem;
}
input[type="text"]:focus { outline: none; border-color: var(--accent); }
.dropdown {
  position: absolute; top: calc(100% + 4px); left: 0; right: 0;
  background: var(--bg-primary); border: 1px solid var(--border); border-radius: var(--radius);
  max-height: 200px; overflow-y: auto; z-index: 10; list-style: none; margin: 0; padding: 0.25rem 0;
}
.dropdown li { padding: 0.5rem 0.75rem; font-size: 0.875rem; color: var(--text-primary); cursor: pointer; }
.dropdown li:hover, .dropdown li.highlighted { background: var(--accent-light); color: var(--accent); }
.clear-btn {
  margin-top: 0.75rem; padding: 0.35rem 0.75rem; border: 1px solid var(--border);
  border-radius: var(--radius); background: var(--bg-input); color: var(--text-secondary); cursor: pointer;
}
.clear-btn:hover { background: var(--border); }
.selected-display { margin-top: 0.75rem; font-size: 0.875rem; color: var(--text-secondary); }
.selected-display span { font-weight: 600; color: var(--accent); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import AutocompletePage from "@/views/tools/AutocompletePage.vue";
```

Add to `componentMap`:
```js
autocomplete: AutocompletePage,
```

Add to `descriptionMap`:
```js
autocomplete: "Input with filtered dropdown suggestions and keyboard navigation",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/autocomplete. Verify: typing "fr" shows France, typing ArrowDown highlights, Enter selects, selection shows in "Selected" display, Escape closes dropdown, Clear resets.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/AutocompletePage.vue src/router/index.js
git commit -m "phase2: add Autocomplete page"
```

---

## Task 8: Tabs page

**Files:**
- Create: `src/views/tools/TabsPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/TabsPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Tabs</h1>
    <p class="page-desc">Tab navigation with switchable content panels</p>

    <div class="tabs-container" data-testid="tabs-container">
      <div class="tab-bar">
        <button
          v-for="(tab, i) in tabs"
          :key="tab.id"
          class="tab"
          :class="{ active: activeTab === i }"
          :data-testid="`tab-${i + 1}`"
          @click="activeTab = i"
        >{{ tab.label }}</button>
      </div>

      <div class="tab-panels">
        <div v-show="activeTab === 0" class="tab-panel" data-testid="tab-panel-1">
          <h3>Overview</h3>
          <p>This tabs component demonstrates a common navigation pattern used in web applications. Click any tab above to switch between panels. Tests can target <code>data-testid="tab-{n}"</code> to click tabs and <code>data-testid="tab-panel-{n}"</code> to verify panel content.</p>
        </div>
        <div v-show="activeTab === 1" class="tab-panel" data-testid="tab-panel-2">
          <h3>Details</h3>
          <table class="details-table">
            <tr><td>Component</td><td>Tabs</td></tr>
            <tr><td>Category</td><td>Widgets</td></tr>
            <tr><td>Tab count</td><td>4</td></tr>
            <tr><td>Default active</td><td>1</td></tr>
          </table>
        </div>
        <div v-show="activeTab === 2" class="tab-panel" data-testid="tab-panel-3">
          <h3>Code</h3>
          <pre class="code-block"><code>// Click a tab
await page.click('[data-testid="tab-2"]')

// Verify panel is visible
await expect(
  page.locator('[data-testid="tab-panel-2"]')
).toBeVisible()</code></pre>
        </div>
        <div v-show="activeTab === 3" class="tab-panel" data-testid="tab-panel-4">
          <h3>Settings</h3>
          <div class="settings-list">
            <label class="toggle-label">
              <input type="checkbox" v-model="settings.animate" class="toggle-input" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
              <span>Animate transitions</span>
            </label>
            <label class="toggle-label">
              <input type="checkbox" v-model="settings.lazy" class="toggle-input" />
              <span class="toggle-track"><span class="toggle-thumb"></span></span>
              <span>Lazy load panels</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { id: 1, label: 'Overview' },
        { id: 2, label: 'Details' },
        { id: 3, label: 'Code' },
        { id: 4, label: 'Settings' },
      ],
      settings: { animate: true, lazy: false }
    };
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 800px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.tabs-container { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.tab-bar { display: flex; border-bottom: 1px solid var(--border); }
.tab {
  padding: 0.75rem 1.25rem; background: none; border: none; cursor: pointer;
  font-size: 0.875rem; color: var(--text-secondary); border-bottom: 2px solid transparent;
  transition: color 0.15s;
}
.tab.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 500; }
.tab:hover:not(.active) { color: var(--text-primary); }
.tab-panel { padding: 1.5rem; color: var(--text-primary); }
.tab-panel h3 { margin-bottom: 0.75rem; font-size: 1rem; }
.tab-panel p { color: var(--text-secondary); line-height: 1.6; font-size: 0.9rem; }
.details-table { border-collapse: collapse; width: 100%; }
.details-table td { padding: 0.5rem 0.75rem; border-bottom: 1px solid var(--border); font-size: 0.875rem; }
.details-table td:first-child { color: var(--text-muted); width: 40%; }
.code-block {
  background: var(--bg-sidebar); padding: 1rem; border-radius: var(--radius);
  font-size: 0.8rem; color: var(--text-secondary); overflow-x: auto; white-space: pre;
}
.settings-list { display: flex; flex-direction: column; gap: 1rem; }
/* Toggle (same pattern as CheckboxesPage) */
.toggle-label { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; color: var(--text-primary); font-size: 0.9rem; }
.toggle-input { display: none; }
.toggle-track {
  position: relative; width: 44px; height: 24px; background: var(--border);
  border-radius: 999px; transition: background 0.2s; flex-shrink: 0;
}
.toggle-thumb {
  position: absolute; top: 3px; left: 3px; width: 18px; height: 18px;
  background: #fff; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle-input:checked + .toggle-track { background: var(--accent); }
.toggle-input:checked + .toggle-track .toggle-thumb { transform: translateX(20px); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import TabsPage from "@/views/tools/TabsPage.vue";
```

Add to `componentMap`:
```js
tabs: TabsPage,
```

Add to `descriptionMap`:
```js
tabs: "Tab navigation with switchable content panels",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/tabs. Verify: 4 tabs render, clicking switches active panel, Settings tab shows working toggles. Also verify http://localhost:8081/widgets redirects to /tabs.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/TabsPage.vue src/router/index.js
git commit -m "phase2: add Tabs page"
```

---

## Task 9: Accordion page

**Files:**
- Create: `src/views/tools/AccordionPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/AccordionPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Accordion</h1>
    <p class="page-desc">Collapsible accordion items with expand/collapse controls</p>

    <div class="accordion-controls">
      <button data-testid="accordion-expand-all" @click="expandAll">Expand All</button>
      <button data-testid="accordion-collapse-all" @click="collapseAll">Collapse All</button>
    </div>

    <div class="accordion">
      <div v-for="(item, i) in items" :key="i" class="accordion-item">
        <button
          class="accordion-header"
          :data-testid="`accordion-header-${i + 1}`"
          @click="toggle(i)"
        >
          <span>{{ item.question }}</span>
          <span class="chevron" :class="{ open: item.open }">▼</span>
        </button>
        <div
          v-show="item.open"
          class="accordion-body"
          :data-testid="`accordion-body-${i + 1}`"
        >{{ item.answer }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          question: 'What is this accordion used for?',
          answer: 'This accordion is a UI test automation target. It demonstrates expand/collapse behavior that automated tests can interact with using data-testid selectors.',
          open: false
        },
        {
          question: 'How do I interact with it in tests?',
          answer: 'Click accordion-header-{n} to toggle an item. Check accordion-body-{n} visibility to verify the open state. Use accordion-expand-all and accordion-collapse-all for bulk operations.',
          open: false
        },
        {
          question: 'Can multiple items be open at once?',
          answer: 'Yes — this accordion allows multiple items open simultaneously. Each item state is independent.',
          open: false
        },
        {
          question: 'What happens when I expand all?',
          answer: 'All accordion bodies become visible at once. The expand-all button sets every item\'s open state to true.',
          open: true
        },
        {
          question: 'Is there animation?',
          answer: 'No animation in Phase 2 — the show/hide is immediate via v-show. Animated transitions may be added in a later phase.',
          open: false
        },
      ]
    };
  },
  methods: {
    toggle(i) { this.items[i].open = !this.items[i].open; },
    expandAll() { this.items.forEach(item => { item.open = true; }); },
    collapseAll() { this.items.forEach(item => { item.open = false; }); }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.accordion-controls { display: flex; gap: 0.75rem; margin-bottom: 1.25rem; }
.accordion-controls button {
  padding: 0.4rem 1rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-secondary); cursor: pointer; font-size: 0.875rem;
}
.accordion-controls button:hover { background: var(--border); }
.accordion { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.accordion-item { border-bottom: 1px solid var(--border); }
.accordion-item:last-child { border-bottom: none; }
.accordion-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.25rem; background: var(--bg-primary); border: none; cursor: pointer;
  text-align: left; font-size: 0.9rem; font-weight: 500; color: var(--text-primary);
}
.accordion-header:hover { background: var(--bg-sidebar); }
.chevron { transition: transform 0.2s; font-size: 0.75rem; color: var(--text-muted); flex-shrink: 0; }
.chevron.open { transform: rotate(180deg); }
.accordion-body {
  padding: 0.75rem 1.25rem 1rem; color: var(--text-secondary);
  font-size: 0.875rem; line-height: 1.6; background: var(--bg-sidebar);
}
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import AccordionPage from "@/views/tools/AccordionPage.vue";
```

Add to `componentMap`:
```js
accordion: AccordionPage,
```

Add to `descriptionMap`:
```js
accordion: "Collapsible accordion items with expand/collapse controls",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/accordion. Verify: item 4 starts open, clicking headers toggle them, Expand All opens all, Collapse All closes all.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/AccordionPage.vue src/router/index.js
git commit -m "phase2: add Accordion page"
```

---

## Task 10: Progress page

**Files:**
- Create: `src/views/tools/ProgressPage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/ProgressPage.vue`**

```vue
<template>
  <div class="page">
    <h1>Progress</h1>
    <p class="page-desc">Determinate and animated progress indicators</p>

    <section class="section">
      <h2>Static Progress Bars</h2>
      <div v-for="(pct, i) in staticBars" :key="i" class="progress-group">
        <div class="progress-track" :data-testid="`progress-bar-${i + 1}`">
          <div class="progress-fill" :data-testid="`progress-fill-${i + 1}`" :style="{ width: pct + '%' }"></div>
        </div>
        <span class="progress-label">{{ pct }}%</span>
      </div>
    </section>

    <section class="section">
      <h2>Animated Progress</h2>
      <div class="progress-group">
        <div class="progress-track" data-testid="progress-animated">
          <div class="progress-fill" :style="{ width: animatedValue + '%' }"></div>
        </div>
        <span class="progress-label" data-testid="progress-animated-value">{{ animatedValue }}%</span>
      </div>
      <div class="btn-row">
        <button class="btn-start" data-testid="progress-start" @click="startAnimation" :disabled="running">Start</button>
        <button class="btn-reset" data-testid="progress-reset" @click="resetAnimation">Reset</button>
      </div>
    </section>

    <section class="section">
      <h2>Indeterminate</h2>
      <div class="progress-track indeterminate-track" data-testid="progress-indeterminate">
        <div class="progress-fill indeterminate-fill"></div>
      </div>
    </section>

    <section class="section">
      <h2>Circular Progress</h2>
      <div class="circular-wrapper">
        <svg width="80" height="80" viewBox="0 0 80 80" data-testid="progress-circular">
          <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border)" stroke-width="8"/>
          <circle
            cx="40" cy="40" r="34" fill="none" stroke="var(--accent)" stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            transform="rotate(-90 40 40)"
          />
        </svg>
        <span class="circular-label" data-testid="progress-circular-value">{{ animatedValue }}%</span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staticBars: [0, 25, 50, 75, 100],
      animatedValue: 0,
      running: false,
      timer: null,
    };
  },
  computed: {
    circumference() { return 2 * Math.PI * 34; },
    dashOffset() { return this.circumference * (1 - this.animatedValue / 100); }
  },
  methods: {
    startAnimation() {
      if (this.running) return;
      this.running = true;
      this.timer = setInterval(() => {
        if (this.animatedValue >= 100) { clearInterval(this.timer); this.running = false; return; }
        this.animatedValue += 1;
      }, 30);
    },
    resetAnimation() {
      clearInterval(this.timer);
      this.running = false;
      this.animatedValue = 0;
    }
  },
  beforeUnmount() { clearInterval(this.timer); }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 700px; }
.page-desc { color: var(--text-secondary); margin-bottom: 2rem; }
.section { margin-bottom: 2rem; }
.section h2 { margin-bottom: 1rem; color: var(--text-primary); font-size: 1rem; }
.progress-group { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.progress-track { flex: 1; height: 12px; background: var(--border); border-radius: 999px; overflow: hidden; }
.progress-fill { height: 100%; background: var(--accent); border-radius: 999px; transition: width 0.05s linear; }
.progress-label { min-width: 40px; font-size: 0.8rem; color: var(--text-secondary); text-align: right; }
.btn-row { display: flex; gap: 0.75rem; margin-top: 0.75rem; }
.btn-start, .btn-reset {
  padding: 0.4rem 1rem; border: 1px solid var(--border); border-radius: var(--radius);
  cursor: pointer; font-size: 0.875rem;
}
.btn-start { background: var(--accent); color: #fff; border-color: var(--accent); }
.btn-start:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-reset { background: var(--bg-input); color: var(--text-secondary); }
.btn-reset:hover { background: var(--border); }
.indeterminate-fill {
  width: 40%; animation: indeterminate 1.2s ease-in-out infinite;
}
@keyframes indeterminate {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
.circular-wrapper { display: inline-flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.circular-label { font-size: 0.8rem; color: var(--text-secondary); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import ProgressPage from "@/views/tools/ProgressPage.vue";
```

Add to `componentMap`:
```js
progress: ProgressPage,
```

Add to `descriptionMap`:
```js
progress: "Determinate and animated progress indicators",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/progress. Verify: 5 static bars at 0/25/50/75/100%, Start button animates bar and circular together, Reset resets to 0, indeterminate bar animates continuously.

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/ProgressPage.vue src/router/index.js
git commit -m "phase2: add Progress page"
```

---

## Task 11: Table page

**Files:**
- Create: `src/views/tools/TablePage.vue`
- Modify: `src/router/index.js`

- [ ] **Step 1: Create `src/views/tools/TablePage.vue`**

```vue
<template>
  <div class="page">
    <h1>Table</h1>
    <p class="page-desc">Sortable, filterable, paginated data table with row selection</p>

    <div class="table-controls">
      <input
        type="text"
        v-model="searchQuery"
        data-testid="table-search"
        placeholder="Search..."
        class="search-input"
      />
      <span class="selected-count" data-testid="table-selected-count">{{ selectedEmails.length }} rows selected</span>
    </div>

    <div class="table-wrapper">
      <table class="data-table" data-testid="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                data-testid="table-select-all"
                :checked="allSelected"
                @change="toggleAll"
              />
            </th>
            <th
              v-for="col in columns"
              :key="col.key"
              class="sortable-header"
              :data-testid="`table-header-${col.key}`"
              @click="sortBy(col.key)"
            >
              {{ col.label }}
              <span class="sort-icon">{{ sortColumn === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in paginatedRows"
            :key="row.email"
            :data-testid="`table-row-${i + 1}`"
            :class="{ selected: selectedEmails.includes(row.email) }"
          >
            <td>
              <input
                type="checkbox"
                :data-testid="`table-row-checkbox-${i + 1}`"
                :checked="selectedEmails.includes(row.email)"
                @change="toggleRow(row.email)"
              />
            </td>
            <td>{{ row.name }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.role }}</td>
            <td><span class="status-badge" :class="`status-${row.status.toLowerCase()}`">{{ row.status }}</span></td>
            <td>{{ row.joinDate }}</td>
          </tr>
          <tr v-if="paginatedRows.length === 0">
            <td colspan="6" class="empty-row">No results</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button data-testid="table-prev" :disabled="currentPage === 1" @click="currentPage--">Prev</button>
      <span data-testid="table-page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button data-testid="table-next" :disabled="currentPage >= totalPages" @click="currentPage++">Next</button>
    </div>
  </div>
</template>

<script>
const ALL_ROWS = [
  { name: 'Alice Martin',   email: 'alice@example.com',   role: 'Admin',   status: 'Active',   joinDate: '2022-01-15' },
  { name: 'Bob Chen',       email: 'bob@example.com',     role: 'User',    status: 'Active',   joinDate: '2022-03-22' },
  { name: 'Carol White',    email: 'carol@example.com',   role: 'Editor',  status: 'Inactive', joinDate: '2022-05-10' },
  { name: 'David Kim',      email: 'david@example.com',   role: 'User',    status: 'Active',   joinDate: '2022-07-08' },
  { name: 'Eve Torres',     email: 'eve@example.com',     role: 'Admin',   status: 'Active',   joinDate: '2022-09-14' },
  { name: 'Frank Johnson',  email: 'frank@example.com',   role: 'User',    status: 'Pending',  joinDate: '2022-11-01' },
  { name: 'Grace Lee',      email: 'grace@example.com',   role: 'Editor',  status: 'Active',   joinDate: '2023-01-20' },
  { name: 'Henry Park',     email: 'henry@example.com',   role: 'User',    status: 'Inactive', joinDate: '2023-03-05' },
  { name: 'Iris Nguyen',    email: 'iris@example.com',    role: 'User',    status: 'Active',   joinDate: '2023-05-17' },
  { name: 'Jack Wilson',    email: 'jack@example.com',    role: 'Editor',  status: 'Active',   joinDate: '2023-07-22' },
  { name: 'Karen Brown',    email: 'karen@example.com',   role: 'Admin',   status: 'Active',   joinDate: '2023-09-30' },
  { name: 'Leo Davis',      email: 'leo@example.com',     role: 'User',    status: 'Pending',  joinDate: '2023-11-11' },
  { name: 'Mia Taylor',     email: 'mia@example.com',     role: 'User',    status: 'Active',   joinDate: '2024-01-08' },
  { name: 'Nate Anderson',  email: 'nate@example.com',    role: 'Editor',  status: 'Inactive', joinDate: '2024-03-14' },
  { name: 'Olivia Moore',   email: 'olivia@example.com',  role: 'User',    status: 'Active',   joinDate: '2024-05-25' },
  { name: 'Paul Jackson',   email: 'paul@example.com',    role: 'User',    status: 'Active',   joinDate: '2024-07-19' },
  { name: 'Quinn Harris',   email: 'quinn@example.com',   role: 'Admin',   status: 'Active',   joinDate: '2024-09-03' },
  { name: 'Rachel Clark',   email: 'rachel@example.com',  role: 'Editor',  status: 'Pending',  joinDate: '2024-11-27' },
  { name: 'Sam Lewis',      email: 'sam@example.com',     role: 'User',    status: 'Active',   joinDate: '2025-01-15' },
  { name: 'Tina Walker',    email: 'tina@example.com',    role: 'User',    status: 'Inactive', joinDate: '2025-03-08' },
];

const PAGE_SIZE = 5;

export default {
  data() {
    return {
      rows: ALL_ROWS,
      searchQuery: '',
      sortColumn: '',
      sortDir: 'asc',
      currentPage: 1,
      selectedEmails: [],
      columns: [
        { key: 'name',     label: 'Name' },
        { key: 'email',    label: 'Email' },
        { key: 'role',     label: 'Role' },
        { key: 'status',   label: 'Status' },
        { key: 'joindate', label: 'Join Date' },
      ]
    };
  },
  computed: {
    filteredRows() {
      const q = this.searchQuery.toLowerCase();
      if (!q) return this.rows;
      return this.rows.filter(r => Object.values(r).some(v => v.toLowerCase().includes(q)));
    },
    sortedRows() {
      if (!this.sortColumn) return this.filteredRows;
      // column key 'joindate' maps to property 'joinDate'
      const prop = this.sortColumn === 'joindate' ? 'joinDate' : this.sortColumn;
      return [...this.filteredRows].sort((a, b) => {
        const av = a[prop] || ''; const bv = b[prop] || '';
        return this.sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      });
    },
    totalPages() { return Math.max(1, Math.ceil(this.sortedRows.length / PAGE_SIZE)); },
    paginatedRows() {
      const start = (this.currentPage - 1) * PAGE_SIZE;
      return this.sortedRows.slice(start, start + PAGE_SIZE);
    },
    allSelected() {
      return this.paginatedRows.length > 0 &&
        this.paginatedRows.every(r => this.selectedEmails.includes(r.email));
    }
  },
  watch: {
    searchQuery() { this.currentPage = 1; },
    sortColumn() { this.currentPage = 1; }
  },
  methods: {
    sortBy(col) {
      if (this.sortColumn === col) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = col;
        this.sortDir = 'asc';
      }
    },
    toggleRow(email) {
      const idx = this.selectedEmails.indexOf(email);
      if (idx >= 0) this.selectedEmails.splice(idx, 1);
      else this.selectedEmails.push(email);
    },
    toggleAll(e) {
      this.paginatedRows.forEach(r => {
        const idx = this.selectedEmails.indexOf(r.email);
        if (e.target.checked && idx < 0) this.selectedEmails.push(r.email);
        else if (!e.target.checked && idx >= 0) this.selectedEmails.splice(idx, 1);
      });
    }
  }
}
</script>

<style scoped>
.page { padding: 2rem; max-width: 960px; }
.page-desc { color: var(--text-secondary); margin-bottom: 1.5rem; }
.table-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.search-input {
  padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-primary); font-size: 0.875rem; width: 280px;
}
.search-input:focus { outline: none; border-color: var(--accent); }
.selected-count { font-size: 0.875rem; color: var(--text-secondary); }
.table-wrapper { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius); }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
.data-table th {
  background: var(--bg-sidebar); padding: 0.75rem 1rem; text-align: left;
  font-weight: 600; color: var(--text-secondary); border-bottom: 1px solid var(--border);
}
.sortable-header { cursor: pointer; user-select: none; }
.sortable-header:hover { color: var(--accent); }
.sort-icon { font-size: 0.7rem; margin-left: 4px; }
.data-table td { padding: 0.6rem 1rem; border-bottom: 1px solid var(--border); color: var(--text-primary); }
.data-table tr:last-child td { border-bottom: none; }
.data-table tr.selected td { background: var(--accent-light); }
.empty-row { text-align: center; color: var(--text-muted); padding: 2rem !important; }
.status-badge { padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: 500; }
.status-active   { background: #dcfce7; color: #16a34a; }
.status-inactive { background: var(--border); color: var(--text-muted); }
.status-pending  { background: #fef9c3; color: #ca8a04; }
.pagination { display: flex; align-items: center; gap: 1rem; margin-top: 1rem; justify-content: flex-end; }
.pagination button {
  padding: 0.4rem 0.9rem; border: 1px solid var(--border); border-radius: var(--radius);
  background: var(--bg-input); color: var(--text-secondary); cursor: pointer;
}
.pagination button:disabled { opacity: 0.4; cursor: not-allowed; }
.pagination button:not(:disabled):hover { background: var(--border); }
.pagination span { font-size: 0.875rem; color: var(--text-secondary); }
</style>
```

- [ ] **Step 2: Wire into router**

Add import:
```js
import TablePage from "@/views/tools/TablePage.vue";
```

Add to `componentMap`:
```js
table: TablePage,
```

Add to `descriptionMap`:
```js
table: "Sortable, filterable, paginated data table with row selection",
```

- [ ] **Step 3: Lint and verify**

```bash
npm run lint
```

Open http://localhost:8081/table. Verify:
- 20 rows shown 5 at a time, pagination works
- Typing in search filters rows, resets to page 1
- Clicking column headers sorts (second click reverses), sort icon appears
- Row checkboxes select individual rows (row highlights), header checkbox selects all visible
- Selection count updates

- [ ] **Step 4: Commit**

```bash
git add src/views/tools/TablePage.vue src/router/index.js
git commit -m "phase2: add Table page"
```

---

## Task 12: Final build verification

**Files:** None — verification only.

- [ ] **Step 1: Run full lint and production build**

```bash
npm run lint && npm run build
```

Expected: Zero lint errors. Production build succeeds with no errors or warnings about missing modules.

- [ ] **Step 2: Verify all 10 new routes are reachable**

Open the app in the browser and click every new sidebar item in order:
- Elements: Buttons, Text Inputs, Checkboxes & Toggles, Sliders
- Forms: File Upload, Autocomplete
- Widgets: Tabs, Accordion, Progress, Table

Each should render its page with correct breadcrumb (e.g., "Widgets › Accordion").

- [ ] **Step 3: Verify `/widgets` redirect**

Navigate to http://localhost:8081/widgets — should redirect to `/tabs` and show the Tabs page.

- [ ] **Step 4: Verify existing pages still work**

Check that: `/radiobuttons`, `/forms`, `/dropdown`, `/alerts`, `/sortable`, `/draggable` all still render correctly (no regressions from Task 1 changes).

- [ ] **Step 5: Commit (if any fixes needed, otherwise skip)**

```bash
git add -p   # stage only the files you changed
git commit -m "phase2: fix final build issues"
```
