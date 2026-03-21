# Phase 5: Bookstore API + Frontend Integration — Design Spec

## Overview

Add a full-stack bookstore feature to the UI Components test app. A Node.js/Express backend with JWT auth and in-memory data store lives in `server/`, served alongside the Vue frontend via `docker-compose`. The Vue app gains a "Bookstore" sidebar category with login/register, catalog browsing, personal library management, and embedded Swagger UI docs.

**Primary goal:** E2E test automation target — realistic multi-page flow with real HTTP calls, JWT auth, search/filter, and stateful user actions.

**GitHub Pages note:** The GitHub Pages deployment is frontend-only (static). Bookstore pages must detect this and display a clear "Backend not available in this environment" notice rather than broken/empty UI.

---

## Sub-project A: Bookstore API (`server/`)

### File Structure

```
server/
├── Dockerfile
├── package.json
├── index.js            — Express app entry: CORS, JSON, route mounts, swagger-ui
├── swagger.js          — swagger-jsdoc config (OpenAPI 3.0, servers, info)
├── middleware/
│   └── auth.js         — JWT Bearer token verification middleware
├── routes/
│   ├── auth.js         — /api/auth/register, /api/auth/login, DELETE /api/auth/user
│   ├── books.js        — GET /api/books, GET /api/books/:id
│   └── library.js      — GET/POST/DELETE /api/library/:bookId
└── data/
    └── store.js        — In-memory users[], books[], libraries Map<userId, Set<bookId>>
```

### Data Models

**User**
```json
{ "id": "uuid", "username": "string", "email": "string", "passwordHash": "string" }
```

**Book**
```json
{ "id": "string", "title": "string", "author": "string", "genre": "string", "year": number, "description": "string" }
```

**Library:** `Map<userId, Set<bookId>>` — each user has a set of saved book IDs.

### Pre-seeded Books (~20 books)

At least 4 genres: Fiction, Non-Fiction, Science, Fantasy. Enough variety to make search and filter meaningful in tests.

### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | — | `{ username, email, password }` → `{ token, user }` |
| POST | `/api/auth/login` | — | `{ username, password }` → `{ token, user }` |
| DELETE | `/api/auth/user` | JWT | Delete own account and their library |
| GET | `/api/books` | — | List books; query params: `?search=`, `?genre=`, `?author=` |
| GET | `/api/books/:id` | — | Single book by ID |
| GET | `/api/library` | JWT | Current user's saved books (full book objects) |
| POST | `/api/library/:bookId` | JWT | Add book to user's library |
| DELETE | `/api/library/:bookId` | JWT | Remove book from user's library |

### Auth

- Passwords hashed with **bcryptjs** (pure JS, no native deps)
- JWT signed with a `JWT_SECRET` env var (default: `dev-secret` for local dev)
- Token lifetime: 24h
- JWT payload: `{ userId, username }`
- Middleware: reads `Authorization: Bearer <token>`, attaches `req.user`

### Swagger / OpenAPI

- **swagger-jsdoc** reads JSDoc `@swagger` annotations from route files → generates OpenAPI 3.0 spec
- **swagger-ui-express** serves interactive UI at `GET /api-docs`
- Spec also available as JSON at `GET /api-docs.json`

### Error Responses

All errors return `{ error: "message" }` with appropriate HTTP status codes:
- 400 — validation errors
- 401 — missing/invalid token
- 404 — resource not found
- 409 — username/email already exists

### Docker

`server/Dockerfile` — Node 20 Alpine, installs deps, runs `node index.js`, exposes port `3000`.

Root `docker-compose.yml`:
```yaml
services:
  frontend:
    build: .
    ports: ["8080:8080"]
    environment:
      - VUE_APP_API_URL=http://localhost:3000
  backend:
    build: server/
    ports: ["3000:3000"]
    environment:
      - JWT_SECRET=dev-secret
      - PORT=3000
```

---

## Sub-project B: Bookstore Frontend (Vue pages)

### New Navigation Category

Add **"Bookstore"** category to `src/config/navigation.js`:

