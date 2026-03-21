# Phase 2 — Core Components: Buttons, Inputs, Checkboxes, Sliders, File Upload, Autocomplete, Tabs, Accordion, Progress, Table

## Overview

Phase 2 adds 10 new interactive component pages across three existing categories: Elements, Forms, and Widgets. Every component is interactive/stateful enough to warrant its own route. All pages follow the Phase 1 shell (sidebar, breadcrumb, CSS variables) and use predictable `data-testid` attributes for automation.

## Context & Constraints

- **Purpose**: Test target for UI automation. Every element needs stable, predictable selectors.
- **No CSS framework** — plain CSS using the existing `--var()` system from `src/styles/main.css`.
- **Vue 3 Options API** — consistent with all existing pages (no Composition API / `<script setup>`).
- **No new dependencies** — all components built with native HTML + Vue.
- **Selector contract**: Every interactive element carries a `data-testid`. Pattern: `{component}-{descriptor}` (e.g., `btn-primary`, `tab-2`, `accordion-header-3`).
- **External test compatibility**: No changes to existing element IDs on FormsPage or RadioButtonsPage.

## Navigation Config Changes

Add 10 entries to `src/config/navigation.js`. Elements and Forms categories gain items; Widgets is expanded from a placeholder to real pages:

```js
{ category: "Elements", items: [
  { label: "Radio Buttons", routeName: "radiobuttons", path: "/radiobuttons" },
  { label: "Buttons",       routeName: "buttons",      path: "/buttons" },
  { label: "Text Inputs",   routeName: "textInputs",   path: "/text-inputs" },
  { label: "Checkboxes & Toggles", routeName: "checkboxes", path: "/checkboxes" },
  { label: "Sliders",       routeName: "sliders",      path: "/sliders" },
]},
{ category: "Forms", items: [
  { label: "Full Form",    routeName: "forms",        path: "/forms" },
  { label: "Dropdown",     routeName: "dropDown",     path: "/dropdown" },
  { label: "File Upload",  routeName: "fileUpload",   path: "/file-upload" },
  { label: "Autocomplete", routeName: "autocomplete", path: "/autocomplete" },
]},
{ category: "Widgets", items: [
  { label: "Tabs",      routeName: "tabs",      path: "/tabs" },
  { label: "Accordion", routeName: "accordion", path: "/accordion" },
  { label: "Progress",  routeName: "progress",  path: "/progress" },
  { label: "Table",     routeName: "table",     path: "/table" },
]},
```

The existing `Widgets` entry (`routeName: "widgets"`, `path: "/widgets"`) is **removed** from the config — `WidgetsPage.vue` was a placeholder and is no longer needed once real widget pages exist. A redirect from `/widgets` to `/tabs` is added to the router.

## Router Changes

Add to `componentMap` in `src/router/index.js`:
```js
buttons:      ButtonsPage,
textInputs:   TextInputsPage,
checkboxes:   CheckboxesPage,
sliders:      SlidersPage,
fileUpload:   FileUploadPage,
autocomplete: AutocompletePage,
tabs:         TabsPage,
accordion:    AccordionPage,
progress:     ProgressPage,
table:        TablePage,
```

Add to `descriptionMap`:
```js
buttons:      "Button variants, states, and sizes",
textInputs:   "Text, password, email, number, and textarea inputs with states",
checkboxes:   "Checkbox and toggle switch states",
sliders:      "Range sliders — single, dual-handle, and stepped",
fileUpload:   "Single, multiple, and drag-and-drop file inputs",
autocomplete: "Input with filtered dropdown suggestions and keyboard navigation",
tabs:         "Tab navigation with switchable content panels",
accordion:    "Collapsible accordion items with expand/collapse controls",
progress:     "Determinate and animated progress indicators",
table:        "Sortable, filterable, paginated data table with row selection",
```

Add redirect: `{ path: "/widgets", redirect: "/tabs" }`.

Remove `widgets: WidgetsPage` from componentMap.

## File Structure

New files to create:
```
src/views/tools/
├── ButtonsPage.vue
├── TextInputsPage.vue
├── CheckboxesPage.vue
├── SlidersPage.vue
├── FileUploadPage.vue
├── AutocompletePage.vue
├── TabsPage.vue
├── AccordionPage.vue
├── ProgressPage.vue
└── TablePage.vue
```

`WidgetsPage.vue` is retained but no longer routed (safe to leave in place for now).

