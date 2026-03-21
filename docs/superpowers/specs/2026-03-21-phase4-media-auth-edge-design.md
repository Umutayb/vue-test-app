# Phase 4 — Media, Auth & State, Edge Cases

## Overview

Phase 4 adds 7 new component pages across 3 new sidebar categories: Media, Auth & State, and Edge Cases. Every component is a distinct, testable UI pattern not covered by Phases 1–3.

## Context & Constraints

- Same rules as Phases 2–3: Vue 3 Options API, CSS custom properties, no new dependencies
- All 7 components get their own routes
- `data-testid` naming follows `{component}-{descriptor}`
- No CSS framework — custom CSS using the theme variable system

## Navigation Config Changes

Add to `"Elements"` category in `src/config/navigation.js` (after `sliderIndicator`):
```js
{ label: "Drag Progress", routeName: "dragProgress", path: "/drag-progress" },
```

Add new categories to `src/config/navigation.js`:

```js
{
  category: "Media",
  items: [
    { label: "Image Gallery", routeName: "gallery",   path: "/gallery" },
    { label: "Carousel",      routeName: "carousel",  path: "/carousel" },
  ]
},
{
  category: "Auth & State",
  items: [
    { label: "Login Form",     routeName: "loginForm",     path: "/login-form" },
    { label: "Pinia Counter",  routeName: "piniaCounter",  path: "/pinia-counter" },
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

## Router Changes

Add to `componentMap`:
```js
dragProgress: DragProgressPage,
gallery: GalleryPage, carousel: CarouselPage,
loginForm: LoginFormPage, piniaCounter: PiniaCounterPage,
longList: LongListPage, multistep: MultistepPage, stateViewer: StateViewerPage,
```

Add to `descriptionMap`:
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

## File Structure

New files:
```
src/views/tools/
├── DragProgressPage.vue
├── GalleryPage.vue
├── CarouselPage.vue
├── LoginFormPage.vue
├── PiniaCounterPage.vue
├── LongListPage.vue
├── MultistepPage.vue
└── StateViewerPage.vue
```

---

## Component Specifications

### 0. Drag Progress (`/drag-progress`, `DragProgressPage.vue`)

A custom interactive progress bar where clicking or dragging on the track sets the fill percentage. Uses mouse events — not a `<input type="range">`. The filled portion visually follows the cursor in real time during drag.

**Testids:**
- `drag-progress-track` — the full-width track div (clickable/draggable)
- `drag-progress-fill` — the fill div (width = `percentage + '%'`)
- `drag-progress-handle` — a small circle at the right edge of the fill (the drag handle)
- `drag-progress-value` — percentage display (e.g., "47%")
- `drag-progress-reset` — "Reset" button (sets percentage to 0)
- `drag-progress-set-half` — "50%" button (sets percentage to 50)
- `drag-progress-set-full` — "100%" button (sets percentage to 100)

A second bar shows a read-only animated fill driven by a separate `animatedPct` value:
- `drag-progress-animated-track` — the animated bar track
- `drag-progress-animated-fill` — the animated fill
- `drag-progress-animated-value` — the animated percentage display
- `drag-progress-animate-btn` — "Animate" button (cycles 0→100 over 2 seconds using setInterval)

**Behavior:**
- `percentage: 30` initially
- `mousedown` on track or handle → `isDragging = true`, compute pct from `event.clientX` relative to track `getBoundingClientRect()`
- `mousemove` on `document` (added in `mounted`, removed in `beforeUnmount`) → if `isDragging`, update `percentage` (clamped 0–100, rounded to integer)
- `mouseup` on `document` → `isDragging = false`
- Click on track (without drag) → same pct calculation and update
- `animatedPct: 0`, `animating: false`; "Animate" starts `setInterval` at 20ms increments of 2, stops at 100, then resets after 500ms delay

**Styles:**
- Track: `height: 24px; border-radius: 12px; background: var(--border); cursor: pointer; position: relative; user-select: none`
- Fill: `height: 100%; border-radius: 12px; background: var(--accent); transition: none; position: relative`
- Handle: `width: 20px; height: 20px; border-radius: 50%; background: var(--accent); border: 3px solid var(--bg-primary); position: absolute; right: -10px; top: 50%; transform: translateY(-50%); cursor: grab`
- Percentage label: large text above the bar (`font-size: 1.5rem; font-weight: 700`)

---

### 1. Image Gallery (`/gallery`, `GalleryPage.vue`)

A grid of image cards. Clicking any card opens a full-screen overlay showing a larger version.

**Testids:**
- `gallery-item-{n}` — each grid card (n = 1-indexed, 8 total items)
- `gallery-overlay` — the full-screen overlay div (shown with `v-if`)
- `gallery-full-image` — the large image inside the overlay (a styled div, not an `<img>` tag, since items use CSS placeholder colors)
- `gallery-close` — close button on the overlay
- `gallery-prev` — previous button (wraps around)
- `gallery-next` — next button (wraps around)
- `gallery-caption` — caption text showing "Image N of 8"

**Behavior:**
- 8 static items, each `{ id, alt, color }` (use CSS-colored divs as placeholder "images" since no real images)
- Clicking `gallery-item-{n}` sets `activeIndex = n - 1`, `isOpen = true`
- `gallery-prev` / `gallery-next`: decrement/increment `activeIndex` with wrapping (modulo 8)
- `gallery-close` and overlay background click: `isOpen = false`
- The `gallery-full-image` is a styled div (not a real `<img>` element) using the item's `color` — use `data-testid="gallery-full-image"` on this div
- `gallery-caption` shows `"Image {activeIndex + 1} of 8"`

**Placeholder items (8 total):**
```js
[
  { id: 1, alt: 'Mountain landscape',  color: '#6366f1' },
  { id: 2, alt: 'Ocean sunset',        color: '#f59e0b' },
  { id: 3, alt: 'Forest path',         color: '#22c55e' },
  { id: 4, alt: 'City skyline',        color: '#3b82f6' },
  { id: 5, alt: 'Desert dunes',        color: '#ef4444' },
  { id: 6, alt: 'Snowy peaks',         color: '#06b6d4' },
  { id: 7, alt: 'Autumn leaves',       color: '#f97316' },
  { id: 8, alt: 'Tropical beach',      color: '#8b5cf6' },
]
```

**Styles:**
- Grid: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem`
- Each card: `aspect-ratio: 4/3; border-radius: var(--radius); cursor: pointer; overflow: hidden; border: 1px solid var(--border)`
- Placeholder div inside card: `width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; text-align: center; padding: 0.5rem; background: {color}`
- Overlay: fixed fullscreen, `background: rgba(0,0,0,0.85)`, z-index 200, flex center
- Large image div: `width: 480px; height: 320px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.1rem; background: {activeItem.color}`
- Prev/Next buttons: positioned left/right of the large image, white, large font

