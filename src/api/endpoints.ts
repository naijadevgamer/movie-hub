export const ENDPOINTS = {
  // Movies
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
  nowPlaying: "/movie/now_playing",

  // Movie Details
  movieDetails: (id: number) => `/movie/${id}`,
  movieCredits: (id: number) => `/movie/${id}/credits`,
  similarMovies: (id: number) => `/movie/${id}/similar`,
  movieReleaseDates: (id: number) => `/movie/${id}/release_dates`,

  // Search & Discovery
  search: "/search/movie",
  discover: "/discover/movie",

  // Genres
  genres: "/genre/movie/list",
};