## Component Specifications

### 1. Buttons (`/buttons`, `ButtonsPage.vue`)

A grid of button variants demonstrating all states a test suite might interact with.

**Sections:**
- **Variants**: Primary, Secondary, Danger, Ghost (text-only), Outline
- **Sizes**: Small, Medium, Large (primary style only)
- **States**: Default, Disabled, Loading (spinner icon, not clickable)
- **Click feedback**: Clicking any non-disabled button updates a `data-testid="btn-result"` span with the button's label

**Testids:**
```
btn-primary, btn-secondary, btn-danger, btn-ghost, btn-outline
btn-small, btn-medium, btn-large
btn-disabled, btn-loading
btn-result
```

**Styles:** Buttons use `--accent` for primary, `--border` for outline/secondary, `--text-secondary` for ghost. `border-radius: var(--radius)`. Disabled: `opacity: 0.5; cursor: not-allowed`. Loading: spinner SVG replaces text.

---

### 2. Text Inputs (`/text-inputs`, `TextInputsPage.vue`)

All native input types plus textarea, each in a labeled form group.

**Fields:**
- Text input (placeholder "Enter text", `data-testid="input-text"`)
- Password input (`data-testid="input-password"`)
- Email input (`data-testid="input-email"`)
- Number input (min 0, max 100, `data-testid="input-number"`)
- Textarea (3 rows, `data-testid="input-textarea"`)
- Disabled text input (value "Read-only value", `data-testid="input-disabled"`)
- Input with error state (red border, error message below, `data-testid="input-error"`)
- Input with success state (green border, `data-testid="input-success"`)

**Live output:** A `data-testid="input-values"` section lists current values of all active fields.

**Styles:** Inputs use `background: var(--bg-input)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`. Error state: `border-color: #ef4444`. Success state: `border-color: #22c55e`. Consistent with FormsPage input styling.

---

### 3. Checkboxes & Toggles (`/checkboxes`, `CheckboxesPage.vue`)

**Checkboxes section:**
- Unchecked (`data-testid="checkbox-unchecked"`)
- Checked by default (`data-testid="checkbox-checked"`)
- Indeterminate state (set via JS in `mounted`, `data-testid="checkbox-indeterminate"`)
- Disabled unchecked (`data-testid="checkbox-disabled"`)
- Disabled checked (`data-testid="checkbox-disabled-checked"`)

**Toggle switches section** (custom CSS, backed by `<input type="checkbox">`):
- Toggle off (`data-testid="toggle-off"`) — wraps hidden checkbox
- Toggle on by default (`data-testid="toggle-on"`)
- Toggle disabled (`data-testid="toggle-disabled"`)

**State display:** `data-testid="checkbox-state-summary"` shows comma-separated list of checked item labels.

**Styles:** Toggles: pill-shaped track (`border-radius: 999px`), sliding circle. Accent color when on. Greyed when disabled.

---

### 4. Sliders (`/sliders`, `SlidersPage.vue`)

Native `<input type="range">` elements with live value display.

**Sliders:**
- Basic slider (0–100, step 1, `data-testid="slider-basic"`, value display `data-testid="slider-basic-value"`)
- Steps slider (0–100, step 10, `data-testid="slider-steps"`, value display `data-testid="slider-steps-value"`)
- Disabled slider (value 40, `data-testid="slider-disabled"`)
- Dual-handle range (two inputs: `data-testid="slider-range-min"`, `data-testid="slider-range-max"`, combined display `data-testid="slider-range-value"`)

**Styles:** Custom slider track using CSS (`accent-color: var(--accent)`). Value displays are styled badges next to each slider.

---

### 5. File Upload (`/file-upload`, `FileUploadPage.vue`)

**Sections:**
- **Single file**: `<input type="file">` with label, `data-testid="file-input-single"`. Shows filename after selection in `data-testid="file-single-name"`.
- **Multiple files**: `<input type="file" multiple>`, `data-testid="file-input-multiple"`. Lists selected files in `data-testid="file-multiple-list"`.
- **Type-filtered**: `<input type="file" accept=".jpg,.jpeg,.png,.pdf">`, `data-testid="file-input-typed"`. Shows "Images and PDFs only" hint.
- **Drag-and-drop zone**: Styled `<div>` with `data-testid="file-drop-zone"`. Handles `dragover`/`dragleave`/`drop`. Adds `.drag-over` class while dragging. Shows dropped filenames in `data-testid="file-drop-list"`. A "Clear" button (`data-testid="file-drop-clear"`) resets the list.

