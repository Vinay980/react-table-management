# React Table Management App

A high-performance React table management application built with **React, TypeScript, TanStack Table, TanStack Virtual, React Query, Tailwind CSS, and json-server**.

The application efficiently handles large datasets with server-side pagination, sorting, filtering, virtualization, inline editing, bulk actions, and CSV export.

---

# Features

## Table & Performance

- Virtualized table using TanStack Virtual
- Server-side pagination
- Server-side sorting
- Responsive table layout
- Optimized rendering with React hooks

---

## Search & Filtering

- Global search
- Debounced search (300ms)
- Search indicator
- Clear search button
- Genre filter
- Popularity range filter
- Combined filters with server-side API

---

## Inline Editing

- Edit Track Artist
- Edit Track Popularity
- Validation
- Save / Cancel
- Optimistic UI updates
- Automatic rollback on API failure

---

## Bulk Actions

- Row selection
- Select All (Current Page)
- Export Selected Rows to CSV

---

## Column Management

- Show / Hide columns
- Persist column visibility using Local Storage
- Column resizing

---

## CSV Export

Export Current View with:

- Search
- Filters
- Sorting

Proper CSV escaping is implemented.

---

## UX

- Loading state
- Error state
- Retry button
- Empty state
- Responsive UI

---

# Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Table
- TanStack Virtual
- TanStack Query
- Tailwind CSS
- Axios
- json-server

---

# Folder Structure

```
src
│
├── api
├── components
│ ├── Filters
│ ├── Pagination
│ ├── Search
│ └── Table
│
├── hooks
├── providers
├── types
├── utils
└── pages
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

# Running json-server

Start json-server

```bash
npx json-server --watch db.json --port 3000
```

---

# Run Development Server

```bash
npm run dev
```

---

# Build

```bash
npm run build
```

---

# Lint

```bash
npm run lint
```

---

# Dataset

Spotify Songs Dataset (~30,000 records)

The dataset is served using **json-server** to simulate a REST API.

---

# Technical Decisions

- TanStack Table for headless table implementation
- TanStack Virtual for virtualization
- React Query for server state management
- Axios for API communication
- Tailwind CSS for styling
- Custom hooks to separate UI and business logic
- Server-side operations for pagination, sorting, filtering and searching
- Optimistic updates for inline editing

---

# Performance Optimizations

- Virtual scrolling
- Debounced search
- Stable column definitions
- useCallback where appropriate
- React Query caching
- Optimistic updates

---

# Known Limitations

- Select All works on the current page only.
- Genre filtering is implemented as a single-select dropdown.

---

# Future Improvements

- Multi-select category filters
- Drag-and-drop column reordering
- Advanced filter presets
- Dark mode
- Accessibility improvements
- Additional unit tests

---

# Time Spent

Approximately **15–18 hours**

---

# Author

**Vinay Kumar Mahto**