import { api } from "./axios";
import { ENDPOINTS } from "./endpoints";
import type {
  Movie,
  MovieResponse,
  Genre,
  Filters,
  ReleaseDateResult,
} from "../types/movie.types";

export const getPopularMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const { data } = await api.get(ENDPOINTS.popular, { params: { page } });
  return data;
};

export const getTopRatedMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const { data } = await api.get(ENDPOINTS.topRated, { params: { page } });
  return data;
};

export const getUpcomingMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const { data } = await api.get(ENDPOINTS.upcoming, { params: { page } });
  return data;
};

export const getNowPlayingMovies = async (
  page: number = 1,
): Promise<MovieResponse> => {
  const { data } = await api.get(ENDPOINTS.nowPlaying, { params: { page } });
  return data;
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const { data } = await api.get(ENDPOINTS.movieDetails(id), {
    params: { append_to_response: "credits,similar,release_dates" },
  });
  return data;
};

export const getMovieReleaseDates = async (
  id: number,
): Promise<ReleaseDateResult[]> => {
  const { data } = await api.get(ENDPOINTS.movieReleaseDates(id));
  return data.results;
};

export const getGenres = async (): Promise<Genre[]> => {
  const { data } = await api.get(ENDPOINTS.genres);
  return data.genres;
};

export const searchMovies = async (
  query: string,
  filters?: Filters,
  page: number = 1,
): Promise<MovieResponse> => {
  // If we have a search query, use search endpoint with filters
  if (query.trim()) {
    const params: Record<string, any> = { query, page };

    // Apply filters to search
    if (filters?.genre) params.with_genres = filters.genre;
    if (filters?.year) params.primary_release_year = filters.year;
    if (filters?.rating) params["vote_average.gte"] = filters.rating;

    const { data } = await api.get(ENDPOINTS.search, { params });
    return data;
  }

  // If no search query but filters are active, use discover endpoint
  if (
    filters &&
    (filters.genre || filters.year || filters.rating || filters.sortBy)
  ) {
    return discoverMovies(filters, page);
  }

  // If nothing is active, return empty results
  return { page: 0, results: [], total_pages: 0, total_results: 0 };
};

export const discoverMovies = async (
  filters: Filters,
  page: number = 1,
): Promise<MovieResponse> => {
  const params: Record<string, any> = {
    page,
    sort_by: filters.sortBy || "popularity.desc",
  };

  if (filters.genre) params.with_genres = filters.genre;
  if (filters.year) params.primary_release_year = filters.year;
  if (filters.rating) params["vote_average.gte"] = filters.rating;
  if (filters.sortBy) params.sort_by = filters.sortBy;

  const { data } = await api.get(ENDPOINTS.discover, { params });
  return data;
};