---

### 2. Carousel (`/carousel`, `CarouselPage.vue`)

A slideshow cycling through 5 slides. Supports manual prev/next, dot navigation, and auto-play toggle.

**Testids:**
- `carousel-slide-{n}` — each slide div (n = 1-indexed). Only the active slide is shown (`v-show`)
- `carousel-prev` — previous button
- `carousel-next` — next button
- `carousel-dot-{n}` — dot indicator (n = 1-indexed, 5 total). Active dot has class `.dot-active`
- `carousel-autoplay` — toggle button: "Pause" when playing, "Play" when paused
- `carousel-indicator` — text showing "Slide N of 5"

**Behavior:**
- `currentSlide: 0` (0-indexed internally, 1-indexed in display/testids)
- `isPlaying: true` initially
- Auto-play advances one slide every 3000ms using `setInterval` in `mounted()`
- Pausing clears the interval; resuming restarts it
- Prev/next wrap around (modulo 5)
- Clicking a dot sets `currentSlide` directly
- `beforeUnmount()` clears the interval

**Slide content (5 slides):**
```js
[
  { id: 1, title: 'Welcome to the Carousel',   desc: 'This is slide one',   color: '#6366f1' },
  { id: 2, title: 'Interactive Components',    desc: 'This is slide two',   color: '#f59e0b' },
  { id: 3, title: 'Built with Vue 3',          desc: 'This is slide three', color: '#22c55e' },
  { id: 4, title: 'Test Automation Ready',     desc: 'This is slide four',  color: '#3b82f6' },
  { id: 5, title: 'Fully Responsive',          desc: 'This is slide five',  color: '#ef4444' },
]
```

**Styles:**
- Container: `position: relative; overflow: hidden; border-radius: var(--radius); border: 1px solid var(--border)`
- Each slide: `height: 240px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; background: {color}`
- Prev/Next buttons: positioned absolute left/right, `top: 50%`, `transform: translateY(-50%)`, white semi-transparent background
- Dots row: below the slide container, centered flex row
- Each dot: `width: 10px; height: 10px; border-radius: 50%; background: var(--border); cursor: pointer`. Active: `background: var(--accent)`

