# React Table Management App

A high-performance React Table Management application built with **React + TypeScript**, capable of handling large datasets efficiently using server-side pagination, sorting, filtering, virtualization, and inline editing.

## Features

- Server-side Pagination
- Server-side Sorting
- Global Search (Debounced)
- Genre Filter
- Popularity Range Filter
- Virtualized Table (TanStack Virtual)
- Inline Editing
- Optimistic Updates (React Query)
- Row Selection
- Select All
- Export Selected Rows to CSV
- Export Current View to CSV
- Column Visibility Toggle
- Column Resize
- Persist Column Preferences using localStorage
- Loading, Error and Empty States
- Responsive UI
- Component-based Architecture
- Custom Hooks
- Unit Tests (Vitest + Testing Library)

---

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Table
- TanStack Virtual
- TanStack React Query
- Axios
- Tailwind CSS
- json-server
- PapaParse
- Vitest
- React Testing Library

---

## Project Structure

```
src/
 ├── api/
 ├── components/
 ├── hooks/
 ├── pages/
 ├── providers/
 ├── types/
 ├── utils/
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd react-table-management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Copy the example environment file.

```bash
cp .env.example .env
```

or manually create:

```
VITE_API_BASE_URL=http://localhost:3001
```

---

### 4. Start json-server

```bash
npm run server
```

Runs on

```
http://localhost:3001
```

---

### 5. Start React App

```bash
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Available Scripts

```bash
npm run dev
npm run server
npm run build
npm run lint
npm test
```

---

## Dataset

Spotify Songs Dataset (~30,000 records)

Served through json-server using server-side query parameters for:

- Pagination
- Sorting
- Filtering
- Search

---

## Performance Optimizations

- TanStack Virtual
- Debounced Search
- useMemo
- useCallback
- Optimistic Updates
- Server-side Pagination
- React Query Cache

---

## Testing

Implemented tests for:

- SearchBar
- Pagination
- Genre Filter
- Popularity Filter
- DataTable

Run tests:

```bash
npm test
```

---

## Future Improvements

- Multi-column Sorting
- Drag & Drop Column Reordering
- Saved Filter Presets
- Dark Mode
- Accessibility Improvements

---

## Time Spent

Approximately **15–18 hours**.

---

## Author

Vinay Kumar Mahto