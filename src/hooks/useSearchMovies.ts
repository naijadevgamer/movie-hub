import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/movies.api";
import type { Filters } from "../types/movie.types";

export const useSearchMovies = (
  query: string,
  filters?: Filters,
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["movies", "search", query, filters, page],
    queryFn: () => searchMovies(query, filters, page),
    enabled:
      query.length > 0 ||
      (filters && Object.values(filters).some((v) => v !== undefined)),
    staleTime: 2 * 60 * 1000,
  });
};