---

### 3. Login Form (`/login-form`, `LoginFormPage.vue`)

A styled login form with client-side validation and simulated async submission.

**Testids:**
- `login-username` — text input
- `login-password` — password input
- `login-show-password` — toggle button ("Show" / "Hide") that toggles password visibility
- `login-submit` — submit button
- `login-error` — error message div (v-if shown on validation fail or wrong credentials)
- `login-success` — success message div (v-if shown after successful login)
- `login-loading` — shown with `v-show="isLoading"` on the submit button (spinner or "Signing in...")
- `login-username-error` — per-field error for empty username (v-if)
- `login-password-error` — per-field error for empty/short password (v-if)

**Behavior:**
- Validation on submit:
  - Username empty → show `login-username-error`: "Username is required"
  - Password empty → show `login-password-error`: "Password is required"
  - Password shorter than 6 chars → show `login-password-error`: "Password must be at least 6 characters"
  - Both valid → set `isLoading = true`, wait 1500ms, then:
    - If username is "admin" and password is "password123" → show `login-success`, clear form
    - Otherwise → show `login-error`: "Invalid username or password"
    - Set `isLoading = false`
- `login-show-password`: toggles `passwordType` between `"password"` and `"text"`

**Styles:** Card-style form, `max-width: 400px`, centered. Input rows with labels above. Error messages in red (`#ef4444`). Success message in green (`#22c55e`). Submit button full-width using `var(--accent)`.

**Cleanup:** Store the login `setTimeout` ID and clear it in `beforeUnmount()` to prevent callback firing on unmounted component.

---

### 4. Pinia Counter (`/pinia-counter`, `PiniaCounterPage.vue`)

Demonstrates a Pinia store for shared state. Creates a new `src/stores/counter.js` store and uses it from the page component.