```js
{
  category: "Bookstore",
  items: [
    { label: "Login / Register", routeName: "bookLogin",    path: "/bookstore/login" },
    { label: "Book Catalog",     routeName: "bookCatalog",  path: "/bookstore/catalog" },
    { label: "My Library",       routeName: "bookLibrary",  path: "/bookstore/library" },
    { label: "API Docs",         routeName: "bookApiDocs",  path: "/bookstore/api-docs" },
  ]
}
```

### Pinia Store (`src/stores/bookstore.js`)

State:
- `token` — JWT string or null (persisted in localStorage)
- `user` — `{ id, username, email }` or null
- `books` — array of book objects from catalog
- `library` — array of user's saved book objects
- `loading` — boolean
- `error` — string or null

Actions: `login`, `register`, `logout`, `deleteAccount`, `fetchBooks`, `fetchLibrary`, `addToLibrary`, `removeFromLibrary`

On app init: if token in localStorage, restore `token` and `user` from it.

### Pages (`src/views/tools/`)

#### `BookLoginPage.vue` (`bookLogin`)

Two tabs: **Login** and **Register**.

- Login form: username, password → calls `POST /api/auth/login`
- Register form: username, email, password → calls `POST /api/auth/register`
- On success: stores token, redirects to catalog
- When already logged in: shows current username + logout button + delete account button

`data-testid` attributes:
`book-login-tab`, `book-register-tab`, `book-username`, `book-email`, `book-password`, `book-submit`, `book-error`, `book-logout`, `book-delete-account`, `book-user-display`

#### `BookCatalogPage.vue` (`bookCatalog`)

- Fetches all books on mount via `GET /api/books`
- Search bar (filters by title/author client-side or via API param)
- Genre dropdown filter
- Author dropdown filter (populated from book data)
- Book cards: title, author, genre, year, description snippet
- "Add to Library" button per card — disabled with tooltip "Login to save books" if not authenticated; shows "Saved" state if already in library
- Result count display

`data-testid` attributes:
`book-search`, `book-genre-filter`, `book-author-filter`, `book-card-{id}`, `book-add-{id}`, `book-count`, `book-catalog-loading`, `book-catalog-error`

#### `BookLibraryPage.vue` (`bookLibrary`)

- Requires login — shows `library-auth-prompt` with link to login page if not authenticated
- Fetches user's library on mount via `GET /api/library`
- Displays saved books with "Remove" button per book
- Shows empty state when library is empty

`data-testid` attributes:
`library-item-{id}`, `library-remove-{id}`, `library-count`, `library-empty`, `library-auth-prompt`, `library-loading`

#### `BookApiDocsPage.vue` (`bookApiDocs`)

- Detects GitHub Pages environment: `window.location.hostname.includes('github.io')`
- If GitHub Pages or API unreachable: shows `apidocs-unavailable` notice with message "Backend not available in this environment. Run locally with docker-compose to explore the API."
- Otherwise: renders `<iframe>` pointing to `${VUE_APP_API_URL}/api-docs` filling the content area

`data-testid` attributes:
`apidocs-frame`, `apidocs-unavailable`

### API URL Configuration

- Frontend reads `process.env.VUE_APP_API_URL` (set at build time or injected at runtime)
- Default fallback: `http://localhost:3000`
- All API calls go through the Pinia store actions using fetch or axios (fetch preferred, no new deps)

### GitHub Pages Graceful Degradation

Each bookstore page checks `window.location.hostname.includes('github.io')` on mount. If true, renders a styled notice instead of the full page UI. This prevents confusing empty states or network errors in the static demo.

---

## Implementation Order

1. **Sub-project A** — Build and verify the backend independently (`cd server && node index.js`, test with curl/Swagger UI)
2. **Sub-project B** — Build frontend pages against the running backend
3. **docker-compose** — Wire both together and verify end-to-end

---

## Testing Targets for E2E Automation

Key flows that automation packages should be able to test:
- Register a new user
- Login with existing user
- Browse catalog (verify book cards render)
- Search by title/author
- Filter by genre
- Add book to library (requires auth)
- View personal library
- Remove book from library
- Delete account
- Logout
- Bookstore pages show "unavailable" notice on GitHub Pages