**Styles:** Drop zone: dashed border, centered text, `var(--accent-light)` background on dragover. Uses existing `.dark .drop-zone` pattern for compatibility.

---

### 6. Autocomplete (`/autocomplete`, `AutocompletePage.vue`)

Fully custom autocomplete (no vue-select dependency) built for test automation.

**Component behavior:**
- Text input `data-testid="autocomplete-input"` triggers suggestions after 1+ characters
- Dropdown `data-testid="autocomplete-dropdown"` appears below input with filtered options
- Each option: `data-testid="autocomplete-option-{n}"` (1-indexed, based on visible position)
- Selecting an option fills the input and hides dropdown; selected value shown in `data-testid="autocomplete-selected"`
- Keyboard: Arrow Up/Down moves highlight, Enter selects, Escape closes
- Highlighted option gets class `.highlighted`
- A "Clear" button `data-testid="autocomplete-clear"` resets value

**Dataset:** 20 country names (hardcoded array). Filtering is case-insensitive substring match.

**Styles:** Dropdown is absolutely positioned, `background: var(--bg-primary)`, `border: 1px solid var(--border)`, `border-radius: var(--radius)`. Max 6 visible items, scroll if more. Highlighted: `background: var(--accent-light)`.

---

### 7. Tabs (`/tabs`, `TabsPage.vue`)

**Structure:**
- Tab bar: `data-testid="tabs-container"` wrapping 4 tab buttons
- Tabs: `data-testid="tab-1"` through `data-testid="tab-4"`, class `.tab`, active tab gets `.active`
- Panels: `data-testid="tab-panel-1"` through `data-testid="tab-panel-4"`, only active panel visible

**Tab content (4 tabs):**
1. "Overview" — short description paragraph
2. "Details" — a small two-column key/value list
3. "Code" — a `<pre><code>` block with sample snippet
4. "Settings" — two toggle checkboxes (these use same `.toggle` style from CheckboxesPage)

**Styles:** Tab bar: flex row, bottom border. Active tab: `border-bottom: 2px solid var(--accent)`, `color: var(--accent)`. Inactive: `color: var(--text-secondary)`. Panel transitions via `v-show`.

---

### 8. Accordion (`/accordion`, `AccordionPage.vue`)

5 accordion items. Each item:
- Header button: `data-testid="accordion-header-{n}"` (1-indexed), class `.accordion-header`
- Body: `data-testid="accordion-body-{n}"`, visible when expanded, class `.accordion-body`
- Chevron icon (▼ / ▲) rotates when open

**Controls:**
- "Expand All" button `data-testid="accordion-expand-all"`
- "Collapse All" button `data-testid="accordion-collapse-all"`

**Content**: Each item has a heading (FAQ-style: "What is X?") and a paragraph answer. Content is static — focus is on the expand/collapse behavior.

**Styles:** Headers: full-width button, `background: var(--bg-primary)`, border-bottom. Body: padding, `color: var(--text-secondary)`. Border around entire accordion. Each item separated by `var(--border)`.

---

### 9. Progress (`/progress`, `ProgressPage.vue`)

**Sections:**

**Static progress bars** (5 bars at 0%, 25%, 50%, 75%, 100%):
- Each: `data-testid="progress-bar-{n}"` (1-indexed)
- Shows percentage label on or beside the bar
- Bar inner fill: `data-testid="progress-fill-{n}"`

**Animated progress bar:**
- "Start" button `data-testid="progress-start"` — begins incrementing from 0 to 100
- "Reset" button `data-testid="progress-reset"` — resets to 0
- Bar: `data-testid="progress-animated"`, fill width driven by `animatedValue`
- Value display: `data-testid="progress-animated-value"` (e.g., "67%")

**Indeterminate bar:**
- CSS animation (sliding fill), no value
- `data-testid="progress-indeterminate"`

**Circular progress:**
- SVG-based circle, filled to a percentage via `stroke-dashoffset`
- `data-testid="progress-circular"`, value `data-testid="progress-circular-value"`
- Controlled by same `animatedValue` as the animated bar above

**Styles:** Track: `background: var(--border)`, `border-radius: var(--radius)`. Fill: `background: var(--accent)`. Height: 12px for standard bars.

---

### 10. Table (`/table`, `TablePage.vue`)

