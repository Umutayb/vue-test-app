# 🚀 Vue Test App

**[🌐 Try it out!](https://umutayb.github.io/vue-test-app/)**

A comprehensive Vue 3 testing environment designed to showcase and validate various UI components, interactive widgets, and layout tools.

---

## 🛠️ Features & Routes

This project serves as a sandbox for the following categories:

* **Core Categories:** Elements, Forms, Alerts & Windows, Widgets, and Interactions.
* **Interactive Tools:**
* **Drag & Drop:** Draggable, Droppable, and Sortable lists.
* **UI Components:** Resizable elements, Dropdowns, and Radio Buttons.
* **Layouts:** A "Tall Page" for scroll testing.



---

## 🐳 Docker Integration

### Docker Compose

To integrate this app into your local stack, add the following to your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  vue-test-website:
    image: umutayb/vue-test-site:latest
    restart: always
    ports:
      - "8080:8080"
    networks:
      - vue-network

networks:
  vue-network:
    driver: bridge
```

### Manual Build & Push

```bash
# Build the image
docker build -t umutayb/vue-test-site:latest .

# Push to registry
docker push umutayb/vue-test-site:latest
```

---

## 💻 Local Development

### Installation

```bash
npm install
```

### Usage

| Command | Action |
| --- | --- |
| `npm run serve` | Start development server (hot-reload) |
| `npm run build` | Compile and minify for production |
| `npm run lint` | Run linter and fix files |