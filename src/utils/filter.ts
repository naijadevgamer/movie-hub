import type { Movie } from "../types/movie.types";
import type { Filters } from "../types/movie.types";

export const applyClientFilters = (
  movies: Movie[],
  filters: Filters,
): Movie[] => {
  return movies.filter((movie) => {
    // Genre filter
    if (filters.genre && !movie.genre_ids?.includes(filters.genre)) {
      return false;
    }

    // Year filter
    if (filters.year && movie.release_date) {
      const movieYear = new Date(movie.release_date).getFullYear();
      if (movieYear !== filters.year) {
        return false;
      }
    }

    // Rating filter
    if (filters.rating && movie.vote_average < filters.rating) {
      return false;
    }

    return true;
  });
};

export const sortMovies = (movies: Movie[], sortBy: string): Movie[] => {
  const sorted = [...movies];

  switch (sortBy) {
    case "vote_average.desc":
      sorted.sort((a, b) => b.vote_average - a.vote_average);
      break;
    case "vote_average.asc":
      sorted.sort((a, b) => a.vote_average - b.vote_average);
      break;
    case "primary_release_date.desc":
      sorted.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
      break;
    case "primary_release_date.asc":
      sorted.sort(
        (a, b) =>
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime(),
      );
      break;
    case "title.asc":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title.desc":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "popularity.desc":
    default:
      sorted.sort((a, b) => b.popularity - a.popularity);
      break;
  }

  return sorted;
};