Data table with a dataset of 20 rows of fake user records (name, email, role, status, join date).

**Features:**
- **Search/filter**: `data-testid="table-search"` — filters all columns, case-insensitive
- **Column sort**: Clicking any header cycles asc/desc. Active sort column marked with `▲`/`▼`. Testids: `data-testid="table-header-name"`, `data-testid="table-header-email"`, `data-testid="table-header-role"`, `data-testid="table-header-status"`, `data-testid="table-header-joindate"`
- **Row selection**: Each row has a checkbox `data-testid="table-row-checkbox-{n}"` (1-indexed within visible page). Header checkbox `data-testid="table-select-all"` selects/deselects all visible rows.
- **Rows**: `data-testid="table-row-{n}"` (1-indexed within visible page). Selected rows get class `.selected`.
- **Pagination**: 5 rows per page. "Prev" `data-testid="table-prev"`, "Next" `data-testid="table-next"`. Page info: `data-testid="table-page-info"` (e.g., "Page 1 of 4"). Buttons disabled at boundaries.
- **Selection count**: `data-testid="table-selected-count"` shows "X rows selected"

**Dataset** (20 rows, defined inline in `data()`):
```js
[
  { name: "Alice Martin",   email: "alice@example.com",   role: "Admin",   status: "Active",   joinDate: "2022-01-15" },
  { name: "Bob Chen",       email: "bob@example.com",     role: "User",    status: "Active",   joinDate: "2022-03-22" },
  { name: "Carol White",    email: "carol@example.com",   role: "Editor",  status: "Inactive", joinDate: "2022-05-10" },
  { name: "David Kim",      email: "david@example.com",   role: "User",    status: "Active",   joinDate: "2022-07-08" },
  { name: "Eve Torres",     email: "eve@example.com",     role: "Admin",   status: "Active",   joinDate: "2022-09-14" },
  { name: "Frank Johnson",  email: "frank@example.com",   role: "User",    status: "Pending",  joinDate: "2022-11-01" },
  { name: "Grace Lee",      email: "grace@example.com",   role: "Editor",  status: "Active",   joinDate: "2023-01-20" },
  { name: "Henry Park",     email: "henry@example.com",   role: "User",    status: "Inactive", joinDate: "2023-03-05" },
  { name: "Iris Nguyen",    email: "iris@example.com",    role: "User",    status: "Active",   joinDate: "2023-05-17" },
  { name: "Jack Wilson",    email: "jack@example.com",    role: "Editor",  status: "Active",   joinDate: "2023-07-22" },
  { name: "Karen Brown",    email: "karen@example.com",   role: "Admin",   status: "Active",   joinDate: "2023-09-30" },
  { name: "Leo Davis",      email: "leo@example.com",     role: "User",    status: "Pending",  joinDate: "2023-11-11" },
  { name: "Mia Taylor",     email: "mia@example.com",     role: "User",    status: "Active",   joinDate: "2024-01-08" },
  { name: "Nate Anderson",  email: "nate@example.com",    role: "Editor",  status: "Inactive", joinDate: "2024-03-14" },
  { name: "Olivia Moore",   email: "olivia@example.com",  role: "User",    status: "Active",   joinDate: "2024-05-25" },
  { name: "Paul Jackson",   email: "paul@example.com",    role: "User",    status: "Active",   joinDate: "2024-07-19" },
  { name: "Quinn Harris",   email: "quinn@example.com",   role: "Admin",   status: "Active",   joinDate: "2024-09-03" },
  { name: "Rachel Clark",   email: "rachel@example.com",  role: "Editor",  status: "Pending",  joinDate: "2024-11-27" },
  { name: "Sam Lewis",      email: "sam@example.com",     role: "User",    status: "Active",   joinDate: "2025-01-15" },
  { name: "Tina Walker",    email: "tina@example.com",    role: "User",    status: "Inactive", joinDate: "2025-03-08" },
]
```

**Styles:** `border-collapse: collapse`. Header: `background: var(--bg-sidebar)`, bold. Rows: alternating `var(--bg-primary)` / slight tint. Selected row: `background: var(--accent-light)`. Status badges: colored pills (Active=green, Inactive=grey, Pending=amber).

## What's NOT in Phase 2

- Nested/dynamic tabs (Phase 3)
- Virtual scrolling (Phase 3)
- Form validation beyond visual states (FormsPage covers that)
- New top-level categories (Phase 4)
