# 🚀 Vue Test App

**[🌐 Try it out!](https://umutayb.github.io/vue-test-app/)**

Your favorite playground for UI test automation — **37 components** across **8 categories**, all built with Vue 3 and ready to be poked, prodded, and automated against.

Whether you're writing your first Playwright test or stress-testing a custom automation framework, this app has a page for that.

---

## ✨ What's Inside

### 🔘 Elements (7)
Buttons in every flavor, radio buttons, checkboxes, toggles, sliders (single, dual-handle, stepped), a slider with a floating value bubble, and a drag-to-set progress bar. Click everything.

### 📝 Forms (5)
A full multi-field form with validation, a country dropdown with search, drag-and-drop file upload, and an autocomplete with keyboard navigation. Tab through them all.

### 🪟 Alerts, Frame & Windows (5)
Modals, toasts, tooltips, popovers, and a slide-in drawer. Things that pop up, slide in, and demand your attention.

### 🧩 Widgets (4)
Tabs, accordions, progress bars, and a sortable/filterable/paginated data table. The building blocks.

### 🎮 Interactions (10)
Drag-and-drop sortable lists, free-position draggables, typed drop zones, resizable panels, a Kanban board, infinite scroll, loading states (spinners, skeletons, progress), and a dynamic form that grows and shrinks. This is where things get fun.

### 🖼️ Media (3)
An image gallery with click-to-zoom and an auto-playing carousel with dot navigation.

### 🔐 Auth & State (2)
A login form with validation states and a Pinia-powered counter with shared state, step control, and history tracking.

### 🧪 Edge Cases (3)
A 200-item searchable list, a multi-step form wizard, and a state viewer that toggles between empty/loading/error/populated states. The weird stuff that breaks real apps.

---

## 🎯 Built for Test Automation

- Every interactive element has `data-testid` attributes
- Consistent sidebar navigation across all pages
- Light/dark theme toggle (great for visual regression testing)
- Real component behavior — no mocks, no shortcuts
- Deployed on [GitHub Pages](https://umutayb.github.io/vue-test-app/) for instant access

---

## 💻 Local Development

```bash
npm install
```

| Command | Action |
| --- | --- |
| `npm run serve` | Start dev server with hot-reload |
| `npm run build` | Production build |
| `npm run test` | Run unit tests (Vitest) |
| `npm run test:watch` | Tests in watch mode |
| `npm run lint` | Lint and auto-fix |

---

## 🐳 Docker

```yaml
services:
  vue-test-website:
    image: umutayb/vue-test-site:latest
    restart: always
    ports:
      - "8080:8080"
```

```bash
# Build & push manually
docker build -t umutayb/vue-test-site:latest .
docker push umutayb/vue-test-site:latest
```

---

## 🛠️ Tech Stack

- **Vue 3** + Vue Router 4 + Pinia
- **Vitest** + Vue Test Utils for unit testing
- CSS custom properties for light/dark theming
- Docker + GitHub Pages deployment