**New store file: `src/stores/counter.js`**

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, step: 1, history: [] }),
  actions: {
    increment()   { this.count += this.step; this._log(`+${this.step}`); },
    decrement()   { this.count -= this.step; this._log(`-${this.step}`); },
    reset()       { this.count = 0;         this._log('Reset'); },
    setStep(n)    { this.step = n; },
    _log(op)      {
      this.history.unshift(`${op} → ${this.count}`);
      if (this.history.length > 5) this.history.pop();
    },
  },
})
```

**Testids:**
- `counter-value` — displays current `store.count`
- `counter-increment` — "+Step" button (calls `store.increment()`)
- `counter-decrement` — "−Step" button (calls `store.decrement()`)
- `counter-reset` — "Reset" button (calls `store.reset()`)
- `counter-step-input` — number input bound to `store.step` (min=1)
- `counter-history` — list container for last 5 operations
- `counter-history-item-{n}` — each history entry (1-indexed, newest first)

**Component behavior:** Import and use `useCounterStore()` in `setup()` option (compatible with Options API via `setup()` in the options object). Alternatively use the Options API `mapState`/`mapActions` helpers from Pinia. Decrement can go below 0.

**Styles:** Large centered count display (`font-size: 3rem; font-weight: 700`). Three main buttons in a row. Step input below. History list below that.

---

### 5. Long List (`/long-list`, `LongListPage.vue`)

200 static items with a live search filter that updates the visible list and count in real time.

**Testids:**
- `long-list-search` — text input (search box)
- `long-list-clear` — "✕" button that clears the search input
- `long-list-count` — shows "Showing X of 200 items"
- `long-list-item-{n}` — each visible list item where n is the item's ID (1-indexed, 1–200, not position)
- `long-list-empty` — shown with `v-if` when no results match (v-if, not v-show)

**Data:** 200 items generated programmatically as a constant outside the component:
```js
const ALL_ITEMS = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: ['Alpha', 'Beta', 'Gamma', 'Delta'][i % 4],
}))
```

**Behavior:**
- `filteredItems` computed: case-insensitive filter on `name` OR `category` matching `searchQuery`
- Search is live (no submit button)
- Clear button visible only when `searchQuery` is non-empty

**Styles:** Search bar row at top (input + clear button). Count below search. Scrollable list area (`max-height: 480px; overflow-y: auto`). Each item shows name + category badge.

---

### 6. Multi-step Form (`/multistep`, `MultistepPage.vue`)

A 3-step wizard form. Each step has its own fields and validation. Step indicators show progress.

**Testids:**
- `multistep-step-{n}` — step indicator (n = 1, 2, 3). Active step has class `.step-active`, completed steps have `.step-done`
- `multistep-next` — "Next" button (moves to next step after validation)
- `multistep-back` — "Back" button (moves to previous step; hidden on step 1)
- `multistep-submit` — "Submit" button (only shown on step 3)
- Step 1 fields: `multistep-first-name`, `multistep-last-name`
- Step 1 errors: `multistep-first-name-error`, `multistep-last-name-error`
- Step 2 fields: `multistep-email`, `multistep-phone`
- Step 2 errors: `multistep-email-error` (phone is optional — no phone error testid)
- Step 3 fields: `multistep-message`
- `multistep-result` — shown after submit (v-if), displays submitted data summary
- `multistep-current-step` — text showing "Step N of 3"

**Behavior:**
- `currentStep: 1` (1-indexed)
- Step 1: first name and last name required (non-empty)
- Step 2: email required and must contain "@"; phone is optional
- Step 3: message required (non-empty)
- Clicking "Next" validates current step fields; if valid, advances; if not, shows per-field errors
- Clicking "Back" goes to previous step (no validation)
- Submitting (step 3 "Submit") validates message, then sets `submitted = true`, shows `multistep-result` with the form data summary

**Styles:** Step indicators as a numbered row at top (circles with step number, connected by a line). Active step circle uses `var(--accent)`. Done steps use a muted accent. Form fields in a card below the indicators.

---

### 7. State Viewer (`/state-viewer`, `StateViewerPage.vue`)

Demonstrates the four common async UI states: empty, loading, error, and populated — all in a single component.

**Testids:**
- `state-btn-empty` — button to show empty state
- `state-btn-loading` — button to show loading state (auto-transitions to populated after 1500ms)
- `state-btn-error` — button to show error state
- `state-btn-populated` — button to show populated state directly
- `state-current` — text showing current state name: "empty" | "loading" | "error" | "populated"
- `state-empty-view` — the empty state UI (v-if state === 'empty')
- `state-loading-view` — the loading state UI (v-if state === 'loading') — shows a spinner
- `state-error-view` — the error state UI (v-if state === 'error') — shows error message + retry button
- `state-populated-view` — the populated state UI (v-if state === 'populated') — shows a list of 5 items
- `state-retry` — retry button inside error view (clicking it triggers loading → populated transition)
- `state-populated-item-{n}` — each item in the populated view (n = 1–5)

**Behavior:**
- `state: 'empty'` initially
- Clicking `state-btn-loading`: set `state = 'loading'`, after 1500ms set `state = 'populated'`
- Clicking `state-btn-error`: set `state = 'error'`
- Clicking `state-retry`: same as `state-btn-loading`
- Clicking `state-btn-empty`: `state = 'empty'`
- Clicking `state-btn-populated`: `state = 'populated'` directly (no delay)

**Populated items (static):** 5 items: "First result", "Second result", "Third result", "Fourth result", "Fifth result"

**Styles:** Four trigger buttons in a row at top. Current state badge below buttons. State display card below. Each state has distinct visual treatment: empty (muted icon + text), loading (spinner), error (red icon + message), populated (clean list).

---

---

## Legacy Page Fixes

Six pre-Phase-2 pages are empty, broken, or use external packages. These are fixed as part of Phase 4.

### Fix 1: SortablePage (`/sortable`, `SortablePage.vue`)

Rewrite with proper data-testids and theme-consistent styling. Keep the two-list drag-to-move concept.

**Testids:**
- `sortable-list-1` — first drop zone container
- `sortable-list-2` — second drop zone container
- `sortable-item-{id}` — each draggable item (id = item's integer id, 0–4)
- `sortable-count-1`, `sortable-count-2` — "X items" count label per list

**Initial data:** 5 items across two lists: items 1–3 in list 1, items 4–5 in list 2.
**Item labels:** "Item A" (id 1), "Item B" (id 2), "Item C" (id 3), "Item D" (id 4), "Item E" (id 5)
**Behavior:** Same drag-to-move logic as existing. Add count displays. Apply theme CSS.

---

### Fix 2: DropdownPage (`/dropdown`, `DropDownPage.vue`)

Replace the external `vue-select` / `countries-list` dependency with a custom implementation using only native browser APIs. Show three dropdown variants: single native select, multi-select, and a custom click-toggled dropdown.

**Testids:**
- `dropdown-single` — native `<select>` for single selection
- `dropdown-single-value` — displays selected value
- `dropdown-multi` — native `<select multiple>` for multi-selection
- `dropdown-multi-value` — displays selected values (comma-separated)
- `dropdown-custom` — the custom click-toggled dropdown trigger button
- `dropdown-custom-list` — the custom dropdown list (v-show)
- `dropdown-custom-option-{n}` — each option (1-indexed, 5 options)
- `dropdown-custom-value` — displays the selected custom option

**Data:** Single options: 10 countries. Multi options: same 10 countries. Custom options: "Apple", "Banana", "Cherry", "Date", "Elderberry".

**Custom dropdown behavior:** Click trigger toggles list. Click option selects it and closes list. Click outside closes list.

---

### Fix 3: DraggablePage (`/draggable`, new file `DraggablePage.vue`)

A page with freely draggable elements that can be repositioned by drag. Uses `mousedown` + `mousemove` + `mouseup` on the document (not HTML5 DnD API, which doesn't support free positioning).

**Testids:**
- `draggable-canvas` — the container div (position: relative, fixed size)
- `draggable-item-{n}` — each draggable element (n = 1–4), `position: absolute`
- `draggable-status` — shows which item is currently being dragged, or "none"

**Initial positions:** 4 items placed at different positions within the canvas.
**Behavior:** `mousedown` on item → `isDragging = true`, track offset. `mousemove` on document → update item's `x, y`. `mouseup` → stop dragging. Items stay where dropped.

**Canvas size:** 600×300px, `border: 1px solid var(--border)`, `background: var(--bg-sidebar)`.
**Item size:** 80×50px, `background: var(--bg-primary)`, `border: 1px solid var(--accent)`.

---

### Fix 4: DroppablePage (`/droppable`, new file `DroppablePage.vue`)

Distinct from DropZone: shows multiple named drop targets, each accepting specific item types. Items have a "type" (color/shape), zones only accept matching types.

**Testids:**
- `droppable-item-{n}` — source items (n = 1–6), each has a `type` attribute
- `droppable-zone-{type}` — drop zones: `droppable-zone-red`, `droppable-zone-blue`, `droppable-zone-green`
- `droppable-zone-count-{type}` — "X items" count per zone
- `droppable-status` — shows last drop result: "Dropped {item} into {zone}" or "Wrong zone!" if type mismatch
- `droppable-reset` — reset button to return all items to source

**Items:** 6 items: 2 red, 2 blue, 2 green. `{ id, label, type }`
**Behavior:** Drag to matching zone → accepted (item moves to zone). Drag to wrong zone → rejected (status "Wrong zone!"). Items can only be in source OR a zone (not duplicated).

---

### Fix 5: ResizablePage (`/resizable`, new file `ResizablePage.vue`)

A panel that can be resized by dragging a handle on its right edge.

**Testids:**
- `resizable-panel` — the resizable div
- `resizable-handle` — the drag handle on the right edge
- `resizable-width` — text showing current width in px
- `resizable-content` — content inside the panel (shows a short paragraph: "Drag the handle on the right edge to resize this panel. The current width is shown above.")

**Behavior:** `mousedown` on handle → track drag. `mousemove` on document → update panel width (min: 150px, max: 600px). `mouseup` → stop. Width displayed live.

**Initial width:** 300px. Panel height: 200px.

---

**Router note for Fixes 3–5:** `DraggablePage`, `DroppablePage`, and `ResizablePage` are new files. The `componentMap` in `src/router/index.js` currently maps `draggable`, `droppable`, and `resizable` to the generic `InteractionsPage` — the component map entries must be updated to point to the new dedicated page components (their nav/route paths are already correct and unchanged).

---

### Fix 6: TallPage (`/tall`, `TallPage.vue`)

Replace broken image references with meaningful scrollable content. The page should be significantly taller than the viewport to enable scroll testing.

**Testids:**
- `tall-section-{n}` — each numbered section (n = 1–10)
- `tall-top-btn` — "Back to Top" button (fixed position, bottom-right, only visible after scrolling 200px — use `window.scrollY` in scroll handler)
- `tall-scroll-position` — shows current scroll position in px (updated on scroll)

**Content:** 10 sections, each with a heading ("Section N") and 2–3 paragraphs of lorem ipsum text. The page should be at least 3000px tall.

---

## What's NOT in Phase 4

- Real image files or external image URLs
- Actual authentication (no backend, no JWT)
- Persistent counter state across page reloads (localStorage)
- Full form wizard with file upload
