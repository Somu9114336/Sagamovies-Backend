# SagaMovies Admin Panel

A modern, responsive React admin panel for managing movies in the SagaMovies application.

## Features

- **Dashboard**: Overview with statistics and popular movies
- **Add Movie**: Form to add new movies with file uploads
- **Show All Movies**: Grid view of all movies with search functionality
- **Edit Movie**: Update existing movie details
- **Delete Movie**: Remove movies with confirmation

## Tech Stack

- React 19 with functional components and hooks
- Axios for API communication
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- React Hook Form for form handling
- React Hot Toast for notifications

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── MovieCard.jsx
│   └── StatsCard.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── AddMovie.jsx
│   ├── ShowAllMovies.jsx
│   ├── EditMovie.jsx
│   └── DeleteMovie.jsx
├── services/
│   └── api.js
├── layouts/
│   └── AdminLayout.jsx
├── App.jsx
└── main.jsx
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5174](http://localhost:5174) in your browser.

## API Integration

The admin panel connects to a Spring Boot backend running on `http://localhost:8080`.

### Endpoints Used

- `GET /movie/get` - Fetch all movies
- `POST /movie/add` - Add new movie (multipart/form-data)
- `PATCH /movie/{id}` - Update movie
- `DELETE /movie/{id}` - Delete movie

## Responsive Design

- **Mobile**: Sidebar collapses to hamburger menu
- **Tablet**: Sidebar narrow but visible
- **Desktop**: Full sidebar with wide dashboard

## CORS Configuration

Ensure the Spring Boot backend has CORS enabled for the frontend origin (http://localhost:5174).

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```
