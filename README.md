# MovieHub - Movie Discovery App

A modern, production-grade movie discovery dashboard built with React, TypeScript, and the TMDB API. Browse popular movies, search with advanced filters, and explore detailed movie information with a beautiful, responsive interface.

![MovieHub Screenshot](./assets/movie-hub.png)

## ✨ Features

- 🎬 **Browse Movies** - Explore Now Playing, Popular, Top Rated, and Upcoming movies
- 🔍 **Advanced Search** - Search movies with debounced input and URL-synced state
- 🎯 **Rich Filters** - Filter by genre, year, rating, and sort by multiple criteria
- 📄 **Pagination** - Browse through all results with proper page navigation
- 📱 **Responsive Design** - Mobile-first layout with animated sidebar drawer
- 🎨 **Custom UI Components** - Styled dropdowns, skeleton loaders, and animations
- ❤️ **Favorites** - Save movies to your favorites (stored locally)
- 📋 **Movie Details** - Comprehensive movie information including cast, director, certification, and similar movies
- ⚡ **Performance** - TanStack Query for efficient data fetching and caching
- 🛡️ **Error Handling** - Error boundaries, loading states, empty states, and 404 pages
- 🎭 **Smooth Animations** - Subtle transitions and hover effects throughout

## 🚀 Tech Stack

- **React** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **TanStack Query** for server state management
- **React Router DOM** for routing
- **Axios** for API requests
- **Lucide React** for icons
- **TMDB API** for movie data

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **pnpm**
- This project uses **pnpm** for dependency management.
  If you don’t have it installed:

```bash
npm install -g pnpm
```

- **TMDB API Key** (free)

## 🔑 Getting a TMDB API Key

1. Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and create a free account
2. After signing up, go to your [Account Settings](https://www.themoviedb.org/settings/api)
3. Click on "API" in the left sidebar
4. Fill out the form to request an API key (select "Developer" as the type)
5. Copy your API Read Access Token or API Key (v3 auth)

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/naijadevgamer/movie-hub.git
cd movie-hub
```

### 2. Install dependencies

#### If you don't have pnpm installed, install it:

```bash
npm install -g pnpm
```

#### Then install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual TMDB API key.

### 4. Start development server

```bash
pnpm dev
```

App runs at:

```
http://localhost:5173
```

### 5. Build for production

```bash
pnpm build
pnpm preview
```

---

## 📁 Project Structure

```text
src/
├── api/                    # API layer
│   ├── axios.ts           # Axios instance with interceptors
│   ├── endpoints.ts       # API endpoint definitions
│   └── movies.api.ts      # Movie-specific API functions
│
├── assets/                 # Static assets
│
├── components/
│   ├── common/            # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── CustomSelect.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── Pagination.tsx
│   │   └── SectionHeader.tsx
│   │
│   ├── filters/           # Filter components
│   │   ├── GenreFilter.tsx
│   │   ├── YearFilter.tsx
│   │   ├── RatingFilter.tsx
│   │   └── SearchFilters.tsx
│   │
│   ├── layout/            # Layout components
│   │   ├── Sidebar.tsx
│   │   ├── Logo.tsx
│   │   ├── SearchHeader.tsx
│   │   └── DashboardLayout.tsx
│   │
│   └── movie/             # Movie-specific components
│       ├── MovieCard.tsx
│       ├── MovieGrid.tsx
│       ├── MovieSection.tsx
│       ├── MovieBanner.tsx
│       ├── MovieMeta.tsx
│       ├── SimilarMovies.tsx
│       └── RatingBadge.tsx
│
├── hooks/                 # Custom React hooks
│   ├── useDebounce.ts
│   ├── usePopularMovies.ts
│   ├── useTopRatedMovies.ts
│   ├── useNowPlayingMovies.ts
│   ├── useUpcomingMovies.ts
│   ├── useMovieDetails.ts
│   ├── useMovieDiscovery.ts
│   ├── useSearchMovies.ts
│   └── useGenres.ts
│
├── pages/                 # Page components
│   ├── HomePage.tsx
│   ├── SearchPage.tsx
│   ├── MovieDetailsPage.tsx
│   └── NotFoundPage.tsx
│
├── routes/                # Route configuration
│   └── index.tsx
│
├── types/                 # TypeScript type definitions
│   └── movie.types.ts
│
├── utils/                 # Utility functions
│   ├── image.ts
│   ├── date.ts
│   └── rating.ts
│
├── App.tsx                # Root app component
├── main.tsx               # Entry point
└── index.css              # Global styles and design tokens
```

---

## 🎯 Key Architecture Decisions

### API Layer

- Centralized Axios instance with interceptors
- All API calls abstracted in dedicated functions
- TanStack Query for caching, loading states, and error handling

### State Management

- Server state → TanStack Query for all API data
- UI state → React hooks
- URL state → search params for search/filter persistence
- No external state management library needed

### Routing

- Home uses DashboardLayout
- Search + Details are standalone routes

### Design System

- CSS variables
- Reusable components
- Mobile-first design

---

## 🔍 Features in Detail

### Home

- Browse movies by category (Now Playing, Popular, Top Rated, Upcoming)
- Horizontal scrollable sections with 10 movies each
- "View All" renders full grid or navigates to Search Page
- Sidebar navigation for category switching

### Search & Filters

- Debounced search input (500ms delay)
- URL-synced state (shareable search URLs)
- Filters: Genre, Year, Rating, Sort By
- Combined search + filter functionality
- Pagination with page numbers

### Movie Details

- Poster + backdrop
- Rating, certification (PG-13, R, etc.)
- Director, writers, language
- Runtime in hours/minutes format
- Cast list
- Similar movies recommendations
- Add to favorites functionality

### Error Handling

- Error Boundary: Catches rendering errors globally
- 404 Page: Custom not-found page for invalid routes
- Error States: Per-component error with retry buttons
- Empty States: Helpful messages when no results found
- Loading States: Skeleton loaders for better UX

---

## 🧪 Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Type checking
pnpm exec tsc --noEmit
```

---

## 🌐 Browser Support

- Chrome
- Firefox
- Safari
- Edge

---

## 📝 Notes

- The TMDB API has a limit of 500 pages per endpoint, so pagination is capped accordingly
- Search with genre/rating filters uses the discover endpoint due to TMDB API limitations
- Favorites are stored in localStorage and persist across sessions
- The app requires an internet connection to fetch movie data from the TMDB API

---

## 🤝 Contributing

This is an assessment project.

---

## 📄 License

This project is created for educational/assessment purposes. Movie data is provided by The Movie Database (TMDB).
